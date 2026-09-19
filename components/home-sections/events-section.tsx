"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MoveRight } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { useOpenEvents } from "@/hooks/queries/use-events"
import { isEventPast } from "@/lib/event-utils"
import { getTranslation } from "@/lib/i18n"
import type { Language } from "@/lib/translations"

export function EventsSection({ lang }: { lang: Language }) {
  const t = (key: string) => getTranslation(lang, key)

  const { data: openEvents = [], isError } = useOpenEvents()

  const events = openEvents.filter((event) => !isEventPast(event)).slice(0, 6)

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
              <Link href="/events" prefetch>
                <Button variant="outline" size="default" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0 cursor-pointer">
                  {t('events.viewAll')}
                  <MoveRight className="h-3 w-3 sm:h-4 sm:w-4 ms-1.5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="relative px-3 sm:px-6">
            {isError ? (
              <div className="text-center py-12">
                <p className="text-slate-500 cursor-default">Events currently unavailable</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 cursor-default">{t('events.empty')}</p>
              </div>
            ) : (
              <div className="w-full max-w-full min-w-0 overflow-hidden">
                <div
                  className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {events.map((event) => (
                    <div key={event.id} className="min-w-75 w-75 shrink-0 snap-center">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </section>
  )
}
