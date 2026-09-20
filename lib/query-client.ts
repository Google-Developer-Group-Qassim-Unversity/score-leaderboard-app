import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'
import * as Sentry from '@sentry/nextjs'
import { ApiError, NotFoundError, UnauthorizedError } from '@/lib/api/errors'

/**
 * react-query resolves a failure into `error` state rather than letting it
 * reach `window.onerror`, so without this every failed query and mutation was
 * invisible to Sentry - including the one that let 449 broken attendance links
 * go unnoticed for days.
 *
 * Reporting all of them would be worse than reporting none: an error quota is
 * finite, and a signed-out visitor or a deleted event is not a bug. Only
 * failures that indicate something is actually wrong are sent.
 */
export function isWorthReporting(error: unknown): boolean {
  if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
    return false
  }
  if (error instanceof ApiError) {
    // 4xx means the request was refused for a reason the caller can act on;
    // the backend already has it. 5xx and transport failures are ours.
    return error.status >= 500
  }
  // NetworkError and anything unrecognized: report it.
  return true
}

function report(error: unknown, context: Record<string, unknown>): void {
  if (!isWorthReporting(error)) return
  Sentry.captureException(error, {
    tags: {
      source: context.kind === 'mutation' ? 'react-query.mutation' : 'react-query.query',
      ...(error instanceof ApiError && error.code ? { api_error_code: error.code } : {}),
    },
    extra: context,
  })
}

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
    queryCache: new QueryCache({
      onError: (error, query) => report(error, { kind: 'query', queryKey: query.queryKey }),
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) =>
        report(error, { kind: 'mutation', mutationKey: mutation.options.mutationKey }),
    }),
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
