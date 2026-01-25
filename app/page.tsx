import { fetchMembers, fetchDepartments, fetchOpenEvents, ApiMemberPoints } from "@/lib/api"
import { DashboardContent } from "@/components/dashboard-content"

export default async function Dashboard() {
  const [apiMembers, apiDepartmentsResponse, openEventsResponse] = await Promise.all([
    fetchMembers(),
    fetchDepartments(),
    fetchOpenEvents(),
  ])

  const membersCount = apiMembers.length ?? 0
  const departmentsCount = (apiDepartmentsResponse.administrative?.length ?? 0) + (apiDepartmentsResponse.practical?.length ?? 0)

  const topMembers = (apiMembers ?? []).slice(0, 3)
  const practicalDepartments = (apiDepartmentsResponse.practical ?? []).slice(0, 3)
  const administrativeDepartments = (apiDepartmentsResponse.administrative ?? []).slice(0, 3)

  const totalPoints = apiMembers.reduce((sum: number, member: ApiMemberPoints) => sum + (member.total_points ?? 0), 0)

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
