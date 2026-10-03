import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../use-api'

export function useCancelSignup() {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formId: number) => api.delete(`/submissions/${formId}`),
    onSuccess: (_, formId) => {
      queryClient.invalidateQueries({ queryKey: ['submission', formId] })
      queryClient.invalidateQueries({ queryKey: ['myEvents'] })
    },
  })
}
