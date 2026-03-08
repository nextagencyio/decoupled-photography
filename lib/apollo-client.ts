import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { isDemoMode, handleMockQuery } from './demo-mode'

function getServerBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  const port = process.env.PORT || '3000'
  const host = process.env.HOST || 'localhost'
  return `http://${host}:${port}`
}

function getGraphqlUri(): string {
  if (typeof window !== 'undefined') return '/api/graphql'
  return `${getServerBaseUrl()}/api/graphql`
}

async function fetchGraphql(
  uri: RequestInfo | URL,
  options?: RequestInit,
  withTags = false
): Promise<Response> {
  if (typeof window === 'undefined' && isDemoMode()) {
    const body = typeof options?.body === 'string' ? options.body : '{}'
    return new Response(JSON.stringify(handleMockQuery(body)), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (withTags) {
    return fetch(uri, { ...options, next: { tags: ['drupal'] } } as RequestInit)
  }

  return fetch(uri, options)
}

let browserClient: ApolloClient<any> | null = null

export function getServerApolloClient(requestHeaders: Headers): ApolloClient<any> {
  const protocol = requestHeaders.get('x-forwarded-proto') || 'http'
  const forwardedHost = requestHeaders.get('x-forwarded-host')
  const host = forwardedHost || requestHeaders.get('host') || 'localhost:3000'
  const origin = `${protocol}://${host}`

  const httpLink = createHttpLink({
    uri: `${origin}/api/graphql`,
    fetch: (uri: RequestInfo | URL, options?: RequestInit) =>
      fetchGraphql(uri, options, true),
  })

  const authLink = setContext((_, { headers }) => ({
    headers: { ...headers, 'Content-Type': 'application/json' },
  }))

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      possibleTypes: {
        TermInterface: ['TermPhotographyStyle', 'TermServiceType'],
        NodeInterface: ['NodeGallery', 'NodeService', 'NodeTestimonial', 'NodePage', 'NodeHomepage'],
      },
    }),
    defaultOptions: { watchQuery: { errorPolicy: 'ignore' }, query: { errorPolicy: 'all' } },
  })
}

const httpLink = createHttpLink({ uri: getGraphqlUri() })
const authLink = setContext((_, { headers }) => ({
  headers: { ...headers, 'Content-Type': 'application/json' },
}))

const possibleTypesConfig = {
  possibleTypes: {
    TermInterface: ['TermPhotographyStyle', 'TermServiceType'],
    NodeInterface: ['NodeGallery', 'NodeService', 'NodeTestimonial', 'NodePage', 'NodeHomepage'],
  },
}

const client = typeof window !== 'undefined'
  ? (browserClient || (browserClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(possibleTypesConfig),
    defaultOptions: { watchQuery: { errorPolicy: 'ignore' }, query: { errorPolicy: 'all' } },
  })))
  : new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(possibleTypesConfig),
    defaultOptions: { watchQuery: { errorPolicy: 'ignore' }, query: { errorPolicy: 'all' } },
  })

export default client
