import { NextRequest, NextResponse } from "next/server"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"

export async function GET(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = params

    // Fetch card data from API or memory
    const origin = req.nextUrl.origin
    const cardRes = await fetch(`${origin}/api/wallet/${uuid}`, { cache: "no-store" })

    let cardData: WalletCardData

    if (cardRes.ok) {
      const json = await cardRes.json()
      cardData = json.card
    } else {
      cardData = {
        uuid,
        fullName: "عضو GDG",
        countryCode: "+966",
        phone: "",
        email: "",
        themeId: DEFAULT_THEME_ID,
        userStatus: "student",
        educationLevel: "university",
        institution: "جامعة القصيم",
        major: "علوم حاسب",
        studyYearOrLevel: "المستوى 5",
      }
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
      const errorText = await backendRes.text()
      return NextResponse.json(
        { error: "Backend failed to generate Apple Wallet pass", details: errorText },
        { status: backendRes.status }
      )
    }

    const pkpassBuffer = await backendRes.arrayBuffer()

    return new NextResponse(Buffer.from(pkpassBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="GDG-${cardData.uuid || "pass"}.pkpass"`,
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error: any) {
    console.error("Error generating pass for uuid via Backend:", error)
    return NextResponse.json(
      { error: "Failed to communicate with Backend Wallet API", details: error?.message },
      { status: 502 }
    )
  }
}
