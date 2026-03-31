import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tomorrowland Ibiza 2026 — Weekly at Ushuaïa",
  description:
    "Tomorrowland Ibiza 2026 at Ushuaïa every Wednesday. Full season calendar, lineup, packages, and tickets. Dimitri Vegas & Like Mike, Afrojack, and more.",
  openGraph: {
    title: "Tomorrowland Ibiza 2026 | ISLA",
    description: "Weekly Wednesday residency at Ushuaïa. Full lineup and packages.",
  },
};

export default function TomorrowlandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
