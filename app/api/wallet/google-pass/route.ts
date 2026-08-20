import { NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    const backendUrl = config.backendApiUrl || "http://localhost:7001"
    const body = await req.json().catch(() => null)

    const backendRes = await fetch(`${backendUrl}/wallet/google-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    })

    if (!backendRes.ok) {
      const errorData = await backendRes.text()
      console.error("Backend /wallet/google-pass error:", errorData)
      return NextResponse.json(
        { error: "Backend failed to generate signed Google Wallet pass", details: errorData },
        { status: backendRes.status }
      )
    }

    const data = await backendRes.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error communicating with Backend Wallet API:", error)
    return NextResponse.json(
      { error: "Backend Wallet API is unreachable", details: error?.message },
      { status: 502 }
    )
  }
}
