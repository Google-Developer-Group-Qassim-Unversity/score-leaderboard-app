import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { useApi } from '../use-api'
import type { ApiSubmissionResponse } from '@/lib/api/types'

export function useSubmissionStatus(formId: number | null) {
  const { isSignedIn } = useAuth()
  const api = useApi()
  
  return useQuery({
    queryKey: ['submission', formId],
    queryFn: () => api.get<ApiSubmissionResponse>(`/submissions/${formId}`),
    staleTime: 0,
    enabled: !!isSignedIn && !!formId,
  })
}
