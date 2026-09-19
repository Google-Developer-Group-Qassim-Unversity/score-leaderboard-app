import { useQuery } from '@tanstack/react-query'
import { membersQuery, memberQuery } from '@/lib/queries'

export function useMembers(semester?: number) {
  return useQuery(membersQuery(semester))
}

export function useMember(id: string, semester?: number) {
  return useQuery({ ...memberQuery(id, semester), enabled: !!id })
}
