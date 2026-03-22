import { fetchEvents, fetchOpenEvents } from "@/lib/api/api"
import { EventsList } from "@/components/events-list"
import { PageHeader } from "@/components/page-header"
import { SectionHeader } from "@/components/section-header"
import { CalendarDays, CheckCircle2, History } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"
import { EventsSemesterSelector } from "@/components/events-semester-selector"

export const dynamic = "force-dynamic"

interface EventsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)

  const sp = await searchParams
  const semester = sp.semester ? Number(sp.semester) : null

  const [openEvents, allEvents] = await Promise.all([
    fetchOpenEvents(),
    fetchEvents(semester)
  ])

  // Filter closed events for history
  const closedEvents = allEvents
    .filter(event => event.status === "closed")
    .sort((a, b) => new Date(b.end_datetime).getTime() - new Date(a.end_datetime).getTime()) // Latest to oldest

  return (
    <div className={`container mx-auto px-4 py-8 max-w-7xl bg-white ${rtl ? 'rtl' : 'ltr'}`}>
      <PageHeader
        heading={t('events.heading')}
        subHeading={t('events.subHeading')}
        icon={CalendarDays}
      />

      <div className="mt-8 space-y-12">
        {/* Open Events Section */}
        <section className="mb-20">
          <SectionHeader
            title={t('events.openEvents')}
            icon={CheckCircle2}
            color="green"
          />
          <div className="mt-6">
            <EventsList 
              events={openEvents}
              emptyMessage={t('events.empty')}
            />
          </div>
        </section>


        {/* Event History Section */}
        <section>
          <SectionHeader
            title={t('events.pastEvents')}
            icon={History}
            color="blue"
          />
          <div className="mt-6">
            <EventsList 
              events={closedEvents}
              emptyMessage={t('events.noPastEvents')}
              hideSignup={true}
              headerSlot={<EventsSemesterSelector currentSemester={semester} />}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
