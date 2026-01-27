import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Crown, Building2, Lightbulb, Cog, Shield, Bot, Trophy, Palette, Calendar, Megaphone, MoveRight } from "lucide-react"
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
      { icon: Lightbulb, color: "bg-red-500", name: "AI & Data", id: "dept-0" },
      { icon: Shield, color: "bg-green-500", name: "Cybersecurity", id: "dept-1" },
      { icon: Bot, color: "bg-yellow-500", name: "Robotics", id: "dept-2" },
      { icon: Trophy, color: "bg-blue-500", name: "Entrepreneurship", id: "dept-3" },
    ],
    administrative: [
      { icon: Cog, color: "bg-blue-500", name: "Development", id: "admin-dept-0" },
      { icon: Calendar, color: "bg-orange-500", name: "Events", id: "admin-dept-1" },
      { icon: Users, color: "bg-red-500", name: "Organization", id: "admin-dept-2" },
      { icon: Palette, color: "bg-green-500", name: "Design", id: "admin-dept-3" },
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
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-2 font-medium">
                    {t('clubStructure.presidents')}
                  </p>
                  <div className="space-y-1">
                    <p className="text-slate-900 font-semibold">عزام خالد الخضيري</p>
                    <p className="text-slate-900 font-semibold">جود سعود الفرم</p>
                  </div>
                </div>

                {/* Vice President */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
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
                <div className="grid grid-cols-4 gap-3">
                  {departments.specialized.map((dept, idx) => (
                    <Link key={idx} href={`/club-structure#${dept.id}`} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer`}
                      >
                        <dept.icon className="h-6 w-6 text-white" />
                      </div>
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
                <div className="grid grid-cols-4 gap-3">
                  {departments.administrative.map((dept, idx) => (
                    <Link key={idx} href={`/club-structure#${dept.id}`} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer`}
                      >
                        <dept.icon className="h-6 w-6 text-white" />
                      </div>
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
