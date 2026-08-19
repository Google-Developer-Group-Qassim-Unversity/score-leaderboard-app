import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")

    const backendUrl =
      process.env.API_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_BACKEND_URL ||
      "http://localhost:7001"

    const backendRes = await fetch(`${backendUrl}/wallet/apple-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      cache: "no-store",
    })

    if (!backendRes.ok) {
      const errorData = await backendRes.text()
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
