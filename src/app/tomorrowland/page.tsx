"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button, GlassCard, Badge, AvailabilityBar } from "@/components/ui";
import {
  tomorrowlandDates,
  tomorrowlandArtists,
  tomorrowlandPackages,
  cancelledDates,
} from "@/lib/tomorrowland";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

type MonthFilter = "all" | "may" | "jun" | "jul" | "aug" | "sep";

const monthMap: Record<string, MonthFilter> = {
  "4": "may",  // 0-indexed months don't apply here — we use the actual month
  "5": "may",
  "6": "jun",
  "7": "jul",
  "8": "aug",
  "9": "sep",
};

function getMonth(dateStr: string): MonthFilter {
  const m = new Date(dateStr).getMonth(); // 0-indexed
  if (m === 4) return "may";
  if (m === 5) return "jun";
  if (m === 6) return "jul";
  if (m === 7) return "aug";
  if (m === 8) return "sep";
  return "may";
}

export default function TomorrowlandPage() {
  const [monthFilter, setMonthFilter] = useState<MonthFilter>("all");

  const filteredDates =
    monthFilter === "all"
      ? tomorrowlandDates
      : tomorrowlandDates.filter((d) => getMonth(d.date) === monthFilter);

  const residents = tomorrowlandArtists.filter((a) => a.role === "resident");
  const specials = tomorrowlandArtists.filter((a) => a.role === "special");
  const confirmed = tomorrowlandArtists.filter((a) => a.role === "confirmed");

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-void via-bg-deep to-bg-deep" />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[#7F00FF]/12 blur-[180px]" />
          <div className="absolute bottom-[20%] left-[20%] w-[600px] h-[400px] rounded-full bg-[#E100FF]/8 blur-[150px]" />
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#00D4FF]/6 blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.div variants={fadeUp}>
              <Badge variant="vip" className="mb-6">
                Every Wednesday at Ushuaïa
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.85] tracking-tight mb-4"
            >
              <span className="gradient-text-aurora">Tomorrowland</span>
              <br />
              <span className="text-text-primary">Ibiza 2026</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-text-secondary max-w-xl mb-4">
              The intimacy of a club. The production of a festival.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-6 text-sm text-text-muted mb-10">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B24BF3" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                19 dates
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B24BF3" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                May 6 — Sep 30
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B24BF3" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                Ushuaïa Ibiza
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4">
              <a href="#dates">
                <Button size="lg">View All Dates</Button>
              </a>
              <a href="#packages">
                <Button variant="glass" size="lg">See Packages</Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ===== COMPARISON: BELGIUM vs IBIZA ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">
              Not a festival. Something different.
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Tomorrowland Ibiza is a weekly club residency — open-air, poolside, under the Balearic sun.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Belgium */}
            <motion.div variants={fadeUp}>
              <GlassCard hover={false} className="h-full">
                <div className="text-center mb-6">
                  <span className="text-xs text-text-muted uppercase tracking-wider">For reference</span>
                  <h3 className="font-display text-xl font-semibold mt-1">Tomorrowland Belgium</h3>
                </div>
                <div className="space-y-4 text-sm">
                  {[
                    ["Format", "3-day weekend festival"],
                    ["Capacity", "400,000+ (over weekends)"],
                    ["Stages", "16+ stages"],
                    ["Accommodation", "Dreamville camping"],
                    ["Weekend pass", "From €327"],
                    ["Location", "Boom, Belgium"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-glass-border pb-2">
                      <span className="text-text-muted">{label}</span>
                      <span className="text-text-secondary text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Ibiza */}
            <motion.div variants={fadeUp}>
              <GlassCard hover={false} className="h-full ring-1 ring-accent-purple/20">
                <div className="text-center mb-6">
                  <Badge variant="vip" className="mb-2">This is what we sell</Badge>
                  <h3 className="font-display text-xl font-semibold mt-1 gradient-text-aurora">Tomorrowland Ibiza</h3>
                </div>
                <div className="space-y-4 text-sm">
                  {[
                    ["Format", "Weekly Wednesday event"],
                    ["Capacity", "~7,800 per event"],
                    ["Stage", "1 main stage (massive)"],
                    ["Accommodation", "Hotel-based"],
                    ["Per event", "From €55"],
                    ["Location", "Ushuaïa, Playa d'en Bossa"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-glass-border pb-2">
                      <span className="text-text-muted">{label}</span>
                      <span className="text-text-primary font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PACKAGES ===== */}
      <section id="packages" className="py-20 px-6 scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-purple/5 blur-[180px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">Packages</h2>
            <p className="text-text-secondary">Single nights to full-season commitment.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {tomorrowlandPackages.map((pkg) => (
              <motion.div key={pkg.id} variants={fadeUp}>
                <GlassCard
                  hover={false}
                  elevated={pkg.popular}
                  className={`h-full relative ${pkg.popular ? "ring-1 ring-accent-purple/30" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="vip">Most Popular</Badge>
                    </div>
                  )}

                  <div className="flex flex-col h-full pt-2">
                    <h4 className="font-display text-lg font-semibold mb-1">{pkg.name}</h4>
                    <div className="mb-1">
                      <span className="font-mono text-2xl font-bold gradient-text-aurora">{pkg.price}</span>
                    </div>
                    <span className="text-xs text-text-muted mb-4">{pkg.priceNote}</span>

                    <p className="text-sm text-text-secondary mb-5 leading-relaxed">{pkg.description}</p>

                    <ul className="space-y-2.5 mb-6 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B24BF3" strokeWidth="2.5" className="mt-0.5 shrink-0">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button variant={pkg.popular ? "primary" : "glass"} className="w-full mt-auto">
                      {pkg.cta}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SEASON CALENDAR ===== */}
      <section id="dates" className="py-20 px-6 scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">Season Calendar</h2>
            <p className="text-text-secondary">19 Wednesdays. Pick your nights.</p>
          </motion.div>

          {/* Month Filter */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
            {([
              ["all", "All Dates"],
              ["may", "May"],
              ["jun", "June"],
              ["jul", "July"],
              ["aug", "August"],
              ["sep", "September"],
            ] as [MonthFilter, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setMonthFilter(val)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  monthFilter === val
                    ? "gradient-aurora text-white"
                    : "bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Date Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {filteredDates.map((d) => {
              const dateObj = new Date(d.date);
              const dayNum = dateObj.getDate();
              const monthStr = dateObj.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

              return (
                <motion.div key={d.id} variants={fadeUp} layout>
                  <GlassCard
                    className={`relative overflow-hidden ${d.highlighted ? "ring-1 ring-accent-purple/30" : ""}`}
                  >
                    {d.highlighted && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="sunset">Highlight</Badge>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {/* Date block */}
                      <div className="shrink-0 w-16 text-center">
                        <span className="block text-xs font-mono text-accent-purple uppercase tracking-wider">WED</span>
                        <span className="block font-display text-3xl font-bold">{dayNum}</span>
                        <span className="block text-xs font-mono text-text-muted">{monthStr}</span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold mb-1 text-sm">
                          Dimitri Vegas & Like Mike
                        </p>
                        <p className="text-xs text-text-muted mb-2 truncate">
                          + {d.guests.join(", ")}
                        </p>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-text-muted">
                            From <span className="font-mono text-text-primary font-semibold">&euro;{d.priceFrom}</span>
                          </span>
                          {d.soldOut ? (
                            <Badge variant="sold-out">Sold Out</Badge>
                          ) : (
                            <Button size="sm">Tickets</Button>
                          )}
                        </div>

                        <AvailabilityBar percentage={d.availability} showLabel={false} size="sm" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}

            {/* Cancelled dates */}
            {(monthFilter === "all" || monthFilter === "jul" || monthFilter === "aug" || monthFilter === "sep") &&
              cancelledDates
                .filter((cd) => monthFilter === "all" || getMonth(cd) === monthFilter)
                .map((cd) => {
                  const dateObj = new Date(cd);
                  const dayNum = dateObj.getDate();
                  const monthStr = dateObj.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
                  return (
                    <motion.div key={cd} variants={fadeUp} layout>
                      <div className="glass rounded-2xl p-6 opacity-30">
                        <div className="flex gap-4">
                          <div className="shrink-0 w-16 text-center">
                            <span className="block text-xs font-mono text-text-muted uppercase tracking-wider">WED</span>
                            <span className="block font-display text-3xl font-bold text-text-muted">{dayNum}</span>
                            <span className="block text-xs font-mono text-text-muted">{monthStr}</span>
                          </div>
                          <div className="flex-1 flex items-center">
                            <span className="text-sm text-text-muted">No event this week</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
          </motion.div>
        </div>
      </section>

      {/* ===== LINEUP ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">Full Lineup</h2>
            <p className="text-text-secondary">Guest artists rotate weekly. More names TBA.</p>
          </motion.div>

          {/* Resident */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <span className="text-xs text-accent-purple uppercase tracking-wider font-semibold mb-4 block text-center">Residents</span>
            <div className="flex justify-center">
              {residents.map((a) => (
                <motion.div key={a.name} variants={fadeUp}>
                  <GlassCard elevated hover={false} className="text-center ring-1 ring-accent-purple/20">
                    <div className="w-20 h-20 rounded-full gradient-aurora mx-auto mb-4 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-white">
                        {a.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <p className="font-display text-lg font-semibold">{a.name}</p>
                    <p className="text-xs text-text-muted mt-1">{a.genre}</p>
                    <Badge variant="vip" className="mt-3">Every Wednesday</Badge>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Guests */}
          <div className="mb-10">
            <span className="text-xs text-accent-amber uppercase tracking-wider font-semibold mb-4 block">Special Guests</span>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-wrap gap-3"
            >
              {specials.map((a) => (
                <motion.div key={a.name} variants={fadeUp}>
                  <GlassCard hover={false} className="!p-3 !rounded-xl flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm bg-accent-amber/15 text-accent-amber"
                    >
                      {a.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{a.name}</p>
                      <p className="text-[11px] text-text-muted">{a.genre}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Confirmed */}
          <div>
            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-4 block">Confirmed Artists</span>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-wrap gap-2"
            >
              {confirmed.map((a) => (
                <motion.div key={a.name} variants={fadeUp}>
                  <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-glass-bg-hover hover:border-glass-border-hover transition-all duration-200">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-accent-purple/10 text-accent-purple"
                    >
                      {a.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-[10px] text-text-muted">{a.genre}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* More TBA pill */}
              <motion.div variants={fadeUp}>
                <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 border-dashed">
                  <span className="text-sm text-text-muted">+ More TBA</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PRACTICAL INFO ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">Know Before You Go</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Venue",
                text: "Ushuaïa Ibiza Beach Hotel, Playa d'en Bossa. Open-air poolside venue.",
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Doors & Times",
                text: "Doors 5:00 PM. Main act ~9:00 PM – 11:00 PM. Event ends ~midnight. Arrive by 6:30 PM for shortest queues.",
              },
              {
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                title: "Age & ID",
                text: "18+ only. Valid photo ID required at entry (passport or national ID).",
              },
              {
                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                title: "Dress Code",
                text: "No flip-flops, swimming shorts, swimwear, or sports merchandise.",
              },
              {
                icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
                title: "What to Bring",
                text: "High-SPF sunscreen, comfortable shoes, portable phone charger. Stay hydrated — outdoor event in Ibiza heat.",
              },
              {
                icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
                title: "Getting There",
                text: "10-minute taxi from Ibiza Airport. Walking distance from Playa d'en Bossa hotels. Pre-book your return — taxis in high demand post-event.",
              },
            ].map((info) => (
              <motion.div key={info.title} variants={fadeUp}>
                <GlassCard hover={false} className="!p-5 h-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B24BF3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-3"
                  >
                    <path d={info.icon} />
                  </svg>
                  <h4 className="font-semibold text-sm mb-2">{info.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{info.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== NEARBY HOTELS ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">Where to Stay</h2>
            <p className="text-text-secondary">Walk to the venue. Sleep when it&apos;s over.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { name: "Ushuaïa Ibiza Beach Hotel", note: "The venue itself — walk from your room", distance: "0 min" },
              { name: "Hard Rock Hotel Ibiza", note: "Directly adjacent to Ushuaïa", distance: "2 min walk" },
              { name: "Sirenis Hotel Tres Carabelas", note: "Budget-friendly, Playa d'en Bossa", distance: "5 min walk" },
              { name: "Ibiza Town Hotels", note: "More nightlife options, quick taxi", distance: "10 min taxi" },
            ].map((hotel) => (
              <motion.div key={hotel.name} variants={fadeUp}>
                <GlassCard hover={false} className="!p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{hotel.name}</p>
                      <p className="text-xs text-text-muted mt-1">{hotel.note}</p>
                    </div>
                    <Badge>{hotel.distance}</Badge>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
