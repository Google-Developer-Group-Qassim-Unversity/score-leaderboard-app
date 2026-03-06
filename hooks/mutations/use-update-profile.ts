import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { CurrentMember, UpdateMemberData } from '@/lib/api/types'

export function useUpdateProfile() {
  const api = useApi()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: UpdateMemberData) =>
      api.patch<CurrentMember>('/members/me', data),
    onSuccess: (updatedMember) => {
      queryClient.setQueryData(['currentMember'], updatedMember)
    },
  })
}
