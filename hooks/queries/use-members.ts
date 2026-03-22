import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiMembersPointsResponse, ApiMemberPointsHistory } from '@/lib/api/types'

export function useMembers(semester?: number) {
  const api = useApi()

  return useQuery({
    queryKey: ['members', { semester }],
    queryFn: () => {
      const params = new URLSearchParams()
      if (semester != null) params.set('semester', String(semester))
      const qs = params.toString()
      return api.get<ApiMembersPointsResponse>(`/points/members/total${qs ? `?${qs}` : ''}`)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useMember(id: string, semester?: number) {
  const api = useApi()

  return useQuery({
    queryKey: ['members', id, { semester }],
    queryFn: () => {
      const params = new URLSearchParams()
      if (semester != null) params.set('semester', String(semester))
      const qs = params.toString()
      return api.get<ApiMemberPointsHistory>(`/points/members/${id}${qs ? `?${qs}` : ''}`)
    },
    staleTime: 60 * 1000,
    enabled: !!id,
  })
}
