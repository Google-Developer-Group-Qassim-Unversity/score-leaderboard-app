"use client"

import { useState } from "react"
import { WALLET_THEMES, WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Check, ShieldCheck, Globe, Languages } from "lucide-react"

interface WalletFormProps {
  data: WalletCardData
  onChange: (newData: WalletCardData) => void
  onSubmit: () => void
  isSubmitting?: boolean
}

export function WalletForm({ data, onChange, onSubmit, isSubmitting = false }: WalletFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleFieldChange = (field: keyof WalletCardData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!data.fullName?.trim()) {
      newErrors.fullName = "الاسم غير مسجل في الحساب"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit()
    }
  }

  // Filter themes based on admin status
  const themes = Object.values(WALLET_THEMES).filter(
    (t) => !t.isAdmin || data.isAdmin
  )

  const currentLang = data.nameLanguage || "ar"

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* 1. Official Member Name (Single Name from DB) */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-xs font-bold text-foreground flex items-center justify-between">
          <span>اسم العضو المسجل بالنادي</span>
          {data.uniId && <span className="text-[11px] font-mono text-muted-foreground">الرقم الجامعي: {data.uniId}</span>}
        </Label>
        <Input
          id="fullName"
          value={data.fullName || ""}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          placeholder="اسم العضو"
          className="h-11 text-xs rounded-xl bg-muted/40 font-bold"
          dir="auto"
        />
        {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName}</p>}
      </div>

      {/* 2. Language Preference Selector */}
      <div className="space-y-2.5 p-4 rounded-2xl bg-muted/40 border border-border/80">
        <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Languages className="w-4 h-4 text-primary" />
          <span>لغة عرض الاسم على البطاقة</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleFieldChange("nameLanguage", "ar")}
            className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              currentLang === "ar"
                ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                : "border-border hover:bg-accent text-muted-foreground bg-card"
            }`}
          >
            <span>العربية (الاسم)</span>
            {currentLang === "ar" && <Check className="w-3.5 h-3.5 mr-auto stroke-[3]" />}
          </button>

          <button
            type="button"
            onClick={() => handleFieldChange("nameLanguage", "en")}
            className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              currentLang === "en"
                ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                : "border-border hover:bg-accent text-muted-foreground bg-card"
            }`}
          >
            <span>English (Name)</span>
            {currentLang === "en" && <Check className="w-3.5 h-3.5 mr-auto stroke-[3]" />}
          </button>
        </div>
      </div>

      {/* 3. Theme Selection */}
      <div className="space-y-3 pt-2 border-t border-border/60">
        <Label className="text-xs font-bold text-foreground block">اختر نوع وتصميم البطاقة</Label>
        
        <div className={`grid gap-3 ${themes.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
          {themes.map((theme) => {
            const isSelected = (data.themeId || DEFAULT_THEME_ID) === theme.id
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleFieldChange("themeId", theme.id)}
                className={`p-3 rounded-2xl border text-right transition-all relative overflow-hidden flex flex-col gap-2 ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs"
                    : "border-border/80 hover:border-primary/40 bg-card hover:bg-accent/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-5 h-5 rounded-full border shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: theme.swatchHex }}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  {theme.isAdmin && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                      إدارة
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs font-bold text-foreground">{theme.nameAr}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">
                    {theme.isAdmin ? "الإدارة" : theme.gender === "female" ? "بنات" : "شباب"}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {data.isAdmin && (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>تم التحقق من رتبتك الإدارية — مؤهل لإصدار بطاقة الإدارة الذهبية.</span>
          </div>
        )}
      </div>

      {/* 4. Bio Description (Optional) */}
      <div className="space-y-1.5 pt-2 border-t border-border/60">
        <Label htmlFor="bio" className="text-xs font-bold text-foreground">
          نبذة شخصية للملف العام (Bio) <span className="text-muted-foreground font-normal">(اختياري)</span>
        </Label>
        <textarea
          id="bio"
          rows={3}
          value={data.bio || ""}
          placeholder="اكتب نبذة مختصرة عن اهتماماتك التقنية أو مهاراتك لتظهر في صفحتك الشخصية..."
          onChange={(e) => handleFieldChange("bio", e.target.value)}
          className="w-full p-3 rounded-xl border border-input bg-card text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md transition-all gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري حفظ وتجهيز البطاقة...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>حفظ وتجهيز بطاقتي 🪪</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
