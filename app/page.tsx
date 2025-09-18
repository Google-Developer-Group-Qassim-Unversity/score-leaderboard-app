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

  const topMembers = members.slice(0, 10)
  const topDepartments = departments.slice(0, 8)

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
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 transform hover:scale-105 transition-transform duration-200">
                <Trophy className="h-8 w-8 text-white" />
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

        {/* Quick Stats Bar */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{topMembers[0]?.totalPoints || 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Top Score</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{topDepartments[0]?.totalPoints || 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Best Dept</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{members.reduce((sum, m) => sum + m.totalPoints, 0)}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Points</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v4h2v-4zm4 0h-2v4h2v-4zm4 0h-2v4h2v-4zm2-7h-3V2h-2v2H8V2H6v2H3c-1.11 0-1.99.89-1.99 2L1 18c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 16H3V8h16v10z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{Math.round(members.reduce((sum, m) => sum + m.totalPoints, 0) / members.length) || 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Avg Score</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-50/50 to-white p-1">
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

          <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-br from-green-50/50 to-white p-1">
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
          <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-50/50 to-white p-1">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      Top Members
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium mt-1">Leading individual performers</CardDescription>
                  </div>
                  <Link href="/members">
                    <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-white to-slate-50/50 border border-slate-150 hover:border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <Badge
                          variant="secondary"
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                        >
                          {member.rank}
                        </Badge>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-xs text-white font-bold">★</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-lg group-hover:text-slate-800 transition-colors duration-200">{member.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-sm text-slate-500 font-medium">Member</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-slate-900">{member.totalPoints}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Points Earned</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>

          {/* Top Departments Preview */}
                    {/* Top Departments Preview */}
          <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-br from-green-50/50 to-white p-1">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      Top Departments
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium mt-1">Leading team performers</CardDescription>
                  </div>
                  <Link href="/departments">
                    <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {topDepartments.map((department, index) => (
                  <div
                    key={department.id}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-white to-green-50/30 border border-slate-150 hover:border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <Badge
                          variant="secondary"
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                        >
                          {department.rank}
                        </Badge>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-xs text-white font-bold">🏅</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-lg group-hover:text-slate-800 transition-colors duration-200">{department.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-sm text-slate-500 font-medium">Department</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-slate-900">{department.totalPoints}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Team Score</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Floating Action Menu */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="relative group">
          {/* Quick Action Buttons */}
          <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 space-y-3">
            <Link href="/members">
              <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group/btn">
                <Users className="w-5 h-5" />
                <div className="absolute right-14 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  View Members
                </div>
              </button>
            </Link>
            <Link href="/departments">
              <button className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group/btn">
                <Building2 className="w-5 h-5" />
                <div className="absolute right-14 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  View Departments
                </div>
              </button>
            </Link>
            <Link href="/how">
              <button className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group/btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div className="absolute right-14 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  How it Works
                </div>
              </button>
            </Link>
          </div>
          
          {/* Main FAB */}
          <button className="w-14 h-14 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group-hover:rotate-45">
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </button>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Quick Actions
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
