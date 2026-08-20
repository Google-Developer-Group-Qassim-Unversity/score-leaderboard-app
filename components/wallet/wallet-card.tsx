"use client"

import { DEFAULT_THEME_ID, WALLET_THEMES, WalletCardData } from "@/lib/wallet-themes"

interface WalletCardProps {
  data: WalletCardData
  scale?: number
}

const FIGMA_WIDTH = 535
const FIGMA_HEIGHT = 746
const DISPLAY_WIDTH = 340
const DISPLAY_HEIGHT = (DISPLAY_WIDTH / FIGMA_WIDTH) * FIGMA_HEIGHT

function themeAssets(themeId: string) {
  if (themeId === "gdg-gold-admin") return { artwork: "/wallet-figma/header-admin.svg" }
  if (themeId === "gdg-red") return { artwork: "/wallet-figma/header-female.svg" }
  return { artwork: "/wallet-figma/header-male.svg" }
}

export function WalletCard({ data, scale = 1 }: WalletCardProps) {
  const theme = WALLET_THEMES[data.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]
  const assets = themeAssets(theme.id)

  const memberName = data.fullName?.trim() || "عضو GDG"
  const isEn = data.nameLanguage === "en"
  const nameLabel = isEn ? "Name" : "الاسم"
  const roleTitle = data.isAdmin || theme.isAdmin ? "إداري نادي قوقل للطلبة المطورين" : theme.roleTitle
  const memberLine = `${nameLabel}: ${memberName}`

  return (
    <div className="relative select-none" style={{ width: `${DISPLAY_WIDTH * scale}px`, height: `${DISPLAY_HEIGHT * scale}px` }}>
      <div
        className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[24px] bg-white shadow-xl"
        style={{ width: FIGMA_WIDTH, height: FIGMA_HEIGHT, transform: `scale(${(DISPLAY_WIDTH / FIGMA_WIDTH) * scale})` }}
      >
        <img alt="" aria-hidden="true" className="absolute left-0 top-[100px] h-[204px] w-[535px]" src={assets.artwork} />

        <div className="absolute left-[-25px] top-[33px] h-[44px] w-[103px] overflow-hidden">
          <img alt="GDG Qassim" className="absolute left-[42px] top-[1px] h-[44px] w-[249px] max-w-none" src="/wallet-figma/gdg-q-logo.png" />
        </div>
        <img alt="Google Developer Groups" className="absolute left-[83px] top-[45px] h-[11px] w-[134px]" src="/wallet-figma/gdg-wordmark.svg" />
        <img alt="On Qassim University" className="absolute left-[86px] top-[60px] h-[8px] w-[86px]" src="/wallet-figma/university-subtitle.svg" />

        <section className="absolute left-[19px] top-[346px] flex h-[53px] w-[497px] flex-col items-end gap-[10px] text-right" dir="rtl">
          <p className="w-full text-[20px] font-medium leading-none text-black" dir="auto">{roleTitle}</p>
          <p className="w-full text-[20px] font-normal leading-none text-black" dir="auto">{memberLine}</p>
        </section>
      </div>
    </div>
  )
}
