import { fetchEvents, fetchOpenEvents } from "@/lib/api"
import { EventsList } from "@/components/events-list"
import { PageHeader } from "@/components/page-header"
import { SectionHeader } from "@/components/section-header"
import { CalendarDays, CheckCircle2, History } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export const dynamic = "force-dynamic"

export default async function EventsPage() {
  const [openEvents, allEvents] = await Promise.all([
    fetchOpenEvents(),
    fetchEvents()
  ])

  // Filter closed events for history
  const closedEvents = allEvents
    .filter(event => event.status === "closed")
    .sort((a, b) => new Date(b.end_datetime).getTime() - new Date(a.end_datetime).getTime()) // Latest to oldest

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-white">
      <PageHeader
        heading="Events"
        subHeading="Discover upcoming events, sign up for open registrations, and explore past events"
        icon={CalendarDays}
      />

      <div className="mt-8 space-y-12">
        {/* Open Events Section */}
        <section className="mb-20">
          <SectionHeader
            title="Open Events"
            icon={CheckCircle2}
            color="green"
          />
          <div className="mt-6">
            <EventsList 
              events={openEvents}
              emptyMessage="There are currently no events available for signups. Check back soon!"
            />
          </div>
        </section>


        {/* Event History Section */}
        <section>
          <SectionHeader
            title="Past Events"
            icon={History}
            color="blue"
          />
          <div className="mt-6">
            <EventsList 
              events={closedEvents}
              emptyMessage="Past events will appear here once they are completed."
              hideSignup={true}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
