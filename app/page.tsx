import { HeroSection, StatsSection, EventsSection, LeaderboardSection, MagazinesSection, ClubStructureSection } from "@/components/home-sections"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"
import { CURRENT_SEMESTER } from "@/lib/config"
import { checkIsSuperAdmin } from "@/lib/auth-utils"

interface DashboardProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const lang = await getLanguageFromCookies();
  const rtl = isRTL(lang);
  const params = await searchParams
  
  const isSuperAdmin = await checkIsSuperAdmin()
  const semesterParam = params.semester ? Number(params.semester) : undefined
  const activeSemester = isSuperAdmin ? semesterParam : undefined

  return (
    <div className={`min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-800 relative overflow-x-hidden ${rtl ? 'rtl' : 'ltr'}`}>
            {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <HeroSection lang={lang} />
        <StatsSection lang={lang} semester={activeSemester} />
        <EventsSection />
        <LeaderboardSection semester={activeSemester} />
        <MagazinesSection />
        <ClubStructureSection lang={lang} />
      </div>
    </div>
  )
}
