"use client"

import { useMyEvents } from '@/hooks/queries/use-my-events'
import { AttendedEventCard } from './attended-event-card'
import { ParticipatedEventCard } from './participated-event-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { CalendarDays, Users } from 'lucide-react'

export function EventsFeed() {
  const { data, isLoading, error } = useMyEvents()
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar' : 'en'

  if (error) {
    return (
      <div className="rounded-lg border bg-destructive/5 p-6 text-center text-sm text-destructive">
        {t('error.somethingWentWrong')}
      </div>
    )
  }

  const attended = data?.attended ?? []
  const participated = data?.participated ?? []

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="h-5 w-5" />
          <h3 className="font-semibold text-lg">{t('profile.attendedTitle')}</h3>
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="shrink-0 w-72 space-y-3 rounded-xl border p-4">
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : attended.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">{t('profile.noAttended')}</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {attended.map((event) => (
              <div key={event.id} className="snap-start shrink-0">
                <AttendedEventCard event={event} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5" />
          <h3 className="font-semibold text-lg">{t('profile.participatedTitle')}</h3>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : participated.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">{t('profile.noParticipated')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {participated.map((event) => (
              <ParticipatedEventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
