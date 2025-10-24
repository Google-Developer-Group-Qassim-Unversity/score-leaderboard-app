import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface LeaderboardCardProps {
  id: string
  name: string
  rank: number
  points: number
  type: "member" | "department"
}

const getPodiumStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        container: "bg-gradient-to-br from-amber-100/90 via-yellow-50 to-amber-200/60 border-2 border-amber-300/70 hover:border-amber-400 shadow-lg shadow-amber-500/20",
        badge: "bg-gradient-to-br from-amber-400 to-amber-500 text-white border-0",
        medalBadge: "bg-gradient-to-r from-amber-400 to-amber-500",
        points: "text-amber-600",
        icon: "🥇"
      }
    case 2:
      return {
        container: "bg-gradient-to-br from-blue-100/90 via-slate-100 to-blue-200/60 border-2 border-blue-400/70 hover:border-blue-500 shadow-lg shadow-blue-500/20",
        badge: "bg-gradient-to-br from-blue-400 to-blue-500 text-white border-0",
        medalBadge: "bg-gradient-to-r from-blue-400 to-blue-500",
        points: "text-blue-600",
        icon: "🥈"
      }
    case 3:
      return {
        container: "bg-gradient-to-br from-orange-100/90 via-red-50 to-orange-200/60 border-2 border-orange-400/70 hover:border-orange-500 shadow-lg shadow-orange-500/20",
        badge: "bg-gradient-to-br from-orange-400 to-orange-500 text-white border-0",
        medalBadge: "bg-gradient-to-r from-orange-400 to-orange-500",
        points: "text-orange-600",
        icon: "🥉"
      }
    default:
      return {
        container: "bg-slate-50/70 border border-slate-200 hover:border-slate-300",
        badge: "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 border-0",
        medalBadge: "bg-gradient-to-r from-slate-400 to-slate-500",
        points: "text-slate-600",
        icon: ""
      }
  }
}

export function LeaderboardCard({ id, name, rank, points, type }: LeaderboardCardProps) {
  const styles = getPodiumStyles(rank)
  const detailsUrl = type === "member" ? `/member/${id}` : `/department/${id}`

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.01] group ${styles.container}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Badge
            variant={rank === 1 ? "default" : rank <= 3 ? "secondary" : "outline"}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${styles.badge}`}
          >
            {rank}
          </Badge>
          {rank <= 3 && (
            <div className={`absolute -top-1 -right-1 w-5 h-5 ${styles.medalBadge} rounded-full flex items-center justify-center`}>
              <span className="text-xs text-white font-bold">{styles.icon}</span>
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-slate-800 truncate">{name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0 sm:ml-auto w-full sm:w-auto">
        <div className="text-left sm:text-right">
          <p className={`font-bold text-lg ${styles.points}`}>
            {points}
          </p>
          <p className="text-xs text-slate-500">Points</p>
        </div>
        <Link href={detailsUrl} className="flex-shrink-0">
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
            <Eye className="h-4 w-4 mr-1" />
            <span className="hidden xs:inline">View Details</span>
            <span className="xs:hidden">Details</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
