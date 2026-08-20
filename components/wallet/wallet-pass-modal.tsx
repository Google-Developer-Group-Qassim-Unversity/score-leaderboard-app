"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { WalletCardData } from "@/lib/wallet-themes"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink, Sparkles, ArrowRight, Loader2, Download, X } from "lucide-react"
import { toast } from "sonner"

interface WalletPassModalProps {
  isOpen: boolean
  onClose: () => void
  data: WalletCardData
}

export function WalletPassModal({ isOpen, onClose, data }: WalletPassModalProps) {
  const { getToken } = useAuth()
  const [copied, setCopied] = useState(false)
  const [isGeneratingApplePass, setIsGeneratingApplePass] = useState(false)
  const [isGeneratingGooglePass, setIsGeneratingGooglePass] = useState(false)

  const profilePath = `/p/${data.uuid}`
  const fullProfileUrl = typeof window !== "undefined" ? `${window.location.origin}${profilePath}` : profilePath

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullProfileUrl)
      } else {
        const input = document.createElement("input")
        input.value = fullProfileUrl
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        document.body.removeChild(input)
      }
      setCopied(true)
      toast.success("تم نسخ رابط صفحتك الشخصية بنجاح!")
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error("تعذر نسخ الرابط، يرجى نسخه يدوياً")
    }
  }

  const handleAppleWallet = async () => {
    setIsGeneratingApplePass(true)
    try {
      toast.info("جاري توقيع وتجهيز بطاقة Apple Wallet...")
      const token = await getToken()

      const res = await fetch("/api/wallet/pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Apple pass server error:", errorText)
        throw new Error("فشل توقيع بطاقة آبل من الخادم")
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      // Check if user is on iOS / mobile Safari
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

      if (isIOS) {
        // On iOS Safari, directly navigate to the object URL to trigger the native Add Pass sheet
        window.location.href = url
      } else {
        // Desktop / other devices download the file
        const a = document.createElement("a")
        a.href = url
        a.download = `GDG-${(data.fullName || "Pass").replace(/\s+/g, "_")}.pkpass`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 5000)
      }

      toast.success("تم تجهيز بطاقة Apple Wallet بنجاح! 🪪")
    } catch (err: any) {
      console.error("Apple Wallet pass error:", err)
      toast.error(err.message || "حدث خطأ أثناء تجهيز بطاقة آبل.")
    } finally {
      setIsGeneratingApplePass(false)
    }
  }

  const handleGoogleWallet = async () => {
    setIsGeneratingGooglePass(true)
    try {
      toast.info("جاري تجهيز بطاقة Google Wallet...")
      const token = await getToken()
      const res = await fetch("/api/wallet/google-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("فشل إنشاء بطاقة Google Wallet")
      }

      const result = await res.json()
      if (result.saveUrl) {
        toast.success("تم تجهيز بطاقة Google Wallet بنجاح! 🪪")
        // On mobile, direct navigation avoids popup blockers
        window.location.href = result.saveUrl
      }
    } catch (err: any) {
      console.error("Google Wallet pass error:", err)
      toast.error(err.message || "حدث خطأ أثناء إنشاء بطاقة Google Wallet")
    } finally {
      setIsGeneratingGooglePass(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-[92vw] max-w-md max-h-[90vh] overflow-y-auto p-0 bg-card/95 backdrop-blur-md border border-border/80 rounded-3xl shadow-2xl z-50 focus:outline-none"
        dir="rtl"
        showCloseButton={false}
      >
        <div className="p-5 sm:p-7 space-y-5">
          {/* Header Banner with Close Button */}
          <div className="relative text-center space-y-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="absolute left-0 top-0 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2 shadow-inner">
              <Sparkles className="w-7 h-7" />
            </div>

            <DialogTitle className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              تم تجهيز بطاقتك الرقمية! 🎉
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed px-2">
              أضف بطاقتك بنقرة واحدة إلى محفظة جوالك وشارك صفحتك الشخصية المعتمدة
            </DialogDescription>
          </div>

          {/* Action Buttons: Add to Apple & Google Wallet */}
          <div className="space-y-3 pt-1">
            {/* Apple Wallet Button */}
            <button
              type="button"
              onClick={handleAppleWallet}
              disabled={isGeneratingApplePass}
              className="w-full min-h-[56px] py-3.5 px-5 bg-black text-white hover:bg-neutral-900 active:scale-[0.98] border border-neutral-800 rounded-2xl flex items-center justify-between shadow-lg transition-all group disabled:opacity-75 cursor-pointer touch-manipulation"
            >
              <div className="flex items-center gap-3">
                {/* Official Apple Wallet Badge Vector */}
                <svg className="w-7 h-7 fill-current shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.77-8.79-10.45-19.16-14.04-31.1-3.6-11.94-5.4-23.08-5.4-33.43 0-14.01 3.51-25.75 10.53-35.22 7.02-9.47 15.93-14.28 26.74-14.42 5.01 0 10.42 1.34 16.23 4.02 5.81 2.68 9.69 4.07 11.64 4.17 1.48 0 5.63-1.48 12.46-4.43 6.83-2.95 12.56-4.27 17.18-3.96 12.74.85 22.78 5.79 30.12 14.81-11.09 6.74-16.51 15.86-16.27 27.35.24 8.94 3.73 16.48 10.47 22.61 6.74 6.13 14.85 9.68 24.32 10.65-2.09 6.35-4.56 12.87-7.41 19.56zM119.22 31.84c0-7.39 2.68-14.4 8.04-21.03 5.36-6.63 11.96-10.57 19.8-11.81.24 1.13.36 2.12.36 2.97 0 7.39-2.73 14.36-8.19 20.91-5.46 6.55-12.18 10.42-20.16 11.6-.25-1.02-.37-1.9-.37-2.64z" />
                </svg>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-400 font-medium leading-none">Add to</div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight">Apple Wallet</div>
                </div>
              </div>

              {isGeneratingApplePass ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <Download className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Google Wallet Button */}
            <button
              type="button"
              onClick={handleGoogleWallet}
              disabled={isGeneratingGooglePass}
              className="w-full min-h-[56px] py-3.5 px-5 bg-white text-slate-900 hover:bg-slate-50 active:scale-[0.98] border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between shadow-lg transition-all group disabled:opacity-75 cursor-pointer touch-manipulation"
            >
              <div className="flex items-center gap-3">
                {/* Google Wallet Logo SVG */}
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-medium leading-none">Add to</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Google Wallet</div>
                </div>
              </div>

              {isGeneratingGooglePass ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
              ) : (
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              )}
            </button>
          </div>

          {/* Profile Public Link Box */}
          <div className="pt-2 border-t border-border/60 space-y-2">
            <div className="text-xs font-bold text-foreground">رابط صفحتك الشخصية المعتمد:</div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-muted/60 border border-border/80">
              <div className="text-[11px] sm:text-xs font-mono font-medium truncate flex-1 text-left select-all text-muted-foreground" dir="ltr">
                {fullProfileUrl}
              </div>
              <Button
                size="sm"
                variant={copied ? "default" : "outline"}
                onClick={handleCopyLink}
                className="h-8 text-xs font-bold gap-1 rounded-xl shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "تم" : "نسخ"}</span>
              </Button>
            </div>
          </div>

          {/* View Profile Button */}
          <div className="pt-1">
            <Link href={profilePath} onClick={onClose} className="block w-full">
              <Button
                variant="outline"
                className="w-full h-11 text-xs font-bold gap-2 text-primary border-primary/30 hover:bg-primary/5 rounded-xl transition-all cursor-pointer"
              >
                <span>معاينة صفحتك الشخصية العامة</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
