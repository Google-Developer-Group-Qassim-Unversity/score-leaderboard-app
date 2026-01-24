// All Type Definitions - Single source of truth
// Edit this file when the API structure changes

// ===== API Response Types (from backend) =====

// Member Points Model
export interface ApiMemberPoints {
  member_id: number
  member_name: string
  total_points: number | null
}

export type ApiMembersPointsResponse = ApiMemberPoints[]

// Department Points Model
export interface ApiDepartmentPoints {
  department_id: number
  department_name: string
  ar_department_name: string
  department_type: string
  total_points: number
}

export interface ApiDepartmentsPointsResponse {
  administrative: ApiDepartmentPoints[]
  practical: ApiDepartmentPoints[]
}

// Event Model (for points history)
export interface ApiPointsEvent {
  event_name: string
  event_id: number
  start_datetime: string
  end_datetime: string
  points: number
  action_name: string
  ar_action_name: string | null
}

// Member Event History Response
export interface ApiMemberPointsHistory {
  member: ApiMemberPoints
  events: ApiPointsEvent[]
}

// Department Event History Response
export interface ApiDepartmentPointsHistory {
  department: ApiDepartmentPoints
  events: ApiPointsEvent[]
}

// ===== Internal App Types (transformed from API) =====

export interface Member {
  id: string
  name: string
  totalPoints: number
  rank: number
  departmentId: string
  isManager: boolean
}

export interface Department {
  id: string
  name: string
  totalPoints: number
  rank: number
  type?: 'administrative' | 'practical'
}

export interface PointsHistoryEntry {
  id: string
  date: string
  source: string
  points: number
  entityId: string // member or department ID
  entityType: "member" | "department"
}

export interface LeaderboardSummary {
  topMembers: Member[]
  topDepartments: Department[]
  totalMembers: number
  totalDepartments: number
}

// ===== Backward Compatibility Aliases =====
// These map the new API types to the old names used in the codebase

export type ApiMember = ApiMemberPoints
export type ApiMembersResponse = ApiMembersPointsResponse
export type ApiDepartment = ApiDepartmentPoints
export type ApiDepartmentsResponse = ApiDepartmentsPointsResponse
export type ApiEvent = ApiPointsEvent
export type ApiMemberDetail = ApiMemberPointsHistory
export type ApiDepartmentDetail = ApiDepartmentPointsHistory

// ===== Events Types =====

export type EventStatus = "draft" | "open" | "active" |"closed"

export interface ApiEventItem {
  id: number
  name: string
  description: string | null
  location_type: "online" | "on-site" | "none"
  location: string
  start_datetime: string
  end_datetime: string
  status: EventStatus
  image_url: string | null
}

export interface ApiOpenEventItem extends ApiEventItem {
  form_type: 'none' | 'registration' | 'google'
  form_id: number
  google_responders_url: string | null
}

export type ApiEventsResponse = ApiEventItem[]
export type ApiOpenEventsResponse = ApiOpenEventItem[]

// ===== Submission Types =====

export type SubmissionStatus = false | true | 'partial'

export interface ApiSubmissionResponse {
  submission_status: SubmissionStatus
  submission_timestamp?: string
}
