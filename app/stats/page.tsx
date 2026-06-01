import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"
import { StatsPageContent } from "@/components/stats-sections/stats-page-content"

export const metadata = {
  title: "Season in Review | GDG on Campus",
  description: "A look back at two incredible semesters of achievements, growth, and community",
}

export default async function StatsPage() {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <StatsPageContent lang={lang} />
    </div>
  )
}