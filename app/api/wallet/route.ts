import { NextResponse } from "next/server"
import { WalletCardData } from "@/lib/wallet-themes"

// Server-side in-memory cards map for demo and local execution
declare global {
  // eslint-disable-next-line no-var
  var __GDG_WALLET_CARDS__: Map<string, WalletCardData> | undefined
}

if (!globalThis.__GDG_WALLET_CARDS__) {
  globalThis.__GDG_WALLET_CARDS__ = new Map<string, WalletCardData>()

  // Seed demo card
  globalThis.__GDG_WALLET_CARDS__.set("demo-uuid-gdg", {
    uuid: "demo-uuid-gdg",
    fullName: "عبدالله السعدون",
    email: "a.alsaadoun@gdg-q.com",
    countryCode: "+966",
    phone: "551234567",
    role: "مطور ويب وذكاء اصطناعي",
    bio: "مهتم بالحوسبة السحابية وتطوير الويب | عضو GDG Qassim 🚀",
    themeId: "men-blue",
    socialLinks: [
      { id: "1", platform: "linkedin", url: "https://linkedin.com/in/gdg-qassim" },
      { id: "2", platform: "github", url: "https://github.com/gdg-qassim" },
      { id: "3", platform: "x", url: "https://x.com/gdg_qassim" },
    ],
    createdAt: new Date().toISOString(),
  })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WalletCardData
    const uuid = body.uuid || crypto.randomUUID()

    const cardData: WalletCardData = {
      ...body,
      uuid,
      createdAt: new Date().toISOString(),
    }

    globalThis.__GDG_WALLET_CARDS__!.set(uuid, cardData)

    return NextResponse.json({
      success: true,
      card: cardData,
      profileUrl: `/wallet/${uuid}`,
    })
  } catch (error) {
    console.error("Error creating wallet card:", error)
    return NextResponse.json({ error: "Failed to create card" }, { status: 500 })
  }
}

export async function GET() {
  const cards = Array.from(globalThis.__GDG_WALLET_CARDS__!.values())
  return NextResponse.json({
    total: cards.length,
    cards,
  })
}
