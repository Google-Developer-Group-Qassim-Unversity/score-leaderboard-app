"use client"

import { Building2, Settings, Wrench } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { useDepartments } from "@/hooks/queries/use-departments"
import { DepartmentTypeCard } from "./department-type-card"

interface DepartmentsContentProps {
  lang: string
  heading: string
  subHeadingLabel: string
  specialized: string
  specializedDesc: string
  administrative: string
  administrativeDesc: string
}

export function DepartmentsContent({
  lang,
  heading,
  subHeadingLabel,
  specialized,
  specializedDesc,
  administrative,
  administrativeDesc,
}: DepartmentsContentProps) {
  const { data } = useDepartments()

  const administrativeDepartments = data?.administrative ?? []
  const practicalDepartments = data?.practical ?? []
  const departmentsCount = administrativeDepartments.length + practicalDepartments.length

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <PageHeader
          icon={Building2}
          iconColor="green"
          heading={heading}
          subHeading={`${departmentsCount} ${subHeadingLabel}`}
        />
      </div>

      {/* Department Type Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DepartmentTypeCard
          lang={lang}
          title={specialized}
          description={specializedDesc}
          departments={practicalDepartments}
          icon={Wrench}
          gradientColors={{ from: "from-green-500", to: "to-green-600" }}
        />
        <DepartmentTypeCard
          lang={lang}
          title={administrative}
          description={administrativeDesc}
          departments={administrativeDepartments}
          icon={Settings}
          gradientColors={{ from: "from-blue-500", to: "to-blue-600" }}
        />
      </div>
    </>
  )
}
