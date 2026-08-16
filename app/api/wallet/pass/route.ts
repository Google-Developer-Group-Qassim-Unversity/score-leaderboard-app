import { NextRequest, NextResponse } from "next/server"
import { generateSignedPkpassBuffer } from "@/lib/apple-pass-signer"
import { WalletCardData } from "@/lib/wallet-themes"

export async function POST(req: NextRequest) {
  try {
    const cardData = (await req.json()) as WalletCardData

    if (!cardData || !cardData.fullName) {
      return NextResponse.json({ error: "Invalid card data" }, { status: 400 })
    }

    const pkpassBuffer = await generateSignedPkpassBuffer(cardData)

    return new NextResponse(pkpassBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="GDG-${encodeURIComponent(cardData.fullName.trim())}.pkpass"`,
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error: any) {
    console.error("Error signing Apple Wallet pass:", error)
    return NextResponse.json(
      { error: "Failed to generate signed pass", details: error?.message },
      { status: 500 }
    )
  }
}
