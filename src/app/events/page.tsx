"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GlassCard, Badge, Button, AvailabilityBar } from "@/components/ui";
import { events, allGenres, allClubNames } from "@/lib/events";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const clubAccents: Record<string, string> = {
  Pacha: "#FF2D55",
  Amnesia: "#00D4FF",
  "Hï Ibiza": "#4364F7",
  "Ushuaïa": "#FF6A00",
  "DC-10": "#00E676",
  UNVRS: "#B24BF3",
};

type SortOption = "date" | "price-low" | "price-high" | "availability";

export default function EventsPage() {
  const [clubFilter, setClubFilter] = useState<string>("All");
  const [genreFilter, setGenreFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  const filtered = useMemo(() => {
    let result = [...events];

    if (clubFilter !== "All") {
      result = result.filter((e) => e.clubName === clubFilter);
    }
    if (genreFilter !== "All") {
      result = result.filter((e) => e.genre === genreFilter);
    }

    switch (sortBy) {
      case "date":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "price-low":
        result.sort((a, b) => {
          const aMin = Math.min(...a.ticketTiers.filter(t => !t.soldOut).map(t => t.price));
          const bMin = Math.min(...b.ticketTiers.filter(t => !t.soldOut).map(t => t.price));
          return aMin - bMin;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const aMin = Math.min(...a.ticketTiers.filter(t => !t.soldOut).map(t => t.price));
          const bMin = Math.min(...b.ticketTiers.filter(t => !t.soldOut).map(t => t.price));
          return bMin - aMin;
        });
        break;
      case "availability":
        result.sort((a, b) => b.availability - a.availability);
        break;
    }

    return result;
  }, [clubFilter, genreFilter, sortBy]);

  const lowestPrice = (e: typeof events[0]) => {
    const available = e.ticketTiers.filter((t) => !t.soldOut);
    return available.length > 0 ? Math.min(...available.map((t) => t.price)) : null;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative pt-32 pb-8 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight mb-2"
          >
            Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            {filtered.length} events this season
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[60px] z-30 px-6 py-4 glass-elevated">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Club Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-xs text-text-muted uppercase tracking-wider shrink-0">Club</span>
              {["All", ...allClubNames].map((club) => (
                <button
                  key={club}
                  onClick={() => setClubFilter(club)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    clubFilter === club
                      ? "gradient-sunset text-white"
                      : "bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                  }`}
                >
                  {club}
                </button>
              ))}
            </div>

            {/* Genre Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-xs text-text-muted uppercase tracking-wider shrink-0">Genre</span>
              {["All", ...allGenres].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    genreFilter === genre
                      ? "gradient-sunset text-white"
                      : "bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 md:ml-auto shrink-0">
              <span className="text-xs text-text-muted uppercase tracking-wider">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-bg-card border border-glass-border rounded-lg px-3 py-1.5 text-xs text-text-secondary focus:outline-none focus:border-accent-pink cursor-pointer"
              >
                <option value="date">Date</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="availability">Most Available</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Event List */}
      <section className="px-6 py-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-text-muted text-lg">No events match your filters.</p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => {
                    setClubFilter("All");
                    setGenreFilter("All");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {filtered.map((event) => {
                  const price = lowestPrice(event);
                  const accent = clubAccents[event.clubName] || "#7F00FF";

                  return (
                    <motion.div
                      key={event.id}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <Link href={`/events/${event.slug}`}>
                        <GlassCard className="relative overflow-hidden group">
                          {/* Accent line */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                            style={{ background: accent }}
                          />

                          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pl-4">
                            {/* Date Block */}
                            <div className="shrink-0 w-16 text-center md:text-left">
                              <span
                                className="block text-xs font-mono font-semibold uppercase"
                                style={{ color: accent }}
                              >
                                {event.day}
                              </span>
                              <span className="block text-lg font-display font-bold">
                                {new Date(event.date).getDate()}
                              </span>
                              <span className="block text-xs text-text-muted font-mono uppercase">
                                {new Date(event.date).toLocaleDateString("en-GB", { month: "short" })}
                              </span>
                            </div>

                            {/* Event Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display text-xl font-semibold truncate">
                                  {event.name}
                                </h3>
                                {event.featured && (
                                  <Badge variant="sunset" className="shrink-0">Featured</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-text-muted">
                                <span style={{ color: accent }}>{event.clubName}</span>
                                <span>&middot;</span>
                                <span>{event.time}</span>
                              </div>
                              <p className="text-xs text-text-muted mt-1 truncate max-w-xl">
                                {event.artists.map((a) => a.name).join(", ")}
                              </p>
                            </div>

                            {/* Genre */}
                            <Badge className="shrink-0 self-start md:self-center">
                              {event.genre}
                            </Badge>

                            {/* Price */}
                            <div className="shrink-0 text-right min-w-[80px]">
                              <span className="text-xs text-text-muted block">From</span>
                              <span className="font-mono text-lg font-semibold">
                                {price !== null ? `€${price}` : "Sold out"}
                              </span>
                            </div>

                            {/* Availability + CTA */}
                            <div className="shrink-0 flex flex-col items-end gap-2 min-w-[140px]">
                              <Button size="sm" className="w-full md:w-auto">
                                Get Tickets
                              </Button>
                              <div className="w-full">
                                <AvailabilityBar
                                  percentage={event.availability}
                                  showLabel={false}
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
