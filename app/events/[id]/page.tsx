import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchEvents, fetchOpenEvents } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CalendarPlus,
  Clock,
  MapPin,
  Globe,
  ChevronLeft,
  Info,
} from "lucide-react";
import Link from "next/link";
import type { ApiEventItem, ApiOpenEventItem } from "@/lib/api-types";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";
import { getLanguageFromCookies, getTranslation } from "@/lib/server-i18n";
import { EventSignupButton } from "@/components/event-signup-button";

export const dynamic = "force-dynamic";
const IMAGE_SOURCE =
  process.env.NEXT_PUBLIC_DEV_IMAGE_SOURCE ||
  process.env.NEXT_PUBLIC_IMAGE_SOURCE;

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

// Valid statuses for display (excludes draft)
const VALID_STATUSES: ApiEventItem["status"][] = ["open", "active", "closed"];

const getStatusVariant = (status: ApiEventItem["status"]) => {
  switch (status) {
    case "open":
      return "outline" as const;
    case "active":
      return "outline" as const;
    case "closed":
      return "outline" as const;
    default:
      return "outline" as const;
  }
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const lang = await getLanguageFromCookies();
  const t = (key: string) => getTranslation(lang, key);

  // Fetch both regular events and open events (for signup button)
  const [events, openEvents] = await Promise.all([
    fetchEvents(false),
    fetchOpenEvents(false),
  ]);

  // Filter to only valid statuses (open, active, closed)
  const validEvents = events.filter((e) => VALID_STATUSES.includes(e.status));
  const event = validEvents.find((e) => e.id === parseInt(params.id));

  if (!event) {
    notFound();
  }

  // Check if this event has an open registration form
  const openEvent = openEvents.find(
    (e) => e.id === event.id
  ) as ApiOpenEventItem | undefined;

  // Construct full image URL
  const imageUrl =
    event.image_url && IMAGE_SOURCE
      ? `${IMAGE_SOURCE}${event.image_url}`
      : null;

  // Get location icon based on location type
  const LocationIcon = event.location_type === "online" ? Globe : MapPin;

  // Format date only (keeping as-is, no localization)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time only (keeping as-is, no localization)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const startDate = formatDate(event.start_datetime);
  const endDate = formatDate(event.end_datetime);
  const dailyStartTime = formatTime(event.start_datetime);
  const dailyEndTime = formatTime(event.end_datetime);

  // Check if start and end are on the same day
  const isSameDay =
    new Date(event.start_datetime).toDateString() ===
    new Date(event.end_datetime).toDateString();

  // Calculate duration in days
  const start = new Date(event.start_datetime);
  const end = new Date(event.end_datetime);
  const startDateOnly = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const endDateOnly = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );
  const diffTime = Math.abs(endDateOnly.getTime() - startDateOnly.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Get translated status label
  const getStatusLabel = () => {
    switch (event.status) {
      case "open":
        // Check if form_type is 'none' for events without registration
        if (openEvent?.form_type === 'none') {
          return t("eventDetail.status.openToJoin");
        }
        return t("eventDetail.status.open");
      case "active":
        return t("eventDetail.status.active");
      case "closed":
        return t("eventDetail.status.closed");
      default:
        return event.status;
    }
  };

  // Get translated location type label
  const getLocationTypeLabel = () => {
    switch (event.location_type) {
      case "online":
        return t("eventDetail.locationType.online");
      case "on-site":
        return t("eventDetail.locationType.onsite");
      case "none":
        return t("eventDetail.locationType.none");
      default:
        return event.location_type;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <Link
        href="/events"
        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 ltr:mr-1 rtl:rotate-180" />
        {t("eventDetail.backToEvents")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
        {/* Event Image - Left Side */}
        <div className="flex justify-center lg:justify-start">
          {imageUrl ? (
            <ImageZoom zoomMargin={20}>
              <Image
                src={imageUrl}
                alt={event.name}
                width={600}
                height={200}
                className="rounded-xl max-w-full lg:max-w-md xl:max-w-lg h-auto max-h-150 object-contain"
                priority
              />
            </ImageZoom>
          ) : (
            <div className="flex items-center justify-center w-64 h-64 bg-muted rounded-xl text-muted-foreground">
              <div className="text-center">
                <Calendar className="h-16 w-16 mx-auto mb-2 opacity-50" />
                <span className="text-sm">{t("eventDetail.noImage")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Event Info - Right Side */}
        <div className="space-y-6 min-w-0">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold" dir="auto">
            {event.name}
          </h1>

          {/* Badges and Signup Button */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant={getStatusVariant(event.status)}
              className="text-sm px-3 py-1"
            >
              {getStatusLabel()}
            </Badge>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                {isSameDay ? (
                  <span className="font-medium text-foreground text-base sm:text-lg">
                    {startDate}
                  </span>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium text-foreground text-base sm:text-lg">
                      {startDate}
                    </span>
                    <span className="hidden sm:inline">—</span>
                    <span className="font-medium text-foreground text-base sm:text-lg">
                      {endDate}
                    </span>
                    {diffDays > 1 && (
                      <span className="text-sm text-muted-foreground font-normal">
                        ({diffDays} {t("eventDetail.days")})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <span className="font-medium text-foreground">
                {dailyStartTime} - {dailyEndTime}
              </span>
              {!isSameDay && (
                <span className="text-sm text-muted-foreground">({t("eventDetail.daily")})</span>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location_type !== "none" && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <LocationIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm">{getLocationTypeLabel()}</span>
                <p className="font-medium text-foreground">{event.location}</p>
              </div>
            </div>
          )}

          <Separator />
            {openEvent && (
              <EventSignupButton event={openEvent} className="w-full" />
            )}

          {/* Description Section */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 py-4">
              <Info className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-xl font-semibold">
                {t("eventDetail.description")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              {event.description ? (
                <p
                  className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
                  dir="auto"
                >
                  {event.description}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  {t("eventDetail.noDescription")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
