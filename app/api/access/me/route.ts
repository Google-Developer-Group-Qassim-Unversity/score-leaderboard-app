import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { config } from "@/lib/config"

/**
 * Whether the signed-in person is GDG staff - on this semester's roster, or a
 * super admin - as the admin backend's GET /access/me says. Only that answer
 * leaves the server. Anyone else, or any failure, is "not staff".
 */
export async function GET() {
  const { userId, getToken } = await auth()
  if (!userId) return NextResponse.json({ is_staff: false })

  try {
    const token = await getToken()
    const res = await fetch(`${config.backendApiUrl}/access/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (!res.ok) return NextResponse.json({ is_staff: false })
    const data = (await res.json()) as { is_staff?: boolean }
    return NextResponse.json({ is_staff: data.is_staff === true })
  } catch (error) {
    console.error("Error fetching access/me:", error)
    return NextResponse.json({ is_staff: false })
  }
}
