import { DrupalImage } from './types'

export type ImageSize = 'THUMBNAIL' | 'MEDIUM' | 'LARGE'

function proxyDrupalUrl(url: string): string {
  if (!url) return ''
  const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
  if (!drupalBaseUrl || !url.startsWith(drupalBaseUrl)) return url
  const path = url.substring(drupalBaseUrl.length + 1)
  return `/${path}`
}

export function getImageUrl(image: DrupalImage | undefined, preferredSize: ImageSize = 'MEDIUM'): string {
  if (!image) return ''
  return proxyDrupalUrl(image.url)
}
