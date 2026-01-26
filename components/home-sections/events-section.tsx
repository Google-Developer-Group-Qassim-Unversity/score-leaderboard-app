'use client';

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MoveRight } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { fetchOpenEvents } from "@/lib/api"
import { useTranslation } from 'react-i18next'
import type { ApiOpenEventItem } from "@/lib/api-types"
import '@/lib/i18n-client'

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

function EventsSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section Header Skeleton */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl border border-slate-200">
          <Calendar className="w-6 h-6 text-slate-400" />
        </div>
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto max-w-full" />
      </div>

      {/* Card Skeleton */}
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden w-full max-w-full min-w-0">
        <div className="p-1">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-9 w-24" />
            </div>
          </CardHeader>
          <CardContent className="relative px-3 sm:px-6">
            <div className="w-full max-w-full min-w-0 overflow-hidden">
              <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[300px] w-[300px] shrink-0">
                    <EventCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  )
}

export function EventsSection() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<ApiOpenEventItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const openEvents = await fetchOpenEvents()
        setEvents(openEvents.slice(0, 6))
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  if (isLoading) {
    return <EventsSectionSkeleton />
  }

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
                <Button variant="outline" size="default" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0">
                  {t('events.viewAll')}
                  <MoveRight className="h-3 w-3 sm:h-4 sm:w-4 ms-1.5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="relative px-3 sm:px-6">
            {/* Events Horizontal Scroll */}
            {events.length > 0 ? (
              <div className="w-full max-w-full min-w-0 overflow-hidden">
                <div 
                  className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {events.map((event) => (
                    <div 
                      key={event.id} 
                      className="min-w-[300px] w-[300px] shrink-0 snap-center"
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">{t('events.empty')}</p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </section>
  )
}
