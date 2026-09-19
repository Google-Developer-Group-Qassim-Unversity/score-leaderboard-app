import type { Metadata } from "next"
import { fetchMemberById } from "@/lib/api/api"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"
import { MemberDetailContent } from "./member-detail-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const { member } = await fetchMemberById(id)
    return {
      title: member.member_name,
      description: `${member.member_name}'s points and event history on the GDG on Campus leaderboard.`,
      alternates: {
        canonical: `/members/${id}`,
      },
    }
  } catch {
    return { title: "Member" }
  }
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <MemberDetailContent id={id} lang={lang} />
      </div>
    </div>
  )
}
