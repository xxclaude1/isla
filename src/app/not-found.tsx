"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="relative text-center max-w-lg">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-pink/8 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10"
        >
          <p className="font-mono text-7xl md:text-9xl font-bold gradient-text-sunset mb-4">
            404
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            Lost on the island
          </h1>
          <p className="text-text-secondary mb-8 max-w-sm mx-auto">
            This page doesn&apos;t exist — but the party does. Let&apos;s get you back on track.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/events">
              <Button variant="glass">Browse Events</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
