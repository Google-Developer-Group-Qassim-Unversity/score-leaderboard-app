// API utility functions for fetching data from the backend

import type {
  ApiMemberPoints,
  ApiMembersPointsResponse,
  ApiDepartmentPoints,
  ApiDepartmentsPointsResponse,
  ApiPointsEvent,
  ApiMemberPointsHistory,
  ApiDepartmentPointsHistory,
  ApiEventItem,
  ApiEventsResponse,
  ApiOpenEventItem,
  ApiOpenEventsResponse,
  Member,
  Department,
  PointsHistoryEntry,
  LeaderboardSummary,
  ApiSubmissionResponse,
  // Backward compatibility aliases
  ApiMember,
  ApiMembersResponse,
  ApiDepartment,
  ApiDepartmentsResponse,
  ApiEvent,
  ApiMemberDetail,
  ApiDepartmentDetail,
} from "./api-types"

// Re-export all types for backward compatibility
export type {
  ApiMemberPoints,
  ApiMembersPointsResponse,
  ApiDepartmentPoints,
  ApiDepartmentsPointsResponse,
  ApiPointsEvent,
  ApiMemberPointsHistory,
  ApiDepartmentPointsHistory,
  ApiMember,
  ApiMembersResponse,
  ApiDepartment,
  ApiDepartmentsResponse,
  ApiEvent,
  ApiMemberDetail,
  ApiDepartmentDetail,
  ApiEventItem,
  ApiEventsResponse,
  ApiOpenEventItem,
  ApiOpenEventsResponse,
  Member,
  Department,
  PointsHistoryEntry,
  LeaderboardSummary,
  ApiSubmissionResponse,
}

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST;

// Define common options for GET requests
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  next: { revalidate: 86400 },
};
// very ugly, very temporary
const noCacheOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  next: { revalidate: 0 },
}

export async function fetchMembers(): Promise<ApiMembersPointsResponse> {
  try {
    console.log("🔍 Fetching members from API...")
    const response = await fetch(`${API_BASE_URL}/points/members/total`, options)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiMembersPointsResponse = await response.json()
    const totalMembers = data.length || 0
    console.log(`✅ Successfully fetched ${totalMembers} members`)
    return data

  } catch (error) {
    console.error("❌ Failed to fetch members:", error)
    return []
  }
}

export async function fetchDepartments(): Promise<ApiDepartmentsPointsResponse> {
  try {
    console.log("🔍 Fetching departments from API...")
    const response = await fetch(`${API_BASE_URL}/points/departments/total`, options)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiDepartmentsPointsResponse = await response.json()
    
    data.administrative = data.administrative?.filter(d => d.department_name !== "Development")
    const totalDepts = (data.administrative?.length || 0) + (data.practical?.length || 0)
    console.log(`✅ Successfully fetched ${totalDepts} departments (${data.administrative?.length || 0} administrative, ${data.practical?.length || 0} practical)`)
    return data

  } catch (error) {
    console.error("❌ Failed to fetch departments:", error)
    return { administrative: [], practical: [] }
  }
}

export async function fetchMemberById(id: string): Promise<ApiMemberPointsHistory | null> {
  try {
    console.log(`🔍 Fetching member ${id} from API...`)
    const response = await fetch(`${API_BASE_URL}/points/members/${id}`, options)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️  Member ${id} not found`)
        return null
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiMemberPointsHistory = await response.json()
    console.log(`✅ Successfully fetched member ${id} (${data.events?.length || 0} events)`)
    return data
  } catch (error) {
    console.error(`❌ Failed to fetch member ${id}:`, error)
    return null
  }
}

export async function fetchDepartmentById(id: string): Promise<ApiDepartmentPointsHistory | null> {
  try {
    console.log(`🔍 Fetching department ${id} from API...`)
    const response = await fetch(`${API_BASE_URL}/points/departments/${id}`, options)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️  Department ${id} not found`)
        return null
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiDepartmentPointsHistory = await response.json()
    console.log(`✅ Successfully fetched department ${id} (${data.events?.length || 0} events)`)
    return data
  } catch (error) {
    console.error(`❌ Failed to fetch department ${id}:`, error)
    return null
  }
}

export async function fetchEvents(cached: boolean = true): Promise<ApiEventsResponse> {
  try {
    console.log("🔍 Fetching events from API...")
    const response = await fetch(`${API_BASE_URL}/events`, cached ? options : noCacheOptions)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiEventsResponse = await response.json()
    
    // Filter out events with location_type "none" as they are not real events
    const filteredData = data.filter(event => event.location_type !== "none")
    
    console.log(`✅ Successfully fetched ${filteredData.length} events (${data.length - filteredData.length} filtered out)`)
    return filteredData

  } catch (error) {
    console.error("❌ Failed to fetch events:", error)
    return []
  }
}

export async function fetchOpenEvents(cached: boolean = true): Promise<ApiOpenEventsResponse> {
  try {
    console.log("🔍 Fetching open events from API...")
    const response = await fetch(`${API_BASE_URL}/events/open`, cached ? options : noCacheOptions)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiOpenEventsResponse = await response.json()
    console.log(`✅ Successfully fetched ${data.length} open events`)
    return data

  } catch (error) {
    console.error("❌ Failed to fetch open events:", error)
    return []
  }
}

export async function checkSubmissionStatus(formId: number, token: string): Promise<ApiSubmissionResponse> {
  try {
    console.log(`🔍 Checking submission status for form ${formId}...`)
    const response = await fetch(`${API_BASE_URL}/submissions/${formId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      next: { revalidate: 0 }, // Always fetch fresh status
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiSubmissionResponse = await response.json()
    console.log(`✅ Submission status for form ${formId}:`, data.submission_status)
    return data

  } catch (error) {
    console.error(`❌ Failed to check submission status for form ${formId}:`, error)
    return { submission_status: false }
  }
}

export interface AttendanceResponse {
  success: boolean
  status: number
  message?: string
}

export async function markAttendance(eventId: number, attendanceToken: string, authToken: string): Promise<AttendanceResponse> {
  try {
    console.log(`🔍 Marking attendance for event ${eventId}...`)
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/attend?token=${encodeURIComponent(attendanceToken)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    })

    if (response.ok) {
      console.log(`✅ Successfully marked attendance for event ${eventId}`)
      return { success: true, status: 200 }
    }

    const errorData = await response.json().catch(() => ({}))
    console.warn(`⚠️ Failed to mark attendance for event ${eventId}: ${response.status}`)
    return {
      success: false,
      status: response.status,
      message: errorData.detail
    }

  } catch (error) {
    console.error(`❌ Failed to mark attendance for event ${eventId}:`, error)
    return { success: false, status: 0, message: "Network error" }
  }
}

