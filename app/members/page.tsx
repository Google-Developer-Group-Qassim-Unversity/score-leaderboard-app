import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Users, ArrowLeft, Eye, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { fetchMembers } from "@/lib/api"
import { MembersSearch } from "./members-search"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"

export default async function MembersLeaderboard() {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)
  
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
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <PageHeader 
            icon={Users}
            iconColor="blue"
            heading={t('members.heading')}
            subHeading={`${membersCount} ${t('members.subHeading')}`}
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