/**
 * Client-side API wrapper with auto-authentication via Clerk.
 * Use this in Client Components.
 * For server-side code, use lib/api/server.ts instead.
 */

import { useAuth } from '@clerk/nextjs'
import { api, RequestOptions } from '@/lib/api/shared'

export function useApi() {
  const { getToken } = useAuth()

  return {
    async get<T>(path: string, options?: Omit<RequestOptions, 'token'>): Promise<T> {
      const token = await getToken() ?? undefined
      return api.get<T>(path, { ...options, token })
    },

    async post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'token'>): Promise<T> {
      const token = await getToken() ?? undefined
      return api.post<T>(path, body, { ...options, token })
    },

    async patch<T>(path: string, body: unknown, options?: Omit<RequestOptions, 'token'>): Promise<T> {
      const token = await getToken() ?? undefined
      return api.patch<T>(path, body, { ...options, token })
    },
  }
}
