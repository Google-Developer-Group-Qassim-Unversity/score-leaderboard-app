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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-300">{departmentsCount} departments ranked by total points</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Department Rankings
            </CardTitle>
            <CardDescription>Team performance rankings across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departments.map((department, index) => (
                <div
                  key={department.id}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 gap-4 ${
                    department.rank <= 3
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                      : "bg-gray-50/50 dark:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={department.rank === 1 ? "default" : department.rank <= 3 ? "secondary" : "outline"}
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                    >
                      {department.rank}
                    </Badge>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="text-2xl flex-shrink-0">{getDepartmentIcon(department.name)}</div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{department.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Building2 className="h-3 w-3 flex-shrink-0" />
                          <span>Department</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-left sm:text-right">
                      <p
                        className={`font-bold text-2xl ${
                          department.rank === 1
                            ? "text-amber-600"
                            : department.rank === 2
                              ? "text-gray-600"
                              : department.rank === 3
                                ? "text-amber-700"
                                : "text-green-600"
                        }`}
                      >
                        {department.totalPoints}
                      </p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                    <Link href={`/department/${department.id}`} className="flex-shrink-0">
                      <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="hidden xs:inline">View Details</span>
                        <span className="xs:hidden">Details</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {departments.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No departments found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600">{departmentsCount}</div>
              <p className="text-sm text-gray-500">Total Departments</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {departments.length > 0
                  ? Math.round(departments.reduce((sum, d) => sum + d.totalPoints, 0) / departments.length)
                  : 0}
              </div>
              <p className="text-sm text-gray-500">Average Points</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {departments.length > 0 ? Math.max(...departments.map((d) => d.totalPoints)) : 0}
              </div>
              <p className="text-sm text-gray-500">Highest Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
