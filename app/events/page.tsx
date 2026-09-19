import type { Metadata } from "next"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { PageHeader } from "@/components/page-header"
import { CalendarDays } from "lucide-react"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { getQueryClient } from "@/lib/query-client"
import { eventsQuery, openEventsQuery } from "@/lib/queries"
import { getSemesters } from "@/lib/semesters"
import { EventsContent } from "./events-content"

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming and past GDG Qassim events, workshops, and activities.",
  alternates: {
    canonical: "/events",
  },
}

interface EventsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)

  const sp = await searchParams
  const semester = sp.semester ? Number(sp.semester) : null

  const queryClient = getQueryClient()
  const [{ semesters }] = await Promise.all([
    getSemesters(),
    queryClient.prefetchQuery(openEventsQuery()),
    queryClient.prefetchQuery(eventsQuery(semester)),
  ])

  return (
    <div className={`container mx-auto px-4 py-8 max-w-7xl bg-white ${rtl ? 'rtl' : 'ltr'}`}>
      <PageBreadcrumb
        className="mb-6"
        items={[
          { label: t('nav.home'), href: '/' },
          { label: t('nav.events') },
        ]}
      />
      <PageHeader
        heading={t('events.heading')}
        subHeading={t('events.subHeading')}
        icon={CalendarDays}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <EventsContent
          semester={semester}
          availableSemesters={semesters}
          openEventsTitle={t('events.openEvents')}
          pastEventsTitle={t('events.pastEvents')}
          emptyMessage={t('events.empty')}
          noPastEventsMessage={t('events.noPastEvents')}
        />
      </HydrationBoundary>
    </div>
  )
}
