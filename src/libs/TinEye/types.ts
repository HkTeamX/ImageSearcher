import type { BaseOptions } from '@/utils/BaseOptions.js'

export type TinEyeOptions = BaseOptions<unknown>

export interface TinEyeSource {
  link: string
  date: string
}

export interface TinEyeItem {
  image: string
  resolution: string
  similarity: number
  sources: TinEyeSource[]
}

export type TinEyeRes = TinEyeItem[]

// ============================================================================

export interface TinEyeApiRes {
  page: number
  sort_selector: string | null
  limit: number
  domain_name: string
  no_cache: boolean
  image_server: string
  load_query_summary: boolean
  show_unavailable_domains: boolean
  sort: string
  order: 'asc' | 'desc' | string
  domain: string
  tags: string
  offset: number
  query_hash: string
  start: number
  end: number
  total_pages: number
  query: TinEyeQuery
  matches: TinEyeMatch[]
  num_matches: number
  num_filtered_matches: number
  num_collection_matches: number
  num_stock_matches: number
  num_unavailable_matches: number
  first_crawl_date: string
  str_num_matches: string
  str_search_time: string
  query_source: string
}

export interface TinEyeQuery {
  key: string
  format: string
  width: number
  height: number
  filesize: number
  hash: string
}

export interface TinEyeMatch {
  backlinks: TinEyeBacklink[]
  image_url: string
  key: string
  transform: TinEyeTransform
  domain: string
  domain_unavailable: boolean
  score: number
  width: number
  height: number
  size: number
  format: string
  filesize: number
  overlay: string
  matching_features: number
  tags: string[]
  promoted: boolean
  first_crawl_date: string
  domains: TinEyeDomain[]
}

export interface TinEyeBacklink {
  url: string
  backlink: string
  crawl_date: string
  source_id: number
  image_name: string
}

export interface TinEyeTransform {
  m11: number
  m12: number
  m13: number
  m21: number
  m22: number
  m23: number
}

export interface TinEyeDomain {
  backlinks: TinEyeBacklink[]
  domain_name: string
  image_name: string
  first_crawl_date: string
}

// ============================================================================

export interface TinEyeErrorResponse {
  page: number
  sort_selector: string | null
  limit: number
  domain_name: string
  no_cache: boolean
  image_server: string
  load_query_summary: boolean
  show_unavailable_domains: boolean
  sort: string | null
  order: 'asc' | 'desc' | null
  domain: string
  tags: string
  offset: number
  suggestions: TinEyeErrorSuggestions
  http_code: number
}

export interface TinEyeErrorSuggestions {
  key: string
  title: string
  suggestions: string[]
  description: string[]
}
