import { NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    const backendUrl = config.backendApiUrl || "http://localhost:7001"
    const body = await req.json().catch(() => null)

    const backendRes = await fetch(`${backendUrl}/wallet/apple-pass`, {
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
      console.error("Backend /wallet/apple-pass error:", errorData)
      return NextResponse.json(
        { error: "Backend failed to generate signed pass", details: errorData },
        { status: backendRes.status }
      )
    }

    const pkpassBuffer = await backendRes.arrayBuffer()

    return new NextResponse(Buffer.from(pkpassBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="GDG-Pass.pkpass"`,
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error: any) {
    console.error("Error communicating with Backend Wallet API:", error)
    return NextResponse.json(
      { error: "Backend Wallet API is unreachable", details: error?.message },
      { status: 502 }
    )
  }
}
