import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-9 md:h-10 w-48 md:w-64" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-5 md:h-6 w-32 md:w-40" />
          </div>
        </div>

        {/* Search Section Skeleton */}
        <div className="max-w-xl mx-auto mb-8">
          {/* Search Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-7 w-40" />
          </div>
          
          {/* Search Input */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Leaderboard Card Skeleton */}
        <Card className="bg-white rounded-lg border border-slate-200">
          <div className="p-1">
            <CardHeader className="pb-6">
              {/* Card Title */}
              <div className="flex items-center gap-3 mb-1">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-6 w-32" />
              </div>
              {/* Card Description */}
              <Skeleton className="h-4 w-48 mt-1" />
            </CardHeader>
            
            <CardContent className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-white border border-slate-200"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    {/* Rank Badge */}
                    <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-md shrink-0" />
                    
                    {/* Name */}
                    <Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {/* Points */}
                    <div className="text-right space-y-1">
                      <Skeleton className="h-5 sm:h-6 w-12 sm:w-16" />
                      <Skeleton className="h-3 w-8 sm:w-10" />
                    </div>
                    
                    {/* Details Button */}
                    <Skeleton className="h-9 sm:h-10 w-9 sm:w-24 rounded-md" />
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
