/**
 * API Functions - Resource-specific fetchers
 * 
 * These functions wrap the server API client with typed responses.
 * Use these in Server Components, Server Actions, and Route Handlers.
 * 
 * For client components, use hooks from hooks/queries/* instead.
 */

import { serverApi } from './server'
import type {
  ApiMembersPointsResponse,
  ApiMemberPointsHistory,
  ApiDepartmentsPointsResponse,
  ApiDepartmentPointsHistory,
  ApiEventsResponse,
  ApiOpenEventsResponse,
  ApiSubmissionResponse,
  AttendanceResponse,
  CurrentMember,
  UpdateMemberData,
  SubmissionType,
} from './types'

// ============================================================
// MEMBERS
// ============================================================

export function fetchMembers(semester?: number): Promise<ApiMembersPointsResponse> {
  const params = new URLSearchParams()
  if (semester != null) params.set('semester', String(semester))
  const qs = params.toString()
  return serverApi.get<ApiMembersPointsResponse>(`/points/members/total${qs ? `?${qs}` : ''}`)
}

export function fetchMemberById(id: string, semester?: number): Promise<ApiMemberPointsHistory> {
  const params = new URLSearchParams()
  if (semester != null) params.set('semester', String(semester))
  const qs = params.toString()
  return serverApi.get<ApiMemberPointsHistory>(`/points/members/${id}${qs ? `?${qs}` : ''}`)
}

export function fetchCurrentMember(): Promise<CurrentMember> {
  return serverApi.get<CurrentMember>('/members/me', { revalidate: 0 })
}

export function updateCurrentMember(data: UpdateMemberData): Promise<CurrentMember> {
  return serverApi.patch<CurrentMember>('/members/me', data)
}

// ============================================================
// DEPARTMENTS
// ============================================================

export function fetchDepartments(semester?: number): Promise<ApiDepartmentsPointsResponse> {
  const params = new URLSearchParams()
  if (semester != null) params.set('semester', String(semester))
  const qs = params.toString()
  return serverApi.get<ApiDepartmentsPointsResponse>(`/points/departments/total${qs ? `?${qs}` : ''}`)
}

export function fetchDepartmentById(id: string, semester?: number): Promise<ApiDepartmentPointsHistory> {
  const params = new URLSearchParams()
  if (semester != null) params.set('semester', String(semester))
  const qs = params.toString()
  return serverApi.get<ApiDepartmentPointsHistory>(`/points/departments/${id}${qs ? `?${qs}` : ''}`)
}

// ============================================================
// EVENTS
// ============================================================

export function fetchEvents(semester?: number | null): Promise<ApiEventsResponse> {
  const params = new URLSearchParams()
  if (semester != null) params.set('semester', String(semester))
  const qs = params.toString()
  return serverApi.get<ApiEventsResponse>(`/events${qs ? `?${qs}` : ''}`)
}

export function fetchOpenEvents(): Promise<ApiOpenEventsResponse> {
  return serverApi.get<ApiOpenEventsResponse>('/events/open')
}

// ============================================================
// ATTENDANCE
// ============================================================

export function markAttendance(eventId: number, attendanceToken: string): Promise<AttendanceResponse> {
  return serverApi.post<AttendanceResponse>(
    `/attendance/${eventId}?token=${encodeURIComponent(attendanceToken)}`
  )
}

// ============================================================
// SUBMISSIONS
// ============================================================

export function checkSubmissionStatus(formId: number): Promise<ApiSubmissionResponse> {
  return serverApi.get<ApiSubmissionResponse>(`/submissions/${formId}`, { revalidate: 0 })
}

export function submitEventSignup(formId: number, submissionType: SubmissionType): Promise<ApiSubmissionResponse> {
  return serverApi.post<ApiSubmissionResponse>(
    `/submissions/${formId}?submission_type=${submissionType}`
  )
}
