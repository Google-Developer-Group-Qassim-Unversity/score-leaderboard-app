"use client"

import { cn } from "@/lib/utils"
import type { EventLevel as Level } from "@/lib/api/types"
import { useTranslation } from "react-i18next"
import "@/lib/i18n-client"

const FILLED_BARS: Record<Level, number> = { beginner: 1, intermediate: 2, advanced: 3 }

const LEVEL_COLOR: Record<Level, string> = {
  beginner: "bg-green-500",
  intermediate: "bg-amber-500",
  advanced: "bg-red-500",
}

// Rising heights, like a signal icon: the more bars filled, the harder the event.
const BAR_HEIGHTS = ["h-1.5", "h-2.5", "h-3.5"]

interface EventLevelProps {
  level: Level | null | undefined
  className?: string
}

export function EventLevel({ level, className }: EventLevelProps) {
  const { t } = useTranslation()
  if (!level) return null

  const label = t(`eventLevel.${level}`)

  return (
    <div className={cn("inline-flex items-center gap-2 text-xs font-medium text-muted-foreground", className)}>
      {/* The icon reads left-to-right in both languages, like any signal icon. */}
      <span dir="ltr" className="flex items-end gap-0.5" aria-hidden="true">
        {BAR_HEIGHTS.map((height, i) => (
          <span
            key={height}
            className={cn(
              "w-1 rounded-sm",
              height,
              i < FILLED_BARS[level] ? LEVEL_COLOR[level] : "bg-slate-200 dark:bg-slate-700"
            )}
          />
        ))}
      </span>
      <span>
        <span className="sr-only">{t("eventLevel.label")}: </span>
        {label}
      </span>
    </div>
  )
}
