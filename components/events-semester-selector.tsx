"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { EVENTS_SEMESTER_OPTIONS } from "@/lib/config"
import { useTranslation } from "react-i18next"
import "@/lib/i18n-client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EventsSemesterSelectorProps {
  currentSemester: number | null
}

export function EventsSemesterSelector({ currentSemester }: EventsSemesterSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === "ar"

  const handleChange = (value: string) => {
    const semester = value === "all" ? null : Number(value)
    const params = new URLSearchParams(searchParams.toString())

    if (semester === null) {
      params.delete("semester")
    } else {
      params.set("semester", String(semester))
    }

    const qs = params.toString()
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false })
    })
  }

  const displayValue = currentSemester === null ? "all" : String(currentSemester)

  return (
    <div className={`flex items-center gap-2 ${rtl ? "mr-auto" : "ml-auto"}`}>
      <label className="text-sm font-medium text-slate-600">
        {t("semester.label")}
      </label>
      <Select
        value={displayValue}
        onValueChange={handleChange}
        disabled={isPending}
        dir={rtl ? "rtl" : "ltr"}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {EVENTS_SEMESTER_OPTIONS.map((option) => (
            <SelectItem
              key={option.labelKey}
              value={option.value === null ? "all" : String(option.value)}
            >
              {option.value === null ? t(option.labelKey) : option.labelKey}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
