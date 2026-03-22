import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiDepartmentsPointsResponse, ApiDepartmentPointsHistory } from '@/lib/api/types'

export function useDepartments(semester?: number) {
  const api = useApi()

  return useQuery({
    queryKey: ['departments', { semester }],
    queryFn: () => {
      const params = new URLSearchParams()
      if (semester != null) params.set('semester', String(semester))
      const qs = params.toString()
      return api.get<ApiDepartmentsPointsResponse>(`/points/departments/total${qs ? `?${qs}` : ''}`)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useDepartment(id: string, semester?: number) {
  const api = useApi()

  return useQuery({
    queryKey: ['departments', id, { semester }],
    queryFn: () => {
      const params = new URLSearchParams()
      if (semester != null) params.set('semester', String(semester))
      const qs = params.toString()
      return api.get<ApiDepartmentPointsHistory>(`/points/departments/${id}${qs ? `?${qs}` : ''}`)
    },
    staleTime: 60 * 1000,
    enabled: !!id,
  })
}
