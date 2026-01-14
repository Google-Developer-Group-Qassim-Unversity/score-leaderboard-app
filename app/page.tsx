import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, UserCircle, Wrench, Eye, EyeOff } from "lucide-react"
import DashboardHonorDept from "./DashboradHonorDept"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { SectionHeader } from "@/components/section-header"
import { PageHeader } from "@/components/page-header"
import { LeaderboardWrapper } from "@/components/leaderboard-wrapper"
import { fetchMembers, fetchDepartments } from "@/lib/api"
import { ClientLeaderboardCards } from "@/components/client-leaderboard-cards"

export default async function Dashboard() {
  const [apiMembers, apiDepartmentsResponse] = await Promise.all([
    fetchMembers(),
    fetchDepartments(),
  ])

  // Calculate counts from array lengths
  const membersCount = apiMembers.length || 0
  const departmentsCount = (apiDepartmentsResponse.Administrative?.length || 0) + (apiDepartmentsResponse.Specialized?.length || 0)

  // Get top 10 members (already sorted from API)
  const topMembers = (apiMembers || []).slice(0, 10)
  
  // Get all departments (already sorted from API)
  const practicalDepartments = apiDepartmentsResponse.Specialized || []
  const administrativeDepartments = apiDepartmentsResponse.Administrative || []

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
        <PageHeader 
          icon="/gdg.png"
          heading="Leaderboard Dashboard"
          iconColor="white"
          subHeading="Track performance across members and departments with comprehensive points tracking"
        />

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
        <LeaderboardWrapper>
          <div className="space-y-6 w-full">
            <div className="w-full max-w-full overflow-hidden px-2 sm:px-0">
              <ClientLeaderboardCards 
                topMembers={topMembers}
                practicalDepartments={practicalDepartments}
                administrativeDepartments={administrativeDepartments}
              />
            </div>
          </div>
        </LeaderboardWrapper>

        {/* Special Department Section */}
        <DashboardHonorDept />
        </div>
      </div>
    </div>
  )
}
