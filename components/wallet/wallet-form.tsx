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
      educationLevel: status === "student" ? (data.educationLevel || "university") : "",
      institution: status === "student" ? (data.institution || "جامعة القصيم") : (data.institution || "جامعة القصيم"),
      major: data.major || "",
      studyYearOrLevel: status === "graduate" ? "خريج" : (data.studyYearOrLevel || "المستوى 7"),
    })
  }

  const handleEducationLevelSelect = (level: EducationLevel) => {
    onChange({
      ...data,
      educationLevel: level,
      institution: level === "university" ? "جامعة القصيم" : "",
      major: level === "university" ? (data.major || "علوم حاسب") : "",
      studyYearOrLevel: level === "university" ? "المستوى 7" : "ثالث ثانوي",
    })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!data.fullName?.trim()) {
      newErrors.fullName = "الرجاء إدخال الاسم المفضل على البطاقة"
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

  // Show themes: blue & red, plus gold if admin or ?admin=true
  const themes = Object.values(WALLET_THEMES).filter(
    (t) => !t.isAdmin || data.isAdmin || isAdminParam
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* 1. Name on Card (Fully editable with hint) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="fullName" className="text-xs font-bold text-foreground">
            الاسم على البطاقة <span className="text-red-500">*</span>
          </Label>
          <span className="text-[11px] text-muted-foreground">يمكنك كتابة اسمك كما تفضله أن يظهر</span>
        </div>
        <Input
          id="fullName"
          value={data.fullName || ""}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          placeholder="مثال: بسام الحبيب أو بسام إبراهيم"
          className="h-11 text-xs rounded-xl bg-card font-bold"
          dir="auto"
        />
        {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName}</p>}
      </div>

      {/* 2. Academic Stages & Status (Student / Graduate) */}
      <div className="space-y-4 pt-2 border-t border-border/60">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-foreground block">
            المرحلة والحالة الدراسية الحالية
          </Label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleStatusSelect("student")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                data.userStatus === "student"
                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20 font-bold"
                  : "border-border hover:bg-accent text-muted-foreground bg-card font-medium"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs">طالب حالي</span>
            </button>

            <button
              type="button"
              onClick={() => handleStatusSelect("graduate")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                data.userStatus === "graduate"
                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20 font-bold"
                  : "border-border hover:bg-accent text-muted-foreground bg-card font-medium"
              }`}
            >
              <School className="w-5 h-5" />
              <span className="text-xs">خريج</span>
            </button>
          </div>
        </div>

        {/* Education Level (University / High School) if student */}
        {data.userStatus === "student" && (
          <div className="space-y-2 bg-muted/30 p-3.5 rounded-2xl border border-border/70 animate-in fade-in-50 duration-200">
            <Label className="text-xs font-bold text-foreground block">
              نوع المرحلة التعليمية
            </Label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleEducationLevelSelect("university")}
                className={`py-2 px-3 rounded-xl border text-xs transition-all ${
                  data.educationLevel === "university"
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                🎓 طالب جامعي
              </button>

              <button
                type="button"
                onClick={() => handleEducationLevelSelect("highschool")}
                className={`py-2 px-3 rounded-xl border text-xs transition-all ${
                  data.educationLevel === "highschool"
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                🏫 طالب ثانوي
              </button>
            </div>
          </div>
        )}

        {/* Academic Details (University / Major / Study Level) */}
        {(data.userStatus === "student" && data.educationLevel === "university") || data.userStatus === "graduate" ? (
          <div className="space-y-3.5 bg-muted/20 p-4 rounded-2xl border border-border/80 animate-in fade-in-50 duration-200">
            {/* Institution / University */}
            <div className="space-y-1.5">
              <Label htmlFor="institution" className="text-xs font-bold text-foreground">الجامعة / الكلية</Label>
              <Input
                id="institution"
                value={data.institution || ""}
                onChange={(e) => handleFieldChange("institution", e.target.value)}
                placeholder="جامعة القصيم"
                className="h-10 text-xs rounded-xl bg-card font-medium"
              />
            </div>

            {/* Major */}
            <div className="space-y-2">
              <Label htmlFor="major" className="text-xs font-bold text-foreground">التخصص الأكاديمي</Label>
              <div className="flex flex-wrap gap-1.5">
                {popularMajors.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleFieldChange("major", m)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      data.major === m
                        ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                        : "bg-card text-muted-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <Input
                id="major"
                value={data.major || ""}
                onChange={(e) => handleFieldChange("major", e.target.value)}
                placeholder="أو اكتب اسم التخصص هنا..."
                className="h-10 text-xs rounded-xl bg-card font-medium"
              />
            </div>

            {/* Study Level (for students) */}
            {data.userStatus === "student" && (
              <div className="space-y-2">
                <Label className="text-xs font-bold text-foreground">المستوى الدراسي الحالي</Label>
                <div className="grid grid-cols-5 gap-1.5">
                  {studyLevels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleFieldChange("studyYearOrLevel", lvl)}
                      className={`text-[11px] py-1.5 px-1 rounded-lg border text-center transition-all ${
                        data.studyYearOrLevel === lvl
                          ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                          : "bg-card text-muted-foreground border-border hover:bg-accent"
                      }`}
                    >
                      {lvl.replace("المستوى ", "م ")}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : data.userStatus === "student" && data.educationLevel === "highschool" ? (
          <div className="space-y-3 bg-muted/20 p-4 rounded-2xl border border-border/80 animate-in fade-in-50 duration-200">
            <div className="space-y-1.5">
              <Label htmlFor="schoolName" className="text-xs font-bold text-foreground">اسم المدرسة (اختياري)</Label>
              <Input
                id="schoolName"
                value={data.institution || ""}
                onChange={(e) => handleFieldChange("institution", e.target.value)}
                placeholder="مثال: ثانوية مجمع الأمير سلطان"
                className="h-10 text-xs rounded-xl bg-card font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-foreground">المرحلة الدراسية</Label>
              <div className="grid grid-cols-3 gap-2">
                {highSchoolGrades.map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => handleFieldChange("studyYearOrLevel", grade)}
                    className={`py-2 text-xs rounded-xl border text-center transition-all ${
                      data.studyYearOrLevel === grade
                        ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                        : "bg-card text-muted-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* 4. Theme Selection */}
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

      {/* 5. Bio Description (Optional) */}
      <div className="space-y-1.5 pt-2 border-t border-border/60">
        <Label htmlFor="bio" className="text-xs font-bold text-foreground">
          نبذة شخصية للملف العام (Bio) <span className="text-muted-foreground font-normal">(اختياري)</span>
        </Label>
        <textarea
          id="bio"
          rows={2}
          value={data.bio || ""}
          placeholder="اكتب نبذة مختصرة عن اهتماماتك التقنية أو مهاراتك..."
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
