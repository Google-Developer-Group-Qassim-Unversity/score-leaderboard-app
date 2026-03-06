import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { AttendanceResponse } from '@/lib/api/types'

export function useMarkAttendance() {
  const api = useApi()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ eventId, attendanceToken }: { eventId: number; attendanceToken: string }) =>
      api.post<AttendanceResponse>(`/attendance/${eventId}?token=${encodeURIComponent(attendanceToken)}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
