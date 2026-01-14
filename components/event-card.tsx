import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ApiEventItem } from "@/lib/api-types";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
interface EventCardProps {
  event: ApiEventItem;
}

const IMAGE_SOURCE =
  process.env.NEXT_PUBLIC_DEV_IMAGE_SOURCE ||
  process.env.NEXT_PUBLIC_IMAGE_SOURCE;

export function EventCard({ event }: EventCardProps) {
  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription className="line-clamp-2 mt-3 min-h-[2.5rem]">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {event.image_url && (
          <div className="relative w-full aspect-auto">
            <Image
              src={IMAGE_SOURCE + event.image_url}
              alt={event.name}
              width={3000}
              height={4000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Link href={`/events/${event.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1">Sign Up</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Sign Up</DialogTitle>
              <DialogDescription>
                Are you sure you want to sign up for this event: {event.name}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm Sign Up</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
