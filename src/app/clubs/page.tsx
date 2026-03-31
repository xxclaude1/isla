"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard, Badge } from "@/components/ui";
import { clubs } from "@/lib/data";

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
    transition: { staggerChildren: 0.1 },
  },
};

export default function ClubsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight mb-4"
            >
              The Clubs
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-text-secondary max-w-lg"
            >
              Six legendary venues. One island. The beating heart of electronic music.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Club Grid */}
      <section className="pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {clubs.map((club, i) => (
              <motion.div
                key={club.slug}
                variants={fadeUp}
                className={i < 2 ? "md:col-span-1" : ""}
              >
                <Link href={`/clubs/${club.slug}`}>
                  <GlassCard className="relative overflow-hidden group h-[320px] md:h-[360px]">
                    {/* Accent glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(ellipse at 50% 70%, ${club.accent}, transparent 70%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-wrap gap-2">
                          {club.vibeTags.slice(0, 3).map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                        <span className="text-xs text-text-muted font-mono">
                          {club.capacity}
                        </span>
                      </div>

                      <div>
                        <span
                          className="inline-block w-3 h-3 rounded-full mb-4"
                          style={{ backgroundColor: club.accent }}
                        />
                        <h2
                          className="font-display text-5xl md:text-6xl font-bold mb-2"
                        >
                          {club.name}
                        </h2>
                        <p className="text-text-secondary mb-1">
                          {club.tagline}
                        </p>
                        <p className="text-sm text-text-muted">
                          {club.locationArea} &middot; DJ Mag: {club.djMagRank}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                          <span>{club.residencies.length} weekly residencies</span>
                          <span>&middot;</span>
                          <span>{club.upcomingEvents.length} upcoming events</span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="ml-1 transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
