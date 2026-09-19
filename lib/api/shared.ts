/**
 * Core fetch utilities - pure HTTP operations with no auth awareness.
 * Use this directly only if you need to pass a token manually.
 * For most cases, use server.ts (server) or useApi hook (client).
 */

import { ApiError, NetworkError, NotFoundError } from './errors'
import { config } from '@/lib/config'

const getApiBaseUrl = () => config.backendApiUrl

export type RequestOptions = {
  token?: string
  revalidate?: number | false
  tags?: string[]
}

/**
 * Shared, public data (leaderboards, events) is cached server-side for this
 * long. Short enough that a hard load is never meaningfully stale, long enough
 * that repeat renders don't re-hit the backend. Client-side freshness is a
 * separate layer — see lib/query-client.ts.
 */
const DEFAULT_REVALIDATE = 30

async function handleResponse<T>(response: Response, path: string): Promise<T> {
  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError(`Resource at ${path}`)
    }

    let errorData: unknown
    try {
      errorData = await response.json()
    } catch {
      // Response body wasn't JSON
    }

    const message = 
      (errorData as { detail?: string })?.detail ||
      `HTTP ${response.status}: ${response.statusText}`
    
    console.error(`[API Error] ${response.status} ${path}:`, message)
    throw new ApiError(response.status, message, errorData)
  }

  return response.json()
}

export const api = {
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (options?.token) {
      headers['Authorization'] = `Bearer ${options.token}`
    }

    // An authenticated response is per-user, so it must never land in the
    // shared Data Cache under a key another user could hit. Caching it
    // requires opting in explicitly with a `revalidate` value.
    const revalidate = options?.revalidate ?? (options?.token ? false : DEFAULT_REVALIDATE)

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: 'GET',
      headers,
      cache: revalidate === false ? 'no-store' : undefined,
      next: revalidate === false
        ? undefined
        : {
            revalidate,
            tags: options?.tags,
          },
    }).catch((error) => {
      console.error(`[Network Error] GET ${path}:`, error)
      throw new NetworkError()
    })

    return handleResponse<T>(response, path)
  },

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (options?.token) {
      headers['Authorization'] = `Bearer ${options.token}`
    }

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
      next: options?.revalidate === false 
        ? { revalidate: 0 } 
        : { 
            revalidate: options?.revalidate ?? 0,
            tags: options?.tags,
          },
    }).catch((error) => {
      console.error(`[Network Error] POST ${path}:`, error)
      throw new NetworkError()
    })

    return handleResponse<T>(response, path)
  },

  async patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (options?.token) {
      headers['Authorization'] = `Bearer ${options.token}`
    }

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    }).catch((error) => {
      console.error(`[Network Error] PATCH ${path}:`, error)
      throw new NetworkError()
    })

    return handleResponse<T>(response, path)
  },
}
