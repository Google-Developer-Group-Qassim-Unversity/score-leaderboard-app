"use client"

import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import type { ApiMyEventItem } from '@/lib/api/types'

interface ParticipatedEventCardProps {
  event: ApiMyEventItem
  locale: string
}

function formatEventDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function ParticipatedEventCard({ event, locale }: ParticipatedEventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors hover:bg-accent"
    >
      <span className="font-medium text-sm truncate">{event.name}</span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
        <CalendarDays className="h-3.5 w-3.5" />
        {formatEventDate(event.start_datetime, locale)}
      </span>
    </Link>
  )
}
