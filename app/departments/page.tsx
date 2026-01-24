import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Building2, ArrowLeft, Settings, Wrench } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { fetchDepartments } from "@/lib/api"
import { DepartmentTypeCard } from "./department-type-card"

export default async function DepartmentsLeaderboard() {
  const apiDepartmentsResponse = await fetchDepartments()
  
  // Calculate count from array lengths
  const departmentsCount = (apiDepartmentsResponse.administrative?.length || 0) + (apiDepartmentsResponse.practical?.length || 0)

  // Get departments (already sorted from API)
  const administrativeDepartments = apiDepartmentsResponse.administrative || []
  const practicalDepartments = apiDepartmentsResponse.practical || []

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Content */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <PageHeader 
            icon={Building2}
            iconColor="green"
            heading="Departments Leaderboard"
            subHeading={`${departmentsCount} departments ranked by total points earned through team collaboration and achievements`}
          />
        </div>

        {/* Department Type Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Administrative Departments */}
          <DepartmentTypeCard
            title="Administrative Departments"
            description="Support and management teams"
            departments={administrativeDepartments}
            icon={Settings}
            gradientColors={{ from: "from-blue-500", to: "to-blue-600" }}
          />

          {/* Specialized Departments */}
          <DepartmentTypeCard
            title="Specialized Departments"
            description="Hands-on and technical teams"
            departments={practicalDepartments}
            icon={Wrench}
            gradientColors={{ from: "from-green-500", to: "to-green-600" }}
          />
        </div>
        </div>
      </div>
    </div>
  )
}
