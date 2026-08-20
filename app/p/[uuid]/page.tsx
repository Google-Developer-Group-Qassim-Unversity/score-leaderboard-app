"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  WalletCardData,
  ProfileSocialLink,
} from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Globe,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Send,
  MessageSquare,
  ShieldCheck,
} from "lucide-react"

export default function PublicProfilePage() {
  const params = useParams()
  const uuid = params?.uuid as string

  const [card, setCard] = useState<WalletCardData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch public card data
  useEffect(() => {
    if (!uuid) return

    fetch(`/api/wallet/${uuid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then((data) => {
        if (data.card) {
          const loadedCard: WalletCardData = {
            ...data.card,
            visibility: {
              showPhone: data.card.visibility?.showPhone ?? false,
              showEmail: data.card.visibility?.showEmail ?? false,
              showAcademic: data.card.visibility?.showAcademic ?? true,
              showBio: data.card.visibility?.showBio ?? true,
            },
            socialLinks: data.card.socialLinks || [],
          }
          setCard(loadedCard)
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err)
      })
      .finally(() => setLoading(false))
  }, [uuid])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-blue-500" />
      case "github":
        return <Github className="w-5 h-5 text-foreground" />
      case "x":
        return <Twitter className="w-5 h-5 text-foreground" />
      case "instagram":
        return <Instagram className="w-5 h-5 text-pink-500" />
      case "telegram":
        return <Send className="w-5 h-5 text-sky-400" />
      case "discord":
        return <MessageSquare className="w-5 h-5 text-indigo-400" />
      default:
        return <Globe className="w-5 h-5 text-emerald-500" />
    }
  }

  const getPlatformDefaultName = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return "LinkedIn"
      case "github":
        return "GitHub"
      case "x":
        return "X (تويتر)"
      case "instagram":
        return "Instagram"
      case "telegram":
        return "Telegram"
      case "discord":
        return "Discord"
      default:
        return "الموقع الشخصي"
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-muted-foreground">جاري تحميل الملف الشخصي...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-4" dir="rtl">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-black text-foreground">عذراً، الملف الشخصي غير موجود</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          قد يكون الرابط غير صحيح أو تم تحديثه.
        </p>
        <Link href="/wallet">
          <Button className="font-bold rounded-xl shadow-md">أنشئ بطاقتك وملفك الآن 🚀</Button>
        </Link>
      </div>
    )
  }

  // Visibility flags
  const showPhone = Boolean(card.visibility?.showPhone && card.phone)
  const showEmail = Boolean(card.visibility?.showEmail && card.email)
  const showAcademic = card.visibility?.showAcademic !== false && (card.institution || card.major)
  const showBio = Boolean(card.visibility?.showBio !== false && card.bio)

  const initials = card.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/20 to-background" dir="rtl">
      <div className="max-w-lg mx-auto space-y-8">
        {/* ================= CLEAN MODERN BIO / PORTFOLIO VIEW ================= */}
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Profile Hero Card */}
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-4 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none" />

            {/* Avatar Initials with Verified Badge */}
            <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-indigo-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-2xl font-black text-primary">
                {initials || "GDG"}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center text-white text-[10px]" title="عضو موثق">
                ✓
              </div>
            </div>

            {/* Name & Academic Title */}
            <div className="space-y-2 relative">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                {card.fullName}
              </h1>

              {showAcademic && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground border">
                  <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  <span>
                    {card.institution || "جامعة القصيم"}
                    {card.major ? ` · ${card.major}` : ""}
                    {card.studyYearOrLevel ? ` · ${card.studyYearOrLevel}` : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Bio Description */}
            {showBio && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto pt-1 font-medium">
                {card.bio}
              </p>
            )}
          </div>

          {/* Direct Contact Info (if owner permitted) */}
          {(showEmail || showPhone) && (
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-muted-foreground px-1">معلومات التواصل المباشرة</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {showEmail && card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="p-3.5 bg-card border rounded-2xl flex items-center justify-between hover:bg-accent transition-all group shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 text-right">
                        <div className="text-[10px] text-muted-foreground font-medium">البريد الإلكتروني</div>
                        <div className="text-xs font-mono font-bold text-foreground truncate" dir="ltr">
                          {card.email}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </a>
                )}

                {showPhone && card.phone && (
                  <a
                    href={`https://wa.me/966${card.phone.replace(/^0/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-card border rounded-2xl flex items-center justify-between hover:bg-accent transition-all group shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 text-right">
                        <div className="text-[10px] text-muted-foreground font-medium">واتساب / جوال</div>
                        <div className="text-xs font-mono font-bold text-foreground truncate" dir="ltr">
                          {card.countryCode || "+966"} {card.phone}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Social Links & Websites Grid */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-muted-foreground px-1">الروابط وحسابات التواصل</div>
            {(card.socialLinks || []).length > 0 ? (
              <div className="grid gap-2.5">
                {(card.socialLinks || []).map((link) => (
                  <a
                    key={link.id}
                    href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-card border border-border/80 hover:border-primary/50 hover:shadow-md rounded-2xl flex items-center justify-between transition-all group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        {getPlatformIcon(link.platform)}
                      </div>
                      <div className="min-w-0 text-right">
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          {link.label || getPlatformDefaultName(link.platform)}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono truncate max-w-[280px]" dir="ltr">
                          {link.url}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mr-2" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-card border rounded-2xl text-center space-y-1">
                <Globe className="w-6 h-6 text-muted-foreground mx-auto opacity-50" />
                <div className="text-xs font-bold text-foreground">لا توجد روابط مضافة حالياً</div>
                <p className="text-[11px] text-muted-foreground">صاحب هذا الملف لم يقم بإضافة روابط خارجية بعد.</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= GDG OFFICIAL FOOTER CTA ================= */}
        <div className="pt-4 pb-2 text-center space-y-3 border-t border-border/60">
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground leading-relaxed">
            بطاقة عضوية رقمية معتمدة من نادي قوقل للطلبة المطورين بجامعة القصيم.
          </p>
          <div>
            <Link href="/wallet">
              <Button className="h-11 px-6 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all gap-2 cursor-pointer">
                <Sparkles className="w-4 h-4" />
                <span>انضم إلى النادي وأنشئ بطاقتك وملفك الشخصي</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
