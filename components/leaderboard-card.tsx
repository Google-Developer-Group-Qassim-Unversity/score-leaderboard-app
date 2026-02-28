'use client'

import Link from "next/link"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface LeaderboardCardProps {
  id: string
  name: string
  rank: number
  points: number
  type: "member" | "department"
}

const getPodiumStyles = (rank: number, type: "member" | "department") => {
  // For departments, only first place gets special styling
  if (type === "department") {
    if (rank === 1) {
      return {
        container: "bg-amber-50 border border-amber-200 hover:border-amber-300",
        badge: "bg-amber-500 text-white border-0",
      }
    }
    return {
      container: "bg-white border border-slate-200 hover:border-slate-300",
      badge: "bg-slate-400 text-white border-0",
    }
  }

  // For members, use rank-based styling with solid colors
  switch (rank) {
    case 1:
      return {
        container: "bg-amber-50 border border-amber-200 hover:border-amber-300",
        badge: "bg-amber-500 text-white border-0",
      }
    case 2:
      return {
        container: "bg-slate-50 border border-slate-200 hover:border-slate-300",
        badge: "bg-slate-500 text-white border-0",
      }
    case 3:
      return {
        container: "bg-orange-50 border border-orange-200 hover:border-orange-300",
        badge: "bg-orange-500 text-white border-0",
      }
    default:
      return {
        container: "bg-white border border-slate-200 hover:border-slate-300",
        badge: "bg-slate-300 text-slate-700 border-0",
      }
  }
}

const getDisplayName = (fullName: string): string => {
  const nameParts = fullName.trim().split(/\s+/)
  if (nameParts.length <= 2) {
    return fullName
  }
  // Return first name and last name
  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
}

export function LeaderboardCard({ id, name, rank, points, type }: LeaderboardCardProps) {
  const { t } = useTranslation()
  const styles = getPodiumStyles(rank, type)
  const detailsUrl = type === "member" ? `/members/${id}` : `/departments/${id}`
  const displayName = type === "member" ? getDisplayName(name) : name

  return (
    <Link
      href={detailsUrl}
      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all duration-200 ${styles.container} w-full hover:scale-[1.01] active:scale-[0.99] group cursor-pointer`}
      id={`member-row-${id}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <Badge
          variant="default"
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center font-bold text-xs sm:text-sm ${styles.badge} shrink-0 transition-transform group-hover:scale-110`}
        >
          {rank}
        </Badge>
        <p className="font-semibold text-base sm:text-lg text-slate-800 truncate group-hover:text-blue-600 transition-colors">
          {displayName}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="text-right">
          <p className="font-bold text-base sm:text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {points}
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{t('leaderboard.points')}</p>
        </div>
      </div>
    </Link>
  )
}
