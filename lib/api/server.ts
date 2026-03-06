/**
 * Server-side API wrapper with auto-authentication via Clerk.
 * Automatically injects auth token from the current session.
 * Use this in Server Components, Server Actions, and Route Handlers.
 * 
 * DO NOT import in client components - use hooks/use-api.ts instead.
 */

import { auth } from '@clerk/nextjs/server'
import { api, RequestOptions } from './shared'

async function getAuthToken(): Promise<string | undefined> {
  const session = await auth()
  const token = await session?.getToken()
  return token ?? undefined
}

export const serverApi = {
  async get<T>(path: string, options?: Omit<RequestOptions, 'token'>): Promise<T> {
    const token = await getAuthToken()
    return api.get<T>(path, { ...options, token })
  },

  async post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'token'>): Promise<T> {
    const token = await getAuthToken()
    return api.post<T>(path, body, { ...options, token })
  },

  async patch<T>(path: string, body: unknown, options?: Omit<RequestOptions, 'token'>): Promise<T> {
    const token = await getAuthToken()
    return api.patch<T>(path, body, { ...options, token })
  },
}
