// All Type Definitions - Single source of truth
// Edit this file when the API structure changes

// ===== API Response Types (from backend) =====

// Member Points Model
export interface ApiMemberPoints {
  member_id: number
  member_name: string
  total_points: number | null
  uni_id: string
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

export type EventStatus = "draft" | "open" | "active" | "closed"

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
  created_at: string | null
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

// Type for the submission_type query parameter sent to the API
export type SubmissionType = 'none' | 'partial'

export interface ApiSubmissionResponse {
  submission_status: SubmissionStatus
  submission_timestamp?: string
}

// ===== Attendance Types =====

export interface AttendanceResponse {
  success: boolean
  status: number
  message?: string
}

// ===== Current Member Types =====

export interface CurrentMember {
  id: number
  name: string
  email: string
  phone_number: string | null
  uni_id: string
  gender: 'Male' | 'Female'
  uni_level: number
  uni_college: string
  created_at: string | null
  updated_at: string | null
  is_authenticated: boolean | null
}

export interface UpdateMemberData {
  name?: string
  email?: string
  phone_number?: string
  gender?: 'Male' | 'Female'
  uni_level?: number
  uni_college?: string
}

export interface AttendanceDate {
  date: string
  attended: boolean
}

export interface ApiMyEventItem extends ApiEventItem {
  is_official: number
  attendance_dates: AttendanceDate[]
}

export interface ApiMyEventsResponse {
  attended: ApiMyEventItem[]
  participated: ApiMyEventItem[]
}
