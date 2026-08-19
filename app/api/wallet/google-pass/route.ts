import { NextRequest, NextResponse } from "next/server"
import { WalletCardData } from "@/lib/wallet-themes"

export async function POST(req: NextRequest) {
  try {
    const cardData: WalletCardData = await req.json()

    if (!cardData.fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      "http://localhost:7001"

    const backendRes = await fetch(`${backendUrl}/wallet/google-pass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
      cache: "no-store",
    })

    if (!backendRes.ok) {
      const errorData = await backendRes.text()
      return NextResponse.json(
        { error: "Backend failed to generate Google Wallet link", details: errorData },
        { status: backendRes.status }
      )
    }

    const data = await backendRes.json()
    return NextResponse.json({ saveUrl: data.saveUrl })
  } catch (error: any) {
    console.error("Error communicating with Backend Google Wallet API:", error)
    return NextResponse.json(
      { error: "Backend Google Wallet API is unreachable", details: error?.message },
      { status: 502 }
    )
  }
}
