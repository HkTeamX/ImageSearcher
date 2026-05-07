import type { TinEyeApiRes, TinEyeErrorResponse, TinEyeOptions, TinEyeRes } from '@/libs/TinEye/types.js'
import { basename } from 'node:path'
import ky from 'ky'
import { readFileToBlob } from '@/utils/readFileToBlob.js'

const BASE_URL = 'https://tineye.com'

export async function TinEye(options: TinEyeOptions): Promise<TinEyeRes> {
  const form = new FormData()

  if ('path' in options) {
    form.append('file', await readFileToBlob(options.path), basename(options.path))
  }
  else if ('url' in options) {
    form.append('url', options.url)
  }
  else {
    throw new Error('please input path or url')
  }

  const resRaw = await ky.post(`${BASE_URL}/api/v1/result_json/`, { body: form, throwHttpErrors: false })

  if (resRaw.status !== 200) {
    const res = await resRaw.json<TinEyeErrorResponse>()
    throw new Error(res.suggestions.description.join('\n'))
  }

  const res = await resRaw.json<TinEyeApiRes>()

  return res.matches.map(match => ({
    image: match.image_url,
    resolution: `${match.width}x${match.height}`,
    similarity: match.score,
    sources: match.backlinks.map(domain => ({
      link: domain.backlink,
      date: domain.crawl_date,
    })),
  }))
}
