import { NextRequest, NextResponse } from "next/server"
import { generateSignedPkpassBuffer } from "@/lib/apple-pass-signer"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"

export async function GET(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = params

    // Fetch card data from API or memory
    const origin = req.nextUrl.origin
    const cardRes = await fetch(`${origin}/api/wallet/${uuid}`)

    let cardData: WalletCardData

    if (cardRes.ok) {
      const json = await cardRes.json()
      cardData = json.card
    } else {
      // Fallback mock for demo
      cardData = {
        uuid,
        fullName: "عضو GDG",
        countryCode: "+966",
        phone: "551234567",
        email: "member@gdg-q.com",
        themeId: DEFAULT_THEME_ID,
        userStatus: "student",
        educationLevel: "university",
        institution: "جامعة القصيم",
        major: "علوم حاسب",
        studyYearOrLevel: "المستوى 5",
      }
    }

    const pkpassBuffer = await generateSignedPkpassBuffer(cardData)

    return new NextResponse(pkpassBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="GDG-${cardData.uuid || "pass"}.pkpass"`,
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error: any) {
    console.error("Error generating pass for uuid:", error)
    return NextResponse.json(
      { error: "Failed to generate pass", details: error?.message },
      { status: 500 }
    )
  }
}
