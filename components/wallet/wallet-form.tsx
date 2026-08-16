"use client"

import { useState } from "react"
import { WALLET_THEMES, WalletCardData, DEFAULT_THEME_ID, UserStatus, EducationLevel } from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Check, GraduationCap, School, BookOpen } from "lucide-react"

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
      institution: "",
      major: "",
      studyYearOrLevel: "",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!data.fullName.trim()) {
      newErrors.fullName = "الرجاء إدخال اسمك"
    }
    if (!data.phone.trim()) {
      newErrors.phone = "الرجاء إدخال رقم الجوال"
    }
    if (!data.email.trim() || !data.email.includes("@")) {
      newErrors.email = "الرجاء إدخال بريد إلكتروني صحيح"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit()
  }

  const themes = Object.values(WALLET_THEMES)

  const commonMajors = [
    "علوم حاسب",
    "هندسة برمجيات",
    "ذكاء اصطناعي",
    "أمن سيبراني",
    "تقنية معلومات",
    "نظم معلومات",
    "هندسة حاسب",
    "إدارة أعمال",
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 transition-all"
      dir="rtl"
    >
      {/* 1. Full Name */}
      <div className="space-y-1.5">
        <Label htmlFor="fullName" className="text-xs font-bold text-foreground">
          اسمك الكامل <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="عزام الخضيري"
          value={data.fullName}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          className={`h-11 rounded-xl ${errors.fullName ? "border-red-500 ring-1 ring-red-500" : ""}`}
        />
        {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
      </div>

      {/* 2. Phone Number */}
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-xs font-bold text-foreground">
          رقم الجوال <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2" dir="ltr">
          <div className="w-20 shrink-0 flex items-center justify-center bg-muted border border-input rounded-xl text-xs font-semibold text-muted-foreground">
            🇸🇦 +966
          </div>
          <Input
            id="phone"
            type="tel"
            placeholder="551234567"
            value={data.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            className={`h-11 rounded-xl flex-1 ${errors.phone ? "border-red-500 ring-1 ring-red-500" : ""}`}
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500 text-right">{errors.phone}</p>}
      </div>

      {/* 3. Email Address */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-bold text-foreground">
          البريد الإلكتروني <span className="text-red-500">*</span>
        </Label>
        <p className="text-[11px] text-muted-foreground">
          سنرسل لك رابط بطاقتك وتعديلها متى شئت.
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
                  <span>جامعي 🎓</span>
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
                  <span>ثانوي 🎒</span>
                </button>
              </div>
            </div>

            {/* IF UNIVERSITY STUDENT */}
            {data.educationLevel === "university" && (
              <div className="space-y-3.5 pt-2 animate-in fade-in-50 duration-300">
                {/* الجامعة */}
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
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["جامعة القصيم", "جامعة الملك سعود", "جامعة الإمام", "جامعة أخرى"].map((uni) => (
                      <button
                        key={uni}
                        type="button"
                        onClick={() => handleFieldChange("institution", uni === "جامعة أخرى" ? "" : uni)}
                        className="text-[10px] px-2.5 py-1 rounded-lg border bg-card hover:bg-accent text-muted-foreground font-medium"
                      >
                        {uni}
                      </button>
                    ))}
                  </div>
                </div>

                {/* التخصص */}
                <div className="space-y-1.5">
                  <Label htmlFor="major" className="text-xs font-bold text-foreground">
                    التخصص الدراسي
                  </Label>
                  <Input
                    id="major"
                    placeholder="مثال: علوم حاسب / ذكاء اصطناعي"
                    value={data.major || ""}
                    onChange={(e) => handleFieldChange("major", e.target.value)}
                    className="h-10 text-xs rounded-xl bg-card"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {commonMajors.map((mj) => (
                      <button
                        key={mj}
                        type="button"
                        onClick={() => handleFieldChange("major", mj)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                          data.major === mj
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "bg-card hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        {mj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* المستوى الدراسي */}
                <div className="space-y-1.5">
                  <Label htmlFor="studyYearOrLevel" className="text-xs font-bold text-foreground">
                    المستوى الدراسي
                  </Label>
                  <select
                    id="studyYearOrLevel"
                    value={data.studyYearOrLevel || ""}
                    onChange={(e) => handleFieldChange("studyYearOrLevel", e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">اختر المستوى</option>
                    <option value="المستوى 1">المستوى 1</option>
                    <option value="المستوى 2">المستوى 2</option>
                    <option value="المستوى 3">المستوى 3</option>
                    <option value="المستوى 4">المستوى 4</option>
                    <option value="المستوى 5">المستوى 5</option>
                    <option value="المستوى 6">المستوى 6</option>
                    <option value="المستوى 7">المستوى 7</option>
                    <option value="المستوى 8">المستوى 8</option>
                    <option value="المستوى 9">المستوى 9</option>
                    <option value="المستوى 10">المستوى 10</option>
                  </select>
                </div>
              </div>
            )}

            {/* IF HIGH SCHOOL STUDENT */}
            {data.educationLevel === "highschool" && (
              <div className="space-y-3 pt-2 animate-in fade-in-50 duration-300">
                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-xs font-bold text-foreground">
                    اسم المدرسة؟
                  </Label>
                  <Input
                    id="institution"
                    placeholder="مثال: ثانوية الفهد"
                    value={data.institution || ""}
                    onChange={(e) => handleFieldChange("institution", e.target.value)}
                    className="h-10 text-xs rounded-xl bg-card"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="studyYearOrLevel" className="text-xs font-bold text-foreground">
                    أي سنة؟
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["أول ثانوي", "ثاني ثانوي", "ثالث ثانوي"].map((grade) => (
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

        {/* IF GRADUATE: University, Major & Graduation year */}
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
                التخصص الذي تخرجت منه
              </Label>
              <Input
                id="major"
                placeholder="مثال: علوم حاسب / هندسة برمجيات"
                value={data.major || ""}
                onChange={(e) => handleFieldChange("major", e.target.value)}
                className="h-10 text-xs rounded-xl bg-card"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="studyYearOrLevel" className="text-xs font-bold text-foreground">
                سنة التخرج (اختياري)
              </Label>
              <Input
                id="studyYearOrLevel"
                placeholder="مثال: 2024 / 2025"
                value={data.studyYearOrLevel || ""}
                onChange={(e) => handleFieldChange("studyYearOrLevel", e.target.value)}
                className="h-10 text-xs rounded-xl bg-card"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Color Swatches (اختر لوناً) */}
      <div className="space-y-2.5 pt-2 border-t border-border/60">
        <Label className="text-xs font-bold text-foreground block">اختر لوناً</Label>
        <div className="flex flex-wrap gap-3">
          {themes.map((theme) => {
            const isSelected = (data.themeId || DEFAULT_THEME_ID) === theme.id
            return (
              <button
                key={theme.id}
                type="button"
                aria-label={theme.nameAr}
                title={theme.nameAr}
                onClick={() => handleFieldChange("themeId", theme.id)}
                className={`h-11 w-11 rounded-full border-2 transition-all flex items-center justify-center shadow-xs ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 border-white/40"
                    : "border-border hover:scale-105"
                }`}
                style={{ background: theme.swatchHex }}
              >
                {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </button>
            )
          })}
        </div>
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
