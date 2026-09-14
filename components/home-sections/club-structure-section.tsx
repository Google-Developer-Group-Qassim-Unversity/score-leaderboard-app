import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Crown, Building2, Lightbulb, Cog, MoveRight } from "lucide-react"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { DepartmentIcon } from "@/components/club-structure/department-icon"
import { fetchPublicClubStructure } from "@/lib/api/api"
import { isBoardDepartment } from "@/lib/club-structure"
import { getTranslation } from "@/lib/server-i18n"
import type { Language } from "@/lib/translations"
import type { PublicClubStructure } from "@/lib/api/types"

interface ClubStructureSectionProps {
  lang: Language
}

export async function ClubStructureSection({ lang }: ClubStructureSectionProps) {
  const t = (key: string) => getTranslation(lang, key)
  let structure: PublicClubStructure = { presidents: [], departments: [] }
  try {
    structure = await fetchPublicClubStructure()
  } catch (error) {
    console.error("Failed to load the club structure summary", error)
  }

  const visibleDepartments = structure.departments.filter((department) => !isBoardDepartment(department))
  const departments = {
    specialized: visibleDepartments.filter((department) => department.type === "practical"),
    administrative: visibleDepartments.filter((department) => department.type === "administrative"),
  }
  const boardMembers = structure.departments
    .filter(isBoardDepartment)
    .flatMap((department) => department.members)
  const departmentName = (department: (typeof visibleDepartments)[number]) =>
    lang === "ar" ? department.ar_name : department.name

  return (
    <section className="container mx-auto px-4 py-12">
        <HomeSectionHeader
          icon={Users}
          title={t("clubStructure.title")}
          subtitle={t("clubStructure.subtitle")}
        />


      {/* Single card with two sections side-by-side */}
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 max-w-6xl mx-auto mb-8">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* RIGHT: Departments */}
            <div className="space-y-6 lg:border-l lg:border-slate-200 lg:pl-8">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t('clubStructure.departmentsTitle')}
                </h3>
              </div>

              {/* Specialized Departments */}
              <div>
                <p className="text-sm text-slate-600 mb-3 font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  {t('clubStructure.specialized')}
                </p>
                <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-fit mx-auto">
                  {departments.specialized.map((dept, idx) => (
                    <Link key={dept.id} href={`/club-structure#dept-${idx}`} className="flex flex-col items-center gap-2">
                      <div
                        className="w-14 h-14 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                        style={{ backgroundColor: dept.color }}
                      >
                        <DepartmentIcon icon={dept.icon} className="h-7 w-7 text-white md:h-6 md:w-6" />
                      </div>
                      <span className="text-xs text-center text-slate-700 font-medium">{departmentName(dept)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Administrative Departments */}
              <div>
                <p className="text-sm text-slate-600 mb-3 font-medium flex items-center gap-2">
                  <Cog className="h-4 w-4" />
                  {t('clubStructure.administrative')}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-fit mx-auto">
                  {departments.administrative.map((dept, idx) => (
                    <Link key={dept.id} href={`/club-structure#admin-dept-${idx}`} className="flex flex-col items-center gap-2">
                      <div
                        className="w-14 h-14 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                        style={{ backgroundColor: dept.color }}
                      >
                        <DepartmentIcon icon={dept.icon} className="h-7 w-7 text-white md:h-6 md:w-6" />
                      </div>
                      <span className="text-xs text-center text-slate-700 font-medium">{departmentName(dept)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

                        {/* LEFT: Leadership */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {t('clubStructure.leadership')}
                  </h3>
                </div>
                <Link href="/club-structure" className="sm:shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0 cursor-pointer"
                  >
                    {t("clubStructure.viewFullStructure")}
                    <MoveRight className="h-5 w-5 ms-2 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>

              {/* Leadership Info */}
              <div className="space-y-4">
                {/* Leaders - القادة */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-2 font-medium">
                    {t('clubStructure.presidents')}
                  </p>
                  <div className="space-y-1">
                    {structure.presidents.length ? structure.presidents.map((name, index) => (
                      <p key={`${name}-${index}`} className="text-slate-900 font-semibold">{name}</p>
                    )) : <p className="text-sm text-slate-500">{t("clubStructurePage.noAssignments")}</p>}
                  </div>
                </div>

                {/* Board of Directors - مجلس الإدارة */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-2 font-medium">
                    {t('clubStructurePage.boardDirectors')}
                  </p>
                  <div className="space-y-1">
                    {boardMembers.length ? boardMembers.map((name, index) => (
                      <p key={`${name}-${index}`} className="text-slate-900 font-semibold">{name}</p>
                    )) : <p className="text-sm text-slate-500">{t("clubStructurePage.noAssignments")}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </section>
  )
}
