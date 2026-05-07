import type { TraceMoeApiRes, TraceMoeOptions, TraceMoeRes } from '@/libs/TraceMoe/types.js'
import { basename } from 'node:path'
import ky from 'ky'
import { readFileToBlob } from '@/utils/readFileToBlob.js'

const BASE_URL = 'https://api.trace.moe'

export async function TraceMoe(options: TraceMoeOptions): Promise<TraceMoeRes> {
  const form = new FormData()
  const searchParams = new URLSearchParams()

  if ('path' in options) {
    form.append('file', await readFileToBlob(options.path), basename(options.path))
  }
  else if ('url' in options) {
    searchParams.append('url', options.url)
  }
  else {
    throw new Error('please input path or url')
  }

  if (options.curBorders || !('cutBorders' in options)) {
    searchParams.append('cutBorders', '')
  }

  if (options.anilistId) {
    searchParams.append('anilistID', options.anilistId.toString())
  }

  if (options.anilistInfo) {
    searchParams.append('anilistInfo', '')
  }

  const res = await ky.post(`${BASE_URL}/search?${searchParams.toString()}`, { body: form }).json<TraceMoeApiRes>()
  if (res.error !== '') {
    throw new Error(res.error)
  }

  return res.result
    .map((data) => {
      data.similarity *= 100
      data.from *= 1000
      data.to *= 1000
      return data
    })
}
