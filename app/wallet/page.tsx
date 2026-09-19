"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { WalletCard } from "@/components/wallet/wallet-card"
import { WalletPassModal } from "@/components/wallet/wallet-pass-modal"
import { Button } from "@/components/ui/button"
import { Sparkles, LogIn, Loader2, Palette, UserCog } from "lucide-react"
import { useCurrentUrl } from "@/hooks/use-current-url"
import { withRedirectParam } from "@/lib/redirect-config"

export default function WalletPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { getToken } = useAuth()
  const currentUrl = useCurrentUrl()

  const [cardData, setCardData] = useState<WalletCardData | null>(null)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isLoadingCard, setIsLoadingCard] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          fullName: data.name || user?.fullName || "",
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

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-background" dir="rtl">
      <div className="max-w-xl mx-auto space-y-10">
        {/* ================= HERO SECTION ================= */}
        <section className="text-center space-y-5 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>بطاقة العضوية الرقمية — GDG Qassim</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            بطاقتك جاهزة لجوالك
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            بطاقتك جاهزة ببياناتك من حسابك. أضفها إلى Apple Wallet أو Google Wallet بضغطة وحدة.
          </p>

          {!isSignedIn && isLoaded && (
            <div className="pt-1 flex items-center justify-center">
              <Link
                href={withRedirectParam("/sign-in", currentUrl)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border text-xs font-medium transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-primary" />
                <span>هل أنت عضو بالنادي؟ سجّل الدخول لعرض بطاقتك</span>
              </Link>
            </div>
          )}
        </section>

        {/* ================= CARD PREVIEW & ACTIONS ================= */}
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
              <Button className="h-11 px-6 rounded-xl font-bold gap-2 shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>أكمل بياناتك</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-[340px] transform transition-transform hover:scale-[1.02] duration-300">
              <WalletCard data={cardData} />
            </div>

            <div className="w-full max-w-sm space-y-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full h-12 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md transition-all gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>أضف البطاقة إلى محفظتك 🪪</span>
              </Button>

              <div className="flex items-center justify-center gap-4 pt-1 text-xs font-semibold text-muted-foreground">
                <Link href="/profile" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Palette className="w-3.5 h-3.5" />
                  <span>تغيير لون البطاقة</span>
                </Link>
                <span className="text-border">·</span>
                <Link href="/profile" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <UserCog className="w-3.5 h-3.5" />
                  <span>تعديل بياناتك</span>
                </Link>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground text-center max-w-xs">
              مسح رمز الـ QR يفتح ملفك الشخصي العام المعتمد <span className="font-mono text-foreground font-bold">/p/{cardData.uuid}</span>
            </p>
          </div>
        )}
      </div>

      {/* Add-to-wallet modal - reads the same already-persisted account data as the preview above */}
      {cardData && (
        <WalletPassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={cardData}
        />
      )}
    </div>
  )
}
