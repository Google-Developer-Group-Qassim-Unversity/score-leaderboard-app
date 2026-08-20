import { NextResponse } from "next/server"
import { config } from "@/lib/config"
import { WalletCardData } from "@/lib/wallet-themes"

declare global {
  // eslint-disable-next-line no-var
  var __GDG_WALLET_CARDS__: Map<string, WalletCardData> | undefined
}

export async function GET(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = params
    const backendUrl = config.backendApiUrl || "http://localhost:7001"

    const res = await fetch(`${backendUrl}/wallet/${uuid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      const fallbackCard = globalThis.__GDG_WALLET_CARDS__?.get(uuid)
      if (fallbackCard) {
        return NextResponse.json({
          success: true,
          card: fallbackCard,
          profileUrl: `/p/${uuid}`,
        })
      }
      return NextResponse.json(
        { error: "البطاقة أو الملف الشخصي غير موجود" },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json({
      success: true,
      card: {
        uuid: data.uuid,
        fullName: data.name,
        nameLanguage: data.name_language || "ar",
        themeId: data.theme_id || "gdg-blue",
        isAdmin: data.is_admin || false,
        bio: data.bio || "",
        socialLinks: data.social_links || [],
        email: data.email || "",
        phone: data.phone || "",
        institution: data.institution || data.uni_college || "جامعة القصيم",
        major: data.major || data.uni_college || "علوم حاسب",
        studyYearOrLevel: data.study_year_or_level || (data.uni_level ? `المستوى ${data.uni_level}` : ""),
        visibility: data.visibility || {
          showPhone: false,
          showEmail: false,
          showAcademic: true,
          showBio: true,
        },
        createdAt: data.created_at,
      },
      profileUrl: `/p/${uuid}`,
    })
  } catch (error: any) {
    console.error("Error fetching wallet by uuid:", error)
    const fallbackCard = globalThis.__GDG_WALLET_CARDS__?.get(params.uuid)
    if (fallbackCard) {
      return NextResponse.json({
        success: true,
        card: fallbackCard,
        profileUrl: `/p/${params.uuid}`,
      })
    }
    return NextResponse.json(
      { error: "Failed to fetch profile", detail: error?.message },
      { status: 500 }
    )
  }
}
