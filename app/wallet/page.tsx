"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth, SignInButton } from "@clerk/nextjs"
import confetti from "canvas-confetti"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { WalletCard } from "@/components/wallet/wallet-card"
import { WalletForm } from "@/components/wallet/wallet-form"
import { WalletPassModal } from "@/components/wallet/wallet-pass-modal"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle2, ShieldCheck, LogIn, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function WalletPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { getToken } = useAuth()

  const [cardData, setCardData] = useState<WalletCardData>({
    fullName: "عضو GDG",
    nameLanguage: "ar",
    isAdmin: false,
    countryCode: "+966",
    phone: "",
    email: "",
    themeId: DEFAULT_THEME_ID,
    userStatus: "student",
    institution: "جامعة القصيم",
    major: "علوم حاسب",
    studyYearOrLevel: "المستوى 7",
    bio: "",
  })

  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCard, setCreatedCard] = useState<WalletCardData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch authenticated member profile from DB
  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      setIsLoadingProfile(false)
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
          throw new Error("Failed to load profile")
        }

        const data = await res.json()
        const prof = data.profile || {}

        const loaded: WalletCardData = {
          uuid: prof.uuid,
          fullName: data.name || user?.fullName || "عضو GDG",
          nameLanguage: prof.name_language || "ar",
          isAdmin: Boolean(data.is_admin),
          uniId: data.uni_id,
          email: data.email || user?.primaryEmailAddress?.emailAddress || "",
          phone: data.phone_number || "",
          countryCode: "+966",
          themeId: prof.theme_id || DEFAULT_THEME_ID,
          userStatus: "student",
          institution: data.uni_college || "جامعة القصيم",
          major: data.uni_college || "علوم حاسب",
          studyYearOrLevel: data.uni_level ? `المستوى ${data.uni_level}` : "عضو مجتمع GDG",
          bio: prof.bio || "",
          socialLinks: prof.social_links || [],
          visibility: prof.visibility || {
            showPhone: false,
            showEmail: false,
            showAcademic: true,
            showBio: true,
          },
        }

        setCardData(loaded)
      } catch (err) {
        console.error("Error loading wallet/me:", err)
      } finally {
        setIsLoadingProfile(false)
      }
    }

    loadProfile()
  }, [isLoaded, isSignedIn, getToken, user])

  const handleSubmit = async () => {
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
          theme_id: cardData.themeId,
          name_language: cardData.nameLanguage,
          bio: cardData.bio,
          social_links: cardData.socialLinks,
          visibility: cardData.visibility,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Failed to update profile")
      }

      const result = await res.json()
      const updatedProfile = result.profile

      const finalCard: WalletCardData = {
        ...cardData,
        uuid: updatedProfile.uuid,
        themeId: updatedProfile.theme_id,
        nameLanguage: updatedProfile.name_language,
        bio: updatedProfile.bio,
        socialLinks: updatedProfile.social_links,
        visibility: updatedProfile.visibility,
      }

      setCreatedCard(finalCard)

      // Fire celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })

      setIsModalOpen(true)
      toast.success("تم حفظ إعدادات بطاقتك وتحديثها في قاعدة البيانات بنجاح! 🪪✨")
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
            رابط واحد يضعها في محفظة Apple و Google Wallet — متصلة مباشرة بسجل عضويتك ونقاطك في النادي.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>مباشرة من قاعدة البيانات</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>أمان عالي عبر حسابك</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Apple & Google Wallet</span>
            </span>
          </div>
        </section>

        {/* ================= WORKSPACE: LIVE PREVIEW & FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card Live Preview (Sticky on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl bg-muted/30 border border-border/80 sticky top-20 shadow-xs">
            <div className="text-xs font-bold text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>معاينة حية للبطاقة</span>
            </div>

            <div className="transform transition-transform hover:scale-[1.02] duration-300">
              <WalletCard data={cardData} />
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-xs">
              مسح رمز الـ QR يفتح ملفك الشخصي العام المعتمد <span className="font-mono text-foreground font-bold">/p/{cardData.uuid || "id"}</span>
            </p>
          </div>

          {/* Form / Authentication Container */}
          <div className="lg:col-span-6 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            {isLoadingProfile ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-xs font-bold text-muted-foreground">جاري تحميل بيانات عضويتك...</p>
              </div>
            ) : !isSignedIn ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-foreground">تسجيل الدخول لإصدار البطاقة</h2>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    بطاقتك الرقمية ترتبط مباشرة بهويتك الجامعية ورقم عضويتك في النادي لضمان الأمان وعدم تكرار البروفايلات.
                  </p>
                </div>
                <SignInButton mode="modal">
                  <Button className="font-bold gap-2 h-11 px-8 rounded-xl shadow-md">
                    <LogIn className="w-4 h-4" />
                    <span>تسجيل الدخول بحساب العضو 🚀</span>
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <>
                <div className="border-b pb-4">
                  <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>تخصيص وإصدار بطاقتك الرقمية</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    اختر لغة عرض الاسم ونوع البطاقة لحفظها وإضافتها للمحفظة
                  </p>
                </div>

                <WalletForm
                  data={cardData}
                  onChange={setCardData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
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
