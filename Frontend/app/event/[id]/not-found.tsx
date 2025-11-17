import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarX, ChevronLeft } from "lucide-react"

export default function EventNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 rounded-full p-6">
            <CalendarX className="h-16 w-16 text-slate-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Event Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">
          The event you're looking for doesn't exist or may have been removed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events">
            <Button size="lg" className="w-full sm:w-auto">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
