"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { WalletCard } from "@/components/wallet/wallet-card"
import { WalletCustomizeSheet } from "@/components/wallet/wallet-customize-sheet"
import { Button } from "@/components/ui/button"
import { LogIn, Loader2, Settings2, Download, ExternalLink } from "lucide-react"
import { useCurrentUrl } from "@/hooks/use-current-url"
import { withRedirectParam } from "@/lib/redirect-config"
import { toast } from "sonner"

export default function WalletPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { getToken } = useAuth()
  const currentUrl = useCurrentUrl()

  const [cardData, setCardData] = useState<WalletCardData | null>(null)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isLoadingCard, setIsLoadingCard] = useState(true)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [isGeneratingApple, setIsGeneratingApple] = useState(false)
  const [isGeneratingGoogle, setIsGeneratingGoogle] = useState(false)

  // The card is always a straight read of the member's own account data -
  // there is nothing to fill in here, so this only fetches and renders.
  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      setIsLoadingCard(false)
      return
    }

    const loadProfile = async () => {
      try {
        const token = await getToken()
        const res = await fetch("/api/wallet/me", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })

        if (!res.ok) {
          setIsLoadingCard(false)
          return
        }

        const data = await res.json()
        const prof = data.profile || {}

        if (!prof.uuid) {
          // Signed in, but no member row yet (shouldn't normally happen -
          // middleware routes anyone unfinished to /onboarding first).
          setIsRegistered(false)
          setIsLoadingCard(false)
          return
        }

        setCardData({
          uuid: prof.uuid,
          fullName: prof.custom_name || data.name || user?.fullName || "",
          nameLanguage: "ar",
          isAdmin: Boolean(data.is_admin),
          uniId: data.uni_id,
          countryCode: "+966",
          email: data.email || user?.primaryEmailAddress?.emailAddress || "",
          phone: data.phone_number || "",
          themeId: prof.theme_id || DEFAULT_THEME_ID,
          userStatus: prof.user_status || "student",
          educationLevel: prof.education_level || "university",
          institution: prof.institution || "",
          major: prof.major || "",
          studyYearOrLevel: prof.study_year_or_level || "",
          bio: prof.bio || "",
          socialLinks: prof.social_links || [],
          visibility: prof.visibility,
        })
      } catch (err) {
        console.error("Failed to load wallet card:", err)
      } finally {
        setIsLoadingCard(false)
      }
    }

    loadProfile()
  }, [isLoaded, isSignedIn, getToken, user])

  const handleAppleWallet = async () => {
    if (!cardData) return
    setIsGeneratingApple(true)
    try {
      const token = await getToken()
      const res = await fetch("/api/wallet/pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(cardData),
      })

      if (!res.ok) throw new Error("فشل توقيع بطاقة آبل من الخادم")

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

      if (isIOS) {
        window.location.href = url
      } else {
        const a = document.createElement("a")
        a.href = url
        a.download = `GDG-${(cardData.fullName || "Pass").replace(/\s+/g, "_")}.pkpass`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 5000)
      }
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء تجهيز بطاقة آبل")
    } finally {
      setIsGeneratingApple(false)
    }
  }

  const handleGoogleWallet = async () => {
    if (!cardData) return
    setIsGeneratingGoogle(true)
    try {
      const token = await getToken()
      const res = await fetch("/api/wallet/google-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(cardData),
      })

      if (!res.ok) {
        const errorPayload = await res.json().catch(() => null)
        throw new Error(errorPayload?.detail || errorPayload?.error || "فشل إنشاء بطاقة Google Wallet")
      }

      const result = await res.json()
      if (result.saveUrl) {
        window.location.href = result.saveUrl
      }
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء إنشاء بطاقة Google Wallet")
    } finally {
      setIsGeneratingGoogle(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-background" dir="rtl">
      <div className="max-w-sm mx-auto space-y-8">
        <section className="text-center space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            بطاقة عضويتك
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            احملها في جوالك وسجّل حضورك في فعاليات النادي بمسحة وحدة.
          </p>
        </section>

        {!isLoaded || isLoadingCard ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : !isSignedIn ? (
          <div className="flex flex-col items-center gap-6 p-8 sm:p-10 rounded-3xl bg-muted/30 border border-border/80 text-center">
            <p className="text-sm text-muted-foreground max-w-sm">
              سجّل دخولك بحساب عضويتك في نادي قوقل للطلبة المطورين لعرض بطاقتك الرقمية وإضافتها إلى محفظة جوالك.
            </p>
            <Link href={withRedirectParam("/sign-in", currentUrl)}>
              <Button className="h-11 px-6 rounded-xl font-bold gap-2 shadow-md">
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول</span>
              </Button>
            </Link>
          </div>
        ) : !isRegistered || !cardData ? (
          <div className="flex flex-col items-center gap-6 p-8 sm:p-10 rounded-3xl bg-muted/30 border border-border/80 text-center">
            <p className="text-sm text-muted-foreground max-w-sm">
              لإصدار بطاقتك الرقمية، أكمل تسجيلك في النادي أولاً.
            </p>
            <Link href="/onboarding">
              <Button className="h-11 px-6 rounded-xl font-bold shadow-md">أكمل بياناتك</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full transform transition-transform hover:scale-[1.02] duration-300">
              <WalletCard data={cardData} />
            </div>

            <button
              type="button"
              onClick={() => setIsCustomizeOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>تخصيص البطاقة</span>
            </button>

            <div className="w-full space-y-2.5">
              <button
                type="button"
                onClick={handleAppleWallet}
                disabled={isGeneratingApple}
                className="w-full min-h-[52px] py-3 px-5 bg-black text-white hover:bg-neutral-900 active:scale-[0.98] border border-neutral-800 rounded-2xl flex items-center justify-between shadow-md transition-all group disabled:opacity-75 cursor-pointer touch-manipulation"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.77-8.79-10.45-19.16-14.04-31.1-3.6-11.94-5.4-23.08-5.4-33.43 0-14.01 3.51-25.75 10.53-35.22 7.02-9.47 15.93-14.28 26.74-14.42 5.01 0 10.42 1.34 16.23 4.02 5.81 2.68 9.69 4.07 11.64 4.17 1.48 0 5.63-1.48 12.46-4.43 6.83-2.95 12.56-4.27 17.18-3.96 12.74.85 22.78 5.79 30.12 14.81-11.09 6.74-16.51 15.86-16.27 27.35.24 8.94 3.73 16.48 10.47 22.61 6.74 6.13 14.85 9.68 24.32 10.65-2.09 6.35-4.56 12.87-7.41 19.56zM119.22 31.84c0-7.39 2.68-14.4 8.04-21.03 5.36-6.63 11.96-10.57 19.8-11.81.24 1.13.36 2.12.36 2.97 0 7.39-2.73 14.36-8.19 20.91-5.46 6.55-12.18 10.42-20.16 11.6-.25-1.02-.37-1.9-.37-2.64z" />
                  </svg>
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 font-medium leading-none">Add to</div>
                    <div className="text-sm font-bold text-white leading-tight">Apple Wallet</div>
                  </div>
                </div>
                {isGeneratingApple ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <Download className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                )}
              </button>

              <button
                type="button"
                onClick={handleGoogleWallet}
                disabled={isGeneratingGoogle}
                className="w-full min-h-[52px] py-3 px-5 bg-white text-slate-900 hover:bg-slate-50 active:scale-[0.98] border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between shadow-md transition-all group disabled:opacity-75 cursor-pointer touch-manipulation"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-medium leading-none">Add to</div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">Google Wallet</div>
                  </div>
                </div>
                {isGeneratingGoogle ? (
                  <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {cardData && (
        <WalletCustomizeSheet
          isOpen={isCustomizeOpen}
          onClose={() => setIsCustomizeOpen(false)}
          data={cardData}
          onSaved={(patch) => setCardData((prev) => (prev ? { ...prev, ...patch } : prev))}
        />
      )}
    </div>
  )
}
