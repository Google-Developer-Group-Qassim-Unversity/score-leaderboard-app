import { useQuery } from '@tanstack/react-query'
import { useApi } from '../use-api'
import type { ApiDepartmentsPointsResponse, ApiDepartmentPointsHistory } from '@/lib/api/types'

export function useDepartments() {
  const api = useApi()
  
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => api.get<ApiDepartmentsPointsResponse>('/points/departments/total'),
    staleTime: 5 * 60 * 1000,
  })
}

export function useDepartment(id: string) {
  const api = useApi()
  
  return useQuery({
    queryKey: ['departments', id],
    queryFn: () => api.get<ApiDepartmentPointsHistory>(`/points/departments/${id}`),
    staleTime: 60 * 1000,
    enabled: !!id,
  })
}
