"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, GlassCard, Badge, AvailabilityBar } from "@/components/ui";
import { useIslaStore } from "@/store/useIslaStore";
import { getEventBySlug } from "@/lib/events";

const featuredEvents = [
  {
    id: 1,
    name: "Carl Cox",
    club: "UNVRS",
    date: "SUN 21 JUN",
    price: 85,
    image: "/images/events/carl-cox.jpg",
    availability: 72,
    featured: true,
    genre: "Techno",
  },
  {
    id: 2,
    name: "Solomun +1",
    club: "Pacha",
    date: "SUN 07 JUN",
    price: 65,
    image: "/images/events/solomun.jpg",
    availability: 58,
    featured: false,
    genre: "House",
  },
  {
    id: 3,
    name: "FISHER",
    club: "UNVRS",
    date: "THU 04 JUN",
    price: 75,
    image: "/images/events/fisher.jpg",
    availability: 85,
    featured: false,
    genre: "Tech House",
  },
  {
    id: 4,
    name: "Black Coffee",
    club: "Hï Ibiza",
    date: "SAT 06 JUN",
    price: 90,
    image: "/images/events/black-coffee.jpg",
    availability: 44,
    featured: true,
    genre: "Afro House",
  },
  {
    id: 5,
    name: "Circoloco",
    club: "DC-10",
    date: "MON 01 JUN",
    price: 56,
    image: "/images/events/circoloco.jpg",
    availability: 91,
    featured: false,
    genre: "Underground",
  },
  {
    id: 6,
    name: "Calvin Harris",
    club: "Ushuaïa",
    date: "FRI 30 MAY",
    price: 95,
    image: "/images/events/calvin-harris.jpg",
    availability: 88,
    featured: false,
    genre: "EDM",
  },
];

const clubs = [
  {
    slug: "pacha",
    name: "Pacha",
    tagline: "Where it all began. Since 1973.",
    accent: "#FF2D55",
    capacity: "3,000",
  },
  {
    slug: "amnesia",
    name: "Amnesia",
    tagline: "Dance until the sun rises through the glass.",
    accent: "#00D4FF",
    capacity: "5,000",
  },
  {
    slug: "hi-ibiza",
    name: "Hï Ibiza",
    tagline: "The world's #1 club.",
    accent: "#4364F7",
    capacity: "5,000",
  },
  {
    slug: "ushuaia",
    name: "Ushuaïa",
    tagline: "Where the party meets the sun.",
    accent: "#FF6A00",
    capacity: "7,000+",
  },
  {
    slug: "dc10",
    name: "DC-10",
    tagline: "The spiritual home of underground.",
    accent: "#00E676",
    capacity: "1,500",
  },
  {
    slug: "unvrs",
    name: "UNVRS",
    tagline: "The world's first hyperclub.",
    accent: "#B24BF3",
    capacity: "10,000",
  },
];

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const clubAccentMap: Record<string, string> = {
  pacha: "#FF2D55",
  amnesia: "#00D4FF",
  "hi-ibiza": "#4364F7",
  ushuaia: "#FF6A00",
  dc10: "#00E676",
  unvrs: "#B24BF3",
};

