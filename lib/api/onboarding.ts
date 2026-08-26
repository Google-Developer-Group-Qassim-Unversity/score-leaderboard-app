'use server'

import { serverApi } from './server'
import { ApiError } from './errors'

export interface CreateMemberResponse {
  member: {
    id: number
    name: string
    email: string
    phone_number: string
    uni_id: number | null
    gender: "Male" | "Female"
    uni_level: number
    uni_college: string
  }
  already_exists: boolean
}

export interface MemberPointsResponse {
  member: {
    member_id: number
    member_name: string
    total_points: number | null
  }
}

export type CreateMemberResult =
  | { ok: true; data: CreateMemberResponse }
  | { ok: false; status: number | null }

// Creates the backend member row for a freshly-onboarded user. If an
// admin-created record already exists for their (Clerk-verified) email, the
// backend auto-links it instead of creating a duplicate (already_exists).
export async function createMember(): Promise<CreateMemberResult> {
  try {
    const data = await serverApi.post<CreateMemberResponse>('/members')
    return { ok: true, data }
  } catch (err) {
    if (err instanceof ApiError) {
      console.warn(`[createMember] Failed to create member ${err.status}: ${err.message}`)
      return { ok: false, status: err.status }
    }
    console.error('[createMember] Failed to create member:', err)
    return { ok: false, status: null }
  }
}

export async function getMemberPoints(memberId: number): Promise<MemberPointsResponse | null> {
  try {
    return await serverApi.get<MemberPointsResponse>(`/points/members/${memberId}`, { revalidate: false })
  } catch (err) {
    console.warn(`[getMemberPoints] Failed to fetch member points:`, err)
    return null
  }
}
