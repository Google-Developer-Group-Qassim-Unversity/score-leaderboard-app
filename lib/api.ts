// API utility functions for fetching data from the backend

import type {
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
} from "./api-types"

// Re-export all types for backward compatibility
export type {
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
}

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST || "http://178.128.205.239:8000";

// Define common options for GET requests
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  next: { revalidate: 86400 },
};

export async function fetchMembers(): Promise<ApiMembersResponse> {
  try {
    console.log("🔍 Fetching members from API...")
    const response = await fetch(`${API_BASE_URL}/members`, options)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiMembersResponse = await response.json()
    const totalMembers = data.length || 0
    console.log(`✅ Successfully fetched ${totalMembers} members`)
    return data

  } catch (error) {
    console.error("❌ Failed to fetch members:", error)
    return []
  }
}

export async function fetchDepartments(): Promise<ApiDepartmentsResponse> {
  try {
    console.log("🔍 Fetching departments from API...")
    const response = await fetch(`${API_BASE_URL}/departments`, options)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiDepartmentsResponse = await response.json()
    
    data.Administrative = data.Administrative?.filter(m => m.name !== "Development")
    const totalDepts = (data.Administrative?.length || 0) + (data.Specialized?.length || 0)
    console.log(`✅ Successfully fetched ${totalDepts} departments (${data.Administrative?.length || 0} administrative, ${data.Specialized?.length || 0} specialized)`)
    return data

  } catch (error) {
    console.error("❌ Failed to fetch departments:", error)
    return { Administrative: [], Specialized: [] }
  }
}

export async function fetchMemberById(id: string): Promise<ApiMemberDetail | null> {
  try {
    console.log(`🔍 Fetching member ${id} from API...`)
    const response = await fetch(`${API_BASE_URL}/members/${id}`, options)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️  Member ${id} not found`)
        return null
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiMemberDetail = await response.json()
    console.log(`✅ Successfully fetched member ${id} (${data.events?.length || 0} events)`)
    return data
  } catch (error) {
    console.error(`❌ Failed to fetch member ${id}:`, error)
    return null
  }
}

export async function fetchDepartmentById(id: string): Promise<ApiDepartmentDetail | null> {
  try {
    console.log(`🔍 Fetching department ${id} from API...`)
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, options)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️  Department ${id} not found`)
        return null
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ApiDepartmentDetail = await response.json()
    console.log(`✅ Successfully fetched department ${id} (${data.events?.length || 0} events)`)
    return data
  } catch (error) {
    console.error(`❌ Failed to fetch department ${id}:`, error)
    return null
  }
}

export async function fetchEvents(): Promise<ApiEventsResponse> {
  try {
    console.log("🔍 Fetching events from API...")
    const response = await fetch(`${API_BASE_URL}/events`, options)

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

export async function fetchOpenEvents(): Promise<ApiOpenEventsResponse> {
  try {
    console.log("🔍 Fetching open events from API...")
    const response = await fetch(`${API_BASE_URL}/events/open`, options)

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

export async function checkSubmissionStatus(formId: number, token: string): Promise<boolean> {
  try {
    console.log(`🔍 Checking submission status for form ${formId}...`)
    const response = await fetch(`${API_BASE_URL}/submissions/${formId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: { submitted: boolean } = await response.json()
    console.log(`✅ Submission status for form ${formId}: ${data.submitted}`)
    return data.submitted

  } catch (error) {
    console.error(`❌ Failed to check submission status for form ${formId}:`, error)
    return false
  }
}

