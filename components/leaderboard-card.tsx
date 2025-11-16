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

const getPodiumStyles = (rank: number, type: "member" | "department") => {
  // If type is department, always return golden styling
  if (type === "department") {
    switch (rank) {
      case 1:
        return {
          container: "bg-gradient-to-br from-amber-100/90 via-yellow-50 to-amber-200/60 border-2 border-amber-300/70 hover:border-amber-400 shadow-lg shadow-amber-500/20",
          badge: "bg-gradient-to-br from-amber-400 to-amber-500 text-white border-0",
        }
      default:
        return {
          container: "bg-slate-50/70 border border-slate-200 hover:border-slate-300",
          badge: "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 border-0",
        }
    }
  }
  
  // For members, use the original rank-based styling
  switch (rank) {
    case 1:
      return {
        container: "bg-gradient-to-br from-amber-100/90 via-yellow-50 to-amber-200/60 border-2 border-amber-300/70 hover:border-amber-400 shadow-lg shadow-amber-500/20",
        badge: "bg-gradient-to-br from-amber-400 to-amber-500 text-white border-0",
      }
    case 2:
      return {
        container: "bg-gradient-to-br from-gray-100/90 via-slate-50 to-gray-200/60 border-2 border-gray-400/70 hover:border-gray-500 shadow-xl shadow-gray-500/20 hover:shadow-gray-500/30",
        badge: "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-lg shadow-slate-500/30",
      }
    case 3:
      return {
        container: "bg-gradient-to-br from-orange-100/90 via-red-50 to-orange-200/60 border-2 border-orange-400/70 hover:border-orange-500 shadow-lg shadow-orange-500/20",
        badge: "bg-gradient-to-br from-orange-400 to-orange-500 text-white border-0",
      }
    default:
      return {
        container: "bg-slate-50/70 border border-slate-200 hover:border-slate-300",
        badge: "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 border-0",
      }
  }
}

export function LeaderboardCard({ id, name, rank, points, type }: LeaderboardCardProps) {
  const styles = getPodiumStyles(rank, type)
  const detailsUrl = type === "member" ? `/member/${id}` : `/department/${id}`

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.01] group ${styles.container} w-full max-w-full min-w-0`}
    >
      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto min-w-0 flex-1">
        <div className="relative flex-shrink-0">
          <Badge
            variant={rank === 1 ? "default" : rank <= 3 ? "secondary" : "outline"}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm ${styles.badge}`}
          >
            {rank}
          </Badge>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm sm:text-base text-slate-800 break-words hyphens-auto leading-tight max-w-full">
            {name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 mt-3 sm:mt-0 w-full sm:w-auto flex-shrink-0">
        <div className="text-left sm:text-right">
          <p className="font-bold text-base sm:text-lg">
            {points}
          </p>
          <p className="text-xs text-slate-500">Points</p>
        </div>
        <Link href={detailsUrl} className="flex-shrink-0">
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">View Details</span>
            <span className="xs:hidden">Details</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
