import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clubs — The 6 Iconic Ibiza Venues",
  description:
    "Explore Ibiza's legendary superclubs: Pacha, Amnesia, Hï Ibiza, Ushuaïa, DC-10, and UNVRS. Official tickets, residencies, and VIP tables.",
  openGraph: {
    title: "Ibiza Clubs | ISLA",
    description: "Explore all 6 iconic Ibiza superclubs. Get official tickets.",
  },
};

export default function ClubsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
