import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tonight — What's On Now",
  description:
    "See what's happening in Ibiza tonight. Live events, door times, availability, and tickets for every club on the island right now.",
  openGraph: {
    title: "What's On Tonight in Ibiza | ISLA",
    description: "Live events happening right now across all Ibiza superclubs.",
  },
};

export default function TonightLayout({ children }: { children: React.ReactNode }) {
  return children;
}
