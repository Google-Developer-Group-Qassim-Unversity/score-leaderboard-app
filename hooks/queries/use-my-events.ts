import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import { useAuth } from '@clerk/nextjs'
import type { ApiMyEventsResponse } from '@/lib/api/types'

export function useMyEvents() {
  const api = useApi()
  const { isSignedIn } = useAuth()

  return useQuery({
    queryKey: ['myEvents'],
    queryFn: () => api.get<ApiMyEventsResponse>('/events/me'),
    enabled: !!isSignedIn,
    staleTime: 30 * 1000,
  })
}
