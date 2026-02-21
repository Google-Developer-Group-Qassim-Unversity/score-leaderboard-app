import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MoveRight } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { fetchOpenEvents } from "@/lib/api"
import { getLanguageFromCookies, getTranslation } from "@/lib/server-i18n"

function EventCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden h-full flex flex-col">
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="px-4 flex-1">
        <Skeleton className="aspect-3/4 w-full rounded-md" />
      </div>
      <div className="p-4 flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  )
}

function EventsScrollSkeleton() {
  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden">
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-75 w-75 shrink-0">
            <EventCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

async function EventsScroll() {
  const openEvents = await fetchOpenEvents(false)
  const events = openEvents.slice(0, 6)
  const lang = await getLanguageFromCookies()
  const t = (key: string) => getTranslation(lang, key)

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 cursor-default">{t('events.empty')}</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden">
      <div 
        className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event) => (
          <div 
            key={event.id} 
            className="min-w-75 w-75 shrink-0 snap-center"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  )
}

export async function EventsSection() {
  const lang = await getLanguageFromCookies()
  const t = (key: string) => getTranslation(lang, key)

  return (
    <section className="container mx-auto px-4 py-12">
      <HomeSectionHeader
        icon={Calendar}
        title={t('events.title')}
        subtitle={t('events.subtitle')}
      />

      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-full min-w-0">
        <div className="p-1">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <span className="wrap-break-word leading-tight">{t('events.title')}</span>
              </CardTitle>
              <Link href="/events">
                <Button variant="outline" size="default" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0 cursor-pointer">
                  {t('events.viewAll')}
                  <MoveRight className="h-3 w-3 sm:h-4 sm:w-4 ms-1.5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="relative px-3 sm:px-6">
            <Suspense fallback={<EventsScrollSkeleton />}>
              <EventsScroll />
            </Suspense>
          </CardContent>
        </div>
      </Card>
    </section>
  )
}
