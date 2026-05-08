export function normalizeUrl(input: string): string {
  if (/^https?:\/\//i.test(input)) {
    return input
  }

  if (input.startsWith('//')) {
    return `https:${input}`
  }

  return `https://${input}`
}
