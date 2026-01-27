import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Building2, ArrowLeft, Settings, Wrench } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { fetchDepartments } from "@/lib/api"
import { DepartmentTypeCard } from "./department-type-card"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"

export default async function DepartmentsLeaderboard() {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)
  
  const apiDepartmentsResponse = await fetchDepartments()
  
  // Calculate count from array lengths
  const departmentsCount = (apiDepartmentsResponse.administrative?.length || 0) + (apiDepartmentsResponse.practical?.length || 0)

  // Get departments (already sorted from API)
  const administrativeDepartments = apiDepartmentsResponse.administrative || []
  const practicalDepartments = apiDepartmentsResponse.practical || []

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
              <ArrowLeft className={`h-4 w-4 ${rtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
              {t('departments.backButton')}
            </Button>
          </Link>
          
          <PageHeader 
            icon={Building2}
            iconColor="green"
            heading={t('departments.heading')}
            subHeading={`${departmentsCount} ${t('departments.subHeading')}`}
          />
        </div>

        {/* Department Type Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specialized Departments */}
          <DepartmentTypeCard
            title={t('departments.specialized')}
            description={t('departments.specializedDesc')}
            departments={practicalDepartments}
            icon={Wrench}
            gradientColors={{ from: "from-green-500", to: "to-green-600" }}
          />
          {/* Administrative Departments */}
          <DepartmentTypeCard
            title={t('departments.administrative')}
            description={t('departments.administrativeDesc')}
            departments={administrativeDepartments}
            icon={Settings}
            gradientColors={{ from: "from-blue-500", to: "to-blue-600" }}
          />

        </div>
        </div>
      </div>
    </div>
  )
}
