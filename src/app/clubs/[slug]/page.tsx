import { notFound } from "next/navigation";
import { getClubBySlug, getAllClubSlugs } from "@/lib/data";
import { ClubPageClient } from "./ClubPageClient";

export function generateStaticParams() {
  return getAllClubSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return { title: "Club Not Found — ISLA" };

  return {
    title: `${club.name} Ibiza — Tickets & Events`,
    description: `${club.tagline} Get official tickets for ${club.name} Ibiza. ${club.description.slice(0, 120)}...`,
    openGraph: {
      title: `${club.name} Ibiza | ISLA`,
      description: `${club.tagline} Official tickets, VIP tables, and upcoming events.`,
    },
  };
}

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) notFound();

  return <ClubPageClient club={club} />;
}
