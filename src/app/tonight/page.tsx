"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, GlassCard, Badge, AvailabilityBar } from "@/components/ui";
import { events } from "@/lib/events";

const clubAccents: Record<string, string> = {
  pacha: "#FF2D55",
  amnesia: "#00D4FF",
  "hi-ibiza": "#4364F7",
  ushuaia: "#FF6A00",
  dc10: "#00E676",
  unvrs: "#B24BF3",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function getTimeUntil(dateStr: string, timeStr: string): { hours: number; minutes: number; isLive: boolean; isPast: boolean } {
  const now = new Date();
  const eventDate = new Date(dateStr);

  // Parse start time from "23:59 – 06:00" or "16:00 – 00:00"
  const startMatch = timeStr.match(/^(\d{2}):(\d{2})/);
  const endMatch = timeStr.match(/–\s*(\d{2}):(\d{2})/);

  if (!startMatch) return { hours: 0, minutes: 0, isLive: false, isPast: true };

  const startHour = parseInt(startMatch[1]);
  const startMin = parseInt(startMatch[2]);
  const endHour = endMatch ? parseInt(endMatch[1]) : startHour + 6;

  // Set event start time
  const eventStart = new Date(eventDate);
  eventStart.setHours(startHour, startMin, 0, 0);

  // Set event end time (if end hour < start hour, it's next day)
  const eventEnd = new Date(eventDate);
  eventEnd.setHours(endHour, 0, 0, 0);
  if (endHour <= startHour) {
    eventEnd.setDate(eventEnd.getDate() + 1);
  }

  const diffMs = eventStart.getTime() - now.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const isLive = now >= eventStart && now <= eventEnd;
  const isPast = now > eventEnd;

  return { hours: Math.max(0, diffH), minutes: Math.max(0, diffM), isLive, isPast };
}

export default function TonightPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Get today's date string
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // Events happening today or within next 12 hours
  const tonightEvents = useMemo(() => {
    return events.filter((event) => {
      const time = getTimeUntil(event.date, event.time);
      // Show if: happening today (same date), or currently live, or starts within 12 hours
      return (
        event.date === todayStr ||
        time.isLive ||
        (!time.isPast && time.hours < 12 && time.hours >= 0)
      );
    }).filter((event) => {
      const time = getTimeUntil(event.date, event.time);
      return !time.isPast;
    });
  }, [todayStr]);

  // Upcoming events (next 7 days) as fallback
  const upcomingEvents = useMemo(() => {
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6);
  }, [now]);

  const displayEvents = tonightEvents.length > 0 ? tonightEvents : upcomingEvents;
  const isTonight = tonightEvents.length > 0;

  const formattedTonight = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-amber/10 blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              {isTonight ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-available opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-status-available" />
                  </span>
                  <Badge variant="available">Live Tonight</Badge>
                </>
              ) : (
                <Badge variant="default">Coming Up</Badge>
              )}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-tight mb-4"
            >
              {isTonight ? (
                <>
                  What&apos;s on{" "}
                  <span className="gradient-text-sunset">tonight</span>
                </>
              ) : (
                <>
                  Next{" "}
                  <span className="gradient-text-sunset">events</span>
                </>
              )}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-text-secondary text-lg mb-2">
              {isTonight ? formattedTonight : "Nothing on tonight — here's what's coming up."}
            </motion.p>

            {isTonight && (
              <motion.p variants={fadeUp} className="text-sm text-text-muted">
                {tonightEvents.length} {tonightEvents.length === 1 ? "event" : "events"} happening right now or starting soon.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== EVENTS ===== */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {displayEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted mx-auto mb-4">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <h2 className="font-display text-2xl font-semibold mb-2">Nothing happening right now</h2>
              <p className="text-text-muted mb-6">Check back later or browse all upcoming events.</p>
              <Link href="/events">
                <Button>Browse All Events</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-4"
            >
              {displayEvents.map((event) => {
                const accent = clubAccents[event.clubSlug] || "#7F00FF";
                const time = getTimeUntil(event.date, event.time);
                const lowestPrice = Math.min(
                  ...event.ticketTiers.filter((t) => !t.soldOut).map((t) => t.price)
                );

                return (
                  <motion.div key={event.id} variants={fadeUp}>
                    <Link href={`/events/${event.slug}`}>
                      <GlassCard elevated className="relative overflow-hidden group">
                        {/* Accent side bar */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[4px] rounded-full"
                          style={{ background: accent }}
                        />

                        {/* Glow on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                          style={{ background: `radial-gradient(circle at 20% 50%, ${accent}, transparent 70%)` }}
                        />

                        <div className="relative z-10 pl-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Left: Event info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                {time.isLive && (
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-available/10 border border-status-available/20">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-available opacity-75" />
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-status-available" />
                                    </span>
                                    <span className="text-[10px] font-semibold text-status-available uppercase">Live Now</span>
                                  </span>
                                )}
                                <span className="text-xs font-mono" style={{ color: accent }}>
                                  {event.day}{" "}
                                  {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                </span>
                                <span className="text-xs text-text-muted">{event.time}</span>
                                <Badge>{event.genre}</Badge>
                              </div>

                              <h3 className="font-display text-xl md:text-2xl font-bold truncate mb-1">
                                {event.name}
                              </h3>

                              <div className="flex items-center gap-3 text-sm text-text-muted">
                                <span style={{ color: accent }}>{event.clubName}</span>
                                <span>&middot;</span>
                                <span>
                                  {event.artists
                                    .filter((a) => a.role === "headliner")
                                    .map((a) => a.name)
                                    .join(", ")}
                                </span>
                              </div>
                            </div>

                            {/* Right: Price + Timing + Availability */}
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0">
                              {/* Countdown or Live badge */}
                              {!time.isLive && !time.isPast && (
                                <div className="text-right">
                                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Doors in</p>
                                  <p className="font-mono font-semibold text-lg" style={{ color: accent }}>
                                    {time.hours > 0 ? `${time.hours}h ${time.minutes}m` : `${time.minutes}m`}
                                  </p>
                                </div>
                              )}

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-[10px] text-text-muted uppercase tracking-wider">From</p>
                                <p className="font-mono font-semibold text-lg">&euro;{lowestPrice}</p>
                              </div>

                              {/* Availability */}
                              <div className="w-32 hidden md:block">
                                <AvailabilityBar percentage={event.availability} size="sm" />
                              </div>
                            </div>
                          </div>

                          {/* Mobile availability */}
                          <div className="mt-3 md:hidden">
                            <AvailabilityBar percentage={event.availability} size="sm" />
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Browse all CTA */}
          {displayEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link href="/events">
                <Button variant="glass" size="lg">View All Events</Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
