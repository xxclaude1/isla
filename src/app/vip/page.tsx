"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button, GlassCard, Badge } from "@/components/ui";
import { clubs } from "@/lib/data";

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

const perks = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Skip the Queue",
    description: "Priority entrance through the VIP lane — no waiting, no hassle.",
  },
  {
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    title: "Private Tables",
    description: "Reserved seating in prime positions with dedicated bottle service.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Personal Host",
    description: "A dedicated host to look after your group all night.",
  },
  {
    icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 15.546V12a9 9 0 0118 0v3.546z",
    title: "Premium Drinks",
    description: "Bottle credit included. Top-shelf spirits, champagne, and mixers.",
  },
];

export default function VipPage() {
  const [inquiryClub, setInquiryClub] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", guests: "4", club: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = (clubSlug: string) => {
    setInquiryClub(clubSlug);
    setFormData((prev) => ({ ...prev, club: clubSlug }));
    // Scroll to form
    document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/50 to-bg-deep" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/15 blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-accent-pink/10 blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.div variants={fadeUp}>
              <Badge variant="vip" className="mb-6">VIP Experience</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.9] tracking-tight mb-6"
            >
              <span className="block">Above the</span>
              <span className="block gradient-text-sunset">ordinary.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-text-secondary max-w-lg mb-8">
              Private tables, bottle service, and priority access at every iconic Ibiza club. Your night, elevated.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a href="#inquiry-form">
                <Button size="lg">Inquire Now</Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PERKS ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {perks.map((perk) => (
              <motion.div key={perk.title} variants={fadeUp}>
                <GlassCard hover={false} className="h-full">
                  <svg
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="url(#vip-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="mb-4"
                  >
                    <defs>
                      <linearGradient id="vip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ee0979" />
                        <stop offset="100%" stopColor="#ff6a00" />
                      </linearGradient>
                    </defs>
                    <path d={perk.icon} />
                  </svg>
                  <h3 className="font-display text-base font-semibold mb-1">{perk.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{perk.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CLUB VIP TIERS ===== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">VIP at Every Club</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Each venue offers a unique VIP experience. Find your perfect table.
            </p>
          </motion.div>

          <div className="space-y-8">
            {clubs.map((club) => {
              const accent = clubAccents[club.slug] || "#7F00FF";
              return (
                <motion.div
                  key={club.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard elevated hover={false} className="relative overflow-hidden">
                    {/* Accent glow */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 blur-[60px]"
                      style={{ background: accent }}
                    />

                    <div className="relative z-10">
                      {/* Club header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full" style={{ background: accent }} />
                          <Link href={`/clubs/${club.slug}`}>
                            <h3 className="font-display text-2xl font-bold hover:opacity-80 transition-opacity">{club.name}</h3>
                          </Link>
                          <span className="text-xs text-text-muted font-mono">{club.capacity} cap.</span>
                        </div>
                        <Button variant="glass" size="sm" onClick={() => handleInquiry(club.slug)}>
                          Inquire for {club.name}
                        </Button>
                      </div>

                      {/* Tiers grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {club.vipTiers.map((tier) => (
                          <div
                            key={tier.name}
                            className="rounded-xl border border-glass-border bg-bg-card/50 p-4 hover:border-glass-border-hover transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{tier.name}</h4>
                              <span className="font-mono text-sm font-semibold shrink-0 ml-2" style={{ color: accent }}>
                                {tier.price}
                              </span>
                            </div>
                            <p className="text-xs text-text-muted leading-relaxed">{tier.includes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== INQUIRY FORM ===== */}
      <section id="inquiry-form" className="py-20 px-6">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard elevated hover={false}>
              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-sunset mb-4"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold mb-2">Inquiry Sent</h3>
                  <p className="text-sm text-text-secondary mb-6">
                    We&apos;ll get back to you within 24 hours with availability and pricing.
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", guests: "4", club: "", message: "" }); }}>
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-semibold mb-1">VIP Table Inquiry</h2>
                  <p className="text-xs text-text-muted mb-6">
                    Tell us what you&apos;re looking for and we&apos;ll arrange everything.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-secondary font-medium mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full h-12 px-4 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-secondary font-medium mb-1.5">Email *</label>
                        <input
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@email.com"
                          className="w-full h-12 px-4 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-secondary font-medium mb-1.5">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+34 600 000 000"
                          className="w-full h-12 px-4 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-secondary font-medium mb-1.5">Group Size</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all appearance-none"
                        >
                          {[2, 4, 6, 8, 10, 15, 20].map((n) => (
                            <option key={n} value={n}>{n} guests</option>
                          ))}
                          <option value="20+">20+ guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-secondary font-medium mb-1.5">Preferred Club</label>
                      <select
                        value={formData.club}
                        onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all appearance-none"
                      >
                        <option value="">Any / Not sure yet</option>
                        {clubs.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-text-secondary font-medium mb-1.5">Message <span className="text-text-muted">(optional)</span></label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Dates, preferences, special occasions..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all resize-none"
                      />
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      disabled={!formData.name.trim() || !formData.email.includes("@")}
                      onClick={() => setSubmitted(true)}
                    >
                      Send Inquiry
                    </Button>

                    <p className="text-[11px] text-text-muted text-center">
                      We typically respond within 24 hours. No commitment, no pressure.
                    </p>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
