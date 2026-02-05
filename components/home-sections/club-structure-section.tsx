import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Crown, Building2, Lightbulb, Cog, Shield, Bot, Trophy, Palette, Calendar, Megaphone, MoveRight, Gamepad2 } from "lucide-react"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { getTranslation } from "@/lib/server-i18n"
import type { Language } from "@/lib/translations"

interface ClubStructureSectionProps {
  lang: Language
}

export async function ClubStructureSection({ lang }: ClubStructureSectionProps) {
  const t = (key: string) => getTranslation(lang, key)

  // Department data matching club-structure page
  const departments = {
    specialized: [
      { icon: Lightbulb, color: "bg-red-500", name: t("clubStructurePage.aiShort"), id: "dept-0" },
      { icon: Shield, color: "bg-green-500", name: t("clubStructurePage.cybersecurity"), id: "dept-1" },
      { icon: Bot, color: "bg-yellow-500", name: t("clubStructurePage.robotics"), id: "dept-2" },
      { icon: Trophy, color: "bg-blue-500", name: t("clubStructurePage.entrepreneurship"), id: "dept-3" },
      { icon: Gamepad2, color: "bg-purple-500", name: t("clubStructurePage.esports"), id: "dept-4" },
    ],
    administrative: [
      { icon: Cog, color: "bg-blue-500", name: t("clubStructurePage.development"), id: "admin-dept-0" },
      { icon: Calendar, color: "bg-orange-500", name: t("clubStructurePage.programsShort"), id: "admin-dept-1" },
      { icon: Users, color: "bg-red-500", name: t("clubStructurePage.organization"), id: "admin-dept-2" },
      { icon: Palette, color: "bg-green-500", name: t("clubStructurePage.design"), id: "admin-dept-3" },
      { icon: Megaphone, color: "bg-blue-500", name: t("clubStructurePage.media"), id: "admin-dept-4" },
    ]
  }

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
            {/* LEFT: Leadership */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t('clubStructure.leadership')}
                </h3>

                <Link href="/club-structure" className="sm:shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0"
                  >
                    {t("clubStructure.viewFullStructure")}
                    <MoveRight className="h-5 w-5 ms-2 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>

              {/* Leadership Info */}
              <div className="space-y-4">
                {/* Presidents */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-2 font-medium">
                    {t('clubStructure.presidents')}
                  </p>
                  <div className="space-y-1">
                    <p className="text-slate-900 font-semibold">عزام خالد الخضيري</p>
                    <p className="text-slate-900 font-semibold">جود سعود الفرم</p>
                  </div>
                </div>

                {/* Vice President */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-2 font-medium">
                    {t('clubStructure.vicePresident')}
                  </p>
                  <p className="text-slate-900 font-semibold">أحمد الحربي</p>
                </div>
              </div>
            </div>

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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-fit mx-auto [&>*:nth-child(5)]:col-span-2 md:[&>*:nth-child(5)]:col-span-1">
                  {departments.specialized.map((dept, idx) => (
                    <Link key={idx} href={`/club-structure#${dept.id}`} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-14 h-14 md:w-12 md:h-12 ${dept.color} rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer`}
                      >
                        <dept.icon className="h-7 w-7 md:h-6 md:w-6 text-white" />
                      </div>
                      <span className="text-xs text-center text-slate-700 font-medium">{dept.name}</span>
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-fit mx-auto [&>*:nth-child(5)]:col-span-2 md:[&>*:nth-child(5)]:col-span-1">
                  {departments.administrative.map((dept, idx) => (
                    <Link key={idx} href={`/club-structure#${dept.id}`} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-14 h-14 md:w-12 md:h-12 ${dept.color} rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer`}
                      >
                        <dept.icon className="h-7 w-7 md:h-6 md:w-6 text-white" />
                      </div>
                      <span className="text-xs text-center text-slate-700 font-medium">{dept.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </section>
  )
}
