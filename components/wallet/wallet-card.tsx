"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import { DEFAULT_THEME_ID, WALLET_THEMES, WalletCardData } from "@/lib/wallet-themes"

interface WalletCardProps {
  data: WalletCardData
  qrUrl?: string
  scale?: number
}

const FIGMA_WIDTH = 535
const FIGMA_HEIGHT = 746
const DISPLAY_WIDTH = 340
const DISPLAY_HEIGHT = (DISPLAY_WIDTH / FIGMA_WIDTH) * FIGMA_HEIGHT

function themeAssets(themeId: string) {
  if (themeId === "gdg-gold-admin") return { artwork: "/wallet-figma/header-admin.svg", divider: "#fac93e", qrBorder: "#f9c23c" }
  if (themeId === "gdg-red") return { artwork: "/wallet-figma/header-female.svg", divider: "#f24439", qrBorder: "#ff8179" }
  return { artwork: "/wallet-figma/header-male.svg", divider: "#3e88f8", qrBorder: "#4187f6" }
}

const badgeAsset = (variant: "male" | "female" | "admin", name: string) => `/wallet-figma/badge-${variant}/${name}.svg`

// These layers are exported from Figma's "Badge / Male Student" node (8:652).
// The badge is intentionally composed from the original exports, including its masks.
function FigmaBadge({ themeId }: { themeId: string }) {
  const variant = themeId === "gdg-gold-admin" ? "admin" : themeId === "gdg-red" ? "female" : "male"
  const asset = (name: string) => badgeAsset(variant, name)
  const mask = `url(${asset("imgMask1")})`
  const masked = { maskImage: mask, WebkitMaskImage: mask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }

  return (
    <div className="absolute right-0 top-[20px] h-[104px] w-[104px]" aria-hidden="true">
      <img className="absolute left-[20.7px] top-[16.1px] h-[71.9px] w-[63.3px]" src={asset("imgShadow")} alt="" />
      <img className="absolute left-[39px] top-[54.9px] h-[46.3px] w-[25.2px]" src={asset("imgGroup52")} alt="" />
      <img className="absolute left-[23.2px] top-[22.6px] h-[64.6px] w-[57.6px] mix-blend-multiply" src={asset("imgMask")} alt="" />
      <img className="absolute left-[22.1px] top-[18.8px] h-[66.2px] w-[57.6px]" src={asset("imgMaskCopy32")} alt="" />
      <img className="absolute left-[24.1px] top-[24px] h-[63.1px] w-[55px] mix-blend-multiply" style={masked} src={asset("imgMask2")} alt="" />
      <img className="absolute left-[23.9px] top-[20.4px] h-[63px] w-[56.9px]" style={masked} src={asset("imgMaskCopy14")} alt="" />
      <img className="absolute left-[23.9px] top-[20.4px] h-[44.5px] w-[56.9px]" style={masked} src={asset("imgMaskCopy15")} alt="" />
      <img className="absolute left-[23.9px] top-[20.4px] h-[18px] w-[56.9px]" style={masked} src={asset("imgMaskCopy16")} alt="" />
      <img className="absolute left-[38px] top-[20.4px] h-[7px] w-[16.5px]" style={masked} src={asset("imgMaskCopy17")} alt="" />
      <img className="absolute left-[43.7px] top-[21.1px] h-[3.3px] w-[5.7px]" style={masked} src={asset("imgMaskCopy18")} alt="" />
      <img className="absolute left-[28.9px] top-[29px] h-[47px] w-[46px]" src={asset("imgMask3")} alt="" />
      <img className="absolute left-[28.9px] top-[28.9px] h-[46px] w-[46px] mix-blend-multiply" style={masked} src={asset("imgRectangle8")} alt="" />
      <img className="absolute left-[33.8px] top-[30px] h-[10.2px] w-[33.8px]" style={masked} src={asset("imgMaskCopy27")} alt="" />
      <img className="absolute left-[46.6px] top-[30.3px] h-[5px] w-[4.3px]" style={masked} src={asset("imgMaskCopy28")} alt="" />
      <img className="absolute left-[42px] top-[38.8px] h-[24px] w-[20px]" src={asset("imgGroup")} alt="" />
      <img className="absolute left-[28.9px] top-[37.6px] h-[32px] w-[46.2px]" src={asset("imgGroup46")} alt="" />
    </div>
  )
}

export function WalletCard({ data, qrUrl, scale = 1 }: WalletCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [qrReady, setQrReady] = useState(false)
  const theme = WALLET_THEMES[data.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]
  const assets = themeAssets(theme.id)
  const targetQrUrl = qrUrl || (data.uuid ? `https://gdg-q.com/p/${data.uuid}` : "https://gdg-q.com")

  useEffect(() => {
    if (!canvasRef.current) return
    setQrReady(false)
    QRCode.toCanvas(canvasRef.current, targetQrUrl, {
      width: 183,
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#ffffff" },
    }, (error) => {
      if (error) console.error("QR code generation failed", error)
      else setQrReady(true)
    })
  }, [targetQrUrl])

  const memberName = data.fullName?.trim() || "عضو GDG"
  const isEn = data.nameLanguage === "en"
  const nameLabel = isEn ? "Name" : "الاسم"
  const roleTitle = data.isAdmin || theme.isAdmin ? "إداري نادي قوقل للطلبة المطورين" : theme.roleTitle

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

        <FigmaBadge themeId={theme.id} />

        <div className="absolute left-0 top-[304px] h-[23px] w-[535px]" style={{ background: assets.divider }} />

        <section className="absolute left-[20px] top-[343px] flex w-[497px] flex-col items-end gap-[24px] text-right" dir="rtl">
          <p className="w-full text-[24px] font-medium leading-none text-black">{roleTitle}</p>
          <div className="flex w-full items-center justify-between" dir={isEn ? "ltr" : "rtl"}>
            <div className={`flex flex-col gap-[10px] ${isEn ? "items-start text-left" : "items-end text-right"} w-full`}>
              <p className="text-[16px] leading-none text-black font-semibold">{nameLabel}</p>
              <p className="text-[22px] font-bold leading-none text-[#979797] truncate max-w-[460px]">{memberName}</p>
            </div>
          </div>
        </section>

        <div
          className="absolute left-[175px] top-[517px] h-[191px] w-[191px] rounded-[5px] p-[4px]"
          style={{ background: `linear-gradient(to bottom, ${assets.qrBorder} 0%, ${assets.qrBorder}99 48%, transparent 100%)` }}
        >
          <div className="relative h-full w-full bg-white">
            <canvas ref={canvasRef} className="block h-[183px] w-[183px]" />
            {!qrReady && <div className="absolute inset-0 grid place-items-center bg-white/80 text-xs text-slate-500">Loading…</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
