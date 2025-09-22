import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Award, TrendingUp, Building2, BookOpen } from "lucide-react"
import { fetchDepartmentById } from "@/lib/api"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { id } = await params
  const departmentData = await fetchDepartmentById(id)

  if (!departmentData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <Link href="/departments">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Departments
            </Button>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Building2 className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-semibold">{departmentData.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">Department Details & Points History</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Department Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Department Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white font-semibold">
                    {departmentData.name}
                  </h2>
                  <p className="text-gray-500">Department</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Points</span>
                    <span className="font-bold text-green-600 text-lg">{departmentData.points}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Points History */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Points History
                </CardTitle>
                <CardDescription>Detailed log of all points earned by the department</CardDescription>
              </CardHeader>
              <CardContent>
                {departmentData.events.length > 0 ? (
                  <div className="space-y-3">
                    {departmentData.events.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{event.event_name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.action_name}</p>
                            <p className="text-sm text-gray-500">{new Date(event.start_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 text-lg">+{event.action_points}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No points history available for this department.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
