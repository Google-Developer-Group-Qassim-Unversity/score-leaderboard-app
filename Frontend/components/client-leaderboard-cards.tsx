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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Top Members Preview */}
      <Card className="bg-gradient-to-br from-blue-50/50 to-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="p-1">
          <CardHeader className="pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  Top Members
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium mt-1">Leading individual performers</CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowMembersDetails(!showMembersDetails)}
                  className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3"
                >
                  {showMembersDetails ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                  <span className="hidden sm:inline">{showMembersDetails ? 'Hide Details' : 'Show Details'}</span>
                  <span className="sm:hidden">{showMembersDetails ? 'Hide' : 'Show'}</span>
                </Button>
                <Link href="/members">
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className={`space-y-6 transition-all duration-500 ${!showMembersDetails ? 'blur-md' : ''}`}>
            <div>
              <div className="space-y-3">
                {topMembers.map((member, index) => (
                  <LeaderboardCard key={member.id} id={member.id.toString()} name={member.name} rank={index + 1} points={member.points} type="member" />
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  Top Departments
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium mt-1">Leading team performers by category</CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowDepartmentsDetails(!showDepartmentsDetails)}
                  className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3"
                >
                  {showDepartmentsDetails ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                  <span className="hidden sm:inline">{showDepartmentsDetails ? 'Hide Details' : 'Show Details'}</span>
                  <span className="sm:hidden">{showDepartmentsDetails ? 'Hide' : 'Show'}</span>
                </Button>
                <Link href="/departments">
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent className={`space-y-6 transition-all duration-500 ${!showDepartmentsDetails ? 'blur-md' : ''}`}>
            {/* Practical Departments */}
            <div>
              <SectionHeader icon={Wrench} title="Specialized departments" color="green"/>
              <div className="space-y-3">
                {practicalDepartments.map((department, index) => ( 
                  <LeaderboardCard key={department.id} id={department.id.toString()} name={department.name} rank={index + 1} points={department.points} type="department"/> 
                ))}
              </div>
            </div>

            {/* Administrative Departments */}
            <div>
              <SectionHeader icon={Building2} title="Administrative departments" color="blue"/>
              <div className="space-y-3">
                {administrativeDepartments.map((department, index) => (
                  <LeaderboardCard key={department.id} id={department.id.toString()} name={department.name} rank={index + 1} points={department.points} type="department"/>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
