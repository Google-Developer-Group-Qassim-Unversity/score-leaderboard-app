import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiEventsResponse, ApiOpenEventsResponse } from '@/lib/api/types'

export function useEvents(semester?: number | null) {
  const api = useApi()

  return useQuery({
    queryKey: ['events', { semester }],
    queryFn: () => {
      const params = new URLSearchParams()
      if (semester != null) params.set('semester', String(semester))
      const qs = params.toString()
      return api.get<ApiEventsResponse>(`/events${qs ? `?${qs}` : ''}`)
    },
    staleTime: 30 * 1000,
  })
}

export function useOpenEvents() {
  const api = useApi()
  
  return useQuery({
    queryKey: ['events', 'open'],
    queryFn: () => api.get<ApiOpenEventsResponse>('/events/open'),
    staleTime: 30 * 1000,
  })
}
