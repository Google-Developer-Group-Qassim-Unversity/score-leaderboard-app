import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiMembersPointsResponse, ApiMemberPointsHistory } from '@/lib/api/types'

export function useMembers() {
  const api = useApi()
  
  return useQuery({
    queryKey: ['members'],
    queryFn: () => api.get<ApiMembersPointsResponse>('/points/members/total'),
    staleTime: 5 * 60 * 1000,
  })
}

export function useMember(id: string) {
  const api = useApi()
  
  return useQuery({
    queryKey: ['members', id],
    queryFn: () => api.get<ApiMemberPointsHistory>(`/points/members/${id}`),
    staleTime: 60 * 1000,
    enabled: !!id,
  })
}
