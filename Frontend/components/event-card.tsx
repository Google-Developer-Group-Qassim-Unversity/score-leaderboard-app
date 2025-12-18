import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ApiEventItem } from "@/lib/api-types"

interface EventCardProps {
  event: ApiEventItem
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
        <CardAction>
          <Link href={`/event/${event.id}`}>
            <Button variant="link" size="sm">
              View Details
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {event.image_url && (
          <div className="relative w-full aspect-square">
            <Image
              src={event.image_url}
              alt={event.name}
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
