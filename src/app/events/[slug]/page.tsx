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

  const lowestPrice = Math.min(...event.ticketTiers.filter(t => !t.soldOut).map(t => t.price));
  const artistNames = event.artists.map(a => a.name).join(", ");
  const dateFormatted = new Date(event.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return {
    title: `${event.name} at ${event.clubName} — Tickets`,
    description: `Get tickets for ${event.name} at ${event.clubName}, ${dateFormatted}. ${artistNames}. From €${lowestPrice}.`,
    openGraph: {
      title: `${event.name} at ${event.clubName} | ISLA`,
      description: `${dateFormatted}. ${artistNames}. Tickets from €${lowestPrice}.`,
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return <EventPageClient event={event} />;
}
