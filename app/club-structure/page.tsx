import { ClubStructureContent } from "@/components/club-structure/club-structure-content"
import { fetchPublicClubStructure } from "@/lib/api/api"
import type { PublicClubStructure } from "@/lib/api/types"
import { getSemesters } from "@/lib/semesters"

export const dynamic = "force-dynamic"

interface ClubStructurePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ClubStructurePage({ searchParams }: ClubStructurePageProps) {
  const sp = await searchParams
  const { current_semester, semesters } = await getSemesters()
  // Only a listed semester is honoured; anything else shows the current one.
  const requested = Number(sp.semester)
  const semester = semesters.includes(requested) ? requested : current_semester

  let data: PublicClubStructure | null = null
  try {
    data = await fetchPublicClubStructure(semester === current_semester ? undefined : semester)
  } catch (error) {
    console.error("Failed to load the public club structure", error)
  }

  return (
    <ClubStructureContent
      data={data ?? { presidents: [], departments: [] }}
      loadFailed={data === null}
      semester={semester}
      currentSemester={current_semester}
      availableSemesters={semesters}
    />
  )
}
