import { ClubStructureContent } from "@/components/club-structure/club-structure-content"
import { fetchPublicClubStructure } from "@/lib/api/api"
import type { PublicClubStructure } from "@/lib/api/types"

export const dynamic = "force-dynamic"

const emptyStructure: PublicClubStructure = { presidents: [], departments: [] }

export default async function ClubStructurePage() {
  try {
    const data = await fetchPublicClubStructure()
    return <ClubStructureContent data={data} />
  } catch (error) {
    console.error("Failed to load the public club structure", error)
    return <ClubStructureContent data={emptyStructure} loadFailed />
  }
}
