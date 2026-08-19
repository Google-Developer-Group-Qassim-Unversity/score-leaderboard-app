"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { WALLET_THEMES, WalletCardData, DEFAULT_THEME_ID, UserStatus, EducationLevel } from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Check, GraduationCap, School, ShieldCheck } from "lucide-react"

interface WalletFormProps {
  data: WalletCardData
  onChange: (newData: WalletCardData) => void
  onSubmit: () => void
  isSubmitting?: boolean
}

export function WalletForm({ data, onChange, onSubmit, isSubmitting = false }: WalletFormProps) {
  const searchParams = useSearchParams()
  const isAdminParam = searchParams?.get("admin") === "true"

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

  const handleStatusSelect = (status: UserStatus) => {
    onChange({
      ...data,
      userStatus: status,
      educationLevel: "",
      institution: "",
      major: "",
      studyYearOrLevel: "",
    })
  }

  const handleEducationLevelSelect = (level: EducationLevel) => {
    onChange({
      ...data,
      educationLevel: level,
      institution: level === "university" ? "جامعة القصيم" : "",
      major: "",
      studyYearOrLevel: "",
    })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!data.fullName?.trim()) {
      newErrors.fullName = "الرجاء إدخال الاسم الكامل"
    }
    if (!data.englishName?.trim()) {
      newErrors.englishName = "الرجاء إدخال الاسم بالإنجليزية"
    }
    if (!data.email?.trim()) {
      newErrors.email = "الرجاء إدخال البريد الإلكتروني"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "صيغة البريد الإلكتروني غير صحيحة"
    }
    if (!data.phone?.trim()) {
      newErrors.phone = "الرجاء إدخال رقم الجوال"
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

  const popularMajors = [
    "علوم حاسب",
    "هندسة برمجيات",
    "ذكاء اصطناعي",
    "أمن سيبراني",
    "تقنية معلومات",
    "نظم معلومات",
  ]

  const studyLevels = [
    "المستوى 1",
    "المستوى 2",
    "المستوى 3",
    "المستوى 4",
    "المستوى 5",
    "المستوى 6",
    "المستوى 7",
    "المستوى 8",
    "المستوى 9",
    "المستوى 10",
  ]

  const highSchoolGrades = ["أول ثانوي", "ثاني ثانوي", "ثالث ثانوي"]

  // Only show public member themes (Blue & Red) by default.
  // Gold Admin card is completely hidden unless ?admin=true is specified in URL.
  const themes = Object.values(WALLET_THEMES).filter(
    (t) => !t.isAdmin || isAdminParam
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* 1. Arabic name */}
      <div className="space-y-1.5">
        <Label htmlFor="fullName" className="text-xs font-bold text-foreground">
          الاسم بالعربية <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="مثال: بسام الحبيب"
          value={data.fullName}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          className={`h-11 rounded-xl ${errors.fullName ? "border-red-500 ring-1 ring-red-500" : ""}`}
        />
        {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
      </div>

      {/* 2. English name */}
      <div className="space-y-1.5">
        <Label htmlFor="englishName" className="text-xs font-bold text-foreground">
          الاسم بالإنجليزية <span className="text-red-500">*</span>
        </Label>
        <Input
          id="englishName"
          dir="ltr"
          placeholder="Example: Bassam Alhabib"
          value={data.englishName || ""}
          onChange={(e) => handleFieldChange("englishName", e.target.value)}
          className={`h-11 rounded-xl ${errors.englishName ? "border-red-500 ring-1 ring-red-500" : ""}`}
        />
        {errors.englishName && <p className="text-xs text-red-500">{errors.englishName}</p>}
      </div>

      {/* 3. Mobile Phone (رقم الجوال) */}
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-xs font-bold text-foreground">
          رقم الجوال <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2" dir="ltr">
          <div className="w-24 h-11 rounded-xl border border-input bg-muted/40 flex items-center justify-center font-mono text-xs font-bold text-muted-foreground select-none shrink-0">
            🇸🇦 +966
          </div>
          <Input
            id="phone"
            type="tel"
            placeholder="5XXXXXXXX"
            value={data.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            className={`h-11 rounded-xl font-mono text-left ${
              errors.phone ? "border-red-500 ring-1 ring-red-500" : ""
            }`}
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* 3. Email (البريد الإلكتروني) */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-bold text-foreground">
          البريد الإلكتروني <span className="text-red-500">*</span>
        </Label>
        <p className="text-[11px] text-muted-foreground">
          سنرسل لك رابط بطاقتك لتعديلها متى شئت.
        </p>
        <Input
          id="email"
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className={`h-11 rounded-xl ${errors.email ? "border-red-500 ring-1 ring-red-500" : ""}`}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* ================= STEP-BY-STEP ACADEMIC QUESTIONS ================= */}
      <div className="space-y-4 pt-2 border-t border-border/60">
        {/* Question 1: طالب أو خريج؟ */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>هل أنت طالب أم خريج؟</span>
          </Label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleStatusSelect("student")}
              className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                data.userStatus === "student"
                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                  : "border-border hover:bg-accent text-muted-foreground"
              }`}
            >
              <School className="w-4 h-4" />
              <span>طالب</span>
              {data.userStatus === "student" && <Check className="w-3.5 h-3.5 mr-auto stroke-[3]" />}
            </button>

            <button
              type="button"
              onClick={() => handleStatusSelect("graduate")}
              className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                data.userStatus === "graduate"
                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                  : "border-border hover:bg-accent text-muted-foreground"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>خريج</span>
              {data.userStatus === "graduate" && <Check className="w-3.5 h-3.5 mr-auto stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* IF STUDENT: Question 2: جامعي أو ثانوي؟ */}
        {data.userStatus === "student" && (
          <div className="space-y-4 pt-2 p-4 bg-muted/40 rounded-2xl border border-border/80 animate-in fade-in-50 duration-300">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-foreground">
                المرحلة الدراسية؟
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleEducationLevelSelect("university")}
                  className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    data.educationLevel === "university"
                      ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                      : "border-border bg-card hover:bg-accent text-muted-foreground"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>جامعي</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEducationLevelSelect("highschool")}
                  className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    data.educationLevel === "highschool"
                      ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                      : "border-border bg-card hover:bg-accent text-muted-foreground"
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span>ثانوي</span>
                </button>
              </div>
            </div>

            {/* University Fields */}
            {data.educationLevel === "university" && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-xs font-bold text-foreground">
                    أي جامعة؟
                  </Label>
                  <Input
                    id="institution"
                    placeholder="جامعة القصيم"
                    value={data.institution || ""}
                    onChange={(e) => handleFieldChange("institution", e.target.value)}
                    className="h-10 text-xs rounded-xl bg-card"
                  />
                </div>

                {/* Major (التخصص) */}
                <div className="space-y-1.5">
                  <Label htmlFor="major" className="text-xs font-bold text-foreground">
                    التخصص
                  </Label>
                  <Input
                    id="major"
                    placeholder="اكتب تخصصك (مثلاً: علوم حاسب)"
                    value={data.major || ""}
                    onChange={(e) => handleFieldChange("major", e.target.value)}
                    className="h-10 text-xs rounded-xl bg-card"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {popularMajors.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleFieldChange("major", m)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                          data.major === m
                            ? "bg-primary text-primary-foreground border-primary font-bold"
                            : "bg-card text-muted-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Study Level (المستوى) */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground">
                    أي مستوى؟
                  </Label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {studyLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleFieldChange("studyYearOrLevel", lvl)}
                        className={`h-9 rounded-lg border text-[11px] font-medium transition-all ${
                          data.studyYearOrLevel === lvl
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border bg-card hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* High School Fields */}
            {data.educationLevel === "highschool" && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-xs font-bold text-foreground">
                    أي مدرسة؟
                  </Label>
                  <Input
                    id="institution"
                    placeholder="اسم المدرسة الثانوية"
                    value={data.institution || ""}
                    onChange={(e) => handleFieldChange("institution", e.target.value)}
                    className="h-10 text-xs rounded-xl bg-card"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground">
                    أي مرحلة؟
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {highSchoolGrades.map((grade) => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => handleFieldChange("studyYearOrLevel", grade)}
                        className={`h-9 rounded-lg border text-xs font-medium transition-all ${
                          data.studyYearOrLevel === grade
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border bg-card hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* IF GRADUATE: University & Major */}
        {data.userStatus === "graduate" && (
          <div className="space-y-3.5 pt-2 p-4 bg-muted/40 rounded-2xl border border-border/80 animate-in fade-in-50 duration-300">
            <div className="space-y-1.5">
              <Label htmlFor="institution" className="text-xs font-bold text-foreground">
                خريج أي جامعة؟
              </Label>
              <Input
                id="institution"
                placeholder="جامعة القصيم"
                value={data.institution || ""}
                onChange={(e) => handleFieldChange("institution", e.target.value)}
                className="h-10 text-xs rounded-xl bg-card"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="major" className="text-xs font-bold text-foreground">
                التخصص
              </Label>
              <Input
                id="major"
                placeholder="مثال: علوم حاسب / هندسة برمجيات"
                value={data.major || ""}
                onChange={(e) => handleFieldChange("major", e.target.value)}
                className="h-10 text-xs rounded-xl bg-card"
              />
            </div>
          </div>
        )}
      </div>

      {/* ================= 4. PUBLIC MEMBER CARD THEME PICKER ================= */}
      <div className="space-y-3 pt-2 border-t border-border/60">
        <Label className="text-xs font-bold text-foreground block">اختر نوع البطاقة</Label>
        
        <div className={`grid gap-3 ${themes.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
          {themes.map((theme) => {
            const isSelected = (data.themeId || DEFAULT_THEME_ID) === theme.id
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleFieldChange("themeId", theme.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2.5 relative overflow-hidden ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-2 ring-primary shadow-sm"
                    : "border-border hover:bg-accent bg-card"
                }`}
              >
                {/* Color Dot Indicator */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xs"
                  style={{ background: theme.swatchHex }}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                {/* Card Label */}
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

        {isAdminParam && (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>تم تفعيل وضع بطاقة الإدارة الذهبية عبر رابط الإدارة.</span>
          </div>
        )}
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
              <span>جاري إنشاء البطاقة...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>أنشئ بطاقتي 🪪</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
