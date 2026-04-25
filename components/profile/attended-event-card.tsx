"use client"

import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CertificateDownloadButton } from './certificate-download-button'
import type { ApiMyEventItem, AttendanceDate } from '@/lib/api/types'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface AttendedEventCardProps {
  event: ApiMyEventItem
  locale: string
}

function formatEventDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatDayDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function AttendanceIndicator({ dates, locale, className }: { dates: AttendanceDate[]; locale: string; className?: string }) {
  const { t } = useTranslation()
  const attendedCount = dates.filter(d => d.attended).length

  return (
    <div className={`flex items-center gap-1 ${className ?? ''}`}>
      {dates.map((d, i) => (
        <div
          key={d.date}
          title={dates.length > 1
            ? `${t('profile.day')} ${i + 1} - ${formatDayDate(d.date, locale)}`
            : formatDayDate(d.date, locale)
          }
          className={`w-5 h-5 rounded-full flex items-center justify-center ${
            d.attended
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'bg-destructive/15 text-destructive'
          }`}
        >
          {d.attended ? (
            <Check className="h-3 w-3" strokeWidth={3} />
          ) : (
            <X className="h-3 w-3" strokeWidth={3} />
          )}
        </div>
      ))}
      {dates.length > 1 && (
        <span className="text-[10px] text-muted-foreground ms-1">
          {attendedCount}/{dates.length}
        </span>
      )}
    </div>
  )
}

export function AttendedEventCard({ event, locale }: AttendedEventCardProps) {
  const { t } = useTranslation()
  const allAttended = event.attendance_dates.length > 0
    && event.attendance_dates.every(d => d.attended)

  return (
    <div className="h-full w-72 shrink-0 flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      {event.image_url && (
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={event.image_url}
            alt={event.name}
            fill
            sizes="288px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col p-3 flex-1">
        <div>
          <h3 className="font-semibold text-sm line-clamp-1">
            <Link href={`/events/${event.id}`} className="hover:underline">
              {event.name}
            </Link>
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
            <CalendarDays className="h-3 w-3 shrink-0" />
            <span>{formatEventDate(event.start_datetime, locale)}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mt-2 min-h-[2.5em]">
          {event.description || '\u00A0'}
        </p>

        <AttendanceIndicator dates={event.attendance_dates} locale={locale} className="mt-1.5" />
      </div>

      <div className="flex items-center gap-2 px-3 pb-3 pt-0">
        <Link href={`/events/${event.id}`}>
          <Button variant="outline" size="sm" className="text-xs h-8">
            {t('profile.details')}
          </Button>
        </Link>
        <CertificateDownloadButton eventId={event.id} disabled={!allAttended} />
      </div>
    </div>
  )
}
