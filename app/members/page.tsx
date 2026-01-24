import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Users, ArrowLeft, Eye, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { fetchMembers } from "@/lib/api"
import { MembersSearch } from "./members-search"

export default async function MembersLeaderboard() {
  const apiMembers = await fetchMembers()
  
  // Calculate count from array length
  const membersCount = apiMembers.length || 0

  // Get top 100 members for initial display (already sorted from API)
  const topMembers = (apiMembers || []).slice(0, 100)
  
  // Convert all members for search (with proper ranking)
  const allMembersForSearch = (apiMembers || []).map((m, i) => ({ 
    ...m, 
    id: m.member_id.toString(), 
    name: m.member_name,
    rank: i + 1, 
    totalPoints: m.total_points ?? 0,
    departmentId: ""
  }))
  
  // Convert top 100 for initial display
  const topMembersForDisplay = topMembers.map((m, i) => ({ 
    ...m, 
    id: m.member_id.toString(), 
    name: m.member_name,
    rank: i + 1, 
    totalPoints: m.total_points ?? 0,
    departmentId: ""
  }))

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Content */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <PageHeader 
            icon={Users}
            iconColor="blue"
            heading="Members Leaderboard"
            subHeading={`${membersCount} members ranked by total points earned through various activities and achievements`}
          />
        </div>

        {/* Search Component */}
        <MembersSearch 
          members={topMembersForDisplay}
          allMembers={allMembersForSearch}
          membersCount={membersCount} 
        />
        </div>
      </div>
    </div>
  )
}