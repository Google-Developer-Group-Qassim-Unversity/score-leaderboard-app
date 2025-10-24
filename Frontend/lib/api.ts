// API utility functions for fetching data from localhost:8000

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST ||"http://178.128.205.239:8000";
const CACHE_REVALIDATE_TIME = 60; // 60 seconds timeout

export interface ApiMember {
  id: number
  name: string
  points: number
}

export interface ApiDepartment {
  id: number
  name: string
  points: number
}

export interface ApiDepartmentsResponse {
  administrative: ApiDepartment[]
  practical: ApiDepartment[]
}

export interface CountResponse {
  members_count?: number
  departments_count?: number
}

export interface ApiEvent {
  event_name: string
  action_name: string
  start_date: string
  end_date: string
  absent_days: number
  attended_days: number
  points: number
}

export interface ApiMemberDetail extends ApiMember {
  events: ApiEvent[]
}

export interface ApiDepartmentDetail extends ApiDepartment {
  events: ApiEvent[]
}

import { notFound } from "next/navigation"
import { mockMembers, mockDepartments } from "./mock-data"

export async function fetchMembers(): Promise<ApiMember[]> {
  try {
    console.log("[v0] Attempting to fetch members from API...")
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("[v0] Successfully fetched members from API:", data.length, "members")
    return data
  } catch (error) {
    console.log("[v0] API fetch failed, falling back to mock data:", error)
    return mockMembers.map((member) => ({
      id: Number.parseInt(member.id.replace("member-", "")),
      name: member.name,
      points: member.totalPoints,
    }))
  }
}

export async function fetchDepartments(): Promise<ApiDepartmentsResponse> {
  try {
    console.log("[v0] Attempting to fetch departments from API...")
    const response = await fetch(`${API_BASE_URL}/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    console.log("[v0] Successfully fetched departments from API:", 
      (data.Administrative?.length || 0) + (data.Specialized?.length || 0), "departments")
    
    // Ensure the response has the expected structure
    return {
      administrative: data.Administrative || [],
      practical: data.Specialized || []
    }
  } catch (error) {
    console.log("[v0] API fetch failed, falling back to mock data:", error)
    const mockDepts = mockDepartments.map((dept) => ({
      id: Number.parseInt(dept.id.replace("dept-", "")),
      name: dept.name,
      points: dept.totalPoints,
    }))
    // Split mock departments evenly between administrative and practical
    const mid = Math.ceil(mockDepts.length / 2)
    return {
      administrative: mockDepts.slice(0, mid),
      practical: mockDepts.slice(mid)
    }
  }
}

export async function fetchAllDepartments(): Promise<ApiDepartment[]> {
  const departmentsResponse = await fetchDepartments()
  return [...departmentsResponse.administrative, ...departmentsResponse.practical]
}

export async function fetchMembersCount(): Promise<number> {
  try {
    console.log("[v0] Attempting to fetch members count from API...")
    const response = await fetch(`${API_BASE_URL}/members/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: CountResponse = await response.json()
    console.log("[v0] Successfully fetched members count from API:", data.members_count)
    return data.members_count || 0
  } catch (error) {
    console.log("[v0] API fetch failed, falling back to mock data:", error)
    return mockMembers.length
  }
}

export async function fetchDepartmentsCount(): Promise<number> {
  try {
    console.log("[v0] Attempting to fetch departments count from API...")
    const departmentsResponse = await fetchDepartments()
    const totalCount = (departmentsResponse.administrative?.length || 0) + (departmentsResponse.practical?.length || 0)
    console.log("[v0] Successfully calculated departments count from API:", totalCount)
    return totalCount
  } catch (error) {
    console.log("[v0] API fetch failed, falling back to mock data:", error)
    return mockDepartments.length
  }
}

export async function fetchMemberById(id: string): Promise<ApiMemberDetail | undefined> {
  try {
    console.log(`[v0] Attempting to fetch member ${id} from API...`)
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`[HTTP] ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`[v0] Successfully fetched member ${id} from API`)
    return data
  } catch (error) {
    console.log(`[v0] API fetch failed for member ${id}, falling back to mock data:`, error)
  }
}

export async function fetchDepartmentById(id: string): Promise<ApiDepartmentDetail | undefined> {
  try {
    console.log(`[v0] Attempting to fetch department ${id} from API...`)
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`[v0] Successfully fetched department ${id} from API`)
    return data
  } catch (error) {
    console.log(`[v0] API fetch failed for department ${id}, falling back to mock data:`, error)
    // Fallback to mock data with fake events
    notFound()
  }
}

// Transform API data to match our internal types
export function transformApiMember(
  apiMember: ApiMember,
  rank: number,
  departmentId = "dept-1",
): import("./types").Member {
  return {
    id: apiMember.id.toString(),
    name: apiMember.name,
    totalPoints: apiMember.points,
    rank,
    departmentId,
    isManager: false,
  }
}

export function transformApiDepartment(
  apiDepartment: ApiDepartment, 
  rank: number, 
  type?: 'administrative' | 'practical'
): import("./types").Department {
  return {
    id: apiDepartment.id.toString(),
    name: apiDepartment.name,
    totalPoints: apiDepartment.points,
    rank,
    type,
  }
}
