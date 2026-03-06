import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiEventsResponse, ApiOpenEventsResponse } from '@/lib/api/types'

export function useEvents() {
  const api = useApi()
  
  return useQuery({
    queryKey: ['events'],
    queryFn: () => api.get<ApiEventsResponse>('/events'),
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
