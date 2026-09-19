import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'
import { UnauthorizedError } from '@/lib/api/errors'

/**
 * How long hydrated/cached data is treated as fresh before a background
 * refetch. This is what keeps navigation instant: within this window a
 * revisited page renders from cache with no loading state at all.
 *
 * It must be > 0, otherwise data prefetched on the server is considered stale
 * the moment it hydrates and refetches immediately, defeating the point.
 */
export const DEFAULT_STALE_TIME = 60 * 1000

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: 5 * 60 * 1000,
        // Points and events change while a tab sits open, so pick the change
        // up on refocus/reconnect rather than making the user reload.
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
          if (error instanceof UnauthorizedError) {
            return false
          }
          return failureCount < 2
        },
      },
      dehydrate: {
        // Also ship queries that are still in flight, so a server component can
        // kick off a fetch without awaiting it and let the client take over.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

/**
 * Server: a fresh client per request, so one request's data never leaks into
 * another's. Browser: one shared client for the life of the tab — that shared
 * cache is what makes repeat navigation instant.
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}
