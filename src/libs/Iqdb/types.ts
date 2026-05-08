import type { BaseOptions } from '@/utils/BaseOptions.js'

export type IqdbOptions = BaseOptions<{
  service?: number[]
  forcegray?: boolean
}>

export interface IqdbSource {
  name: string
  url: string
}

export interface IqdbItem {
  image: string
  similarity: number
  resolution: string
  level: string
  sources: IqdbSource[]
}

export type IqdbRes = IqdbItem[]
