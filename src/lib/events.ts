// ============================================
// ISLA — Events Data
// ============================================

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  availability: number; // 0-100
  soldOut: boolean;
}

export interface Artist {
  name: string;
  role: "headliner" | "support" | "resident";
  genre?: string;
}

export interface EventData {
  id: string;
  slug: string;
  name: string;
  clubSlug: string;
  clubName: string;
  date: string;
  day: string;
  time: string;
  genre: string;
  description: string;
  artists: Artist[];
  ticketTiers: TicketTier[];
  availability: number;
  featured: boolean;
  imageGradient: string;
}

export const events: EventData[] = [
  // ===== PACHA =====
  {
    id: "pacha-solomun-0607",
    slug: "solomun-plus-1-pacha-jun-07",
    name: "Solomun +1",
    clubSlug: "pacha",
    clubName: "Pacha",
    date: "2026-06-07",
    day: "SUN",
    time: "23:59 – 06:00",
    genre: "House / Melodic",
    description: "The iconic Sunday residency returns. Solomun brings his signature deep, melodic sets to Pacha's intimate dancefloor, joined each week by a hand-picked guest for an unforgettable +1 session.",
    artists: [
      { name: "Solomun", role: "headliner", genre: "Melodic House" },
      { name: "Dixon", role: "support", genre: "Deep House" },
    ],
    ticketTiers: [
      { id: "sol-early", name: "Early Bird", price: 45, description: "Limited first release", availability: 100, soldOut: true },
      { id: "sol-standard", name: "Standard", price: 65, description: "General admission", availability: 58, soldOut: false },
      { id: "sol-vip", name: "VIP", price: 150, description: "VIP area access + 2 drinks", availability: 22, soldOut: false },
      { id: "sol-table", name: "Table Service", price: 2000, description: "Private table + bottle service", availability: 8, soldOut: false },
    ],
    availability: 58,
    featured: true,
    imageGradient: "linear-gradient(135deg, #FF2D5522, #FF2D5508)",
  },
  {
    id: "pacha-musicon-0605",
    slug: "music-on-pacha-jun-05",
    name: "Music On",
    clubSlug: "pacha",
    clubName: "Pacha",
    date: "2026-06-05",
    day: "FRI",
    time: "23:59 – 06:00",
    genre: "Techno",
    description: "Marco Carola's legendary Music On returns to Pacha for another season of pure, uncompromising techno. The dancefloor speaks one language here.",
    artists: [
      { name: "Marco Carola", role: "headliner", genre: "Techno" },
      { name: "Loco Dice", role: "support", genre: "Techno" },
      { name: "Leon", role: "support", genre: "Techno" },
    ],
    ticketTiers: [
      { id: "mo-early", name: "Early Bird", price: 50, description: "Limited first release", availability: 100, soldOut: true },
      { id: "mo-standard", name: "Standard", price: 70, description: "General admission", availability: 44, soldOut: false },
      { id: "mo-vip", name: "VIP", price: 160, description: "VIP area access + 2 drinks", availability: 30, soldOut: false },
    ],
    availability: 44,
    featured: false,
    imageGradient: "linear-gradient(135deg, #FF2D5522, #FF2D5508)",
  },
  {
    id: "pacha-camelphat-0602",
    slug: "camelphat-pacha-jun-02",
    name: "CamelPhat",
    clubSlug: "pacha",
    clubName: "Pacha",
    date: "2026-06-02",
    day: "TUE",
    time: "23:59 – 06:00",
    genre: "Tech House",
    description: "The Grammy-nominated duo bring their signature dark, driving sound to Pacha every Tuesday.",
    artists: [
      { name: "CamelPhat", role: "headliner", genre: "Tech House" },
      { name: "Cristoph", role: "support", genre: "Progressive" },
    ],
    ticketTiers: [
      { id: "cp-standard", name: "Standard", price: 50, description: "General admission", availability: 32, soldOut: false },
      { id: "cp-vip", name: "VIP", price: 120, description: "VIP area access", availability: 15, soldOut: false },
    ],
    availability: 32,
    featured: false,
    imageGradient: "linear-gradient(135deg, #FF2D5522, #FF2D5508)",
  },

  // ===== AMNESIA =====
  {
    id: "amnesia-resistance-0603",
    slug: "resistance-amnesia-jun-03",
    name: "RESISTANCE",
    clubSlug: "amnesia",
    clubName: "Amnesia",
    date: "2026-06-03",
    day: "WED",
    time: "23:59 – 06:00",
    genre: "Techno",
    description: "Ultra's RESISTANCE brand returns to Amnesia after a 5-year hiatus with a stacked lineup of techno heavyweights. The Terrace transforms into a cathedral of sound.",
    artists: [
      { name: "ARTBAT", role: "headliner", genre: "Melodic Techno" },
      { name: "Adam Beyer", role: "headliner", genre: "Techno" },
      { name: "Richie Hawtin", role: "support", genre: "Minimal Techno" },
      { name: "ANNA", role: "support", genre: "Techno" },
    ],
    ticketTiers: [
      { id: "res-early", name: "Early Bird", price: 40, description: "Limited first release", availability: 100, soldOut: true },
      { id: "res-standard", name: "Standard", price: 55, description: "General admission", availability: 71, soldOut: false },
      { id: "res-vip", name: "VIP Balcony", price: 120, description: "Balcony access + priority entry", availability: 45, soldOut: false },
    ],
    availability: 71,
    featured: true,
    imageGradient: "linear-gradient(135deg, #00D4FF22, #00D4FF08)",
  },
  {
    id: "amnesia-glitterbox-0605",
    slug: "glitterbox-amnesia-jun-05",
    name: "Glitterbox",
    clubSlug: "amnesia",
    clubName: "Amnesia",
    date: "2026-06-05",
    day: "FRI",
    time: "23:59 – 06:00",
    genre: "Disco / House",
    description: "Pure joy on the dancefloor. Glitterbox brings the most uplifting house and disco to Amnesia every Friday with a celebration of music, dance, and self-expression.",
    artists: [
      { name: "Purple Disco Machine", role: "headliner", genre: "Nu-Disco" },
      { name: "Horsemeat Disco", role: "support", genre: "Disco" },
      { name: "Jellybean Benitez", role: "support", genre: "House" },
    ],
    ticketTiers: [
      { id: "gb-standard", name: "Standard", price: 50, description: "General admission", availability: 38, soldOut: false },
      { id: "gb-vip", name: "VIP", price: 110, description: "VIP area + 1 drink", availability: 20, soldOut: false },
    ],
    availability: 38,
    featured: false,
    imageGradient: "linear-gradient(135deg, #00D4FF22, #00D4FF08)",
  },
  {
    id: "amnesia-pyramid-0607",
    slug: "pyramid-amnesia-jun-07",
    name: "Pyramid",
    clubSlug: "amnesia",
    clubName: "Amnesia",
    date: "2026-06-07",
    day: "SUN",
    time: "23:59 – 06:00",
    genre: "Techno",
    description: "Amnesia's flagship Sunday underground session. Pyramid strips it back to pure, raw dancefloor energy with some of the most respected names in techno.",
    artists: [
      { name: "Amelie Lens", role: "headliner", genre: "Techno" },
      { name: "Nina Kraviz", role: "headliner", genre: "Techno" },
      { name: "Vintage Culture", role: "support", genre: "House" },
    ],
    ticketTiers: [
      { id: "pyr-standard", name: "Standard", price: 50, description: "General admission", availability: 62, soldOut: false },
      { id: "pyr-vip", name: "VIP", price: 120, description: "VIP area", availability: 35, soldOut: false },
    ],
    availability: 62,
    featured: false,
    imageGradient: "linear-gradient(135deg, #00D4FF22, #00D4FF08)",
  },

  // ===== HI IBIZA =====
  {
    id: "hi-blackcoffee-0606",
    slug: "black-coffee-hi-ibiza-jun-06",
    name: "Black Coffee",
    clubSlug: "hi-ibiza",
    clubName: "Hï Ibiza",
    date: "2026-06-06",
    day: "SAT",
    time: "23:59 – 06:00",
    genre: "Afro House",
    description: "The South African maestro returns to the world's #1 club for another transcendent Saturday residency. Black Coffee's spiritual, genre-blending sets in The Theatre are the pinnacle of Ibiza nightlife.",
    artists: [
      { name: "Black Coffee", role: "headliner", genre: "Afro House" },
      { name: "Themba", role: "support", genre: "Afro Tech" },
      { name: "Shimza", role: "support", genre: "Afro House" },
    ],
    ticketTiers: [
      { id: "bc-early", name: "Early Bird", price: 60, description: "Limited first release", availability: 100, soldOut: true },
      { id: "bc-standard", name: "Standard", price: 90, description: "General admission", availability: 67, soldOut: false },
      { id: "bc-vip", name: "VIP", price: 200, description: "VIP access + 2 drinks", availability: 40, soldOut: false },
      { id: "bc-table", name: "Table Service", price: 3000, description: "Private table + bottles", availability: 12, soldOut: false },
    ],
    availability: 67,
    featured: true,
    imageGradient: "linear-gradient(135deg, #4364F722, #4364F708)",
  },
  {
    id: "hi-domdolla-0605",
    slug: "dom-dolla-hi-ibiza-jun-05",
    name: "Dom Dolla",
    clubSlug: "hi-ibiza",
    clubName: "Hï Ibiza",
    date: "2026-06-05",
    day: "FRI",
    time: "23:59 – 06:00",
    genre: "House",
    description: "Dom Dolla's first-ever Friday residency at the world's #1 club. Expect euphoric house cuts with his signature grooves and infectious energy.",
    artists: [
      { name: "Dom Dolla", role: "headliner", genre: "House" },
      { name: "Malugi", role: "support", genre: "House" },
    ],
    ticketTiers: [
      { id: "dd-standard", name: "Standard", price: 85, description: "General admission", availability: 73, soldOut: false },
      { id: "dd-vip", name: "VIP", price: 180, description: "VIP access + 2 drinks", availability: 50, soldOut: false },
    ],
    availability: 73,
    featured: false,
    imageGradient: "linear-gradient(135deg, #4364F722, #4364F708)",
  },

  // ===== USHUAIA =====
  {
    id: "ushuaia-calvin-0530",
    slug: "calvin-harris-ushuaia-may-30",
    name: "Calvin Harris",
    clubSlug: "ushuaia",
    clubName: "Ushuaïa",
    date: "2026-05-30",
    day: "FRI",
    time: "16:00 – 00:00",
    genre: "EDM / House",
    description: "The king of Ushuaïa returns. Calvin Harris opens his massive 2026 residency with the full poolside production experience — pyrotechnics, CO2 cannons, and the biggest hits under the Ibiza sun.",
    artists: [
      { name: "Calvin Harris", role: "headliner", genre: "EDM / House" },
    ],
    ticketTiers: [
      { id: "ch-early", name: "Early Bird", price: 70, description: "Limited first release", availability: 100, soldOut: true },
      { id: "ch-standard", name: "Standard", price: 95, description: "General admission", availability: 88, soldOut: false },
      { id: "ch-vip", name: "Stage VIP", price: 250, description: "Stage-side VIP + 3 drinks + valet", availability: 60, soldOut: false },
      { id: "ch-table", name: "Main Stage Table", price: 5000, description: "Best views + bottle service + host", availability: 15, soldOut: false },
    ],
    availability: 88,
    featured: true,
    imageGradient: "linear-gradient(135deg, #FF6A0022, #FF6A0008)",
  },
  {
    id: "ushuaia-tml-0603",
    slug: "tomorrowland-dvlm-ushuaia-jun-03",
    name: "Tomorrowland x DVLM",
    clubSlug: "ushuaia",
    clubName: "Ushuaïa",
    date: "2026-06-03",
    day: "WED",
    time: "17:00 – 00:00",
    genre: "EDM",
    description: "Tomorrowland brings its legendary festival production to the poolside. Dimitri Vegas & Like Mike headline with rotating world-class guests every Wednesday.",
    artists: [
      { name: "Dimitri Vegas & Like Mike", role: "headliner", genre: "EDM" },
      { name: "Afrojack", role: "support", genre: "EDM" },
      { name: "Bassjackers", role: "support", genre: "EDM" },
    ],
    ticketTiers: [
      { id: "tml-standard", name: "Standard", price: 60, description: "General admission", availability: 52, soldOut: false },
      { id: "tml-vip", name: "VIP", price: 150, description: "VIP area + 2 drinks", availability: 30, soldOut: false },
    ],
    availability: 52,
    featured: false,
    imageGradient: "linear-gradient(135deg, #FF6A0022, #FF6A0008)",
  },
  {
    id: "ushuaia-guetta-0601",
    slug: "david-guetta-fmif-ushuaia-jun-01",
    name: "David Guetta FMIF",
    clubSlug: "ushuaia",
    clubName: "Ushuaïa",
    date: "2026-06-01",
    day: "MON",
    time: "16:00 – 00:00",
    genre: "EDM",
    description: "F*** Me I'm Famous returns to Ushuaïa with David Guetta at the helm. The longest-running Ibiza residency of the modern era delivers pure festival energy every Monday.",
    artists: [
      { name: "David Guetta", role: "headliner", genre: "EDM" },
    ],
    ticketTiers: [
      { id: "dg-standard", name: "Standard", price: 75, description: "General admission", availability: 76, soldOut: false },
      { id: "dg-vip", name: "VIP", price: 180, description: "VIP access + 2 drinks", availability: 42, soldOut: false },
    ],
    availability: 76,
    featured: false,
    imageGradient: "linear-gradient(135deg, #FF6A0022, #FF6A0008)",
  },

  // ===== DC-10 =====
  {
    id: "dc10-circoloco-opening",
    slug: "circoloco-opening-dc10-apr-27",
    name: "Circoloco Opening Party",
    clubSlug: "dc10",
    clubName: "DC-10",
    date: "2026-04-27",
    day: "MON",
    time: "16:00 – 00:00",
    genre: "Underground",
    description: "Circoloco's 27th summer begins. The most respected underground party on the planet opens the season with a Garden-to-Terrace-to-Main Room journey featuring the cream of the underground.",
    artists: [
      { name: "Seth Troxler", role: "headliner", genre: "House" },
      { name: "Dixon", role: "headliner", genre: "Deep House" },
      { name: "Carlita", role: "support", genre: "Indie Dance" },
      { name: "Palms Trax", role: "support", genre: "House" },
      { name: "Prospa", role: "support", genre: "Rave" },
      { name: "Luciano", role: "support", genre: "Minimal" },
    ],
    ticketTiers: [
      { id: "cc-early", name: "Early Bird", price: 45, description: "Limited first release", availability: 100, soldOut: true },
      { id: "cc-standard", name: "Standard", price: 56, description: "General admission", availability: 91, soldOut: false },
      { id: "cc-final", name: "Final Release", price: 75, description: "Last allocation", availability: 5, soldOut: false },
    ],
    availability: 91,
    featured: true,
    imageGradient: "linear-gradient(135deg, #00E67622, #00E67608)",
  },
  {
    id: "dc10-circoloco-0601",
    slug: "circoloco-dc10-jun-01",
    name: "Circoloco",
    clubSlug: "dc10",
    clubName: "DC-10",
    date: "2026-06-01",
    day: "MON",
    time: "16:00 – 00:00",
    genre: "Underground",
    description: "Monday at DC-10. Planes overhead. Underground music all around. Circoloco does what it's been doing for 27 years — pure, uncompromising dancefloor magic.",
    artists: [
      { name: "Peggy Gou", role: "headliner", genre: "House" },
      { name: "Honey Dijon", role: "headliner", genre: "House" },
      { name: "Hunee", role: "support", genre: "Eclectic" },
    ],
    ticketTiers: [
      { id: "cc2-standard", name: "Standard", price: 65, description: "General admission", availability: 72, soldOut: false },
      { id: "cc2-vip", name: "Bottle Service", price: 500, description: "Guaranteed entry + reserved section", availability: 20, soldOut: false },
    ],
    availability: 72,
    featured: false,
    imageGradient: "linear-gradient(135deg, #00E67622, #00E67608)",
  },

  // ===== UNVRS =====
  {
    id: "unvrs-opening-0426",
    slug: "unvrs-opening-party-apr-26",
    name: "UNVRS Opening Party",
    clubSlug: "unvrs",
    clubName: "UNVRS",
    date: "2026-04-26",
    day: "SUN",
    time: "23:59 – 06:00",
    genre: "Techno / House",
    description: "The world's first hyperclub opens its second season with the heaviest lineup imaginable. Carl Cox, Black Coffee, CamelPhat, and Paco Osuna in 10,000-capacity arena-scale production.",
    artists: [
      { name: "Carl Cox", role: "headliner", genre: "Techno" },
      { name: "Black Coffee", role: "headliner", genre: "Afro House" },
      { name: "CamelPhat", role: "support", genre: "Tech House" },
      { name: "Paco Osuna", role: "support", genre: "Techno" },
      { name: "Miss Monique", role: "support", genre: "Progressive" },
    ],
    ticketTiers: [
      { id: "unv-before1", name: "Before 1AM", price: 70, description: "Entry before 1:00 AM", availability: 85, soldOut: false },
      { id: "unv-standard", name: "Standard", price: 80, description: "General admission", availability: 70, soldOut: false },
      { id: "unv-vip", name: "VIP", price: 200, description: "VIP balcony + terrace + 3 drinks", availability: 45, soldOut: false },
    ],
    availability: 85,
    featured: true,
    imageGradient: "linear-gradient(135deg, #B24BF322, #B24BF308)",
  },
  {
    id: "unvrs-carlcox-0621",
    slug: "carl-cox-unvrs-jun-21",
    name: "Carl Cox",
    clubSlug: "unvrs",
    clubName: "UNVRS",
    date: "2026-06-21",
    day: "SUN",
    time: "23:59 – 06:00",
    genre: "Techno",
    description: "Oh yes, oh yes! The king of techno in the world's largest club. Carl Cox's Sunday residency at UNVRS is unmissable — pure energy in an arena-scale setting.",
    artists: [
      { name: "Carl Cox", role: "headliner", genre: "Techno" },
      { name: "Honey Dijon", role: "support", genre: "House" },
    ],
    ticketTiers: [
      { id: "cc-unvrs-standard", name: "Standard", price: 85, description: "General admission", availability: 72, soldOut: false },
      { id: "cc-unvrs-vip", name: "VIP", price: 200, description: "VIP balcony + terrace", availability: 38, soldOut: false },
    ],
    availability: 72,
    featured: false,
    imageGradient: "linear-gradient(135deg, #B24BF322, #B24BF308)",
  },
  {
    id: "unvrs-fisher-0604",
    slug: "fisher-unvrs-jun-04",
    name: "FISHER",
    clubSlug: "unvrs",
    clubName: "UNVRS",
    date: "2026-06-04",
    day: "THU",
    time: "23:59 – 06:00",
    genre: "Tech House",
    description: "FISHER brings the loosest vibes to UNVRS every Thursday. Expect crowd-surfing, singalongs, and the filthiest tech house drops in 10,000-capacity chaos.",
    artists: [
      { name: "FISHER", role: "headliner", genre: "Tech House" },
    ],
    ticketTiers: [
      { id: "fish-standard", name: "Standard", price: 75, description: "General admission", availability: 65, soldOut: false },
      { id: "fish-vip", name: "VIP", price: 180, description: "VIP access + 2 drinks", availability: 30, soldOut: false },
    ],
    availability: 65,
    featured: false,
    imageGradient: "linear-gradient(135deg, #B24BF322, #B24BF308)",
  },
  {
    id: "unvrs-anyma-0602",
    slug: "anyma-aeden-unvrs-jun-02",
    name: "Anyma AEDEN",
    clubSlug: "unvrs",
    clubName: "UNVRS",
    date: "2026-06-02",
    day: "TUE",
    time: "23:59 – 06:00",
    genre: "Melodic Techno",
    description: "A fully immersive audiovisual journey. Anyma's AEDEN concept transforms UNVRS into a digital dreamscape where music, visuals, and technology merge into one transcendent experience.",
    artists: [
      { name: "Anyma", role: "headliner", genre: "Melodic Techno" },
    ],
    ticketTiers: [
      { id: "any-standard", name: "Standard", price: 90, description: "General admission", availability: 92, soldOut: false },
      { id: "any-vip", name: "VIP Experience", price: 250, description: "Front-section VIP + 3 drinks", availability: 68, soldOut: false },
    ],
    availability: 92,
    featured: false,
    imageGradient: "linear-gradient(135deg, #B24BF322, #B24BF308)",
  },
];

// Unique genres for filtering
export const allGenres = [...new Set(events.map((e) => e.genre))].sort();

// Unique clubs for filtering
export const allClubNames = [...new Set(events.map((e) => e.clubName))].sort();

export function getEventBySlug(slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventById(id: string): EventData | undefined {
  return events.find((e) => e.id === id);
}

export function getRelatedEvents(event: EventData, limit = 4): EventData[] {
  return events
    .filter((e) => e.id !== event.id)
    .filter((e) => e.clubSlug === event.clubSlug || e.genre === event.genre)
    .slice(0, limit);
}
