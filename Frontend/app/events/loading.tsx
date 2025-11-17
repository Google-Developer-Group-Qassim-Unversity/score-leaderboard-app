import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/page-header"
import { CalendarDays } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        heading="Events"
        subHeading="Discover upcoming events, sign up for open registrations, and explore past events"
        icon={CalendarDays}
      />

      <Tabs defaultValue="open" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="open" disabled>
            Open (...)
          </TabsTrigger>
          <TabsTrigger value="upcoming" disabled>
            Upcoming (...)
          </TabsTrigger>
          <TabsTrigger value="history" disabled>
            History (...)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EventCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
      {/* Optional Image Skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />
      
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-200">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </div>
    </div>
  )
}
