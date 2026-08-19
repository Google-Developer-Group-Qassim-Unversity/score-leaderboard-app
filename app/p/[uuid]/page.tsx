"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useUser, useAuth } from "@clerk/nextjs"
import {
  WalletCardData,
  ProfileSocialLink,
  ProfileVisibility,
  DEFAULT_THEME_ID
} from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ArrowRight,
  Edit3,
  XCircle,
  Plus,
  Trash2,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Lock,
  Loader2,
  CheckCircle2,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Send,
  MessageSquare,
  Save,
  KeyRound,
  ShieldCheck,
  Languages
} from "lucide-react"
import { toast } from "sonner"

export default function PublicProfilePage() {
  const params = useParams()
  const uuid = params?.uuid as string
  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()

  const [card, setCard] = useState<WalletCardData | null>(null)
  const [editFormData, setEditFormData] = useState<WalletCardData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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
          setEditFormData(loadedCard)
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err)
      })
      .finally(() => setLoading(false))
  }, [uuid])

  // Check if current user is owner via Clerk session
  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase()
  const cardEmail = card?.email?.toLowerCase()
  const isOwner = Boolean(isSignedIn && userEmail && cardEmail && userEmail === cardEmail)

  const handleOpenEdit = () => {
    if (!isSignedIn) {
      toast.error("يرجى تسجيل الدخول بحسابك لتعديل بيانات ملفك الشخصي.")
      return
    }
    setIsEditing(true)
  }

  const handleAddSocialLink = () => {
    if (!editFormData) return
    const newLink: ProfileSocialLink = {
      id: Date.now().toString(),
      platform: "linkedin",
      url: "",
      label: "",
    }
    setEditFormData({
      ...editFormData,
      socialLinks: [...(editFormData.socialLinks || []), newLink],
    })
  }

  const handleUpdateSocialLink = (id: string, field: keyof ProfileSocialLink, value: string) => {
    if (!editFormData) return
    setEditFormData({
      ...editFormData,
      socialLinks: (editFormData.socialLinks || []).map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    })
  }

  const handleRemoveSocialLink = (id: string) => {
    if (!editFormData) return
    setEditFormData({
      ...editFormData,
      socialLinks: (editFormData.socialLinks || []).filter((link) => link.id !== id),
    })
  }

  const handleToggleVisibility = (field: keyof ProfileVisibility) => {
    if (!editFormData) return
    setEditFormData({
      ...editFormData,
      visibility: {
        ...editFormData.visibility,
        [field]: !editFormData.visibility?.[field],
      },
    })
  }

  const handleSaveEdit = async () => {
    if (!editFormData) return
    setIsSaving(true)
    try {
      const token = await getToken()
      const res = await fetch("/api/wallet/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          theme_id: editFormData.themeId,
          name_language: editFormData.nameLanguage,
          bio: editFormData.bio,
          social_links: editFormData.socialLinks,
          visibility: editFormData.visibility,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Failed to update profile")
      }

      const result = await res.json()
      const updatedProfile = result.profile

      setCard({
        ...card!,
        themeId: updatedProfile.theme_id,
        nameLanguage: updatedProfile.name_language,
        bio: updatedProfile.bio,
        socialLinks: updatedProfile.social_links,
        visibility: updatedProfile.visibility,
      })
      setIsEditing(false)
      toast.success("تم حفظ التعديلات وإعدادات الخصوصية في قاعدة البيانات بنجاح! ✨")
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "حدث خطأ أثناء حفظ التعديلات")
    } finally {
      setIsSaving(false)
    }
  }

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
          قد يكون الرابط غير صحيح أو تم حذفه.
        </p>
        <Link href="/wallet">
          <Button className="font-bold">أنشئ ملفك الآن 🚀</Button>
        </Link>
      </div>
    )
  }

  // Visibility flags
  const showPhone = Boolean(card.visibility?.showPhone && card.phone)
  const showEmail = Boolean(card.visibility?.showEmail && card.email)
  const showAcademic = card.visibility?.showAcademic !== false && card.institution
  const showBio = Boolean(card.visibility?.showBio !== false && card.bio)

  const initials = card.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/20 to-background" dir="rtl">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Navigation & Controls Bar */}
        <div className="flex items-center justify-between">
          <Link href="/wallet" className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            <span>صانع الهوية</span>
          </Link>

          {isOwner && (
            <Button
              size="sm"
              variant={isEditing ? "destructive" : "outline"}
              onClick={isEditing ? () => setIsEditing(false) : handleOpenEdit}
              className="h-8 text-xs gap-1.5 rounded-full font-bold shadow-xs"
            >
              {isEditing ? (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  <span>إلغاء التعديل</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل الملف والخصوصية</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* ================= EDIT MODE FORM ================= */}
        {isEditing && editFormData ? (
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">تعديل الملف وإدارة الخصوصية</h3>
                  <p className="text-[11px] text-muted-foreground">بياناتك الأساسية موثقة في قاعدة بيانات النادي</p>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-primary" />
                <span>لغة عرض الاسم</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditFormData({ ...editFormData, nameLanguage: "ar" })}
                  className={`h-9 rounded-xl border text-xs font-bold ${
                    editFormData.nameLanguage === "ar" ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                  }`}
                >
                  العربية (الاسم)
                </button>
                <button
                  type="button"
                  onClick={() => setEditFormData({ ...editFormData, nameLanguage: "en" })}
                  className={`h-9 rounded-xl border text-xs font-bold ${
                    editFormData.nameLanguage === "en" ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                  }`}
                >
                  English (Name)
                </button>
              </div>
            </div>

            {/* Bio Info */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-bio" className="text-xs font-bold text-foreground">نبذة شخصية (Bio)</Label>
              <textarea
                id="edit-bio"
                rows={3}
                value={editFormData.bio || ""}
                placeholder="اكتب نبذة مختصرة عن اهتماماتك أو مهاراتك..."
                onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                className="w-full p-3 rounded-xl border border-input bg-card text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* ================= PRIVACY TOGGLES ================= */}
            <div className="border-t pt-4 space-y-3">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>إعدادات الخصوصية والظهور</span>
              </Label>
              <div className="bg-muted/40 p-4 rounded-2xl border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-foreground">إظهار رقم الجوال</div>
                    <div className="text-[10px] text-muted-foreground">معطّل افتراضياً لحماية خصوصيتك</div>
                  </div>
                  <Switch
                    checked={editFormData.visibility?.showPhone ?? false}
                    onCheckedChange={() => handleToggleVisibility("showPhone")}
                  />
                </div>

                <div className="flex items-center justify-between border-t pt-2.5">
                  <div>
                    <div className="text-xs font-semibold text-foreground">إظهار البريد الإلكتروني</div>
                    <div className="text-[10px] text-muted-foreground">معطّل افتراضياً لحماية خصوصيتك</div>
                  </div>
                  <Switch
                    checked={editFormData.visibility?.showEmail ?? false}
                    onCheckedChange={() => handleToggleVisibility("showEmail")}
                  />
                </div>

                <div className="flex items-center justify-between border-t pt-2.5">
                  <div>
                    <div className="text-xs font-semibold text-foreground">إظهار الكلية والمستوى</div>
                    <div className="text-[10px] text-muted-foreground">عرض بياناتك الأكاديمية أعلى الملف</div>
                  </div>
                  <Switch
                    checked={editFormData.visibility?.showAcademic ?? true}
                    onCheckedChange={() => handleToggleVisibility("showAcademic")}
                  />
                </div>
              </div>
            </div>

            {/* ================= SOCIAL LINKS MANAGEMENT ================= */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>روابط التواصل والمواقع الشخصية</span>
                </Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleAddSocialLink}
                  className="h-7 text-xs gap-1 rounded-lg"
                >
                  <Plus className="w-3 h-3" />
                  <span>إضافة رابط</span>
                </Button>
              </div>

              <div className="space-y-3">
                {(editFormData.socialLinks || []).length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-3 bg-muted/20 rounded-xl border border-dashed">
                    لا توجد روابط مضافة حالياً. اضغط &quot;إضافة رابط&quot; لإضافة حساباتك.
                  </p>
                ) : (
                  (editFormData.socialLinks || []).map((link) => (
                    <div key={link.id} className="p-3 bg-muted/40 rounded-2xl border space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <select
                          value={link.platform}
                          onChange={(e) => handleUpdateSocialLink(link.id, "platform", e.target.value)}
                          className="h-8 px-2 rounded-lg border bg-card text-xs font-medium"
                        >
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="x">X (تويتر)</option>
                          <option value="instagram">Instagram</option>
                          <option value="telegram">Telegram</option>
                          <option value="discord">Discord</option>
                          <option value="website">موقع شخصي</option>
                        </select>

                        <Input
                          placeholder="عنوان الرابط (اختياري)"
                          value={link.label || ""}
                          onChange={(e) => handleUpdateSocialLink(link.id, "label", e.target.value)}
                          className="h-8 text-xs rounded-lg flex-1"
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveSocialLink(link.id)}
                          className="h-8 w-8 text-red-500 hover:bg-red-500/10 rounded-lg shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      <Input
                        placeholder="https://..."
                        value={link.url}
                        dir="ltr"
                        onChange={(e) => handleUpdateSocialLink(link.id, "url", e.target.value)}
                        className="h-8 text-xs rounded-lg font-mono bg-card"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <Button
                type="button"
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="w-full h-11 text-xs font-bold gap-2 rounded-xl shadow-md"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>حفظ التعديلات في قاعدة البيانات</span>
              </Button>
            </div>
          </div>
        ) : (
          /* ================= CLEAN MODERN BIO / PORTFOLIO VIEW ================= */
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            {/* Profile Hero Card */}
            <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-4 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none" />

              {/* Avatar Initials */}
              <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-indigo-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-2xl font-black text-primary">
                  {initials || "GDG"}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              </div>

              {/* Name & Academic Title */}
              <div className="space-y-1.5 relative">
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  {card.fullName}
                </h1>

                {showAcademic && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground border">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {card.institution || "جامعة القصيم"}
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

            {/* Direct Contact Info */}
            {(showEmail || showPhone) && (
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-muted-foreground px-1">معلومات التواصل المباشرة</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {showEmail && card.email && (
                    <a
                      href={`mailto:${card.email}`}
                      className="p-3.5 bg-card border rounded-2xl flex items-center justify-between hover:bg-accent transition-all group"
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
                      className="p-3.5 bg-card border rounded-2xl flex items-center justify-between hover:bg-accent transition-all group"
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

            {/* Social Links & Websites Bento Grid */}
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
                  <p className="text-[11px] text-muted-foreground">صاحب هذا الملف لم يقم بإضافة روابط خارجية حتى الآن.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
