import type { BaseOptions } from '@/utils/BaseOptions.js'

export type AnimeTraceOptions = {
  is_multi?: 1 | 0
  model?: 'anime_model_lovelive' | 'pre_stable' | 'anime' | 'full_game_model_kira' | 'animetrace_high_beta'
  ai_detect?: 1 | 0
}
& (BaseOptions<unknown>
  | {
    base64: string
  })

export interface AnimeTraceCharacter {
  work: string
  character: string
}

export interface AnimeTraceItem {
  box: [number, number, number, number, number]
  box_id: string
  character: AnimeTraceCharacter[]
  not_confident: boolean
  preview: string | null
}

export interface AnimeTraceApiRes {
  code: number
  data: AnimeTraceItem[]
  ai: boolean
  message?: string
  zh_message?: string
}

export type AnimeTraceRes = AnimeTraceItem[]
