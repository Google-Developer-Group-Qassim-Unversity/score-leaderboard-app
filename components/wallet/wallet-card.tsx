"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { WALLET_THEMES, WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { QrCode as QrIcon } from "lucide-react"

interface WalletCardProps {
  data: WalletCardData
  qrUrl?: string
}

export function WalletCard({ data, qrUrl }: WalletCardProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const theme = WALLET_THEMES[data.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]

  const targetUrl =
    qrUrl ||
    (data.uuid
      ? `${typeof window !== "undefined" ? window.location.origin : ""}/wallet/${data.uuid}`
      : "https://gdg-q.com")

  useEffect(() => {
    QRCode.toDataURL(targetUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("Error generating pass QR:", err))
  }, [targetUrl])

  const serialNumber = data.uuid
    ? `GDGQ-${data.uuid.slice(0, 8).toUpperCase()}`
    : "GDGQ-PASS"

  // Major / Specialization display
  const majorLabel =
    data.major ||
    (data.educationLevel === "highschool" ? "المرحلة الثانوية" : "علوم حاسب")

  const institutionLabel =
    data.institution ||
    (data.educationLevel === "highschool" ? "مدرسة ثانوية" : "جامعة القصيم")

  const levelLabel =
    data.studyYearOrLevel ||
    (data.userStatus === "graduate" ? "خريج معتمد" : "عضو مجتمع GDG")

  return (
    <div className="w-full max-w-[340px] mx-auto select-none transition-all duration-300 transform-gpu hover:scale-[1.01]" dir="rtl">
      {/* Authentic Vertical Apple Wallet Pass Card */}
      <div
        className="relative overflow-hidden rounded-[22px] shadow-[0_24px_70px_rgba(0,0,0,0.38)] border border-white/10"
        style={{
          background: theme.gradient,
          color: theme.textColor,
        }}
      >
        {/* Pass Header */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {/* GDG Google Shape Icon */}
              <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center p-1 border border-white/20">
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" fill="#4285F4" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: theme.labelColor }}>
                  GDG QASSIM
                </div>
                <div className="text-xs font-bold text-white/95">مجتمع المطورين بالقصيم</div>
              </div>
            </div>

            {/* Pass Type Chip */}
            <div
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-white/10"
              style={{ background: theme.badgeBg, color: theme.badgeText }}
            >
              {data.userStatus === "graduate" ? "خريج" : "عضوية رقمية"}
            </div>
          </div>

          {/* Primary Field: الاسم */}
          <div className="mt-5 text-right">
            <div className="text-[9px] font-bold tracking-wider uppercase" style={{ color: theme.labelColor }}>
              الاسم
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight truncate leading-tight mt-0.5" style={{ color: theme.textColor }}>
              {data.fullName || "اسمك يظهر هنا"}
            </div>
          </div>

          {/* Secondary Fields Grid (2 Columns: التخصص | الصرح التعليمي) */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-right">
            <div className="min-w-0">
              <div className="text-[9px] font-bold tracking-wider uppercase" style={{ color: theme.labelColor }}>
                التخصص
              </div>
              {data.major ? (
                <div className="text-xs font-bold truncate mt-0.5" style={{ color: theme.textColor }}>
                  {data.major}
                </div>
              ) : (
                <div className="h-3 w-16 rounded-full mt-1.5 bg-white/20 animate-pulse" />
              )}
            </div>

            <div className="min-w-0">
              <div className="text-[9px] font-bold tracking-wider uppercase" style={{ color: theme.labelColor }}>
                الصرح التعليمي
              </div>
              {data.institution ? (
                <div className="text-xs font-bold truncate mt-0.5" style={{ color: theme.textColor }}>
                  {data.institution}
                </div>
              ) : (
                <div className="h-3 w-20 rounded-full mt-1.5 bg-white/20 animate-pulse" />
              )}
            </div>
          </div>

          {/* Auxiliary Fields Grid (2 Columns: المستوى / السنة | الجوال) */}
          <div className="mt-3 grid grid-cols-2 gap-3 text-right">
            <div className="min-w-0">
              <div className="text-[9px] font-bold tracking-wider uppercase" style={{ color: theme.labelColor }}>
                المستوى / المرحلة
              </div>
              {data.studyYearOrLevel ? (
                <div className="text-xs font-bold truncate mt-0.5" style={{ color: theme.textColor }}>
                  {data.studyYearOrLevel}
                </div>
              ) : (
                <div className="h-3 w-16 rounded-full mt-1.5 bg-white/20 animate-pulse" />
              )}
            </div>

            <div className="min-w-0">
              <div className="text-[9px] font-bold tracking-wider uppercase" style={{ color: theme.labelColor }}>
                الجوال
              </div>
              {data.phone ? (
                <div className="text-xs font-mono font-bold truncate mt-0.5" dir="ltr" style={{ color: theme.textColor }}>
                  {data.countryCode} {data.phone}
                </div>
              ) : (
                <div className="h-3 w-20 rounded-full mt-1.5 bg-white/20 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Decorative subtle pass perforation divider */}
        <div className="relative py-2 flex items-center justify-between">
          <div className="w-3 h-6 rounded-l-full bg-background -mr-1 shadow-inner" />
          <div className="flex-1 border-t border-dashed border-white/20 mx-2" />
          <div className="w-3 h-6 rounded-r-full bg-background -ml-1 shadow-inner" />
        </div>

        {/* Barcode / QR Code Box */}
        <div className="px-5 pb-5 pt-1 text-center">
          <div className="w-full bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center">
            <div className="w-28 h-28 flex items-center justify-center">
              {qrCodeDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrCodeDataUrl}
                  alt="Apple Wallet Pass QR"
                  className="w-full h-full object-contain"
                />
              ) : (
                <QrIcon className="w-16 h-16 text-zinc-300 animate-pulse" />
              )}
            </div>
            <div className="text-[10px] font-mono font-bold text-zinc-700 tracking-wider mt-1">
              {serialNumber}
            </div>
          </div>

          <div className="mt-2.5 text-[9px] tracking-wide" style={{ color: theme.labelColor }}>
            امسح الرمز للتحقق من العضوية
          </div>
        </div>
      </div>
    </div>
  )
}
