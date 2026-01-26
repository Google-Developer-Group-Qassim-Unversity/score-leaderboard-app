'use client';

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Building2, Award } from "lucide-react"
import { fetchMembers, fetchDepartments } from "@/lib/api"
import { useTranslation } from 'react-i18next'
import type { ApiMemberPoints } from "@/lib/api-types"
import '@/lib/i18n'

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number | string
  description: string
}

function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg flex-1 min-w-0">
      <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center gap-2 mb-2 md:mb-3">
          <div className="p-2 md:p-3 bg-slate-100 rounded-lg">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className="text-xs text-slate-500 hidden sm:block">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCardSkeleton() {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg flex-1 min-w-0">
      <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center gap-2 mb-2 md:mb-3">
          <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-lg" />
        </div>
        <div className="space-y-1 w-full flex flex-col items-center">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-24 hidden sm:block" />
        </div>
      </CardContent>
    </Card>
  )
}

function StatsSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 md:gap-6 w-full">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </section>
  )
}

interface StatsData {
  membersCount: number
  departmentsCount: number
  totalPoints: number
}

export function StatsSection() {
  const { t } = useTranslation();
  const [data, setData] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [apiMembers, apiDepartmentsResponse] = await Promise.all([
          fetchMembers(),
          fetchDepartments(),
        ])

        const membersCount = apiMembers.length ?? 0
        const departmentsCount = (apiDepartmentsResponse.administrative?.length ?? 0) + (apiDepartmentsResponse.practical?.length ?? 0)
        const totalPoints = apiMembers.reduce((sum: number, member: ApiMemberPoints) => sum + (member.total_points ?? 0), 0)

        setData({ membersCount, departmentsCount, totalPoints })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
        setData({ membersCount: 0, departmentsCount: 0, totalPoints: 0 })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading || !data) {
    return <StatsSectionSkeleton />
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 md:gap-6 w-full">
        <StatCard
          icon={<Users className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />}
          title={t('stats.members.title')}
          value={data.membersCount}
          description={t('stats.members.description')}
        />
        <StatCard
          icon={<Building2 className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />}
          title={t('stats.departments.title')}
          value={data.departmentsCount}
          description={t('stats.departments.description')}
        />
        <StatCard
          icon={<Award className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />}
          title={t('stats.points.title')}
          value={data.totalPoints}
          description={t('stats.points.description')}
        />
      </div>
    </section>
  )
}
