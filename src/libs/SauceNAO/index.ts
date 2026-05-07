import type { CheerioAPI } from 'cheerio'
import type { Element } from 'domhandler'
import type { SauceNAOOptions, SauceNAORes, SauceNAOSource } from '@/libs/SauceNAO/types.js'
import { basename } from 'node:path'
import { load } from 'cheerio'
import ky from 'ky'
import { readFileToBlob } from '@/utils/readFileToBlob.js'

export const BASE_URL = 'https://saucenao.com'

function parseContentColumn($: CheerioAPI, column: Element): SauceNAOSource[] {
  const result: SauceNAOSource[] = []
  let currentItem: SauceNAOSource | null = null

  $(column)
    .contents()
    .each((_, element) => {
      const $node = $(element)

      if ($node.is('strong')) {
        currentItem = {
          title: $node.text().replace(':', '').trim(),
        }

        result.push(currentItem)
        return
      }

      if (!currentItem) {
        return
      }

      if ($node.is('br')) {
        return
      }

      currentItem.content = {
        text: $node.text().trim(),
        link: $node.attr('href') || undefined,
      }

      currentItem = null
    })

  return result
}

export async function SauceNAO(options: SauceNAOOptions): Promise<SauceNAORes> {
  const form = new FormData()

  if ('path' in options) {
    form.append('file', await readFileToBlob(options.path), basename(options.path))
  }
  else if ('url' in options && options.url) {
    form.append('url', options.url)
  }
  else {
    throw new Error('please input path or url')
  }

  if (options.hide !== undefined) {
    form.append('hide', options.hide.toString())
  }

  if (options.dbs !== undefined) {
    options.dbs.forEach(db => form.append('dbs[]', db.toString()))
  }

  const page = await ky.post(`${BASE_URL}/search.php`, { body: form }).text()

  const $ = load(page)

  return $('.result:not(#result-hidden-notification)')
    .toArray()
    .map((result) => {
      const title = $('.resulttitle', result)
      const similarity = $('.resultsimilarityinfo', result)
      const sources = $('.resultcontentcolumn', result)
        .toArray()
        .map(column => parseContentColumn($, column))
        .flat()

      const imageEl = $('.resultimage img', result)
      const image = imageEl.attr('data-src2') ?? imageEl.attr('data-src') ?? imageEl.attr('src') ?? ''

      const previews = $('.resultmiscinfo > a', result)
        .toArray()
        .map((element) => {
          const $element = $(element)
          return {
            name: (($('img', element).attr('src') ?? '').split('/').pop() ?? '').replace('.ico', ''),
            link: $element.attr('href') || '',
          }
        })

      return {
        image,
        title: title.text(),
        similarity: Number.parseFloat(similarity.text()),
        sources,
        previews,
      }
    })
    .sort((a, b) => b.similarity - a.similarity)
}
