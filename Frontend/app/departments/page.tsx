import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Building2, ArrowLeft } from "lucide-react"
import { fetchDepartments, transformApiDepartment } from "@/lib/api"
import { LeaderboardCard } from "@/components/leaderboard-card"

export default async function DepartmentsLeaderboard() {
  const apiDepartmentsResponse = await fetchDepartments()
  
  // Calculate count from array lengths
  const departmentsCount = (apiDepartmentsResponse.Administrative?.length || 0) + (apiDepartmentsResponse.Specialized?.length || 0)

  // Transform and rank departments for each type separately (already sorted from API)
  const administrativeDepartments = (apiDepartmentsResponse.Administrative || [])
    .map((dept, index) => transformApiDepartment(dept, index + 1, 'administrative'))
  
  const practicalDepartments = (apiDepartmentsResponse.Specialized || [])
    .map((dept, index) => transformApiDepartment(dept, index + 1, 'practical'))

  const getDepartmentIcon = (name: string) => {
    const icons: Record<string, string> = {
      Engineering: "⚙️",
      Marketing: "📢",
      Sales: "💼",
      HR: "👥",
      Finance: "💰",
      Operations: "🔧",
      "Customer Success": "🎯",
      Legal: "⚖️",
      "Tech and Business": "💻", // Added icon for the example department
    }
    return icons[name] || "🏢"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 relative overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 transform hover:scale-105 transition-transform duration-200">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                Departments Leaderboard
              </h1>
            </div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              {departmentsCount} departments ranked by total points earned through team collaboration and achievements
            </p>
          </div>
        </div>

        {/* Quick Stats
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{departments[0]?.totalPoints || 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Top Score</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{departmentsCount}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Departments</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v4h2v-4zm4 0h-2v4h2v-4zm4 0h-2v4h2v-4zm2-7h-3V2h-2v2H8V2H6v2H3c-1.11 0-1.99.89-1.99 2L1 18c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 16H3V8h16v10z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{departments.length > 0 ? Math.round(departments.reduce((sum, d) => sum + d.totalPoints, 0) / departments.length) : 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Avg Score</p>
              </div>
            </div>
            
          </div>
        </div>
        */}

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Department Type Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Administrative Departments */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                </div>
                Administrative Departments
              </CardTitle>
              <CardDescription className="text-sm text-slate-600 font-medium">Support and management teams</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
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
                
                {administrativeDepartments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg className="h-8 w-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-1">No administrative departments</p>
                    <p className="text-xs text-slate-400">Check back later</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Practical Departments */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4zM6.7 8.8c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.7-.7 1.9-.7 2.6 0 .7.7.7 1.9 0 2.6z"/>
                  </svg>
                </div>
                Specialized Departments
              </CardTitle>
              <CardDescription className="text-sm text-slate-600 font-medium">Hands-on and technical teams</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
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
                
                {practicalDepartments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg className="h-8 w-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4zM6.7 8.8c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.7-.7 1.9-.7 2.6 0 .7.7.7 1.9 0 2.6z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-1">No practical departments</p>
                    <p className="text-xs text-slate-400">Check back later</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}
