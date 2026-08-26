"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth, SignInButton } from "@clerk/nextjs"
import confetti from "canvas-confetti"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { WalletCard } from "@/components/wallet/wallet-card"
import { WalletForm } from "@/components/wallet/wallet-form"
import { WalletPassModal } from "@/components/wallet/wallet-pass-modal"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle2, ShieldCheck, LogIn } from "lucide-react"
import { toast } from "sonner"

export default function WalletPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { getToken } = useAuth()

  const [cardData, setCardData] = useState<WalletCardData>({
    fullName: "",
    nameLanguage: "ar",
    isAdmin: false,
    countryCode: "+966",
    phone: "",
    email: "",
    themeId: DEFAULT_THEME_ID,
    userStatus: "",
    educationLevel: "",
    institution: "",
    major: "",
    studyYearOrLevel: "",
    bio: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCard, setCreatedCard] = useState<WalletCardData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch and auto-prefill authenticated member profile from DB
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const loadProfile = async () => {
      try {
        const token = await getToken()
        const res = await fetch("/api/wallet/me", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })

        if (!res.ok) return

        const contentType = res.headers.get("content-type") || ""
        if (!contentType.includes("application/json")) return

        const data = await res.json()
        const prof = data.profile || {}

        setCardData((prev) => ({
          ...prev,
          uuid: prof.uuid || prev.uuid,
          fullName: data.name || user?.fullName || prev.fullName,
          nameLanguage: "ar",
          isAdmin: Boolean(data.is_admin),
          uniId: data.uni_id || prev.uniId,
          email: data.email || user?.primaryEmailAddress?.emailAddress || prev.email,
          phone: data.phone_number || prev.phone,
          themeId: prof.theme_id || prev.themeId,
          userStatus: prof.user_status || "",
          educationLevel: prof.education_level || "",
          institution: prof.institution || "",
          major: prof.major || "",
          studyYearOrLevel: prof.study_year_or_level || "",
          bio: prof.bio || prev.bio || "",
          socialLinks: prof.social_links || prev.socialLinks || [],
          visibility: prof.visibility || prev.visibility,
        }))
      } catch (err) {
        console.info("Member profile prefill note:", err)
      }
    }

    loadProfile()
  }, [isLoaded, isSignedIn, getToken, user])

  const handleSubmit = async () => {
    // A wallet card always represents a real, Clerk-authenticated member row -
    // there is no anonymous/guest wallet, so sign-in is required before we
    // create or touch anything.
    if (!isSignedIn) {
      toast.info("سجّل الدخول أولاً لإنشاء بطاقتك وربطها بحسابك")
      return
    }

    setIsSubmitting(true)
    try {
      const token = await getToken()
      const res = await fetch("/api/wallet/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          custom_name: cardData.fullName,
          email: cardData.email.trim() || undefined,
          phone_number: cardData.phone.trim() || undefined,
          theme_id: cardData.themeId,
          name_language: "ar",
          user_status: cardData.userStatus,
          education_level: cardData.educationLevel,
          institution: cardData.institution,
          major: cardData.major,
          study_year_or_level: cardData.studyYearOrLevel,
          bio: cardData.bio,
          social_links: cardData.socialLinks,
          visibility: cardData.visibility,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || "تعذر حفظ بطاقتك، حاول مجدداً")
      }

      const result = await res.json()
      const updatedProfile = result.profile || {}
      const finalCard: WalletCardData = {
        ...cardData,
        uuid: updatedProfile.uuid || cardData.uuid,
        fullName: result.name || cardData.fullName,
        email: result.email || cardData.email,
        phone: result.phone_number || cardData.phone,
        themeId: updatedProfile.theme_id || cardData.themeId,
      }

      setCreatedCard(finalCard)

      // Fire celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })

      setIsModalOpen(true)
      toast.success("تم حفظ وتجهيز بطاقتك بنجاح! 🪪✨")
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "حدث خطأ أثناء حفظ البطاقة. يرجى المحاولة مجدداً.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-background" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* ================= HERO SECTION ================= */}
        <section className="text-center space-y-5 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>بطاقة العضوية الرقمية — GDG Qassim</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            بطاقتك الآن في جوالك
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            صمم بطاقتك وأضفها إلى Apple Wallet و Google Wallet مع صفحة بروفايل خاصة بك.
          </p>

          {!isSignedIn && (
            <div className="pt-1 flex items-center justify-center">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border text-xs font-medium transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-primary" />
                  <span>هل أنت مسجل بالنادي؟ اضغط لتسجيل الدخول وملء البيانات تلقائياً</span>
                </button>
              </SignInButton>
            </div>
          )}
        </section>

        {/* ================= WORKSPACE: LIVE PREVIEW & FULL FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card Live Preview (Sticky on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl bg-muted/30 border border-border/80 lg:sticky lg:top-20 shadow-xs">
            <div className="text-xs font-bold text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>معاينة حية للبطاقة</span>
            </div>

            <div className="w-full max-w-[340px] transform transition-transform hover:scale-[1.02] duration-300">
              <WalletCard data={cardData} />
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-xs">
              مسح رمز الـ QR يفتح ملفك الشخصي العام المعتمد <span className="font-mono text-foreground font-bold">/p/{cardData.uuid || "id"}</span>
            </p>
          </div>

          {/* Form Container (Always visible & interactive) */}
          <div className="lg:col-span-6 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>بيانات ومعلومات البطاقة</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                املأ أو عدّل بياناتك كما تحب أن تظهر على البطاقة
              </p>
            </div>

            <WalletForm
              data={cardData}
              onChange={setCardData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Modal on successful save/creation */}
      {createdCard && (
        <WalletPassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={createdCard}
        />
      )}
    </div>
  )
}
