"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser, useAuth, SignInButton } from "@clerk/nextjs"
import {
  WalletCardData,
  ProfileSocialLink,
  ProfileVisibility,
} from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Sparkles,
  Lock,
  Loader2,
  Check,
  Copy,
  Plus,
  Trash2,
  Save,
  LogIn,
  ShieldCheck,
} from "lucide-react"
import { toast } from "sonner"

export default function ProfileEditorPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()

  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [profileData, setProfileData] = useState<WalletCardData | null>(null)

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      setLoading(false)
      return
    }

    const fetchMyProfile = async () => {
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

        if (!prof.uuid) {
          // If no wallet profile exists yet, redirect to /wallet to create one
          router.push("/wallet")
          return
        }

        setProfileData({
          uuid: prof.uuid,
          fullName: data.name || user?.fullName || "عضو GDG",
          nameLanguage: "ar",
          isAdmin: Boolean(data.is_admin),
          uniId: data.uni_id,
          email: data.email || user?.primaryEmailAddress?.emailAddress || "",
          phone: data.phone_number || "",
          countryCode: "+966",
          themeId: prof.theme_id || "gdg-blue",
          userStatus: prof.user_status || "student",
          educationLevel: prof.education_level || "university",
          institution: prof.institution || data.uni_college || "جامعة القصيم",
          major: prof.major || data.uni_college || "علوم حاسب",
          studyYearOrLevel: prof.study_year_or_level || (data.uni_level ? `المستوى ${data.uni_level}` : ""),
          bio: prof.bio || "",
          socialLinks: prof.social_links || [],
          visibility: prof.visibility || {
            showPhone: false,
            showEmail: false,
            showAcademic: true,
            showBio: true,
          },
        })
      } catch (err) {
        console.error("Error loading editor profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyProfile()
  }, [isLoaded, isSignedIn, getToken, user, router])

  const handleAddSocialLink = () => {
    if (!profileData) return
    const newLink: ProfileSocialLink = {
      id: Date.now().toString(),
      platform: "linkedin",
      url: "",
      label: "",
    }
    setProfileData({
      ...profileData,
      socialLinks: [...(profileData.socialLinks || []), newLink],
    })
  }

  const handleUpdateSocialLink = (id: string, field: keyof ProfileSocialLink, value: string) => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      socialLinks: (profileData.socialLinks || []).map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    })
  }

  const handleRemoveSocialLink = (id: string) => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      socialLinks: (profileData.socialLinks || []).filter((link) => link.id !== id),
    })
  }

  const handleToggleVisibility = (field: keyof ProfileVisibility) => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      visibility: {
        ...profileData.visibility,
        [field]: !profileData.visibility?.[field],
      },
    })
  }

  const handleSave = async () => {
    if (!profileData) return
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
          custom_name: profileData.fullName,
          theme_id: profileData.themeId,
          user_status: profileData.userStatus,
          education_level: profileData.educationLevel,
          institution: profileData.institution,
          major: profileData.major,
          study_year_or_level: profileData.studyYearOrLevel,
          bio: profileData.bio,
          social_links: profileData.socialLinks,
          visibility: profileData.visibility,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Failed to update profile")
      }

      toast.success("تم حفظ التعديلات وإعدادات الخصوصية بنجاح! ✨")
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "حدث خطأ أثناء حفظ التعديلات")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyPublicLink = async () => {
    if (!profileData?.uuid) return
    const publicUrl = `${window.location.origin}/p/${profileData.uuid}`
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(publicUrl)
      }
      setCopied(true)
      toast.success("تم نسخ رابط صفحتك الشخصية بنجاح!")
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error("تعذر نسخ الرابط")
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-xs font-bold text-muted-foreground">جاري فتح لوحة التحكم...</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-5" dir="rtl">
        <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h1 className="text-2xl font-black text-foreground">تسجيل الدخول مطلوب</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            يرجى تسجيل الدخول بحسابك الجامعي المعتمد لإدارة روابطك وإعدادات خصوصية ملفك الشخصي.
          </p>
        </div>
        <SignInButton mode="modal">
          <Button className="h-11 px-8 rounded-xl font-bold gap-2 shadow-md">
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول بحساب العضو 🚀</span>
          </Button>
        </SignInButton>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4" dir="rtl">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-foreground">لم تنشئ بطاقة عضويتك بعد</h2>
        <p className="text-xs text-muted-foreground max-w-sm">
          قم بإنشاء بطاقتك الرقمية أولاً ليتم تفعيل صفحتك الشخصية المعتمدة.
        </p>
        <Link href="/wallet">
          <Button className="h-11 px-6 rounded-xl font-bold">إنشاء بطاقة العضوية 🪪</Button>
        </Link>
      </div>
    )
  }

  const publicUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${profileData.uuid}`

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/20 to-background" dir="rtl">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Top Bar Header */}
        <div className="flex items-center justify-between">
          <Link href="/wallet" className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            <span>صانع البطاقة</span>
          </Link>

          <Link href={`/p/${profileData.uuid}`} target="_blank">
            <Button size="sm" variant="outline" className="h-8 text-xs font-bold gap-1.5 rounded-full shadow-xs">
              <span>معاينة صفحتك</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        {/* Header Banner */}
        <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-lg font-black text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>لوحة تحكم الروابط والملف</span>
              </h1>
              <p className="text-[11px] text-muted-foreground">
                تحكّم بروابطك، نبذتك الشخصية، وما يظهر للجمهور في صفحتك
              </p>
            </div>

            <Button
              size="sm"
              variant={copied ? "default" : "outline"}
              onClick={handleCopyPublicLink}
              className="h-8 text-xs font-bold gap-1 rounded-xl shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>
            </Button>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground p-2 rounded-xl bg-muted/50 border border-border/60 truncate" dir="ltr">
            {publicUrl}
          </div>
        </div>

        {/* Main Editor Card */}
        <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-md space-y-6">
          {/* 1. Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-xs font-bold text-foreground">نبذة شخصية (Bio)</Label>
            <textarea
              id="bio"
              rows={3}
              value={profileData.bio || ""}
              placeholder="اكتب نبذة مختصرة عن اهتماماتك أو مجالك التقني..."
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-input bg-card text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* 2. Privacy Settings */}
          <div className="border-t pt-4 space-y-3">
            <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>إعدادات الخصوصية والظهور</span>
            </Label>
            <div className="bg-muted/40 p-4 rounded-2xl border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-foreground">إظهار رقم الجوال</div>
                  <div className="text-[10px] text-muted-foreground">معطّل افتراضياً لحماية خصوصيتك</div>
                </div>
                <Switch
                  checked={profileData.visibility?.showPhone ?? false}
                  onCheckedChange={() => handleToggleVisibility("showPhone")}
                />
              </div>

              <div className="flex items-center justify-between border-t pt-2.5">
                <div>
                  <div className="text-xs font-semibold text-foreground">إظهار البريد الإلكتروني</div>
                  <div className="text-[10px] text-muted-foreground">معطّل افتراضياً لحماية خصوصيتك</div>
                </div>
                <Switch
                  checked={profileData.visibility?.showEmail ?? false}
                  onCheckedChange={() => handleToggleVisibility("showEmail")}
                />
              </div>

              <div className="flex items-center justify-between border-t pt-2.5">
                <div>
                  <div className="text-xs font-semibold text-foreground">إظهار الكلية والمستوى الأكاديمي</div>
                  <div className="text-[10px] text-muted-foreground">عرض بياناتك الأكاديمية أعلى ملفك</div>
                </div>
                <Switch
                  checked={profileData.visibility?.showAcademic ?? true}
                  onCheckedChange={() => handleToggleVisibility("showAcademic")}
                />
              </div>
            </div>
          </div>

          {/* 3. Social Links */}
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
                className="h-8 text-xs font-bold gap-1 rounded-xl border-primary/40 text-primary hover:bg-primary/10"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة رابط</span>
              </Button>
            </div>

            <div className="space-y-3">
              {(profileData.socialLinks || []).length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4 bg-muted/20 rounded-xl border border-dashed">
                  لا توجد روابط مضافة حالياً. اضغط &quot;إضافة رابط&quot; لإضافة حساباتك.
                </p>
              ) : (
                (profileData.socialLinks || []).map((link) => (
                  <div key={link.id} className="p-3.5 bg-muted/40 rounded-2xl border space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <select
                        value={link.platform}
                        onChange={(e) => handleUpdateSocialLink(link.id, "platform", e.target.value as any)}
                        className="h-9 px-2.5 rounded-xl border bg-card text-xs font-bold"
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
                        className="h-9 text-xs rounded-xl flex-1 font-medium bg-card"
                      />

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveSocialLink(link.id)}
                        className="h-9 w-9 text-red-500 hover:bg-red-500/10 rounded-xl shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Input
                      placeholder="https://..."
                      value={link.url}
                      dir="ltr"
                      onChange={(e) => handleUpdateSocialLink(link.id, "url", e.target.value)}
                      className="h-9 text-xs rounded-xl font-mono bg-card"
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
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 text-sm font-bold gap-2 rounded-xl shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري حفظ التعديلات...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات في قاعدة البيانات ✨</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
