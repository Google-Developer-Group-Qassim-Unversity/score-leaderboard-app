// All Type Definitions - Single source of truth
// Edit this file when the API structure changes

// ===== API Response Types (from backend) =====

export interface ApiMember {
  id: number
  name: string
  points: number
  gender: string
}

export interface ApiMembersResponse {
  Male: ApiMember[]
  Female: ApiMember[]
}

export interface ApiDepartment {
  id: number
  name: string
  points: number
}

export interface ApiDepartmentsResponse {
  Specialized: ApiDepartment[]
  Administrative: ApiDepartment[]
}

export interface ApiEvent {
  event_name: string
  start_date: string
  end_date: string
  action_name: string
  original_points: number
  event_days: number
  absences?: number // Only for members
  attended_days?: number // Only for members
  points: number
}

export interface ApiMemberDetail {
  id: number
  name: string
  points: number
  events: ApiEvent[]
}

export interface ApiDepartmentDetail {
  id: number
  name: string
  points: number
  events: ApiEvent[]
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
  source: "attended on-site course" | "on-site course"
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
