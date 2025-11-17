import { fetchEvents } from "@/lib/api"
import { EventsList } from "@/components/events-list"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, CheckCircle2, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = "force-dynamic"

export default async function EventsPage() {
  const events = await fetchEvents()

  // Categorize events by status - filter out announced events
  const openEvents = events.filter(event => event.status === "open")
  const closedEvents = events
    .filter(event => event.status === "closed")
    .sort((a, b) => new Date(b.end_datetime).getTime() - new Date(a.end_datetime).getTime()) // Latest to oldest

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        heading="Events"
        subHeading="Discover upcoming events, sign up for open registrations, and explore past events"
        icon={CalendarDays}
      />

      <Tabs defaultValue="open" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="open" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Open ({openEvents.length})</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            <span>History ({closedEvents.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Open Events */}
        <TabsContent value="open" className="mt-6">
          <EventsList 
            events={openEvents}
            emptyMessage="There are currently no events accepting signups. Check back soon!"
          />
        </TabsContent>

        {/* Event History */}
        <TabsContent value="history" className="mt-6">
          <EventsList 
            events={closedEvents}
            emptyMessage="Past events will appear here once they are completed."
            hideStatus={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
