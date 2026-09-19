'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { getQueryClient } from '@/lib/query-client'

export function QueryProvider({ children }: { children: ReactNode }) {
  // Not useState: getQueryClient already returns a fresh client per request on
  // the server and a single shared one in the browser.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
