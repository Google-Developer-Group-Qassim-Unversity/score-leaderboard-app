import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { useApi } from '../use-api'
import type { CurrentMember } from '@/lib/api/types'

export function useCurrentMember() {
  const { isSignedIn } = useAuth()
  const api = useApi()
  
  return useQuery({
    queryKey: ['currentMember'],
    queryFn: () => api.get<CurrentMember>('/members/me'),
    staleTime: 0,
    enabled: !!isSignedIn,
  })
}
