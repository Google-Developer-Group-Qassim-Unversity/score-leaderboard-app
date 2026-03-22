"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { AVAILABLE_SEMESTERS, CURRENT_SEMESTER } from "@/lib/constants"
import { useTranslation } from "react-i18next"
import "@/lib/i18n-client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SemesterSelectorProps {
  currentSemester: number
}

export function SemesterSelector({ currentSemester }: SemesterSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === "ar"

  const handleChange = (value: string) => {
    const semester = Number(value)
    const params = new URLSearchParams(searchParams.toString())

    if (semester === CURRENT_SEMESTER) {
      params.delete("semester")
    } else {
      params.set("semester", String(semester))
    }

    const qs = params.toString()
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false })
    })
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-slate-600">
        {t("semester.label")}
      </label>
      <Select
        value={String(currentSemester)}
        onValueChange={handleChange}
        disabled={isPending}
        dir={rtl ? "rtl" : "ltr"}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_SEMESTERS.map((sem) => (
            <SelectItem key={sem} value={String(sem)}>
              {sem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
