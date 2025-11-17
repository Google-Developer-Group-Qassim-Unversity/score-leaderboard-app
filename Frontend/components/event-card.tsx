import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, Timer } from "lucide-react"
import { formatEventCardDate } from "@/lib/event-utils"
import type { ApiEventItem } from "@/lib/api-types"

interface EventCardProps {
  event: ApiEventItem
  hideStatus?: boolean
}

const getStatusStyles = (status: ApiEventItem["status"]) => {
  switch (status) {
    case "announced":
      return {
        badge: "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-100",
        container: "bg-white border border-slate-200 hover:border-slate-300",
        button: "bg-blue-600 hover:bg-blue-700 text-white",
        label: "Upcoming"
      }
    case "open":
      return {
        badge: "bg-green-100 text-green-700 border-green-300 hover:bg-green-100",
        container: "bg-white border border-slate-200 hover:border-slate-300",
        button: "bg-green-600 hover:bg-green-700 text-white",
        label: "Open for Signup"
      }
    case "closed":
      return {
        badge: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-100",
        container: "bg-white border border-slate-200 hover:border-slate-300",
        button: "bg-gray-400 text-white cursor-not-allowed",
        label: "Closed"
      }
  }
}

export function EventCard({ event, hideStatus = false }: EventCardProps) {
  const styles = getStatusStyles(event.status)
  const isOnline = event.location_type === "online"
  const { date, time, duration } = formatEventCardDate(event.start_datetime, event.end_datetime)

  return (
    <div
      className={`rounded-xl transition-all duration-300 hover:shadow-xl group overflow-hidden ${styles.container}`}
      dir="rtl"
    >
      {/* Event Image */}
      {event.image_url && (
        <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
          <Image
            src={event.image_url}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={95}
            className="object-cover object-top"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-slate-900 transition-colors line-clamp-2">
              {event.name}
            </h3>
            {!hideStatus && (
              <Badge 
                variant="outline" 
                className={`${styles.badge} font-semibold`}
              >
                {styles.label}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 whitespace-pre-line">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Calendar className="h-4 w-4 text-slate-500 flex-shrink-0" />
            <span className="font-medium" dir="ltr">{date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Clock className="h-4 w-4 text-slate-500 flex-shrink-0" />
            <span dir="ltr">{time}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Timer className="h-4 w-4 text-slate-500 flex-shrink-0" />
            <span className="font-medium text-blue-600" dir="ltr">{duration}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0" />
            <span className="flex items-center gap-1">
              {isOnline ? (
                <span className="text-blue-600 font-medium">Online</span>
              ) : (
                <span className="truncate">{event.location || "On-Site"}</span>
              )}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-200/50">
          {event.status === "open" && (
            <Button 
              className={`flex-1 ${styles.button} shadow-sm font-medium`}
              size="sm"
            >
              <Users className="h-4 w-4 ml-2" />
              Sign Up
            </Button>
          )}
          <Link href={`/event/${event.id}`} className={event.status === "open" ? "flex-1" : "w-full"}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
