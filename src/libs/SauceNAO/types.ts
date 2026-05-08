import type { BaseOptions } from '@/utils/BaseOptions.js'

export type SauceNAOOptions = BaseOptions<{
  hide?: 0 | 1 | 2 | 3
  dbs?: number[]
}>

export interface SauceNAOSource {
  title: string
  content?: { text: string, link?: string }
}

export interface SauceNAOPreview {
  name: string
  link: string
}

export interface SauceNAOItem {
  image: string
  title: string
  similarity: number
  sources: SauceNAOSource[]
  previews: SauceNAOPreview[]
}

export type SauceNAORes = SauceNAOItem[]
