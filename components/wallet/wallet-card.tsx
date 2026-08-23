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

function themeAssets(themeId: string) {
  if (themeId === "gdg-gold-admin") {
    return {
      artwork: "/wallet-v2/card-gdg-gold-admin@2x.png",
      textColor: "#ffffff",
      hasQrFrame: false,
    }
  }

  if (themeId === "gdg-red") {
    return {
      artwork: "/wallet-v2/card-gdg-red@2x.png",
      textColor: "#111827",
      hasQrFrame: true,
    }
  }

  return {
    artwork: "/wallet-v2/card-gdg-blue@2x.png",
    textColor: "#111827",
    hasQrFrame: true,
  }
}

export function WalletCard({ data, qrUrl, scale = 1 }: WalletCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [qrReady, setQrReady] = useState(false)
  const [renderWidth, setRenderWidth] = useState(DISPLAY_WIDTH * scale)
  const theme = WALLET_THEMES[data.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]
  const assets = themeAssets(theme.id)
  const targetQrUrl = qrUrl || (data.uuid ? `https://gdg-q.com/p/${data.uuid}` : "https://gdg-q.com")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateWidth = () => setRenderWidth(container.getBoundingClientRect().width)
    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(container)
    return () => observer.disconnect()
  }, [scale])

  useEffect(() => {
    if (!canvasRef.current) return

    setQrReady(false)
    QRCode.toCanvas(canvasRef.current, targetQrUrl, {
      width: 160,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#ffffff" },
    }, (error) => {
      if (error) console.error("QR code generation failed", error)
      else setQrReady(true)
    })
  }, [targetQrUrl])

  const memberName = data.fullName?.trim() || "اسم العضو"
  const roleTitle = data.isAdmin || theme.isAdmin ? "إداري نادي قوقل للطلبة المطورين" : theme.roleTitle
  const transformScale = renderWidth / FIGMA_WIDTH

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ maxWidth: `${DISPLAY_WIDTH * scale}px`, aspectRatio: `${FIGMA_WIDTH} / ${FIGMA_HEIGHT}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[24px] bg-white shadow-xl"
        style={{ width: FIGMA_WIDTH, height: FIGMA_HEIGHT, transform: `scale(${transformScale})` }}
      >
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          src={assets.artwork}
        />

        <section
          className="absolute left-[38px] top-[188px] flex w-[459px] flex-col items-center text-center"
          dir="rtl"
          style={{ color: assets.textColor }}
        >
          <p className="w-full text-[19px] font-medium leading-[1.45] opacity-80">{roleTitle}</p>
          <p className="mt-[10px] w-full text-[32px] font-semibold leading-[1.3]" dir="auto">
            {memberName}
          </p>
        </section>

        <div
          className={`absolute left-[167px] top-[485px] grid h-[200px] w-[200px] place-items-center rounded-[16px] ${
            assets.hasQrFrame ? "" : "bg-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.10)]"
          }`}
        >
          <div className="grid h-[174px] w-[174px] place-items-center rounded-[10px] bg-white shadow-sm">
            <canvas ref={canvasRef} className="block h-[160px] w-[160px]" />
          </div>
          {!qrReady && <div className="absolute inset-0 grid place-items-center bg-white/80 text-xs text-slate-500">Loading…</div>}
        </div>
      </div>
    </div>
  )
}
