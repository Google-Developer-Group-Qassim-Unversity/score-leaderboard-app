"use client"

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { ApiEventItem, ApiOpenEventItem } from "@/lib/api-types";
import { Button } from "./ui/button";
import { EventSignupButton } from "./event-signup-button";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

interface EventCardProps {
  event: ApiEventItem | ApiOpenEventItem;
  hideSignup?: boolean;
}

const IMAGE_SOURCE =
  process.env.NEXT_PUBLIC_DEV_IMAGE_SOURCE ||
  process.env.NEXT_PUBLIC_IMAGE_SOURCE;
export function EventCard({ event, hideSignup = false }: EventCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          <Link href={`/events/${event.id}`} className="hover:underline">
            {event.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-3 min-h-10">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {event.image_url && (
          <div className="relative w-full aspect-3/4 overflow-hidden rounded-md">
            <Image
              src={IMAGE_SOURCE + event.image_url}
              alt={event.name}
              width={300}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        {'form_id' in event && event.form_type === 'none' ? (
          <Link href={`/events/${event.id}`} className="w-full">
            <Button variant="default" className="w-full">
              {t('eventCard.viewEvent')}
            </Button>
          </Link>
        ) : (
          <>
            <Link href={`/events/${event.id}`} className={hideSignup ? "w-full" : "flex-1"}>
              <Button variant="outline" className="w-full">
                {t('eventCard.viewDetails')}
              </Button>
            </Link>
            {!hideSignup && 'form_id' in event && (
              <EventSignupButton event={event as ApiOpenEventItem} className="flex-1" />
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
