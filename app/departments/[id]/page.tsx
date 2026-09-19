import type { Metadata } from "next"
import { fetchDepartmentById } from "@/lib/api/api"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"
import { DepartmentDetailContent } from "./department-detail-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const { department } = await fetchDepartmentById(id)
    return {
      title: department.department_name,
      description: `${department.department_name}'s points and event history on the GDG on Campus leaderboard.`,
      alternates: {
        canonical: `/departments/${id}`,
      },
    }
  } catch {
    return { title: "Department" }
  }
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { id } = await params
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <DepartmentDetailContent id={id} lang={lang} />
      </div>
    </div>
  )
}
