"use client"

import { useState } from "react"
import { EventCard } from "./event-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { ApiEventItem, ApiOpenEventItem } from "@/lib/api-types"

interface EventsListProps {
  events: (ApiEventItem | ApiOpenEventItem)[]
  emptyMessage?: string
  hideSignup?: boolean
}

export function EventsList({ events, emptyMessage = "No events found", hideSignup = false}: EventsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        <p className="text-slate-600 dark:text-slate-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      {events.length > 10 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} hideSignup={hideSignup} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400">No events match your search.</p>
        </div>
      )}
    </div>
  )
}
