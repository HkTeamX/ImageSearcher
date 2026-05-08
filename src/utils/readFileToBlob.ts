import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileTypeFromFile } from 'file-type'

export async function readFileToBlob(path: string): Promise<Blob> {
  const buffer = await readFile(resolve(path))
  const fileType = await fileTypeFromFile(path)
  return new Blob([buffer], { type: fileType?.mime ?? 'application/octet-stream' })
}
