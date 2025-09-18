import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Building2, ArrowLeft, Eye } from "lucide-react"
import { fetchDepartments, fetchDepartmentsCount, transformApiDepartment } from "@/lib/api"

export default async function DepartmentsLeaderboard() {
  const [apiDepartments, departmentsCount] = await Promise.all([fetchDepartments(), fetchDepartmentsCount()])

  // Transform and sort API data
  const departments = apiDepartments
    .sort((a, b) => b.points - a.points)
    .map((dept, index) => transformApiDepartment(dept, index + 1))

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
            <div className="flex items-center justify-center gap-4 mb-6">
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

        {/* Quick Stats */}
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

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              Department Rankings
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-medium">Team performance rankings across all departments</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {departments.map((department, index) => (
                <div
                  key={department.id}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50 hover:shadow-lg hover:scale-[1.02] gap-4 ${
                    department.rank <= 3
                      ? "bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 border-2 border-green-200 shadow-md"
                      : "bg-slate-50/70 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={department.rank === 1 ? "default" : department.rank <= 3 ? "secondary" : "outline"}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg ${
                        department.rank === 1 
                          ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0" 
                          : department.rank === 2
                            ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white border-0"
                            : department.rank === 3
                              ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white border-0"
                              : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 border-0"
                      }`}
                    >
                      {department.rank}
                    </Badge>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="text-3xl flex-shrink-0 p-2 bg-white rounded-xl shadow-sm">{getDepartmentIcon(department.name)}</div>
                      <div className="min-w-0">
                        <p className="font-bold text-xl text-slate-800 truncate">{department.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Building2 className="h-4 w-4 flex-shrink-0" />
                          <span>Department Team</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-left sm:text-right">
                      <p
                        className={`font-extrabold text-3xl ${
                          department.rank === 1
                            ? "text-amber-600"
                            : department.rank === 2
                              ? "text-slate-600"
                              : department.rank === 3
                                ? "text-orange-600"
                                : "text-green-600"
                        }`}
                      >
                        {department.totalPoints}
                      </p>
                      <p className="text-sm text-slate-500 font-medium">points</p>
                    </div>
                    <Link href={`/department/${department.id}`} className="flex-shrink-0">
                      <Button variant="outline" size="lg" className="whitespace-nowrap bg-white/90 hover:bg-white border-2 border-slate-200 hover:border-blue-300 shadow-md hover:shadow-lg transition-all duration-200">
                        <Eye className="h-5 w-5 mr-2" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {departments.length === 0 && (
              <div className="text-center py-16">
                <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-slate-400" />
                </div>
                <p className="text-xl text-slate-500 font-medium mb-2">No departments found</p>
                <p className="text-slate-400">Check back later for department rankings</p>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
