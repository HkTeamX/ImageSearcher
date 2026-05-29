import type { BaseOptions } from '@/utils/BaseOptions.js'

export type Ascii2dOptions = BaseOptions<{
  type: 'color' | 'bovw'
  flareSolverr: string
  image2Base64?: boolean
}>

export interface Ascii2dSource {
  text: string
  link: string
}

export interface Ascii2dItem {
  hash: string
  info: string
  image: string
  base64: string
  source: Ascii2dSource | undefined
  author: Ascii2dSource | undefined
}

export interface Ascii2dRes {
  userAgent: string
  cookie: string
  results: Ascii2dItem[]
}
