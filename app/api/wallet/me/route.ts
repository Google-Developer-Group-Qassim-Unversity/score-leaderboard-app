import { NextResponse } from "next/server"

function getBackendUrl(): string {
  return process.env.API_BACKEND_URL || process.env.NEXT_PUBLIC_API_BACKEND_URL || "http://localhost:7001"
}

export async function GET(req: Request) {
  try {
    const backendUrl = getBackendUrl()
    const authHeader = req.headers.get("authorization")

    const res = await fetch(`${backendUrl}/wallet/me`, {
      method: "GET",
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    console.error("Error fetching wallet/me:", error)
    return NextResponse.json(
      { error: "Failed to fetch member wallet profile", detail: error?.message },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const backendUrl = getBackendUrl()
    const authHeader = req.headers.get("authorization")
    const body = await req.json()

    const res = await fetch(`${backendUrl}/wallet/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    console.error("Error updating wallet/me:", error)
    return NextResponse.json(
      { error: "Failed to update member wallet profile", detail: error?.message },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  return PUT(req)
}
