import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft } from "lucide-react"

export default function EventDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button Skeleton */}
      <div className="inline-flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
          <ChevronLeft className="h-5 w-5" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
        {/* Image Skeleton - Left Side */}
        <div className="flex justify-center lg:justify-start">
          <Skeleton className="rounded-xl w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96" />
        </div>

        {/* Event Info - Right Side */}
        <div className="space-y-6 min-w-0">
          {/* Title Skeleton */}
          <Skeleton className="h-10 w-3/4" />

          {/* Badge Skeleton */}
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-7 w-24" />
          </div>

          {/* Date & Time Skeletons */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 shrink-0" />
              <Skeleton className="h-5 w-full max-w-md" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 shrink-0" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>

          {/* Location Skeleton */}
          <div className="flex items-start gap-2">
            <Skeleton className="h-5 w-5 shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>

          <Separator />

          {/* Signup Button Skeleton */}
          <Skeleton className="h-10 w-full" />

          {/* Description Card Skeleton */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 py-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="pb-6 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
