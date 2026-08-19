"use client"

import { useState } from "react"
import Link from "next/link"
import { WalletCardData } from "@/lib/wallet-themes"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { WalletCard } from "./wallet-card"
import { Check, Copy, ExternalLink, Sparkles, UserCheck, ShieldCheck, ArrowRight, Loader2, Download } from "lucide-react"
import { toast } from "sonner"

interface WalletPassModalProps {
  isOpen: boolean
  onClose: () => void
  data: WalletCardData
}

export function WalletPassModal({ isOpen, onClose, data }: WalletPassModalProps) {
  const [copied, setCopied] = useState(false)
  const [isGeneratingApplePass, setIsGeneratingApplePass] = useState(false)

  const profilePath = `/p/${data.uuid}`
  const fullProfileUrl = typeof window !== "undefined" ? `${window.location.origin}${profilePath}` : profilePath

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullProfileUrl)
    setCopied(true)
    toast.success("تم نسخ رابط صفحتك الشخصية بنجاح!")
    setTimeout(() => setCopied(false), 2500)
  }

  const handleAppleWallet = async () => {
    setIsGeneratingApplePass(true)
    try {
      toast.info("جاري توقيع وتحميل بطاقة Apple Wallet الرسمية (.pkpass)...")

      const res = await fetch("/api/wallet/pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to generate signed .pkpass")
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `GDG-${data.fullName.replace(/\s+/g, "_") || "Pass"}.pkpass`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success("تم تحميل بطاقة Apple Wallet بنجاح! 🪪")
    } catch (err: any) {
      console.error("Apple Wallet pass error:", err)
      toast.error("حدث خطأ أثناء تحميل بطاقة آبل. سيتم المحاولة عبر الرابط المباشر.")
      // Fallback direct link navigation for mobile Safari
      if (data.uuid) {
        window.location.href = `/api/wallet/${data.uuid}/pass`
      }
    } finally {
      setIsGeneratingApplePass(false)
    }
  }

  const [isGeneratingGooglePass, setIsGeneratingGooglePass] = useState(false)

  const handleGoogleWallet = async () => {
    setIsGeneratingGooglePass(true)
    try {
      const res = await fetch("/api/wallet/google-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to generate Google Wallet Pass")
      }

      const result = await res.json()
      if (result.saveUrl) {
        toast.success("تم تجهيز بطاقة Google Wallet بنجاح! 🪪")
        window.open(result.saveUrl, "_blank")
      }
    } catch (err: any) {
      console.error("Google Wallet pass error:", err)
      toast.error("حدث خطأ أثناء إنشاء بطاقة قوقل. سيتم المحاولة عبر الرابط المباشر.")
      window.open(`https://pay.google.com/gp/v/save/${data.uuid || "demo"}`, "_blank")
    } finally {
      setIsGeneratingGooglePass(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-[92vw] p-6 rounded-3xl bg-card border border-border/80 shadow-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <DialogTitle className="text-2xl font-black text-foreground">
            مبروك! تم إنشاء بطاقتك بنجاح 🎉
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            بطاقة عضويتك في GDG Qassim جاهزة وموقعة رسمياً بمحفظة آبل وجوجل.
          </DialogDescription>
        </DialogHeader>

        {/* Card Preview */}
        <div className="py-2 flex justify-center scale-95">
          <WalletCard data={data} qrUrl={fullProfileUrl} />
        </div>

        {/* Action Buttons: Add to Apple & Google Wallet */}
        <div className="space-y-2.5 pt-2">
          {/* Apple Wallet Button */}
          <button
            onClick={handleAppleWallet}
            disabled={isGeneratingApplePass}
            className="w-full h-12 bg-black text-white hover:bg-zinc-900 border border-zinc-700/60 rounded-2xl flex items-center justify-center gap-3 font-semibold text-sm transition-all shadow-md active:scale-[0.99]"
          >
            {isGeneratingApplePass ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>جاري توقيع البطاقة...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.86-12-14.34-6.61-9.98-11.83-21.2-15.65-33.68-3.82-12.48-5.74-24.19-5.74-35.13 0-14.77 3.86-26.68 11.58-35.73 7.72-9.05 17.2-13.72 28.45-14 4.57 0 9.77 1.25 15.6 3.75 5.83 2.5 9.72 3.85 11.66 4.05 1.76-.2 5.87-1.57 12.33-4.11 6.46-2.54 11.88-3.68 16.27-3.42 12.56.63 22.75 5.25 30.56 13.87-10.97 6.64-16.32 15.69-16.06 27.15.26 8.92 3.77 16.42 10.53 22.5 6.76 6.08 14.88 9.54 24.36 10.38-2.12 6.5-4.7 13.06-7.74 19.68zM119.22 31.84c0-7.35 2.65-14.37 7.95-21.05 5.3-6.68 11.89-10.79 19.78-12.33.2 1.33.3 2.6.3 3.8 0 7.37-2.77 14.47-8.31 21.3-5.54 6.83-12.18 10.9-19.92 12.21-.07-1.33-.2-2.64-.4-3.93z" />
                </svg>
                <span>إضافة إلى Apple Wallet</span>
              </>
            )}
          </button>

          {/* Google Wallet Button */}
          <button
            onClick={handleGoogleWallet}
            className="w-full h-12 bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-2xl flex items-center justify-center gap-3 font-semibold text-sm transition-all shadow-xs active:scale-[0.99]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>إضافة إلى Google Wallet</span>
          </button>
        </div>

        {/* Linktree Profile Link Copy */}
        <div className="pt-2 border-t border-border/70 space-y-2">
          <div className="text-[11px] font-bold text-muted-foreground flex items-center justify-between">
            <span>رابط بطاقتك الشخصية المباشر:</span>
            <Link href={profilePath} target="_blank" className="text-primary hover:underline flex items-center gap-1">
              <span>فتح البروفايل</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-muted px-3 py-2 rounded-xl text-xs font-mono text-muted-foreground truncate" dir="ltr">
              {fullProfileUrl}
            </div>
            <Button size="sm" onClick={handleCopyLink} className="rounded-xl text-xs gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "تم" : "نسخ"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
