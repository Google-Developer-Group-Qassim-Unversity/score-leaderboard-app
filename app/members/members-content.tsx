"use client"

import { Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { useMembers } from "@/hooks/queries/use-members"
import { MembersSearch } from "./members-search"

interface MembersContentProps {
  heading: string
  subHeadingLabel: string
  currentUniId?: string
  currentUserName?: string
}

export function MembersContent({
  heading,
  subHeadingLabel,
  currentUniId,
  currentUserName,
}: MembersContentProps) {
  // Hydrated from the server prefetch, so this renders with data on first
  // paint — no loading branch on initial load or on a revisit within the
  // stale window. Refetches happen in the background, behind the current UI.
  const { data: apiMembers = [] } = useMembers()

  const membersCount = apiMembers.length

  const allMembersForSearch = apiMembers.map((m, i) => ({
    ...m,
    id: m.member_id.toString(),
    name: m.member_name,
    rank: i + 1,
    totalPoints: m.total_points ?? 0,
    departmentId: "",
    uni_id: m.uni_id,
  }))

  // Top 100 for initial display (already sorted from the API)
  const topMembersForDisplay = allMembersForSearch.slice(0, 100)

  const foundMember = apiMembers.find((m) => {
    const sUniId = String(m.uni_id || "").trim()
    const targetUniId = String(currentUniId || "").trim()
    return sUniId && targetUniId && sUniId === targetUniId
  })

  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <PageHeader
          icon={Users}
          iconColor="blue"
          heading={heading}
          subHeading={`${membersCount} ${subHeadingLabel}`}
        />
      </div>

      {/* Search Component */}
      <MembersSearch
        members={topMembersForDisplay}
        allMembers={allMembersForSearch}
        membersCount={membersCount}
        currentUniId={currentUniId}
        currentUserName={foundMember?.member_name || currentUserName}
      />
    </>
  )
}
