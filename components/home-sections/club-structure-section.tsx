import { fetchPublicClubStructure } from "@/lib/api/api"
import type { PublicClubStructure } from "@/lib/api/types"
import type { Language } from "@/lib/translations"
import { ClubStructureSummary } from "./club-structure-summary"

export async function ClubStructureSection({ lang }: { lang: Language }) {
  let initialData: PublicClubStructure | undefined
  try {
    initialData = await fetchPublicClubStructure()
  } catch (error) {
    console.error("Failed to load the club structure summary", error)
  }
  return <ClubStructureSummary lang={lang} initialData={initialData} />
}
