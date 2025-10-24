import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, AlertCircle, Infinity } from "lucide-react"
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

  if (apiMembers.length > 0 && apiMembers[0].id > 1000) {
    apiStatus = "fallback"
  }

  // Transform and sort API data
  const members = apiMembers
    .sort((a, b) => b.points - a.points)
    .map((member, index) => transformApiMember(member, index + 1))

  const departments = allDepartments
    .sort((a, b) => b.points - a.points)
    .map((dept, index) => {
      const isAdministrative = (apiDepartmentsResponse.administrative || []).some(d => d.id === dept.id)
      const type: 'administrative' | 'practical' = isAdministrative ? 'administrative' : 'practical'
      return transformApiDepartment(dept, index + 1, type)
    })

  const topMembers = members.slice(0, 10)
  const topDepartments = departments.slice(0, 10) // Increased to ensure we have enough for both types

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

        {/* Quick Stats Bar
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">15</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Events</p>
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
        */}

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
                        <p className="font-bold  text-slate-900 text-sm sm:text-base group-hover:text-slate-800 transition-colors duration-200">{member.name}</p>
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
                    {topDepartments.filter(dept => dept.type === 'practical').map((department, index) => (
                      <div
                        key={department.id}
                        className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white to-green-50/30 border border-green-100 hover:border-green-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Badge
                              variant="secondary"
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-slate-700 bg-gradient-to-br from-green-100 to-green-200 border border-green-300 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                            >
                              {department.rank}
                            </Badge>
                            {index === 0 && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-xs text-white font-bold">★</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-sm group-hover:text-slate-800 transition-colors duration-200">{department.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-green-600">{department.totalPoints}</p>
                          <p className="text-xs text-slate-400">pts</p>
                        </div>
                      </div>
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
                    {topDepartments.filter(dept => dept.type === 'administrative').map((department, index) => (
                      <div
                        key={department.id}
                        className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white to-blue-50/30 border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Badge
                              variant="secondary"
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-slate-700 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                            >
                              {department.rank}
                            </Badge>
                            {index === 0 && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-xs text-white font-bold">★</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-sm group-hover:text-slate-800 transition-colors duration-200">{department.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-blue-600">{department.totalPoints}</p>
                          <p className="text-xs text-slate-400">pts</p>
                        </div>
                      </div>
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
