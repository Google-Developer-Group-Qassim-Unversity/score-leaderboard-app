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
    fullName: "بسام الحبيب",
    email: "451110085@qu.edu.sa",
    countryCode: "+966",
    phone: "534406689",
    bio: "مهتم بالذكاء الاصطناعي وتطوير الويب السحابي | عضو مجتمع GDG Qassim 🚀",
    themeId: "gdg-blue",
    userStatus: "student",
    educationLevel: "university",
    institution: "جامعة القصيم",
    major: "علوم حاسب",
    studyYearOrLevel: "المستوى 7",
    visibility: {
      showPhone: false,
      showEmail: false,
      showAcademic: true,
      showBio: true,
    },
    socialLinks: [
      { id: "1", platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
      { id: "2", platform: "github", url: "https://github.com", label: "GitHub" },
      { id: "3", platform: "x", url: "https://x.com", label: "حساب X (تويتر)" },
    ],
    createdAt: new Date().toISOString(),
  })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WalletCardData

    if (!body || !body.fullName || !body.email) {
      return NextResponse.json({ error: "الاسم والبريد الإلكتروني مطلوبان" }, { status: 400 })
    }

    const normalizedEmail = body.email.trim().toLowerCase()
    const cleanPhone = (body.phone || "").replace(/\D/g, "")

    // 1. Search for existing profile by email OR phone (Strict 1 Profile per person)
    let existingUuid: string | null = null
    let existingCard: WalletCardData | null = null

    for (const [id, c] of globalThis.__GDG_WALLET_CARDS__!.entries()) {
      const cardEmail = (c.email || "").trim().toLowerCase()
      const cardPhone = (c.phone || "").replace(/\D/g, "")

      const isSameEmail = normalizedEmail && cardEmail === normalizedEmail
      const isSamePhone = cleanPhone && cardPhone && (cardPhone === cleanPhone || cardPhone.endsWith(cleanPhone) || cleanPhone.endsWith(cardPhone))

      if (isSameEmail || isSamePhone) {
        existingUuid = id
        existingCard = c
        break
      }
    }

    const uuid = existingUuid || body.uuid || crypto.randomUUID()

    // 2. Merge data: keep profile links, bio, and creation date if existing
    const cardData: WalletCardData = {
      ...existingCard,
      ...body,
      uuid,
      email: normalizedEmail,
      phone: body.phone || existingCard?.phone || "",
      // Preserve existing profile enhancements (social links, bio, custom avatar)
      bio: body.bio || existingCard?.bio || "",
      avatarUrl: body.avatarUrl || existingCard?.avatarUrl,
      socialLinks: (body.socialLinks && body.socialLinks.length > 0) ? body.socialLinks : (existingCard?.socialLinks || []),
      visibility: {
        showPhone: body.visibility?.showPhone ?? existingCard?.visibility?.showPhone ?? false,
        showEmail: body.visibility?.showEmail ?? existingCard?.visibility?.showEmail ?? false,
        showAcademic: body.visibility?.showAcademic ?? existingCard?.visibility?.showAcademic ?? true,
        showBio: body.visibility?.showBio ?? existingCard?.visibility?.showBio ?? true,
      },
      createdAt: existingCard?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    globalThis.__GDG_WALLET_CARDS__!.set(uuid, cardData)

    return NextResponse.json({
      success: true,
      isExistingProfile: Boolean(existingUuid),
      card: cardData,
      profileUrl: `/p/${uuid}`,
    })
  } catch (error) {
    console.error("Error creating or updating wallet card:", error)
    return NextResponse.json({ error: "Failed to process wallet profile" }, { status: 500 })
  }
}

export async function GET() {
  const cards = Array.from(globalThis.__GDG_WALLET_CARDS__!.values())
  return NextResponse.json({
    total: cards.length,
    cards,
  })
}
