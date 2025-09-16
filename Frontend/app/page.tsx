import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, AlertCircle } from "lucide-react"
import {
  fetchMembers,
  fetchDepartments,
  fetchMembersCount,
  fetchDepartmentsCount,
  transformApiMember,
  transformApiDepartment,
} from "@/lib/api"

export default async function Dashboard() {
  let apiStatus = "connected" // 'connected' | 'fallback'

  const [apiMembers, apiDepartments, membersCount, departmentsCount] = await Promise.all([
    fetchMembers(),
    fetchDepartments(),
    fetchMembersCount(),
    fetchDepartmentsCount(),
  ])

  if (apiMembers.length > 0 && apiMembers[0].id > 1000) {
    apiStatus = "fallback"
  }

  // Transform and sort API data
  const members = apiMembers
    .sort((a, b) => b.points - a.points)
    .map((member, index) => transformApiMember(member, index + 1))

  const departments = apiDepartments
    .sort((a, b) => b.points - a.points)
    .map((dept, index) => transformApiDepartment(dept, index + 1))

  const topMembers = members.slice(0, 5)
  const topDepartments = departments.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-10 w-10 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Leaderboard Dashboard</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track performance across members and departments with comprehensive points tracking
          </p>

          {apiStatus === "fallback" && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
              <AlertCircle className="h-4 w-4" />
              Using demo data - API server not available
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{membersCount}</div>
              <p className="text-xs text-gray-500 mt-1">Active participants</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{departmentsCount}</div>
              <p className="text-xs text-gray-500 mt-1">Competing teams</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Members Preview */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Top Members
                  </CardTitle>
                  <CardDescription>Leading individual performers</CardDescription>
                </div>
                <Link href="/members">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      {member.rank}
                    </Badge>
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">Member</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{member.totalPoints}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Departments Preview */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-500" />
                    Top Departments
                  </CardTitle>
                  <CardDescription>Leading team performance</CardDescription>
                </div>
                <Link href="/departments">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topDepartments.map((dept, index) => (
                <div
                  key={dept.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      {dept.rank}
                    </Badge>
                    <div>
                      <p className="font-semibold text-gray-900">{dept.name}</p>
                      <p className="text-sm text-gray-500">Department</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{dept.totalPoints}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/members">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Users className="mr-2 h-4 w-4" />
                View All Members
              </Button>
            </Link>
            <Link href="/departments">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                <Building2 className="mr-2 h-4 w-4" />
                View Departments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
