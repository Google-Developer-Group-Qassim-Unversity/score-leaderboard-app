import { StatsPageContent } from "@/components/stats-sections/stats-page-content"
import type { Language } from "@/lib/translations"

export const metadata = {
  title: "Season in Review | GDG on Campus",
  description: "A look back at two incredible semesters of achievements, growth, and community",
}

export default async function StatsPage() {
  const lang: Language = 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800">
      <StatsPageContent lang={lang} />
    </div>
  )
}