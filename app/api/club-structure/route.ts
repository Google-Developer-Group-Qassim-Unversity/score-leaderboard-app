import { NextResponse } from "next/server"
import { fetchPublicClubStructure } from "@/lib/api/api"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    return NextResponse.json(await fetchPublicClubStructure(), {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("Failed to refresh club structure", error)
    return NextResponse.json({ error: "Club structure unavailable" }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    })
  }
}
