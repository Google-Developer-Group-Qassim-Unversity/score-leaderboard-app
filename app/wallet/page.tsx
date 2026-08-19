"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { WalletCard } from "@/components/wallet/wallet-card"
import { WalletForm } from "@/components/wallet/wallet-form"
import { WalletPassModal } from "@/components/wallet/wallet-pass-modal"
import { Sparkles, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function WalletPage() {
  const [cardData, setCardData] = useState<WalletCardData>({
    fullName: "",
    englishName: "",
    countryCode: "+966",
    phone: "",
    email: "",
    themeId: DEFAULT_THEME_ID,
    userStatus: "",
    educationLevel: "",
    institution: "",
    major: "",
    studyYearOrLevel: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCard, setCreatedCard] = useState<WalletCardData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      })

      if (!res.ok) {
        throw new Error("Failed to create pass")
      }

      const result = await res.json()
      const savedCard = result.card as WalletCardData

      setCreatedCard(savedCard)

      // Fire celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })

      setIsModalOpen(true)
      toast.success("تم إنشاء بطاقة المحفظة بنجاح! 🪪")
    } catch (err) {
      console.error(err)
      toast.error("حدث خطأ أثناء حفظ البطاقة. يرجى المحاولة مجدداً.")
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
            رابط واحد يضعها في محفظة Apple و Google Wallet — بلا تطبيق، وبلا طباعة، وبدون أي تعقيد.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>مجانًا</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>خطوات سهلة</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Apple & Google Wallet</span>
            </span>
          </div>
        </section>

        {/* ================= BUILD / PREVIEW SECTION ================= */}
        <section id="build" className="space-y-10 pt-4 border-t border-border/70">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">جرّبها الآن</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              اكتب اسمك، حدد تخصصك، اختر لونك، وشاهد بطاقتك تتكوّن أمامك بتصميم Apple Wallet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Live Vertical Card Preview (Sticky) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center lg:sticky lg:top-24 order-1 lg:order-2">
              <div className="relative w-full flex justify-center">
                {/* Subtle back ambient glow */}
                <div className="absolute inset-0 max-w-[340px] mx-auto -z-10 rounded-[36px] bg-gradient-to-b from-primary/20 to-transparent blur-2xl opacity-70" />
                <WalletCard data={cardData} />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <WalletForm
                data={cardData}
                onChange={setCardData}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </section>

        {/* ================= 3 STEPS HOW IT WORKS ================= */}
        <section className="border-t border-border/70 pt-16 pb-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">ثلاث خطوات، في دقيقة تقريباً</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
            <div className="p-6 bg-card border rounded-2xl space-y-3">
              <span className="text-4xl font-black text-primary/80">1</span>
              <h3 className="text-lg font-bold text-foreground">اصنعها</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                الاسم، ورقم الجوال، والجامعة والتخصص والمستوى الدراسي.
              </p>
            </div>

            <div className="p-6 bg-card border rounded-2xl space-y-3">
              <span className="text-4xl font-black text-primary/80">2</span>
              <h3 className="text-lg font-bold text-foreground">احفظها في محفظتك</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                بنقرة واحدة أضفها إلى Apple Wallet أو Google Wallet لتكون جاهزة دائماً.
              </p>
            </div>

            <div className="p-6 bg-card border rounded-2xl space-y-3">
              <span className="text-4xl font-black text-primary/80">3</span>
              <h3 className="text-lg font-bold text-foreground">شاركها متى شئت</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                امسح الرمز من شاشتك للتحقق من العضوية واستخدامها في فعاليات النادي.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Pass modal */}
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
