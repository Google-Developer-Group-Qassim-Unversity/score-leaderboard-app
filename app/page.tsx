import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { HeroSection, StatsSection, EventsSection, LeaderboardSection, MagazinesSection, ClubStructureSection } from "@/components/home-sections"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"
import { getQueryClient } from "@/lib/query-client"
import { membersQuery, departmentsQuery, eventsQuery, openEventsQuery } from "@/lib/queries"

export default async function Dashboard() {
  const lang = await getLanguageFromCookies();
  const rtl = isRTL(lang);

  const queryClient = getQueryClient()

  // One prefetch pass for every section on the page. Sections share queries
  // (stats and the leaderboard both read members/departments), so this fetches
  // each resource once and every section renders from the same cache.
  await Promise.all([
    queryClient.prefetchQuery(membersQuery()),
    queryClient.prefetchQuery(departmentsQuery()),
    queryClient.prefetchQuery(eventsQuery()),
    queryClient.prefetchQuery(openEventsQuery()),
  ])

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
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StatsSection lang={lang} />
          <EventsSection lang={lang} />
          <LeaderboardSection lang={lang} />
        </HydrationBoundary>
        <MagazinesSection />
        <ClubStructureSection lang={lang} />
      </div>
    </div>
  )
}
