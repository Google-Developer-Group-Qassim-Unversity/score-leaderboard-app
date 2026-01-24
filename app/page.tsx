import { fetchMembers, fetchDepartments, fetchOpenEvents } from "@/lib/api"
import { DashboardContent } from "@/components/dashboard-content"

export default async function Dashboard() {
  const [apiMembers, apiDepartmentsResponse, openEventsResponse] = await Promise.all([
    fetchMembers(),
    fetchDepartments(),
    fetchOpenEvents(),
  ])

  const membersCount = apiMembers.length || 0
  const departmentsCount = (apiDepartmentsResponse.Administrative?.length || 0) + (apiDepartmentsResponse.Specialized?.length || 0)

  const topMembers = (apiMembers || []).slice(0, 3)
  const practicalDepartments = (apiDepartmentsResponse.Specialized || []).slice(0, 3)
  const administrativeDepartments = (apiDepartmentsResponse.Administrative || []).slice(0, 3)

  const totalPoints = apiMembers.reduce((sum, member) => sum + (member.points || 0), 0)

  return (
    <DashboardContent 
      topMembers={topMembers}
      practicalDepartments={practicalDepartments} 
      administrativeDepartments={administrativeDepartments}
      membersCount={membersCount}
      departmentsCount={departmentsCount}
      totalPoints={totalPoints}
      openEvents={openEventsResponse.slice(0, 6)}
    />
  )
}
