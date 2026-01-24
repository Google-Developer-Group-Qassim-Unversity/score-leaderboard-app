"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, UserCircle, Wrench, Eye, EyeOff } from "lucide-react"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { SectionHeader } from "@/components/section-header"

interface ClientLeaderboardCardsProps {
  topMembers: any[]
  practicalDepartments: any[]
  administrativeDepartments: any[]
}

export function ClientLeaderboardCards({ 
  topMembers, 
  practicalDepartments, 
  administrativeDepartments 
}: ClientLeaderboardCardsProps) {
  const [showMembersDetails, setShowMembersDetails] = useState(false)
  const [showDepartmentsDetails, setShowDepartmentsDetails] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-full">
      {/* Top Members Preview */}
      <Card className="bg-gradient-to-br from-blue-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-full min-w-0">
        <div className="p-1">
          <CardHeader className="pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <span className="break-words leading-tight">Top Members</span>
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium mt-1">Leading individual performers</CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Removed Show/Hide Details button for landing page */}
                <Link href="/members">
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative px-3 sm:px-6">
            <div className={`space-y-6 transition-all duration-500`}>
              <div className="w-full max-w-full min-w-0 overflow-hidden">
                <div className="space-y-3">
                  {topMembers.map((member, index) => (
                    <div key={member.member_id} className="w-full max-w-full min-w-0">
                      <LeaderboardCard id={member.member_id.toString()} name={member.member_name} rank={index + 1} points={member.total_points ?? 0} type="member" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Overlay removed to allow button/link interaction */}
          </CardContent>
        </div>
      </Card>

      {/* Top Departments Preview */}
      <Card className="bg-gradient-to-br from-green-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-full min-w-0">
        <div className="p-1">
          <CardHeader className="pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="break-words leading-tight">Top Departments</span>
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium mt-1">Leading team performers by category</CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Removed Show/Hide Details button for landing page */}
                <Link href="/departments">
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative px-3 sm:px-6">
            <div className={`space-y-6 transition-all duration-500`}>
              {/* Practical Departments */}
              <div className="w-full max-w-full min-w-0">
                <SectionHeader icon={Wrench} title="Specialized departments" color="green"/>
                <div className="space-y-3 w-full max-w-full">
                  {practicalDepartments.map((department, index) => ( 
                    <div key={department.department_id} className="w-full max-w-full min-w-0">
                      <LeaderboardCard id={department.department_id.toString()} name={department.department_name} rank={index + 1} points={department.total_points} type="department"/> 
                    </div>
                  ))}
                </div>
              </div>

              {/* Administrative Departments */}
              <div className="w-full max-w-full min-w-0">
                <SectionHeader icon={Building2} title="Administrative departments" color="blue"/>
                <div className="space-y-3 w-full max-w-full">
                  {administrativeDepartments.map((department, index) => (
                    <div key={department.department_id} className="w-full max-w-full min-w-0">
                      <LeaderboardCard id={department.department_id.toString()} name={department.department_name} rank={index + 1} points={department.total_points} type="department"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Overlay removed to allow button/link interaction */}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
