// ============================================
// ISLA — Tomorrowland Ibiza 2026 Data
// ============================================

export interface TmlDate {
  id: string;
  date: string;
  guests: string[];
  availability: number;
  priceFrom: number;
  soldOut: boolean;
  highlighted?: boolean;
  cancelled?: boolean;
}

export interface TmlArtist {
  name: string;
  role: "resident" | "confirmed" | "special";
  genre?: string;
}

export interface TmlPackage {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

// All 19 Wednesday dates: May 6 – September 30 (excluding Jul 22, Aug 12, Sep 2)
export const tomorrowlandDates: TmlDate[] = [
  { id: "tml-0506", date: "2026-05-06", guests: ["Lineup TBA"], availability: 35, priceFrom: 55, soldOut: false },
  { id: "tml-0513", date: "2026-05-13", guests: ["Oliver Heldens"], availability: 42, priceFrom: 55, soldOut: false },
  { id: "tml-0520", date: "2026-05-20", guests: ["Robin Schulz"], availability: 48, priceFrom: 55, soldOut: false },
  { id: "tml-0527", date: "2026-05-27", guests: ["Henri PFR", "Novah"], availability: 0, priceFrom: 55, soldOut: true },
  { id: "tml-0603", date: "2026-06-03", guests: ["Afrojack", "Bassjackers"], availability: 52, priceFrom: 60, soldOut: false },
  { id: "tml-0610", date: "2026-06-10", guests: ["Alok", "MATTN"], availability: 55, priceFrom: 60, soldOut: false },
  { id: "tml-0617", date: "2026-06-17", guests: ["Vini Vici", "HALO"], availability: 60, priceFrom: 60, soldOut: false },
  { id: "tml-0624", date: "2026-06-24", guests: ["Timmy Trumpet"], availability: 58, priceFrom: 65, soldOut: false },
  { id: "tml-0701", date: "2026-07-01", guests: ["Gabry Ponte", "Brina Knauss"], availability: 68, priceFrom: 70, soldOut: false },
  { id: "tml-0708", date: "2026-07-08", guests: ["Kevin de Vries", "Korolova"], availability: 72, priceFrom: 70, soldOut: false },
  { id: "tml-0715", date: "2026-07-15", guests: ["Netsky", "Lilly Palmer"], availability: 75, priceFrom: 70, soldOut: false },
  // Jul 22 — no event
  { id: "tml-0729", date: "2026-07-29", guests: ["Agents Of Time"], availability: 65, priceFrom: 70, soldOut: false },
  { id: "tml-0805", date: "2026-08-05", guests: ["Lineup TBA"], availability: 80, priceFrom: 75, soldOut: false },
  // Aug 12 — no event
  { id: "tml-0819", date: "2026-08-19", guests: ["Yves V"], availability: 78, priceFrom: 75, soldOut: false },
  { id: "tml-0826", date: "2026-08-26", guests: ["Steve Aoki", "Joel Corry"], availability: 0, priceFrom: 80, soldOut: true, highlighted: true },
  // Sep 2 — no event
  { id: "tml-0909", date: "2026-09-09", guests: ["Lineup TBA"], availability: 70, priceFrom: 70, soldOut: false },
  { id: "tml-0916", date: "2026-09-16", guests: ["Lineup TBA"], availability: 62, priceFrom: 65, soldOut: false },
  { id: "tml-0923", date: "2026-09-23", guests: ["Lineup TBA"], availability: 55, priceFrom: 65, soldOut: false },
  { id: "tml-0930", date: "2026-09-30", guests: ["Closing Party — TBA"], availability: 85, priceFrom: 75, soldOut: false, highlighted: true },
];

export const tomorrowlandArtists: TmlArtist[] = [
  // Resident
  { name: "Dimitri Vegas & Like Mike", role: "resident", genre: "EDM" },
  // Confirmed guests
  { name: "Afrojack", role: "confirmed", genre: "EDM" },
  { name: "Agents Of Time", role: "confirmed", genre: "Melodic Techno" },
  { name: "Alok", role: "confirmed", genre: "Brazilian Bass" },
  { name: "Bassjackers", role: "confirmed", genre: "EDM" },
  { name: "Brina Knauss", role: "confirmed", genre: "Melodic House" },
  { name: "Gabry Ponte", role: "confirmed", genre: "Dance" },
  { name: "HALO", role: "confirmed", genre: "House" },
  { name: "Henri PFR", role: "confirmed", genre: "Dance Pop" },
  { name: "Joel Corry", role: "confirmed", genre: "Dance / Bass" },
  { name: "Kevin de Vries", role: "confirmed", genre: "Techno" },
  { name: "Korolova", role: "confirmed", genre: "Melodic Techno" },
  { name: "Lilly Palmer", role: "confirmed", genre: "Techno" },
  { name: "MATTN", role: "confirmed", genre: "EDM" },
  { name: "Netsky", role: "confirmed", genre: "Drum & Bass" },
  { name: "Novah", role: "confirmed", genre: "House" },
  { name: "Oliver Heldens", role: "confirmed", genre: "Future House" },
  { name: "Robin Schulz", role: "confirmed", genre: "Deep House" },
  { name: "Steve Aoki", role: "special", genre: "EDM" },
  { name: "Timmy Trumpet", role: "special", genre: "EDM / Hardstyle" },
  { name: "Vini Vici", role: "special", genre: "Psytrance" },
  { name: "Yves V", role: "confirmed", genre: "EDM" },
];

export const tomorrowlandPackages: TmlPackage[] = [
  {
    id: "tml-ga",
    name: "General Admission",
    price: "From €55",
    priceNote: "per event",
    description: "Single event entry to any Wednesday date. Prices are dynamic — buy early for the best rate.",
    features: [
      "Entry to one Wednesday event",
      "Open-air poolside access",
      "Full Tomorrowland-scale production",
      "Dynamic pricing — earlier = cheaper",
    ],
    popular: false,
    cta: "Get Tickets",
  },
  {
    id: "tml-5pack",
    name: "5-Event Pass",
    price: "€250",
    priceNote: "save ~10%",
    description: "Choose any 5 Wednesdays across the full season. Flexible booking — pick your dates after purchase.",
    features: [
      "Choose any 5 dates",
      "Flexible date booking",
      "Priority access queue",
      "~10% savings vs individual tickets",
      "Transferable to friends",
    ],
    popular: true,
    cta: "Get Pass",
  },
  {
    id: "tml-season",
    name: "Season Pass",
    price: "€850",
    priceNote: "save ~20%",
    description: "Every single Wednesday for the full season. The ultimate Tomorrowland Ibiza commitment.",
    features: [
      "All 19 events included",
      "Priority access every week",
      "~20% savings vs individual tickets",
      "Season wristband",
      "Exclusive merch drop",
    ],
    popular: false,
    cta: "Get Season Pass",
  },
  {
    id: "tml-vip",
    name: "VIP Table",
    price: "From €1,500",
    priceNote: "min spend per event",
    description: "Private poolside or main stage table with bottle service, VIP entry, and a dedicated host.",
    features: [
      "Private table for your group",
      "VIP fast-track entry",
      "Bottle service credit",
      "Dedicated table host",
      "Best views of the stage",
    ],
    popular: false,
    cta: "Get VIP Pass",
  },
];

// Cancelled dates for display
export const cancelledDates = ["2026-07-22", "2026-08-12", "2026-09-02"];
