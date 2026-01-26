'use client';

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ClientLeaderboardCards } from "@/components/client-leaderboard-cards"
import { fetchMembers, fetchDepartments } from "@/lib/api"
import { useTranslation } from 'react-i18next'
import type { ApiMemberPoints, ApiDepartmentPoints } from "@/lib/api-types"
import '@/lib/i18n-client'

function LeaderboardCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

function LeaderboardSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
          <Trophy className="w-4 h-4 text-slate-600" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto max-w-full" />
      </div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
        <LeaderboardCardSkeleton />
        <LeaderboardCardSkeleton />
      </div>
    </section>
  )
}

interface LeaderboardData {
  topMembers: ApiMemberPoints[]
  practicalDepartments: ApiDepartmentPoints[]
  administrativeDepartments: ApiDepartmentPoints[]
}

export function LeaderboardSection() {
  const { t } = useTranslation();
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [apiMembers, apiDepartmentsResponse] = await Promise.all([
          fetchMembers(),
          fetchDepartments(),
        ])

        setData({
          topMembers: (apiMembers ?? []).slice(0, 3),
          practicalDepartments: (apiDepartmentsResponse.practical ?? []).slice(0, 3),
          administrativeDepartments: (apiDepartmentsResponse.administrative ?? []).slice(0, 3),
        })
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error)
        setData({
          topMembers: [],
          practicalDepartments: [],
          administrativeDepartments: [],
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading || !data) {
    return <LeaderboardSectionSkeleton />
  }

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
          <Trophy className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">{t('leaderboard.badge')}</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
          {t('leaderboard.title')}
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
          {t('leaderboard.subtitle')}
        </p>
      </div>

      {/* Leaderboard Cards */}
      <div className="w-full">
        <ClientLeaderboardCards 
          topMembers={data.topMembers}
          practicalDepartments={data.practicalDepartments}
          administrativeDepartments={data.administrativeDepartments}
        />
      </div>
    </section>
  )
}