export default function Home() {
  const { recentlyViewed } = useIslaStore();
  const recentEvents = recentlyViewed
    .map((slug) => getEventBySlug(slug))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/50 to-bg-deep" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-pink/10 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-purple/8 blur-[120px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeUp}>
              <Badge variant="sunset" className="mb-8">
                Season 2026 Now Live
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight mb-6"
            >
              <span className="block">Tonight</span>
              <span className="block gradient-text-sunset">starts here.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-text-secondary max-w-lg mb-10"
            >
              Every club. Every night. One place.
              <br />
              <span className="text-text-muted">
                Ibiza&apos;s definitive nightlife experience.
              </span>
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex gap-4">
              <Link href="/events">
                <Button size="lg">Explore Events</Button>
              </Link>
              <Link href="/tonight">
                <Button variant="glass" size="lg">
                  What&apos;s On Tonight
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-8 mt-16 text-center"
            >
              {[
                { value: "6", label: "Iconic Clubs" },
                { value: "200+", label: "Events" },
                { value: "0", label: "Hidden Fees" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl font-bold gradient-text-sunset">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-indicator"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </section>

      {/* ===== FEATURED EVENTS ===== */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                This Week
              </h2>
              <p className="text-text-secondary mt-2">
                The nights everyone&apos;s talking about.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden md:inline-flex text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              View all events &rarr;
            </Link>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {featuredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                className={event.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <Link href={`/events/${event.id}`}>
                  <GlassCard
                    className={`relative overflow-hidden group ${
                      event.featured ? "h-full min-h-[380px]" : "min-h-[200px]"
                    }`}
                  >
                    {/* Image Placeholder / Gradient Background */}
                    <div
                      className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${
                          clubs.find((c) => c.name === event.club || c.name === "UNVRS")?.accent || "#7F00FF"
                        }22, transparent)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <Badge>{event.club}</Badge>
                        <span className="text-xs text-text-muted font-mono">
                          {event.date}
                        </span>
                      </div>

                      <div className="mt-auto pt-8">
                        <Badge variant="default" className="mb-2">
                          {event.genre}
                        </Badge>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                          {event.name}
                        </h3>
                        <div className="flex items-end justify-between">
                          <span className="text-sm text-text-secondary">
                            From{" "}
                            <span className="font-mono text-text-primary font-semibold">
                              &euro;{event.price}
                            </span>
                          </span>
                        </div>
                        <AvailabilityBar
                          percentage={event.availability}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile view all */}
          <Link
            href="/events"
            className="md:hidden inline-flex mt-6 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            View all events &rarr;
          </Link>
        </div>
      </section>

      {/* ===== CLUB SHOWCASE ===== */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
              The Clubs
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Six legendary venues. One island. The beating heart of electronic
              music.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {clubs.map((club) => (
              <motion.div key={club.slug} variants={fadeUp}>
                <Link href={`/clubs/${club.slug}`}>
                  <GlassCard className="relative overflow-hidden group h-[280px]">
                    {/* Accent glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, ${club.accent}, transparent 70%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ backgroundColor: club.accent }}
                        />
                        <span className="text-xs text-text-muted font-mono">
                          {club.capacity} capacity
                        </span>
                      </div>

                      <div>
                        <h3
                          className="font-display text-4xl md:text-5xl font-bold mb-2 transition-colors duration-300"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          {club.name}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {club.tagline}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-4 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                          Explore
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== RECENTLY VIEWED ===== */}
      {recentEvents.length > 0 && (
        <section className="relative py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                Continue Where You Left Off
              </h2>
              <p className="text-text-secondary mt-2 text-sm">
                Events you were checking out.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {recentEvents.map((event) => {
                if (!event) return null;
                const eventAccent = clubAccentMap[event.clubSlug] || "#7F00FF";
                const lowestPrice = Math.min(
                  ...event.ticketTiers.filter((t) => !t.soldOut).map((t) => t.price)
                );
                return (
                  <motion.div key={event.slug} variants={fadeUp}>
                    <Link href={`/events/${event.slug}`}>
                      <GlassCard className="relative overflow-hidden group">
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                          style={{ background: eventAccent }}
                        />
                        <div className="pl-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono" style={{ color: eventAccent }}>
                              {event.day} {new Date(event.date).getDate()}{" "}
                              {new Date(event.date).toLocaleDateString("en-GB", { month: "short" })}
                            </span>
                            <Badge>{event.genre}</Badge>
                          </div>
                          <h3 className="font-display text-lg font-semibold truncate">
                            {event.name}
                          </h3>
                          <p className="text-sm text-text-muted">
                            {event.clubName} &middot; From{" "}
                            <span className="font-mono text-text-primary">&euro;{lowestPrice}</span>
                          </p>
                          <AvailabilityBar percentage={event.availability} showLabel={false} className="mt-2" />
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== VALUE PROPS ===== */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Official Tickets",
                description: "Direct from the clubs. Guaranteed entry, no fakes.",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Real-Time Availability",
                description:
                  "Live updates. See exactly what's left before you commit.",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Zero Hidden Fees",
                description:
                  "The price you see is the price you pay. Always.",
              },
            ].map((prop) => (
              <motion.div key={prop.title} variants={fadeUp}>
                <GlassCard hover={false}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#sunset)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4"
                  >
                    <defs>
                      <linearGradient
                        id="sunset"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ee0979" />
                        <stop offset="100%" stopColor="#ff6a00" />
                      </linearGradient>
                    </defs>
                    <path d={prop.icon} />
                  </svg>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {prop.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
