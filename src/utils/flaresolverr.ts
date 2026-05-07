import type { V1ResponseIndex } from 'flaresolverr-client'
import { FlareSolverrClient } from 'flaresolverr-client'

export interface UseFlareSolverrOptions {
  api: string
  url: string
}

export async function useFlareSolverr(options: UseFlareSolverrOptions): Promise<V1ResponseIndex['request.get']> {
  const flaresolverr = new FlareSolverrClient(options.api)
  const sessionManager = await flaresolverr.createSession({ session: 'image_seacher' }, true)
  return await sessionManager.requestGet({ url: options.url, maxTimeout: 600000 })
}
