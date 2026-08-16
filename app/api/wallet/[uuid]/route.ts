import { NextResponse } from "next/server"
import { WalletCardData } from "@/lib/wallet-themes"

declare global {
  // eslint-disable-next-line no-var
  var __GDG_WALLET_CARDS__: Map<string, WalletCardData> | undefined
}

export async function GET(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  const { uuid } = params
  const cards = globalThis.__GDG_WALLET_CARDS__

  if (!cards || !cards.has(uuid)) {
    return NextResponse.json(
      { error: "البطاقة غير موجودة أو انتهت صلاحيتها" },
      { status: 404 }
    )
  }

  const card = cards.get(uuid)
  return NextResponse.json({
    success: true,
    card,
    profileUrl: `/wallet/${uuid}`,
  })
}

export async function PUT(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = params
    const updatedData = (await req.json()) as WalletCardData
    const cards = globalThis.__GDG_WALLET_CARDS__

    if (!cards || !cards.has(uuid)) {
      return NextResponse.json(
        { error: "البطاقة غير موجودة" },
        { status: 404 }
      )
    }

    const existingCard = cards.get(uuid)!
    const mergedCard: WalletCardData = {
      ...existingCard,
      ...updatedData,
      uuid,
      updatedAt: new Date().toISOString(),
    }

    cards.set(uuid, mergedCard)

    return NextResponse.json({
      success: true,
      card: mergedCard,
    })
  } catch (error) {
    console.error("Error updating wallet card:", error)
    return NextResponse.json({ error: "فشل تحديث البطاقة" }, { status: 500 })
  }
}
