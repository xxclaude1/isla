import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — All Ibiza Nights",
  description:
    "Browse all upcoming Ibiza events. Filter by club, genre, and date. Official tickets for Pacha, Amnesia, Hï Ibiza, Ushuaïa, DC-10, and UNVRS.",
  openGraph: {
    title: "Ibiza Events | ISLA",
    description: "Browse and book tickets for all upcoming Ibiza club events.",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
