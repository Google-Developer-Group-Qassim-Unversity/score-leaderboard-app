import { HeroSection, StatsSection, EventsSection, LeaderboardSection, MagazinesSection, ClubStructureSection } from "@/components/home-sections"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"

export default async function Dashboard() {
  const lang = await getLanguageFromCookies();
  const rtl = isRTL(lang);

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${rtl ? 'rtl' : 'ltr'}`}>
            {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      <div className="relative">
        <HeroSection lang={lang} />
        <StatsSection lang={lang} />
        <EventsSection />
        <LeaderboardSection />
        <MagazinesSection />
        <ClubStructureSection lang={lang} />
      </div>
    </div>
  )
}
