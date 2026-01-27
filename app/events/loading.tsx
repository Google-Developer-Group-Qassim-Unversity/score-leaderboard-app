import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/page-header"
import { SectionHeader } from "@/components/section-header"
import { CalendarDays, CheckCircle2, History } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        heading="Events"
        subHeading="Discover upcoming events, sign up for open registrations, and explore past events"
        icon={CalendarDays}
      />

      <div className="mt-8 space-y-12">
        {/* Open Events Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="h-6 w-6 text-slate-600" />
            <div className="flex-1">
              <Skeleton className="h-7 w-40 mb-1" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Separator */}
        <Separator className="my-12" />

        {/* Event History Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <History className="h-6 w-6 text-slate-600" />
            <div className="flex-1">
              <Skeleton className="h-7 w-40 mb-1" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
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
