import type { IqdbOptions, IqdbRes } from '@/libs/Iqdb/types.js'
import { basename } from 'node:path'
import { load } from 'cheerio'
import { ElementType } from 'domelementtype'
import ky from 'ky'
import { normalizeUrl } from '@/utils/normalizeUrl.js'
import { readFileToBlob } from '@/utils/readFileToBlob.js'

const BASE_URL = 'https://iqdb.org'

export const IqdbServicesPresets = {
  'anime': [1, 2, 3, 4, 5, 6, 11, 13],
  '3d': [7, 9],
}

export async function Iqdb(options: IqdbOptions): Promise<IqdbRes> {
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

  if (!options.service) {
    options.service = IqdbServicesPresets.anime
  }

  options.service.forEach((service) => {
    form.append('service[]', service.toString())
  })

  if (options.forcegray) {
    form.append('forcegray', 'on')
  }

  const response = await ky.post(BASE_URL, { body: form }).text()
  const $ = load(response)

  return $('table:not(.form)')
    .toArray()
    .slice(1) // 去掉第一个自己的原图
    .map((result) => {
      const _tds = $('tr td', result).toArray()
      if ($(_tds[0]).text().trim().includes('Could not find your image')) {
        return false
      }

      const tds = _tds.slice(-4)

      const firstSourceEl = $('td.image a', tds[0]).first()
      const firstSourceHref = normalizeUrl(firstSourceEl.attr('href') ?? '')

      const imageEl = $('img', firstSourceEl).first()
      const image = new URL(imageEl.attr('src') ?? '', BASE_URL).toString()

      const sources = $(tds[1])
        .contents()
        .toArray()
        .filter(node => node.type === ElementType.Text || (node.type === ElementType.Tag && node.tagName === 'span'))
        .map((node) => {
          if (node.type === ElementType.Text) {
            // 纯文本, 是第一个来源的名称
            return { name: node.data.trim(), url: firstSourceHref }
          }

          const $node = $('a', node)

          return {
            name: $node.text().trim(),
            url: normalizeUrl($node.attr('href') ?? ''),
          }
        })

      const tds2Content = $(tds[2]).text()
      const [, level] = tds2Content.match(/\[(\w+)\]/) ?? []
      const [, resolution] = tds2Content.match(/(\d+×\d+)/) ?? []

      const tds3Content = $(tds[3]).text()
      const [, similarity] = tds3Content.match(/(\d+%)\s*similarity/) ?? []

      return {
        image,
        similarity: Number.parseFloat(similarity),
        resolution,
        level,
        sources,
      }
    })
    .filter(item => !!item)
    .sort((a, b) => b.similarity - a.similarity)
}
