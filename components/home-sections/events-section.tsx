'use client';

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Calendar, ArrowRight } from "lucide-react"
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

      {/* Carousel Skeleton */}
      <div className="mx-auto max-w-5xl px-12">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {[1, 2, 3].map((i) => (
              <CarouselItem key={i} className="basis-full md:basis-1/2 lg:basis-1/3">
                <EventCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="disabled:opacity-50" />
          <CarouselNext className="disabled:opacity-50" />
        </Carousel>
      </div>
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
      <HomeSectionHeader
        icon={Calendar}
        title={t('events.title')}
        subtitle={t('events.subtitle')}
      />

      {/* Events Carousel */}
      {events.length > 0 ? (
        <div className="mx-auto max-w-5xl px-12">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem key={event.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <EventCard event={event} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
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
                <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
              </a>
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
