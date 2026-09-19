import { useQuery } from '@tanstack/react-query'
import { departmentsQuery, departmentQuery } from '@/lib/queries'

export function useDepartments(semester?: number) {
  return useQuery(departmentsQuery(semester))
}

export function useDepartment(id: string, semester?: number) {
  return useQuery({ ...departmentQuery(id, semester), enabled: !!id })
}
