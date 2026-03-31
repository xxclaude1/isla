"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, GlassCard, Badge, AvailabilityBar } from "@/components/ui";
import { ViewerCount } from "@/components/ui/ViewerCount";
import { getRelatedEvents, type EventData } from "@/lib/events";
import { useIslaStore } from "@/store/useIslaStore";

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

export function EventPageClient({ event }: { event: EventData }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(() => {
    const first = event.ticketTiers.find((t) => !t.soldOut);
    return first?.id || null;
  });
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const {
    addToCart,
    addRecentlyViewed,
    updateUrgency,
    getUrgencyDelta,
    getNewlySoldOutTiers,
    addToast,
  } = useIslaStore();

  const accent = clubAccents[event.clubSlug] || "#7F00FF";
  const related = getRelatedEvents(event);
  const selectedTierData = event.ticketTiers.find((t) => t.id === selectedTier);
  const total = selectedTierData ? selectedTierData.price * quantity : 0;

  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Track recently viewed + urgency on mount
  useEffect(() => {
    addRecentlyViewed(event.slug);

    const soldOutTiers = event.ticketTiers.filter((t) => t.soldOut).map((t) => t.name);
    const delta = getUrgencyDelta(event.slug, event.availability);
    const newlySoldOut = getNewlySoldOutTiers(event.slug, soldOutTiers);

    // Show urgency notifications
    if (delta !== null && delta > 5) {
      addToast({
        message: `${delta}% more sold since you last visited`,
        type: "warning",
        duration: 5000,
      });
    }

    if (newlySoldOut.length > 0) {
      addToast({
        message: `${newlySoldOut.join(", ")} ${newlySoldOut.length === 1 ? "tier has" : "tiers have"} sold out since your last visit`,
        type: "warning",
        duration: 6000,
      });
    }

    // Update stored urgency state
    updateUrgency(event.slug, event.availability, soldOutTiers);
  }, [event.slug]);

  const handleAddToCart = () => {
    if (!selectedTierData) return;
    addToCart({
      eventSlug: event.slug,
      eventName: event.name,
      clubName: event.clubName,
      date: event.date,
      tierName: selectedTierData.name,
      tierId: selectedTierData.id,
      price: selectedTierData.price,
      quantity,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background: `radial-gradient(ellipse at 50% 20%, ${accent}66, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-12 pt-40">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Breadcrumb */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-text-muted mb-6">
              <Link href="/events" className="hover:text-text-secondary transition-colors">Events</Link>
              <span>/</span>
              <Link href={`/clubs/${event.clubSlug}`} className="hover:text-text-secondary transition-colors" style={{ color: accent }}>
                {event.clubName}
              </Link>
              <span>/</span>
              <span className="text-text-secondary">{event.name}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <Badge variant="default">{event.genre}</Badge>
              {event.featured && <Badge variant="sunset">Featured</Badge>}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.85] tracking-tight mb-4"
            >
              {event.name}
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-text-secondary">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {event.time}
              </span>
              <Link href={`/clubs/${event.clubSlug}`} className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {event.clubName}
              </Link>
            </motion.div>

            {/* Live viewer count */}
            <motion.div variants={fadeUp} className="mt-4">
              <ViewerCount eventSlug={event.slug} availability={event.availability} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column — Event Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-text-secondary leading-relaxed">{event.description}</p>
            </motion.div>

            {/* Lineup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-xl font-semibold mb-6">Lineup</h2>

              {/* Headliners */}
              <div className="mb-6">
                <span className="text-xs text-text-muted uppercase tracking-wider mb-3 block">Headliners</span>
                <div className="flex flex-wrap gap-3">
                  {event.artists
                    .filter((a) => a.role === "headliner")
                    .map((artist) => (
                      <GlassCard key={artist.name} hover={false} className="!p-4 flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg"
                          style={{ background: `${accent}20`, color: accent }}
                        >
                          {artist.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{artist.name}</p>
                          {artist.genre && (
                            <p className="text-xs text-text-muted">{artist.genre}</p>
                          )}
                        </div>
                      </GlassCard>
                    ))}
                </div>
              </div>

              {/* Support */}
              {event.artists.filter((a) => a.role !== "headliner").length > 0 && (
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wider mb-3 block">Support</span>
                  <div className="flex flex-wrap gap-3">
                    {event.artists
                      .filter((a) => a.role !== "headliner")
                      .map((artist) => (
                        <GlassCard key={artist.name} hover={false} className="!p-3 !rounded-xl flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: `${accent}15`, color: accent }}
                          >
                            {artist.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{artist.name}</p>
                            {artist.genre && (
                              <p className="text-[11px] text-text-muted">{artist.genre}</p>
                            )}
                          </div>
                        </GlassCard>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-xl font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Date", value: formattedDate },
                  { label: "Time", value: event.time },
                  { label: "Venue", value: event.clubName },
                  { label: "Genre", value: event.genre },
                ].map((d) => (
                  <GlassCard key={d.label} hover={false} className="!p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">{d.label}</p>
                    <p className="text-sm font-medium">{d.value}</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* Related Events */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-xl font-semibold mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {related.map((rel) => {
                    const relAccent = clubAccents[rel.clubSlug] || "#7F00FF";
                    const relPrice = Math.min(
                      ...rel.ticketTiers.filter((t) => !t.soldOut).map((t) => t.price)
                    );
                    return (
                      <Link key={rel.id} href={`/events/${rel.slug}`}>
                        <GlassCard className="relative overflow-hidden group">
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                            style={{ background: relAccent }}
                          />
                          <div className="pl-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono" style={{ color: relAccent }}>
                                {rel.day} {new Date(rel.date).getDate()} {new Date(rel.date).toLocaleDateString("en-GB", { month: "short" })}
                              </span>
                              <Badge>{rel.genre}</Badge>
                            </div>
                            <h3 className="font-display text-lg font-semibold">{rel.name}</h3>
                            <p className="text-sm text-text-muted">
                              {rel.clubName} &middot; From <span className="font-mono text-text-primary">&euro;{relPrice}</span>
                            </p>
                            <AvailabilityBar percentage={rel.availability} showLabel={false} className="mt-2" />
                          </div>
                        </GlassCard>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column — Ticket Selection (sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard elevated hover={false} className="!p-0 overflow-hidden">
                  {/* Header */}
                  <div className="p-6 pb-4 border-b border-glass-border">
                    <h3 className="font-display text-lg font-semibold mb-1">Get Tickets</h3>
                    <p className="text-sm text-text-muted">
                      {formattedDate} &middot; {event.time}
                    </p>
                    <AvailabilityBar percentage={event.availability} className="mt-3" />
                  </div>

                  {/* Ticket Tiers */}
                  <div className="p-4 space-y-2">
                    {event.ticketTiers.map((tier) => (
                      <button
                        key={tier.id}
                        disabled={tier.soldOut}
                        onClick={() => !tier.soldOut && setSelectedTier(tier.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                          tier.soldOut
                            ? "opacity-40 cursor-not-allowed border-glass-border bg-transparent"
                            : selectedTier === tier.id
                            ? "border-accent-pink/40 bg-accent-pink/5 shadow-[0_0_20px_rgba(255,45,149,0.08)]"
                            : "border-glass-border bg-transparent hover:border-glass-border-hover hover:bg-glass-bg-hover"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {/* Radio indicator */}
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                tier.soldOut
                                  ? "border-text-muted"
                                  : selectedTier === tier.id
                                  ? "border-accent-pink"
                                  : "border-text-muted"
                              }`}
                            >
                              {selectedTier === tier.id && !tier.soldOut && (
                                <div className="w-2 h-2 rounded-full bg-accent-pink" />
                              )}
                            </div>
                            <span className={`font-semibold text-sm ${tier.soldOut ? "line-through" : ""}`}>
                              {tier.name}
                            </span>
                          </div>
                          <span className={`font-mono font-bold ${tier.soldOut ? "line-through text-text-muted" : ""}`}>
                            &euro;{tier.price}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted ml-6">{tier.description}</p>
                        {!tier.soldOut && (
                          <div className="ml-6 mt-2">
                            <AvailabilityBar percentage={tier.availability} size="sm" />
                          </div>
                        )}
                        {tier.soldOut && (
                          <span className="ml-6 text-xs text-status-sold-out font-medium">Sold out</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Quantity + Total */}
                  {selectedTier && (
                    <div className="p-6 pt-2 space-y-4">
                      {/* Quantity */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Quantity</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded-lg bg-bg-card border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-glass-border-hover transition-all"
                          >
                            &minus;
                          </button>
                          <span className="font-mono text-lg font-semibold w-6 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                            className="w-8 h-8 rounded-lg bg-bg-card border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-glass-border-hover transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="space-y-2 pt-2 border-t border-glass-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-muted">
                            {quantity}x {selectedTierData?.name}
                          </span>
                          <span className="font-mono">&euro;{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-muted">Service fee</span>
                          <span className="font-mono text-status-available">&euro;0.00</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold pt-2 border-t border-glass-border">
                          <span>Total</span>
                          <span className="font-mono">&euro;{total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <AnimatePresence mode="wait">
                        {addedFeedback ? (
                          <motion.div
                            key="added"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button size="lg" className="w-full pointer-events-none !bg-status-available/20 !border-status-available/30">
                              <span className="flex items-center gap-2 justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                Added to Cart
                              </span>
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="cta"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button size="lg" className="w-full" onClick={handleAddToCart}>
                              Get Tickets — &euro;{total.toFixed(2)}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <p className="text-[11px] text-text-muted text-center">
                        Zero hidden fees. Price includes everything.
                      </p>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
