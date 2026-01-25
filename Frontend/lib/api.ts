// API utility functions for fetching data from the backend

import type {
  ApiMember,
  ApiMembersResponse,
  ApiDepartment,
  ApiDepartmentsResponse,
  ApiEvent,
  ApiMemberDetail,
  ApiDepartmentDetail,
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
  Member,
  Department,
  PointsHistoryEntry,
  LeaderboardSummary,
}

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST;
console.log(`🌎 API_BASE_URL: ${API_BASE_URL}`)

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
    console.log(`🔍 Fetching members from API... ${API_BASE_URL}/members`)
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
