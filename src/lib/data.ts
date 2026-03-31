// ============================================
// ISLA — Club & Event Data
// ============================================

export interface ClubFeature {
  icon: string;
  label: string;
}

export interface Residency {
  day: string;
  name: string;
  headliner: string;
  genre: string;
}

export interface VipTier {
  name: string;
  price: string;
  includes: string;
}

export interface UpcomingEvent {
  id: string;
  name: string;
  date: string;
  day: string;
  headliners: string[];
  genre: string;
  priceFrom: number;
  availability: number;
}

export interface ClubData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  capacity: string;
  location: string;
  locationArea: string;
  djMagRank: string;
  vibeTags: string[];
  features: ClubFeature[];
  residencies: Residency[];
  vipTiers: VipTier[];
  upcomingEvents: UpcomingEvent[];
  practicalInfo: {
    dressCode: string;
    age: string;
    hours: string;
    gettingThere: string;
  };
}

export const clubs: ClubData[] = [
  // ==================== PACHA ====================
  {
    slug: "pacha",
    name: "Pacha",
    tagline: "Where it all began. Since 1973.",
    description:
      "The oldest and most iconic club on the island, founded in 1973. Recognizable worldwide by its twin-cherry logo, Pacha has been at the heart of Ibiza nightlife for over 50 years. It was the first superclub on the island and remains beloved by locals and visitors alike — a glamorous, multi-room venue blending old-school Ibiza charm with world-class production.",
    accent: "#FF2D55",
    capacity: "3,000",
    location: "Avinguda 8 d'Agost, Ibiza Town",
    locationArea: "Ibiza Town (Talamanca)",
    djMagRank: "Top 15",
    vibeTags: ["Glamorous", "Iconic", "House", "Tech-House"],
    features: [
      { icon: "cherry", label: "Oldest superclub in Ibiza (53 years)" },
      { icon: "move", label: "Moveable DJ booth on wheels" },
      { icon: "flower", label: "Flower Power — running since 1981" },
      { icon: "walk", label: "Walking distance from Ibiza Town marina" },
    ],
    residencies: [
      { day: "Monday", name: "Sonny Fodera", headliner: "Sonny Fodera", genre: "House" },
      { day: "Tuesday", name: "CamelPhat", headliner: "CamelPhat", genre: "Tech House" },
      { day: "Thursday", name: "Defected Records", headliner: "Rotating roster", genre: "House" },
      { day: "Friday", name: "Music On", headliner: "Marco Carola", genre: "Techno" },
      { day: "Saturday", name: "Pure Pacha", headliner: "Rotating DJs", genre: "House" },
      { day: "Sunday", name: "Solomun +1", headliner: "Solomun + guest", genre: "House / Melodic" },
    ],
    vipTiers: [
      { name: "Standard Table", price: "~€800", includes: "Entry + table + minimum spend" },
      { name: "Premium Table", price: "~€2,000", includes: "Prime positioning + dedicated host" },
      { name: "DJ Booth Table", price: "€5,000–15,000", includes: "Best position in the house" },
    ],
    upcomingEvents: [
      { id: "pacha-1", name: "Solomun +1", date: "2026-06-07", day: "SUN", headliners: ["Solomun", "Dixon"], genre: "House", priceFrom: 65, availability: 58 },
      { id: "pacha-2", name: "Music On", date: "2026-06-05", day: "FRI", headliners: ["Marco Carola", "Loco Dice"], genre: "Techno", priceFrom: 70, availability: 44 },
      { id: "pacha-3", name: "CamelPhat", date: "2026-06-02", day: "TUE", headliners: ["CamelPhat", "Cristoph"], genre: "Tech House", priceFrom: 50, availability: 32 },
      { id: "pacha-4", name: "Defected Records", date: "2026-06-04", day: "THU", headliners: ["Simon Dunmore", "Low Steppa"], genre: "House", priceFrom: 45, availability: 25 },
      { id: "pacha-5", name: "Sonny Fodera", date: "2026-06-01", day: "MON", headliners: ["Sonny Fodera", "MK"], genre: "House", priceFrom: 40, availability: 18 },
    ],
    practicalInfo: {
      dressCode: "Smart casual. No sportswear, no flip-flops.",
      age: "18+ with valid photo ID",
      hours: "Midnight – 6:00 AM",
      gettingThere: "5-minute walk from Ibiza Town marina. 10 minutes by taxi from Playa d'en Bossa.",
    },
  },

  // ==================== AMNESIA ====================
  {
    slug: "amnesia",
    name: "Amnesia",
    tagline: "Dance until the sun rises through the glass.",
    description:
      "One of Ibiza's most legendary clubs, inaugurated in 1970 and opened in its recognizable form in 1976. Amnesia won 'Best Global Club' multiple times. It is especially revered for its iconic Terrace with a retractable glass roof that floods with natural light at sunrise — creating one of the most famous moments in clubbing history. Two contrasting rooms offer completely different atmospheres under one roof.",
    accent: "#00D4FF",
    capacity: "5,000",
    location: "San Rafael, Ibiza",
    locationArea: "San Rafael",
    djMagRank: "Multiple 'Best Global Club' wins",
    vibeTags: ["Underground", "Sunrise", "Techno", "Tech-House"],
    features: [
      { icon: "sun", label: "The Terrace — sunrise through the glass roof" },
      { icon: "ice", label: "Ice Cannons — signature freezing mist blasts" },
      { icon: "foam", label: "La Espuma (Foam Party) — 20+ year tradition" },
      { icon: "rooms", label: "Two rooms: dark Main Room vs. bright Terrace" },
    ],
    residencies: [
      { day: "Monday", name: "Amnesia Presents", headliner: "Rotating", genre: "Mixed" },
      { day: "Tuesday", name: "Eastenderz", headliner: "East End Dubs", genre: "Tech House" },
      { day: "Wednesday", name: "RESISTANCE", headliner: "ARTBAT, Adam Beyer", genre: "Techno" },
      { day: "Thursday", name: "Do Not Sleep", headliner: "Rotating underground", genre: "Techno" },
      { day: "Friday", name: "Glitterbox", headliner: "House & disco legends", genre: "Disco / House" },
      { day: "Sunday", name: "Pyramid", headliner: "Underground focus", genre: "Techno" },
    ],
    vipTiers: [
      { name: "Terrace Table", price: "~€300/person", includes: "Table + Terrace views" },
      { name: "Main Room Table", price: "~€250/person", includes: "Intimate positioning" },
      { name: "Group VIP (10+)", price: "~€3,000", includes: "Full group entry + table" },
    ],
    upcomingEvents: [
      { id: "amnesia-1", name: "RESISTANCE", date: "2026-06-03", day: "WED", headliners: ["ARTBAT", "Adam Beyer", "Richie Hawtin"], genre: "Techno", priceFrom: 55, availability: 71 },
      { id: "amnesia-2", name: "Glitterbox", date: "2026-06-05", day: "FRI", headliners: ["Purple Disco Machine", "Horsemeat Disco"], genre: "Disco / House", priceFrom: 50, availability: 38 },
      { id: "amnesia-3", name: "Pyramid", date: "2026-06-07", day: "SUN", headliners: ["Amelie Lens", "Nina Kraviz"], genre: "Techno", priceFrom: 50, availability: 62 },
      { id: "amnesia-4", name: "Eastenderz", date: "2026-06-02", day: "TUE", headliners: ["East End Dubs", "Michael Bibi"], genre: "Tech House", priceFrom: 45, availability: 29 },
    ],
    practicalInfo: {
      dressCode: "Relaxed. No specific dress code enforced.",
      age: "18+ with valid photo ID",
      hours: "Midnight – 6:00 AM (Terrace opens at sunset for select events)",
      gettingThere: "On the main road between Ibiza Town and San Antonio. 10 minutes by taxi from either town.",
    },
  },

  // ==================== HI IBIZA ====================
  {
    slug: "hi-ibiza",
    name: "Hï Ibiza",
    tagline: "The world's #1 club.",
    description:
      "Voted the world's No. 1 club by DJ Mag multiple consecutive years, Hï Ibiza is the island's most state-of-the-art venue. Built on the site of the former Space Ibiza, it opened in 2017 under The Night League's direction. The Theatre features Italian amphitheatre-inspired design with moving LED rigs and aerial performers, while The Club Room offers an intimate underground experience with the DJ at eye level. Production changes completely every single night.",
    accent: "#4364F7",
    capacity: "5,000",
    location: "Playa d'en Bossa, Ibiza",
    locationArea: "Playa d'en Bossa",
    djMagRank: "#1 in the World (multiple years)",
    vibeTags: ["State-of-the-Art", "Premium", "House", "Techno"],
    features: [
      { icon: "trophy", label: "DJ Mag World's #1 Club — multiple years" },
      { icon: "theatre", label: "The Theatre — moving LED rigs + aerial performers" },
      { icon: "club", label: "The Club Room — intimate, DJ at eye level" },
      { icon: "refresh", label: "Production changes completely every night" },
    ],
    residencies: [
      { day: "Monday", name: "Francis Mercier", headliner: "Francis Mercier", genre: "Afro House" },
      { day: "Tuesday", name: "Eastenderz", headliner: "East End Dubs", genre: "Tech House" },
      { day: "Thursday", name: "HUGEL", headliner: "HUGEL", genre: "House" },
      { day: "Friday", name: "Dom Dolla / CamelPhat", headliner: "Dom Dolla (Jun+) / CamelPhat (May/Sep)", genre: "House / Tech House" },
      { day: "Saturday", name: "Black Coffee", headliner: "Black Coffee", genre: "Afro House" },
      { day: "Sunday", name: "MESTIZA", headliner: "Debut season", genre: "Latin House" },
    ],
    vipTiers: [
      { name: "VIP Entry", price: "~€1,000", includes: "VIP access + premium area" },
      { name: "Table Service", price: "€1,000–10,000+", includes: "Private table + bottle minimum" },
    ],
    upcomingEvents: [
      { id: "hi-1", name: "Black Coffee", date: "2026-06-06", day: "SAT", headliners: ["Black Coffee", "Themba"], genre: "Afro House", priceFrom: 90, availability: 67 },
      { id: "hi-2", name: "Dom Dolla", date: "2026-06-05", day: "FRI", headliners: ["Dom Dolla", "Malugi"], genre: "House", priceFrom: 85, availability: 73 },
      { id: "hi-3", name: "HUGEL", date: "2026-06-04", day: "THU", headliners: ["HUGEL", "James Hype"], genre: "House", priceFrom: 70, availability: 41 },
      { id: "hi-4", name: "Francis Mercier", date: "2026-06-01", day: "MON", headliners: ["Francis Mercier", "Blond:ish"], genre: "Afro House", priceFrom: 65, availability: 22 },
    ],
    practicalInfo: {
      dressCode: "Smart casual. No sportswear, flip-flops, or beachwear.",
      age: "18+ with valid photo ID",
      hours: "Midnight – 6:00 AM",
      gettingThere: "Playa d'en Bossa strip, directly opposite Ushuaïa. 5 minutes by taxi from Ibiza Town.",
    },
  },

  // ==================== USHUAIA ====================
  {
    slug: "ushuaia",
    name: "Ushuaïa",
    tagline: "Where the party meets the sun.",
    description:
      "The island's premier open-air daytime club and hotel concept. Ushuaïa revolutionized Ibiza clubbing when it opened in 2011 by shifting the party to daylight hours in a completely outdoor setting. It combines a luxury hotel with a world-class music venue where hotel rooms overlook the pool and main stage. Festival-scale pyrotechnics under the Ibiza sun, with the biggest names in dance music every single day of the week.",
    accent: "#FF6A00",
    capacity: "7,000+",
    location: "Playa d'en Bossa, Ibiza",
    locationArea: "Playa d'en Bossa (beachfront)",
    djMagRank: "#3",
    vibeTags: ["Open-Air", "Daytime", "Pool", "Festival-Scale"],
    features: [
      { icon: "sun", label: "Completely open-air — dance under the Ibiza sun" },
      { icon: "clock", label: "Pioneer of daytime clubbing (4PM – Midnight)" },
      { icon: "hotel", label: "Hotel rooms overlook the pool stage" },
      { icon: "fire", label: "Festival-scale pyrotechnics in a club" },
    ],
    residencies: [
      { day: "Monday", name: "David Guetta FMIF", headliner: "David Guetta", genre: "EDM" },
      { day: "Tuesday", name: "Calvin Harris", headliner: "Calvin Harris (from July)", genre: "EDM / House" },
      { day: "Wednesday", name: "Tomorrowland x DVLM", headliner: "Dimitri Vegas & Like Mike", genre: "EDM" },
      { day: "Thursday", name: "Martin Garrix", headliner: "Martin Garrix (from June)", genre: "EDM" },
      { day: "Friday", name: "Calvin Harris", headliner: "Calvin Harris (from May)", genre: "House / EDM" },
      { day: "Saturday", name: "ANTS", headliner: "Underground house collective", genre: "Tech House" },
    ],
    vipTiers: [
      { name: "Palm Area Table", price: "~€1,500", includes: "Poolside table + bottle credit" },
      { name: "Main 2 Table", price: "~€2,500", includes: "Mid-tier positioning" },
      { name: "Main 1 / Stage", price: "€3,000–10,000+", includes: "Closest to stage + dedicated host" },
    ],
    upcomingEvents: [
      { id: "ushuaia-1", name: "Calvin Harris", date: "2026-05-30", day: "FRI", headliners: ["Calvin Harris"], genre: "EDM / House", priceFrom: 95, availability: 88 },
      { id: "ushuaia-2", name: "Tomorrowland x DVLM", date: "2026-06-03", day: "WED", headliners: ["Dimitri Vegas & Like Mike", "Afrojack"], genre: "EDM", priceFrom: 60, availability: 52 },
      { id: "ushuaia-3", name: "David Guetta FMIF", date: "2026-06-01", day: "MON", headliners: ["David Guetta"], genre: "EDM", priceFrom: 75, availability: 76 },
      { id: "ushuaia-4", name: "ANTS", date: "2026-06-06", day: "SAT", headliners: ["Andrea Oliva", "Ilario Alicante"], genre: "Tech House", priceFrom: 55, availability: 35 },
    ],
    practicalInfo: {
      dressCode: "No flip-flops, swimming shorts, swimwear, or sports gear.",
      age: "18+ with valid photo ID",
      hours: "4:00 PM – Midnight (doors open ~3PM)",
      gettingThere: "Beachfront on the Playa d'en Bossa strip. Directly opposite Hï Ibiza. 10 min taxi from Ibiza Town.",
    },
  },

  // ==================== DC-10 ====================
  {
    slug: "dc10",
    name: "DC-10",
    tagline: "The spiritual home of underground.",
    description:
      "Named after the McDonnell Douglas DC-10 aircraft, DC-10 was converted from a disused aircraft hangar and is the antithesis of Ibiza's glitzy superclubs. Raw, unpretentious, and laser-focused on the music. Its flagship party, Circoloco, has been running since 1999 and is one of the most respected names in underground house and techno worldwide. Dance in the outdoor Garden while planes fly directly overhead — one of the most iconic experiences in clubbing.",
    accent: "#00E676",
    capacity: "1,500–4,000",
    location: "Near Ibiza Airport, Las Salinas",
    locationArea: "Nr. Airport / Las Salinas",
    djMagRank: "#15",
    vibeTags: ["Underground", "Raw", "Techno", "House", "Circoloco"],
    features: [
      { icon: "plane", label: "Planes fly directly overhead as you dance" },
      { icon: "warehouse", label: "Converted aircraft hangar — zero pretension" },
      { icon: "vinyl", label: "Circoloco — most respected underground party (since 1999)" },
      { icon: "areas", label: "Garden (open-air) → Terrace → Main Room" },
    ],
    residencies: [
      { day: "Monday", name: "Circoloco", headliner: "Seth Troxler, Dixon, Honey Dijon, Peggy Gou, Black Coffee + 40 rotating artists", genre: "Underground" },
      { day: "Thursday", name: "Solid Grooves", headliner: "TBC (from June)", genre: "House / Tech House" },
    ],
    vipTiers: [
      { name: "Bottle Service", price: "By request", includes: "Guaranteed entry + reserved section + fast entry" },
    ],
    upcomingEvents: [
      { id: "dc10-1", name: "Circoloco Opening", date: "2026-04-27", day: "MON", headliners: ["Seth Troxler", "Dixon", "Carlita", "Palms Trax", "Prospa"], genre: "Underground", priceFrom: 56, availability: 91 },
      { id: "dc10-2", name: "Circoloco", date: "2026-06-01", day: "MON", headliners: ["Peggy Gou", "Honey Dijon", "Hunee"], genre: "Underground", priceFrom: 65, availability: 72 },
      { id: "dc10-3", name: "Circoloco", date: "2026-06-08", day: "MON", headliners: ["Black Coffee", "Marco Carola", "Mochakk"], genre: "Underground", priceFrom: 65, availability: 48 },
      { id: "dc10-4", name: "Solid Grooves", date: "2026-06-04", day: "THU", headliners: ["TBA"], genre: "House", priceFrom: 45, availability: 15 },
    ],
    practicalInfo: {
      dressCode: "No dress code. Come as you are.",
      age: "18+ with valid photo ID",
      hours: "Monday daytime: 4:00 PM – Midnight. Night events: Midnight – 6:00 AM",
      gettingThere: "10 minutes from Playa d'en Bossa, 15 from Ibiza Town. Near the airport runway.",
    },
  },

  // ==================== UNVRS ====================
  {
    slug: "unvrs",
    name: "UNVRS",
    tagline: "The world's first hyperclub.",
    description:
      "Billed as 'the world's first hyperclub,' UNVRS is the dramatic rebirth of the legendary Privilege venue — which once held the Guinness World Record as the largest nightclub in the world. After an €8 million restoration, it reopened in 2025 under the creative direction of Yann Pissenem (The Night League — Ushuaïa, Hï Ibiza). UNVRS delivers arena-scale production with cutting-edge LED screens, immersive technology, and a space/universe theme spanning 6,500 square metres.",
    accent: "#B24BF3",
    capacity: "10,000",
    location: "San Rafael, Ibiza",
    locationArea: "San Rafael",
    djMagRank: "New entry (opened 2025)",
    vibeTags: ["Hyperclub", "Arena-Scale", "Immersive", "All Genres"],
    features: [
      { icon: "globe", label: "Largest club venue in the world (6,500 sq m)" },
      { icon: "zap", label: "Arena-scale LED screens + immersive tech" },
      { icon: "history", label: "Built on the legendary Privilege/Ku site" },
      { icon: "star", label: "The Night League pedigree (Ushuaïa + Hï)" },
    ],
    residencies: [
      { day: "Monday", name: "Experts Only / Tiësto", headliner: "John Summit (Jun-Jul) → Tiësto (Aug+)", genre: "House / EDM" },
      { day: "Tuesday", name: "Anyma AEDEN", headliner: "Anyma (immersive AV show)", genre: "Melodic Techno" },
      { day: "Wednesday", name: "Paradise", headliner: "Jamie Jones", genre: "House / Tech House" },
      { day: "Thursday", name: "FISHER", headliner: "FISHER", genre: "Tech House" },
      { day: "Friday", name: "David Guetta Galactic Circus", headliner: "David Guetta", genre: "EDM" },
      { day: "Saturday", name: "elrow", headliner: "The legendary immersive party", genre: "House / Tech House" },
      { day: "Sunday", name: "Carl Cox", headliner: "Carl Cox + Honey Dijon, Richie Hawtin, Sasha b2b Digweed", genre: "Techno" },
    ],
    vipTiers: [
      { name: "VIP Entry (no table)", price: "Varies by event", includes: "VIP balcony + terrace + drinks" },
      { name: "Stage-Side Table", price: "By request", includes: "Premium positioning + bottle service" },
      { name: "Back VIP Table", price: "By request", includes: "Stand-up VIP zone" },
    ],
    upcomingEvents: [
      { id: "unvrs-1", name: "UNVRS Opening Party", date: "2026-04-26", day: "SUN", headliners: ["Carl Cox", "Black Coffee", "CamelPhat", "Paco Osuna"], genre: "Techno / House", priceFrom: 70, availability: 85 },
      { id: "unvrs-2", name: "Carl Cox", date: "2026-06-21", day: "SUN", headliners: ["Carl Cox", "Honey Dijon"], genre: "Techno", priceFrom: 85, availability: 72 },
      { id: "unvrs-3", name: "FISHER", date: "2026-06-04", day: "THU", headliners: ["FISHER"], genre: "Tech House", priceFrom: 75, availability: 65 },
      { id: "unvrs-4", name: "elrow", date: "2026-06-06", day: "SAT", headliners: ["elrow all-stars"], genre: "House", priceFrom: 85, availability: 78 },
      { id: "unvrs-5", name: "Anyma AEDEN", date: "2026-06-02", day: "TUE", headliners: ["Anyma"], genre: "Melodic Techno", priceFrom: 90, availability: 92 },
    ],
    practicalInfo: {
      dressCode: "Smart casual. No sportswear or beachwear.",
      age: "18+ with valid photo ID",
      hours: "Midnight – 6:00 AM",
      gettingThere: "San Rafael, between Ibiza Town and San Antonio. 15 minutes by taxi from either town.",
    },
  },
];

export function getClubBySlug(slug: string): ClubData | undefined {
  return clubs.find((c) => c.slug === slug);
}

export function getAllClubSlugs(): string[] {
  return clubs.map((c) => c.slug);
}
