import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Header Skeleton */}
            <div className="h-16 border-b bg-white flex items-center px-4 md:px-8 shrink-0">
                <Skeleton className="h-9 w-32 rounded-md" />
                <div className="mx-auto flex items-center gap-3">
                    <Skeleton className="h-6 w-48 hidden sm:block" />
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 p-4 md:p-8">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
        </div>
    )
}
