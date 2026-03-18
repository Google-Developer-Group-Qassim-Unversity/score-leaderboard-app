import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiSubmissionResponse, SubmissionType } from '@/lib/api/types'

export function useEventSignup() {
  const api = useApi()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ formId, submissionType }: { formId: number; submissionType: SubmissionType }) =>
      api.post<ApiSubmissionResponse>(`/submissions/${formId}?submission_type=${submissionType}`),
    onSuccess: (_, { formId }) => {
      queryClient.invalidateQueries({ queryKey: ['submission', formId] })
    },
  })
}
