import { notFound } from "next/navigation"
import Image from "next/image"
import { fetchEvents } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Users, ChevronLeft, Timer } from "lucide-react"
import { calculateEventDuration } from "@/lib/event-utils"
import Link from "next/link"
import type { ApiEventItem } from "@/lib/api-types"

export const dynamic = "force-dynamic"

interface EventDetailPageProps {
  params: {
    id: string
  }
}

const getStatusStyles = (status: ApiEventItem["status"]) => {
  switch (status) {
    case "announced":
      return {
        badge: "bg-blue-100 text-blue-700 border-blue-300",
        label: "Upcoming"
      }
    case "open":
      return {
        badge: "bg-green-100 text-green-700 border-green-300",
        label: "Open for Signup"
      }
    case "closed":
      return {
        badge: "bg-gray-100 text-gray-700 border-gray-300",
        label: "Closed"
      }
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const events = await fetchEvents()
  const event = events.find(e => e.id === parseInt(params.id))

  if (!event) {
    notFound()
  }

  const styles = getStatusStyles(event.status)
  const isOnline = event.location_type === "online"
  const duration = calculateEventDuration(event.start_datetime, event.end_datetime)

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl" dir="rtl">
      {/* Back Button */}
      <Link href="/events" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors">
        <ChevronLeft className="h-4 w-4 ml-1" />
        Back to Events
      </Link>

      {/* Event Image */}
      {event.image_url && (
        <div className="relative w-full max-w-2xl mx-auto bg-slate-100 rounded-2xl overflow-hidden mb-8 shadow-xl">
          <Image
            src={event.image_url}
            alt={event.name}
            width={4023}
            height={4160}
            quality={95}
            className="w-full h-auto"
            style={{ imageRendering: 'crisp-edges' }}
            priority
          />
        </div>
      )}

      {/* Event Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <h1 className="text-4xl font-bold text-slate-900">{event.name}</h1>
          <Badge variant="outline" className={`${styles.badge} font-semibold text-sm px-3 py-1`}>
            {styles.label}
          </Badge>
        </div>
        {event.description && (
          <p className="text-lg text-slate-600 mt-4 whitespace-pre-line">
            {event.description}
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>When and where this event takes place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">
                    {duration.isSingleDay ? "Date" : "Dates"}
                  </p>
                  <p className="text-slate-600 text-lg" dir="ltr">{duration.dateDisplay}</p>
                  {!duration.isSingleDay && (
                    <p className="text-sm text-slate-500 mt-1" dir="ltr">
                      {duration.numberOfDays} day{duration.numberOfDays !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Time */}
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 shadow-md">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Time</p>
                  <p className="text-slate-600 text-lg" dir="ltr">{duration.timeDisplay}</p>
                </div>
              </div>

              <Separator />

              {/* Duration */}
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-3 shadow-md">
                  <Timer className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Duration</p>
                  {duration.isSingleDay ? (
                    <p className="text-slate-600 text-lg" dir="ltr">
                      {Math.floor(duration.hoursPerDay)} hour{Math.floor(duration.hoursPerDay) !== 1 ? 's' : ''}
                      {duration.hoursPerDay % 1 !== 0 && ` ${Math.round((duration.hoursPerDay % 1) * 60)} minutes`}
                    </p>
                  ) : (
                    <div>
                      <p className="text-slate-600 text-lg" dir="ltr">
                        {Math.floor(duration.hoursPerDay)} hour{Math.floor(duration.hoursPerDay) !== 1 ? 's' : ''} per day
                      </p>
                      <p className="text-sm text-slate-500 mt-1" dir="ltr">
                        Total: {duration.numberOfDays} days
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className={`bg-gradient-to-br ${isOnline ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-600'} rounded-lg p-3 shadow-md`}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Location</p>
                  {isOnline ? (
                    <div>
                      <p className="text-green-600 font-medium mb-1">Online Event</p>
                      <p className="text-sm text-slate-600">Join from anywhere with an internet connection</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-orange-600 font-medium mb-1">On-Site Event</p>
                      <p className="text-slate-600">{event.location || "Location to be announced"}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Card */}
          {!event.description && (
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  More details about this event will be shared soon. Please check back later for updates.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card className={event.status === "open" ? "border-2 border-green-300 shadow-lg" : ""}>
            <CardHeader>
              <CardTitle className="text-lg">Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.status === "open" && (
                <>
                  <p className="text-sm text-slate-600">
                    Registration is currently open for this event. Sign up now to secure your spot!
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                    <Users className="h-4 w-4 ml-2" />
                    Sign Up Now
                  </Button>
                </>
              )}
              {event.status === "announced" && (
                <>
                  <p className="text-sm text-slate-600">
                    Registration has not opened yet. Check back soon to sign up for this event.
                  </p>
                  <Button className="w-full" variant="outline" disabled>
                    Registration Not Open
                  </Button>
                </>
              )}
              {event.status === "closed" && (
                <>
                  <p className="text-sm text-slate-600">
                    Registration for this event has closed. Stay tuned for future events!
                  </p>
                  <Button className="w-full" variant="outline" disabled>
                    Registration Closed
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Event Type:</span>
                <span className="font-medium text-slate-900">{isOnline ? "Online" : "On-Site"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className="font-medium text-slate-900">{styles.label}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="font-medium text-slate-900">
                  {duration.isSingleDay 
                    ? `${Math.floor(duration.hoursPerDay)}hr${Math.floor(duration.hoursPerDay) !== 1 ? 's' : ''}`
                    : `${duration.numberOfDays} days`
                  }
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
