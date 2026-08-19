import { NextRequest, NextResponse } from "next/server"
import { generateGoogleWalletSaveUrl } from "@/lib/google-wallet-signer"
import { WalletCardData } from "@/lib/wallet-themes"

export async function POST(req: NextRequest) {
  try {
    const cardData: WalletCardData = await req.json()

    if (!cardData.fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const saveUrl = generateGoogleWalletSaveUrl(cardData)

    return NextResponse.json({ saveUrl })
  } catch (error) {
    console.error("Error generating Google Wallet Save URL:", error)
    return NextResponse.json(
      { error: "Failed to generate Google Wallet Pass" },
      { status: 500 }
    )
  }
}
