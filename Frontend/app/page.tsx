import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, AlertCircle, Infinity } from "lucide-react"
import { LeaderboardCard } from "@/components/leaderboard-card"
import {
  fetchMembers,
  fetchDepartments,
  fetchAllDepartments,
  fetchMembersCount,
  fetchDepartmentsCount,
  transformApiMember,
  transformApiDepartment,
} from "@/lib/api"

export default async function Dashboard() {
  let apiStatus = "connected" // 'connected' | 'fallback'

  const [apiMembers, apiDepartmentsResponse, membersCount, departmentsCount] = await Promise.all([
    fetchMembers(),
    fetchDepartments(),
    fetchMembersCount(),
    fetchDepartmentsCount(),
  ])

  // Combine and sort all departments for the preview
  const allDepartments = [
    ...(apiDepartmentsResponse.administrative || []), 
    ...(apiDepartmentsResponse.practical || [])
  ]

  // Combine and sort all members for the preview
  const allMembers = [
    ...(apiMembers.Female || []),
    ...(apiMembers.Male || [])
  ]

  if (allMembers.length > 0 && allMembers[0].id > 1000) {
    apiStatus = "fallback"
  }

  // Transform and sort API data for members by gender
  const femaleMembers = (apiMembers.Female || [])
    .sort((a, b) => b.points - a.points)
    .map((member, index) => transformApiMember(member, index + 1))
  
  const maleMembers = (apiMembers.Male || [])
    .sort((a, b) => b.points - a.points)
    .map((member, index) => transformApiMember(member, index + 1))

  const allMembersSorted = allMembers
    .sort((a, b) => b.points - a.points)
    .map((member, index) => transformApiMember(member, index + 1))

  // Transform and sort departments by type with independent rankings
  const practicalDepartments = (apiDepartmentsResponse.practical || [])
    .sort((a, b) => b.points - a.points)
    .map((dept, index) => transformApiDepartment(dept, index + 1, 'practical'))

  const administrativeDepartments = (apiDepartmentsResponse.administrative || [])
    .sort((a, b) => b.points - a.points)
    .map((dept, index) => transformApiDepartment(dept, index + 1, 'administrative'))

  const topFemaleMembers = femaleMembers.slice(0, 10)
  const topMaleMembers = maleMembers.slice(0, 10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 relative overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Image
                  src="/gdg-transparent.png"
                  alt="GDG Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
              Leaderboard Dashboard
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Track performance across members and departments with comprehensive points tracking
          </p>

          {apiStatus === "fallback" && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full text-sm font-medium shadow-md">
              <AlertCircle className="h-4 w-4" />
              Using demo data - API server not available
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-blue-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Total Members</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{membersCount}</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">Active participants</p>
              </CardContent>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Departments</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{departmentsCount}</div>
                <p className="text-sm text-slate-500 mt-2 font-medium">Competing teams</p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-md"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Leaderboard Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                <path d="M19 12L19.74 14.09L22 15L19.74 15.91L19 18L18.26 15.91L16 15L18.26 14.09L19 12Z"/>
                <path d="M5 12L5.74 14.09L8 15L5.74 15.91L5 18L4.26 15.91L2 15L4.26 14.09L5 12Z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Current Rankings
            </h2>
          </div>
          <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">
            Real-time leaderboard showing top performers across all categories
          </p>
        </div>

        {/* Leaderboard Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Members Preview */}
          <Card className="bg-gradient-to-br from-blue-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-1">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      Top Members
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium mt-1">Leading individual performers by gender</CardDescription>
                  </div>
                  <Link href="/members">
                    <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Male Members */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider">Male</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>
                  <div className="space-y-3">
                    {topMaleMembers.map((member) => (
                      <LeaderboardCard
                        key={member.id}
                        id={member.id}
                        name={member.name}
                        rank={member.rank}
                        points={member.totalPoints}
                        type="member"
                      />
                    ))}
                  </div>
                </div>

                {/* Styled Separator */}
                <div className="flex items-center justify-center py-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <div className="px-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full shadow-sm"></div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                </div>

                {/* Female Members */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-sm">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-pink-700 uppercase tracking-wider">Female</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-pink-300 to-transparent"></div>
                  </div>
                  <div className="space-y-3">
                    {topFemaleMembers.map((member) => (
                      <LeaderboardCard
                        key={member.id}
                        id={member.id}
                        name={member.name}
                        rank={member.rank}
                        points={member.totalPoints}
                        type="member"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Top Departments Preview */}
          <Card className="bg-gradient-to-br from-green-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-1">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      Top Departments
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium mt-1">Leading team performers by category</CardDescription>
                  </div>
                  <Link href="/departments">
                    <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">


                {/* Practical Departments */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4zM6.7 8.8c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.7-.7 1.9-.7 2.6 0 .7.7.7 1.9 0 2.6z"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider">الاقسام التخصصية</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-300 to-transparent"></div>
                  </div>
                  <div className="space-y-3">
                    {practicalDepartments.map((department) => (
                      <LeaderboardCard
                        key={department.id}
                        id={department.id}
                        name={department.name}
                        rank={department.rank}
                        points={department.totalPoints}
                        type="department"
                      />
                    ))}
                  </div>
                </div>


                {/* Styled Separator */}
                <div className="flex items-center justify-center py-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <div className="px-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-sm"></div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                </div>


                {/* Administrative Departments */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider">الاقسام الادارية</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>
                  <div className="space-y-3">
                    {administrativeDepartments.map((department) => (
                      <LeaderboardCard
                        key={department.id}
                        id={department.id}
                        name={department.name}
                        rank={department.rank}
                        points={department.totalPoints}
                        type="department"
                      />
                    ))}
                  </div>
                </div>

              </CardContent>
            </div>
          </Card>
        </div>

        {/* Special Department Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 rounded-2xl shadow-xl border-2 border-cyan-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              {/* Code-like background effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-16 right-8 w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-700"></div>
              </div>
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-center text-slate-900 flex items-center justify-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                        <Infinity className="h-6 w-6 text-white" />
                      </div>
                      Honor Department
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="group flex items-center justify-between p-8 rounded-2xl bg-gradient-to-r from-cyan-100/50 via-white to-blue-100/50 border-2 border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Badge
                        variant="secondary"
                        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 border-2 border-cyan-300 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      >
                        <Infinity className="h-7 w-7" />
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 sm:text-2xl group-hover:text-cyan-800 transition-colors duration-200">
                        Software Development
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse"></div>
                        <p className="text-sm text-cyan-600 font-semibold">Department</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 italic">
                        GDG dev team
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <p className="font-bold text-5xl bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
                        ∞
                      </p>
                    </div>
                    <p className="text-xs text-cyan-400 uppercase tracking-wider font-bold">Team Score</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}
