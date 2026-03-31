import { notFound } from "next/navigation";
import { events, getEventBySlug } from "@/lib/events";
import { EventPageClient } from "./EventPageClient";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found — ISLA" };

  return {
    title: `${event.name} at ${event.clubName} — ISLA | Ibiza Tickets`,
    description: `Get tickets for ${event.name} at ${event.clubName}, ${event.date}. ${event.artists.map(a => a.name).join(", ")}. From €${Math.min(...event.ticketTiers.filter(t => !t.soldOut).map(t => t.price))}.`,
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return <EventPageClient event={event} />;
}
