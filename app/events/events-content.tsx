"use client"

import { SectionHeader } from "@/components/section-header"
import { CheckCircle2, History } from "lucide-react"
import { EventsList } from "@/components/events-list"
import { EventsSemesterSelector } from "@/components/events-semester-selector"
import { useEvents, useOpenEvents } from "@/hooks/queries/use-events"
import { isEventPast } from "@/lib/event-utils"

interface EventsContentProps {
  semester: number | null
  availableSemesters: number[]
  openEventsTitle: string
  pastEventsTitle: string
  emptyMessage: string
  noPastEventsMessage: string
}

// 'none' and 'hidden' are internal-only events that should never surface here.
const isPublic = (locationType: string) => locationType !== "none" && locationType !== "hidden"

export function EventsContent({
  semester,
  availableSemesters,
  openEventsTitle,
  pastEventsTitle,
  emptyMessage,
  noPastEventsMessage,
}: EventsContentProps) {
  const { data: openEvents = [] } = useOpenEvents()
  const { data: allEvents = [] } = useEvents(semester)

  const filteredOpenEvents = openEvents.filter(
    (event) => isPublic(event.location_type) && !isEventPast(event)
  )

  const closedEvents = allEvents
    .filter((event) => event.status === "closed" && isPublic(event.location_type))
    .sort((a, b) => new Date(b.end_datetime).getTime() - new Date(a.end_datetime).getTime())

  return (
    <div className="mt-8 space-y-12">
      {/* Open Events Section */}
      <section className="mb-20">
        <SectionHeader title={openEventsTitle} icon={CheckCircle2} color="green" />
        <div className="mt-6">
          <EventsList events={filteredOpenEvents} emptyMessage={emptyMessage} />
        </div>
      </section>

      {/* Event History Section */}
      <section>
        <SectionHeader title={pastEventsTitle} icon={History} color="blue" />
        <div className="mt-6">
          <EventsList
            events={closedEvents}
            emptyMessage={noPastEventsMessage}
            hideSignup={true}
            headerSlot={
              <EventsSemesterSelector
                currentSemester={semester}
                availableSemesters={availableSemesters}
              />
            }
          />
        </div>
      </section>
    </div>
  )
}
