import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { LucideIcon } from "lucide-react"

interface Department {
  id: number
  name: string
  points: number
}

interface DepartmentTypeCardProps {
  title: string
  description: string
  departments: Department[]
  icon: LucideIcon
  gradientColors: {
    from: string
    to: string
  }
}

export function DepartmentTypeCard({ 
  title, 
  description, 
  departments, 
  icon: Icon,
  gradientColors
}: DepartmentTypeCardProps) {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-3">
          <div className={`p-2 bg-gradient-to-br ${gradientColors.from} ${gradientColors.to} rounded-lg`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {departments.map((department, index) => (
            <LeaderboardCard
              key={department.id}
              id={department.id.toString()}
              name={department.name}
              rank={index + 1}
              points={department.points}
              type="department"
            />
          ))}
          
          {departments.length === 0 && (
            <div className="text-center py-12">
              <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Icon className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 mb-1">No {title.toLowerCase()}</p>
              <p className="text-xs text-slate-400">Check back later</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}