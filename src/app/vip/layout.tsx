import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP & Table Service",
  description:
    "Book VIP tables at every Ibiza superclub. Skip the queue, private tables, bottle service, and a personal host. Pacha, Amnesia, Hï Ibiza, Ushuaïa, DC-10, UNVRS.",
  openGraph: {
    title: "VIP Tables Ibiza | ISLA",
    description: "Private tables and VIP access at all 6 Ibiza superclubs.",
  },
};

export default function VipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
