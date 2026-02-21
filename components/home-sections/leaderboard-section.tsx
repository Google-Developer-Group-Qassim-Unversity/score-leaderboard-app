import { Trophy, Building2, Wrench, Users, MoveRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { SectionHeader } from "@/components/section-header"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { fetchMembers, fetchDepartments } from "@/lib/api"
import { getLanguageFromCookies, getTranslation } from "@/lib/server-i18n"
import type { ApiMemberPoints, ApiDepartmentPoints } from "@/lib/api-types"


export async function LeaderboardSection() {
  const lang = await getLanguageFromCookies()
  const t = (key: string) => getTranslation(lang, key)

  let topMembers: ApiMemberPoints[] = []
  let practicalDepartments: ApiDepartmentPoints[] = []
  let administrativeDepartments: ApiDepartmentPoints[] = []

  try {
    const [apiMembers, apiDepartmentsResponse] = await Promise.all([
      fetchMembers(),
      fetchDepartments(),
    ])

    topMembers = (apiMembers ?? []).slice(0, 5)
    practicalDepartments = (apiDepartmentsResponse.practical ?? []).slice(0, 3)
    administrativeDepartments = (apiDepartmentsResponse.administrative ?? []).slice(0, 3)
  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error)
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <HomeSectionHeader
        icon={Trophy}
        title={t('leaderboard.title')}
        subtitle={t('leaderboard.subtitle')}
      />

      {/* Leaderboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-full">
        {/* Top Members Preview */}
        <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-full min-w-0">
          <div className="p-1">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="break-words leading-tight">{t('leaderboard.topMembers')}</span>
                </CardTitle>
                <Link href="/members">
                  <Button variant="outline" size="default" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0 cursor-pointer">
                    {t('leaderboard.viewAll')}
                    <MoveRight className="h-3 w-3 sm:h-4 sm:w-4 ms-1.5 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="relative px-3 sm:px-6">
              <div className="space-y-6 transition-all duration-500">
                <div className="w-full max-w-full min-w-0 overflow-hidden">
                  <div className="space-y-3">
                    {topMembers.length > 0 ? (
                      topMembers.map((member, index) => (
                        <div key={member.member_id} className="w-full max-w-full min-w-0">
                          <LeaderboardCard id={member.member_id.toString()} name={member.member_name} rank={index + 1} points={member.total_points ?? 0} type="member" />
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm text-center py-4">{t('leaderboard.noMembersData')}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Top Departments Preview */}
        <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-full min-w-0">
          <div className="p-1">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="wrap-break-word leading-tight">{t('leaderboard.topDepartments')}</span>
                </CardTitle>
                <Link href="/departments">
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0 cursor-pointer">
                    {t('leaderboard.viewAll')}
                    <MoveRight className="h-3 w-3 sm:h-4 sm:w-4 ms-1.5 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="relative px-3 sm:px-6">
              <div className="space-y-6 transition-all duration-500">
                {/* Practical Departments */}
                <div className="w-full max-w-full min-w-0">
                <SectionHeader icon={Wrench} title={t('leaderboard.specializedDepts')} color="green"/>
                  <div className="space-y-3 w-full max-w-full">
                    {practicalDepartments.length > 0 ? (
                      practicalDepartments.map((department, index) => ( 
                        <div key={department.department_id} className="w-full max-w-full min-w-0">
                          <LeaderboardCard id={department.department_id.toString()} name={lang === 'ar' ? department.ar_department_name : department.department_name} rank={index + 1} points={department.total_points} type="department"/> 
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm text-center py-4">{t('leaderboard.noSpecializedDeptsData')}</p>
                    )}
                  </div>
                </div>

                {/* Administrative Departments */}
                <div className="w-full max-w-full min-w-0">
                  <SectionHeader icon={Building2} title={t('leaderboard.administrativeDepts')} color="blue"/>
                  <div className="space-y-3 w-full max-w-full">
                    {administrativeDepartments.length > 0 ? (
                      administrativeDepartments.map((department, index) => (
                        <div key={department.department_id} className="w-full max-w-full min-w-0">
                          <LeaderboardCard id={department.department_id.toString()} name={lang === 'ar' ? department.ar_department_name : department.department_name} rank={index + 1} points={department.total_points} type="department"/>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm text-center py-4">{t('leaderboard.noAdministrativeDeptsData')}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
