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

        {/* Department Type Cards Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specialized Departments Card */}
          <Card className="bg-white border border-slate-200 rounded-lg">
            <CardHeader className="border-b border-slate-200">
              {/* Card Title with Icon */}
              <div className="flex items-center gap-3 mb-1">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-6 w-40" />
              </div>
              {/* Card Description */}
              <Skeleton className="h-4 w-full max-w-xs mt-1" />
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-white border border-slate-200"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      {/* Rank Badge */}
                      <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-md shrink-0" />
                      
                      {/* Department Name */}
                      <Skeleton className="h-5 sm:h-6 w-32 sm:w-48" />
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
              </div>
            </CardContent>
          </Card>

          {/* Administrative Departments Card */}
          <Card className="bg-white border border-slate-200 rounded-lg">
            <CardHeader className="border-b border-slate-200">
              {/* Card Title with Icon */}
              <div className="flex items-center gap-3 mb-1">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-6 w-40" />
              </div>
              {/* Card Description */}
              <Skeleton className="h-4 w-full max-w-xs mt-1" />
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-white border border-slate-200"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      {/* Rank Badge */}
                      <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-md shrink-0" />
                      
                      {/* Department Name */}
                      <Skeleton className="h-5 sm:h-6 w-32 sm:w-48" />
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
