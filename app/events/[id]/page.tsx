import type { Metadata } from "next";
import { fetchEvents } from "@/lib/api/api";
import { getLanguageFromCookies } from "@/lib/server-i18n";
import { EventDetailContent } from "./event-detail-content";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const events = await fetchEvents();
    const event = events.find((e) => e.id === parseInt(id));

    if (!event) {
      return { title: "Event" };
    }

    const plainDescription = event.description?.replace(/\s+/g, " ").trim();

    return {
      title: event.name,
      description:
        (plainDescription && plainDescription.slice(0, 160)) ||
        `Details for ${event.name}, a GDG on Campus event.`,
      alternates: {
        canonical: `/events/${event.id}`,
      },
      openGraph: event.image_url
        ? { images: [event.image_url] }
        : undefined,
    };
  } catch {
    return { title: "Event" };
  }
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const lang = await getLanguageFromCookies();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <EventDetailContent id={id} lang={lang} />
    </div>
  );
}
