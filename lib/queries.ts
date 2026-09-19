/**
 * Shared query definitions for public data.
 *
 * Each query is defined exactly once and consumed from both sides: a Server
 * Component prefetches it, a Client Component reads it with the same object.
 * That's what guarantees the query keys match — if they drift, hydration
 * silently misses and the client refetches behind a loading state.
 *
 * These import only from lib/api/shared (no Clerk, no next/headers), so the
 * module is safe in a client bundle. Public endpoints need no auth token.
 */

import { queryOptions } from '@tanstack/react-query'
import { api } from '@/lib/api/shared'
import { filterDepartmentPoints } from '@/lib/department-points'
import type {
  ApiMembersPointsResponse,
  ApiMemberPointsHistory,
  ApiDepartmentsPointsResponse,
  ApiDepartmentPointsHistory,
  ApiEventsResponse,
  ApiOpenEventsResponse,
  ApiSemestersResponse,
} from '@/lib/api/types'

function withSemester(path: string, semester?: number | null) {
  const params = new URLSearchParams()
  if (semester != null) params.set('semester', String(semester))
  const qs = params.toString()
  return `${path}${qs ? `?${qs}` : ''}`
}

export const membersQuery = (semester?: number) =>
  queryOptions({
    queryKey: ['members', { semester: semester ?? null }] as const,
    queryFn: () =>
      api.get<ApiMembersPointsResponse>(withSemester('/points/members/total', semester), {
        tags: ['members'],
      }),
  })

export const memberQuery = (id: string, semester?: number) =>
  queryOptions({
    queryKey: ['members', id, { semester: semester ?? null }] as const,
    queryFn: () =>
      api.get<ApiMemberPointsHistory>(withSemester(`/points/members/${id}`, semester), {
        tags: ['members', `member-${id}`],
      }),
  })

export const departmentsQuery = (semester?: number) =>
  queryOptions({
    queryKey: ['departments', { semester: semester ?? null }] as const,
    queryFn: () =>
      api
        .get<ApiDepartmentsPointsResponse>(
          withSemester('/points/departments/total', semester),
          { tags: ['departments'] }
        )
        .then(filterDepartmentPoints),
  })

export const departmentQuery = (id: string, semester?: number) =>
  queryOptions({
    queryKey: ['departments', id, { semester: semester ?? null }] as const,
    queryFn: () =>
      api.get<ApiDepartmentPointsHistory>(
        withSemester(`/points/departments/${id}`, semester),
        { tags: ['departments', `department-${id}`] }
      ),
  })

export const eventsQuery = (semester?: number | null) =>
  queryOptions({
    queryKey: ['events', { semester: semester ?? null }] as const,
    queryFn: () =>
      api.get<ApiEventsResponse>(withSemester('/events', semester), { tags: ['events'] }),
  })

export const openEventsQuery = () =>
  queryOptions({
    queryKey: ['events', 'open'] as const,
    queryFn: () => api.get<ApiOpenEventsResponse>('/events/open', { tags: ['events'] }),
  })

export const semestersQuery = () =>
  queryOptions({
    queryKey: ['semesters'] as const,
    queryFn: () => api.get<ApiSemestersResponse>('/points/semesters', { tags: ['semesters'] }),
  })
