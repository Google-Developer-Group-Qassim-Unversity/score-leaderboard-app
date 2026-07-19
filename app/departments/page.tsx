import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Building2, ArrowLeft, Settings, Wrench } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { fetchDepartments } from "@/lib/api/api"
import { DepartmentTypeCard } from "./department-type-card"
import { SemesterSelector } from "@/components/semester-selector"
import { getTranslation } from "@/lib/server-i18n"
import { getSemesters } from "@/lib/semesters"

interface DepartmentsLeaderboardProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DepartmentsLeaderboard({ searchParams }: DepartmentsLeaderboardProps) {
  const t = (key: string) => getTranslation('ar', key)
  
  const params = await searchParams
  
  const semesterParam = params.semester ? Number(params.semester) : undefined
  const { current_semester, semesters } = await getSemesters()

  const apiDepartmentsResponse = await fetchDepartments(semesterParam)
  
  // Calculate count from array lengths
  const departmentsCount = (apiDepartmentsResponse.administrative?.length || 0) + (apiDepartmentsResponse.practical?.length || 0)

  // Get departments (already sorted from API)
  const administrativeDepartments = apiDepartmentsResponse.administrative || []
  const practicalDepartments = apiDepartmentsResponse.practical || []

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Content */}
      <div className="">
        <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <PageHeader 
            icon={Building2}
            iconColor="green"
            heading={t('departments.heading')}
            subHeading={`${departmentsCount} ${t('departments.subHeading')}`}
          />
        </div>

        {/* Semester Selector - flush with cards */}
        <div className="flex mb-4 justify-end">
          <SemesterSelector
            currentSemester={semesterParam ?? current_semester}
            defaultSemester={current_semester}
            availableSemesters={semesters}
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
            semester={semesterParam}
            defaultSemester={current_semester}
          />
          {/* Administrative Departments */}
          <DepartmentTypeCard
            title={t('departments.administrative')}
            description={t('departments.administrativeDesc')}
            departments={administrativeDepartments}
            icon={Settings}
            gradientColors={{ from: "from-blue-500", to: "to-blue-600" }}
            semester={semesterParam}
            defaultSemester={current_semester}
          />

        </div>
        </div>
      </div>
    </div>
  )
}