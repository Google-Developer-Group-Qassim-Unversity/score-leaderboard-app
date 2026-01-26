import { HeroSection, StatsSection, EventsSection, LeaderboardSection } from "@/components/home-sections"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"

export default async function Dashboard() {
  const lang = await getLanguageFromCookies();
  const rtl = isRTL(lang);

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="relative">
        <HeroSection lang={lang} />
        <StatsSection lang={lang} />
        <LeaderboardSection />
        <EventsSection />
      </div>
    </div>
  )
}
