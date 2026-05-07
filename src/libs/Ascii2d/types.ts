import type { BaseOptions } from '@/utils/BaseOptions.js'

export type Ascii2dOptions = BaseOptions<{
  type: 'color' | 'bovw'
  flareSolverr: string
}>

export interface Ascii2dSource {
  text: string
  link: string
}

export interface Ascii2dItem {
  hash: string
  info: string
  image: string | undefined
  source: Ascii2dSource | undefined
  author: Ascii2dSource | undefined
}

export type Ascii2dRes = Ascii2dItem[]
