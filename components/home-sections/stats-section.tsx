import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Building2, Award } from "lucide-react"
import { fetchMembers, fetchDepartments } from "@/lib/api"
import { getTranslation } from "@/lib/server-i18n"
import type { Language } from "@/lib/translations"
import type { ApiMemberPoints } from "@/lib/api-types"

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

interface StatsSectionProps {
  lang: Language
}

export async function StatsSection({ lang }: StatsSectionProps) {
  const t = (key: string) => getTranslation(lang, key);

  // Fetch data on the server
  let membersCount = 0;
  let departmentsCount = 0;
  let totalPoints = 0;

  try {
    const [apiMembers, apiDepartmentsResponse] = await Promise.all([
      fetchMembers(),
      fetchDepartments(),
    ]);

    membersCount = apiMembers.length ?? 0;
    departmentsCount = (apiDepartmentsResponse.administrative?.length ?? 0) + (apiDepartmentsResponse.practical?.length ?? 0);
    totalPoints = apiMembers.reduce((sum: number, member: ApiMemberPoints) => sum + (member.total_points ?? 0), 0);
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 md:gap-6 w-full">
        <StatCard
          icon={<Users className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />}
          title={t('stats.members.title')}
          value={membersCount}
          description={t('stats.members.description')}
        />
        <StatCard
          icon={<Building2 className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />}
          title={t('stats.departments.title')}
          value={departmentsCount}
          description={t('stats.departments.description')}
        />
        <StatCard
          icon={<Award className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />}
          title={t('stats.points.title')}
          value={totalPoints}
          description={t('stats.points.description')}
        />
      </div>
    </section>
  )
}
