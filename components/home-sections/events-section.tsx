'use client';

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ArrowRight } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { fetchOpenEvents } from "@/lib/api"
import { useTranslation } from 'react-i18next'
import type { ApiOpenEventItem } from "@/lib/api-types"
import '@/lib/i18n-client'

function EventCardSkeleton() {
  return (
    <div className="w-[300px] md:w-[350px] flex-shrink-0 rounded-lg border border-slate-200 bg-white overflow-hidden">
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-48 w-full rounded-none" />
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
      {/* Section Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
          <Calendar className="w-4 h-4 text-slate-600" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto max-w-full" />
      </div>

      {/* Skeleton Cards */}
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex gap-4 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
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
      {/* Section Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
          <Calendar className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">{t('events.badge')}</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
          {t('events.title')}
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
          {t('events.subtitle')}
        </p>
      </div>

      {/* Events Scroll Area */}
      {events.length > 0 ? (
        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex gap-4 pb-4">
            {events.map((event) => (
              <div key={event.id} className="w-[300px] md:w-[350px] flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500">{t('events.empty')}</p>
        </div>
      )}

      {/* View All Button */}
      {events.length > 0 && (
        <div className="text-center mt-8">
          <Link href="/events" passHref legacyBehavior>
            <Button asChild variant="outline" className="border-slate-300 hover:bg-slate-50 cursor-pointer">
              <a>
                {t('events.viewAll')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
