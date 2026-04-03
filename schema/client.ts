/**
 * Stub typed client — replaced by `npm run sync-schema`.
 *
 * Run `npx decoupled-cli schema sync` after connecting to a Drupal space
 * to generate the real typed client with interfaces and queries.
 */

import type { DecoupledClient } from 'decoupled-client'
import type { DrupalNode } from 'decoupled-client'
import type { QueryOptions } from 'decoupled-client'

// Placeholder types — sync-schema will replace with actual content types
export type ContentNode = DrupalNode
export type ContentTypeName = string

export interface ContentTypeMap {
  [key: string]: DrupalNode
}

export interface TypedClient {
  getEntries<K extends ContentTypeName>(type: K, options?: QueryOptions): Promise<DrupalNode[]>
  getEntry<K extends ContentTypeName>(type: K, id: string): Promise<DrupalNode | null>
  getEntryByPath(path: string): Promise<ContentNode | null>
  raw<T = any>(query: any, variables?: Record<string, any>): Promise<T>
}

/** Extract a raw query string from either a string or Apollo DocumentNode. */
function toQueryString(query: any): string {
  if (typeof query === 'string') return query
  return query?.loc?.source?.body ?? ''
}

// Stub factory — uses raw queryByPath with a basic route query
export function createTypedClient(client: DecoupledClient): TypedClient {
  return {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path) {
      return client.queryByPath(path, `
        query ($path: String!) {
          route(path: $path) {
            ... on RouteInternal {
              entity {
                ... on NodePage { __typename id title path body { processed } }
                ... on NodeHomepage {
                  __typename id title path
                  heroTitle heroSubtitle
                  heroDescription { processed }
                  statsItems { ... on ParagraphStatItem { id number label } }
                  featuredGalleriesTitle
                  ctaTitle ctaDescription { processed }
                  ctaPrimary ctaSecondary
                }
                ... on NodeGallery {
                  __typename id title path
                  body { processed }
                  photographyStyle { ... on TermInterface { id name } }
                  shootDate { timestamp }
                  location
                  image { url alt width height variations(styles: [LARGE, MEDIUM]) { name url width height } }
                  imageCount
                }
                ... on NodeService {
                  __typename id title path
                  body { processed }
                  serviceType { ... on TermInterface { id name } }
                  startingPrice
                  duration
                  image { url alt width height variations(styles: [LARGE, MEDIUM]) { name url width height } }
                }
                ... on NodeTestimonial {
                  __typename id title path
                  body { processed }
                  clientName
                  serviceTypeName
                  photo { url alt width height }
                  rating
                }
              }
            }
          }
        }
      `)
    },
    async raw(query, variables) { return client.query(toQueryString(query), variables) },
  }
}
