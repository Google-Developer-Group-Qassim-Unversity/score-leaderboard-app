import { Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { fetchMembers } from "@/lib/api"
import { MembersSearch } from "./members-search"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"
import { currentUser } from "@clerk/nextjs/server"

export default async function MembersLeaderboard() {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)

  // TODO: needs to be checked if it affected the performance or no
  const user = await currentUser()
  const uniId = user?.publicMetadata?.uni_id as string | undefined
  const fullArabicName = user?.publicMetadata?.fullArabicName as string | undefined

  const apiMembers = await fetchMembers()
  const foundMember = apiMembers.find((m) => {
    const sUniId = String(m.uni_id || "").trim()
    const targetUniId = String(uniId || "").trim()
    return sUniId && targetUniId && sUniId === targetUniId
  })

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
    departmentId: "",
    uni_id: m.uni_id
  }))

  // Convert top 100 for initial display
  const topMembersForDisplay = topMembers.map((m, i) => ({
    ...m,
    id: m.member_id.toString(),
    name: m.member_name,
    rank: i + 1,
    totalPoints: m.total_points ?? 0,
    departmentId: "",
    uni_id: m.uni_id
  }))

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container max-w-6xl mx-auto px-4 py-8 pb-32">
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
            currentUniId={uniId}
            currentUserName={foundMember?.member_name || fullArabicName}
          />
        </div>
      </div>
    </div>
  )
}
