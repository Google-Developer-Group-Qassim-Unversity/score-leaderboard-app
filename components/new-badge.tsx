"use client"

import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NewBadgeProps {
  className?: string
}

// The one "New" badge style used everywhere something is newly launched
// (nav links, promo cards, etc.) - keep it here so those spots can't drift
// apart from each other.
export function NewBadge({ className }: NewBadgeProps) {
  const { t } = useTranslation();
  return (
    <Badge className={cn("bg-yellow-400 text-slate-900 border-transparent px-1.5 py-0 text-[10px] leading-4 font-bold", className)}>
      {t('common.new')}
    </Badge>
  )
}
