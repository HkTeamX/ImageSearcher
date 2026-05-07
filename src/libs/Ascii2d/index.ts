import type { Ascii2dOptions, Ascii2dRes } from '@/libs/Ascii2d/types.js'
import { basename } from 'node:path'
import { load } from 'cheerio'
import ky from 'ky'
import { useFlareSolverr } from '@/utils/flaresolverr.js'
import { readFileToBlob } from '@/utils/readFileToBlob.js'

const BASE_URL = 'https://ascii2d.net'

export async function Ascii2d(options: Ascii2dOptions): Promise<Ascii2dRes> {
  let page: string
  let url: string

  if ('url' in options) {
    const response = await useFlareSolverr({
      api: options.flareSolverr,
      url: `${BASE_URL}/search/url/${options.url}`,
    })

    page = response.solution.response
    url = response.solution.url
  }
  else if ('path' in options) {
    const form = new FormData()
    form.append('file', await readFileToBlob(options.path), basename(options.path))
    const response = await ky.post(`${BASE_URL}/search/file`, { body: form })
    page = await response.text()
    url = response.url
  }
  else {
    throw new Error('please input path or url')
  }

  if (options.type === 'bovw') {
    // 重新请求一次，获取bovw的结果页面
    const response = await useFlareSolverr({
      api: options.flareSolverr,
      url: `${BASE_URL}/search/bovw/${url.split('/').pop()}`,
    })
    page = response.solution.response
  }

  const $ = load(page)
  return $('.item-box')
    .toArray()
    .map((item) => {
      const image = $('.image-box > img', item).first()
      const src = image.attr('src') ?? ''

      const detailBox = $('.detail-box', item)
      const [sourceLink, authorLink] = $('a', detailBox).toArray()

      return {
        hash: $('.hash', item).text(),
        info: $('.info-box > .text-muted', item).text(),
        image: new URL(src, BASE_URL).toString(),
        source: sourceLink
          ? {
              link: $(sourceLink).attr('href') ?? '',
              text: $(sourceLink).text(),
            }
          : undefined,
        author: authorLink
          ? {
              link: $(authorLink).attr('href') ?? '',
              text: $(authorLink).text(),
            }
          : undefined,
      }
    })
    .filter(item => item.hash && item.info)
    .slice(1)
}
