import { NextRequest, NextResponse } from "next/server"
import { WalletCardData } from "@/lib/wallet-themes"

export async function POST(req: NextRequest) {
  try {
    const cardData = (await req.json()) as WalletCardData

    if (!cardData || !cardData.fullName) {
      return NextResponse.json({ error: "Invalid card data" }, { status: 400 })
    }

    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      "http://localhost:7001"

    const backendRes = await fetch(`${backendUrl}/wallet/apple-pass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
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
        "Content-Disposition": `attachment; filename="GDG-${encodeURIComponent(cardData.fullName.trim())}.pkpass"`,
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
