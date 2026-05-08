import type { AnimeTraceApiRes, AnimeTraceOptions, AnimeTraceRes } from '@/libs/AnimeTrace/types.js'
import { basename } from 'node:path'
import ky from 'ky'
import { readFileToBlob } from '@/utils/readFileToBlob.js'

const BASE_URL = 'https://api.animetrace.com'

export async function AnimeTrace(options: AnimeTraceOptions): Promise<AnimeTraceRes> {
  const form = new FormData()

  if ('path' in options) {
    form.append('file', await readFileToBlob(options.path), basename(options.path))
  }
  else if ('url' in options) {
    form.append('url', options.url)
  }
  else {
    throw new Error('[AnimeTrace Error]: please input path or url')
  }

  if (options.is_multi !== undefined || !('is_multi' in options)) {
    form.append('is_multi', (options.is_multi ?? 1).toString())
  }

  if (options.ai_detect !== undefined) {
    form.append('ai_detect', options.ai_detect.toString())
  }

  if (options.model) {
    form.append('model', options.model)
  }

  const res = await ky.post(`${BASE_URL}/v1/search`, { body: form }).json<AnimeTraceApiRes>()
  if (res.code !== 0) {
    throw new Error(`[AnimeTrace Error]: ${res.code} JP:${res.message ?? 'Unknown error'} CN:${res.zh_message ?? '未知错误'}`)
  }

  return res.data
}
