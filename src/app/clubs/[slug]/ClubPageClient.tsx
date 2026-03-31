"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, GlassCard, Badge, AvailabilityBar } from "@/components/ui";
import type { ClubData } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayShort: Record<string, string> = {
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WED",
  Thursday: "THU",
  Friday: "FRI",
  Saturday: "SAT",
  Sunday: "SUN",
};

export function ClubPageClient({ club }: { club: ClubData }) {
  const sortedResidencies = [...club.residencies].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  );

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${club.accent}44, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 pt-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
              {club.vibeTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.85] tracking-tight mb-4"
            >
              <span style={{ color: club.accent }}>{club.name}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-8"
            >
              {club.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6 text-sm text-text-muted"
            >
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                {club.capacity} capacity
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {club.locationArea}
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                DJ Mag: {club.djMagRank}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 mt-10">
              <a href="#events">
                <Button size="lg">View Events</Button>
              </a>
              <a href="#vip">
                <Button variant="glass" size="lg">VIP & Tables</Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Text */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
                About {club.name}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                {club.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {club.features.map((feature) => (
                <GlassCard key={feature.label} hover={false} className="!p-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${club.accent}15` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: club.accent }}
                    />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.label}
                  </p>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WEEKLY RESIDENCIES ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Weekly Residencies
            </h2>
            <p className="text-text-secondary mb-10">
              Season 2026 — Every night, a different world.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-3"
          >
            {sortedResidencies.map((res) => (
              <motion.div
                key={res.day}
                variants={fadeUp}
                className="group glass rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:bg-glass-bg-hover hover:border-glass-border-hover transition-all duration-300"
              >
                {/* Day */}
                <div className="w-20 shrink-0">
                  <span
                    className="text-xs font-mono font-semibold uppercase tracking-wider"
                    style={{ color: club.accent }}
                  >
                    {dayShort[res.day]}
                  </span>
                </div>

                {/* Residency Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg md:text-xl font-semibold truncate">
                    {res.name}
                  </h3>
                  <p className="text-sm text-text-muted truncate">
                    {res.headliner}
                  </p>
                </div>

                {/* Genre Badge */}
                <Badge className="shrink-0 self-start md:self-center">
                  {res.genre}
                </Badge>

                {/* Arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-text-muted group-hover:text-text-secondary transition-all group-hover:translate-x-1 hidden md:block"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section id="events" className="py-20 px-6 scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Upcoming Events
            </h2>
            <p className="text-text-secondary mb-10">
              Secure your spot. Prices increase as events fill up.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-3"
          >
            {club.upcomingEvents.map((event) => (
              <motion.div key={event.id} variants={fadeUp}>
                <Link href={`/events/${event.id}`}>
                  <div className="group glass rounded-xl p-5 md:p-6 hover:bg-glass-bg-hover hover:border-glass-border-hover transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      {/* Date */}
                      <div className="shrink-0 text-center md:text-left w-16">
                        <span
                          className="block text-xs font-mono font-semibold uppercase"
                          style={{ color: club.accent }}
                        >
                          {event.day}
                        </span>
                        <span className="block text-sm text-text-muted font-mono">
                          {new Date(event.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>

                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl font-semibold mb-1">
                          {event.name}
                        </h3>
                        <p className="text-sm text-text-muted truncate">
                          {event.headliners.join(", ")}
                        </p>
                      </div>

                      {/* Genre */}
                      <Badge className="shrink-0 self-start md:self-center">
                        {event.genre}
                      </Badge>

                      {/* Price */}
                      <div className="shrink-0 text-right">
                        <span className="text-xs text-text-muted block">From</span>
                        <span className="font-mono text-lg font-semibold">
                          &euro;{event.priceFrom}
                        </span>
                      </div>

                      {/* CTA */}
                      <Button size="sm" className="shrink-0 self-start md:self-center">
                        Get Tickets
                      </Button>
                    </div>

                    {/* Availability */}
                    <div className="mt-4 max-w-xs ml-0 md:ml-[88px]">
                      <AvailabilityBar percentage={event.availability} size="sm" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/events"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              View all {club.name} events &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== VIP & TABLES ===== */}
      <section id="vip" className="py-20 px-6 scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              VIP & Tables
            </h2>
            <p className="text-text-secondary">
              Skip the queue. Elevate the night.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {club.vipTiers.map((tier, i) => (
              <motion.div key={tier.name} variants={fadeUp}>
                <GlassCard
                  hover={false}
                  className={`h-full ${i === club.vipTiers.length - 1 ? "ring-1" : ""}`}
                  style={i === club.vipTiers.length - 1 ? { borderColor: `${club.accent}30` } : undefined}
                >
                  <div className="flex flex-col h-full">
                    <h4 className="font-display text-lg font-semibold mb-2">
                      {tier.name}
                    </h4>
                    <p className="font-mono text-2xl font-bold mb-4" style={{ color: club.accent }}>
                      {tier.price}
                    </p>
                    <p className="text-sm text-text-secondary mb-6 flex-1">
                      {tier.includes}
                    </p>
                    <Button variant="glass" className="w-full">
                      Inquire
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRACTICAL INFO ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Practical Info
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                label: "Hours",
                value: club.practicalInfo.hours,
              },
              {
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                label: "Age",
                value: club.practicalInfo.age,
              },
              {
                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                label: "Dress Code",
                value: club.practicalInfo.dressCode,
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Getting There",
                value: club.practicalInfo.gettingThere,
              },
            ].map((info) => (
              <motion.div key={info.label} variants={fadeUp}>
                <GlassCard hover={false} className="!p-5 h-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={club.accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-3"
                  >
                    <path d={info.icon} />
                  </svg>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    {info.label}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {info.value}
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
