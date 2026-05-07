import type { BaseOptions } from '@/utils/BaseOptions.js'

export type TraceMoeOptions = BaseOptions<{
  curBorders?: boolean
  anilistId?: number
  anilistInfo?: boolean
}>

export interface TraceMoeItem {
  anilist: number | {
    id: number
    idMal: number
    title: { native: string | null, romaji: string | null, english: string | null }
    synonyms: string[]
    isAdult: boolean
  }
  filename: string
  episode: number
  duration: number
  from: number
  at: number
  to: number
  similarity: number
  video: string
  image: string
}

export interface TraceMoeApiRes {
  frameCount: number
  error: string
  result: TraceMoeItem[]
}

export type TraceMoeRes = TraceMoeItem[]
