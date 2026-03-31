"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, GlassCard } from "@/components/ui";

interface OrderItem {
  eventName: string;
  clubName: string;
  date: string;
  tierName: string;
  quantity: number;
  price: number;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  paidAt: number;
}

// Simple QR-like pattern generator (visual only, not scannable)
function QRPattern({ orderId }: { orderId: string }) {
  const cells = useMemo(() => {
    const grid: boolean[][] = [];
    let seed = 0;
    for (let i = 0; i < orderId.length; i++) {
      seed += orderId.charCodeAt(i);
    }
    const random = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };

    for (let row = 0; row < 21; row++) {
      grid[row] = [];
      for (let col = 0; col < 21; col++) {
        // Corner finder patterns (top-left, top-right, bottom-left)
        const inTopLeft = row < 7 && col < 7;
        const inTopRight = row < 7 && col > 13;
        const inBottomLeft = row > 13 && col < 7;

        if (inTopLeft || inTopRight || inBottomLeft) {
          const r = row < 7 ? row : row - 14;
          const c = col < 7 ? col : col - 14;
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[row][col] = isBorder || isInner;
        } else {
          grid[row][col] = random() > 0.5;
        }
      }
    }
    return grid;
  }, [orderId]);

  return (
    <div className="inline-flex p-4 bg-white rounded-2xl">
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(21, 1fr)` }}>
        {cells.map((row, r) =>
          row.map((filled, c) => (
            <div
              key={`${r}-${c}`}
              className={`w-[6px] h-[6px] md:w-[8px] md:h-[8px] ${filled ? "bg-gray-900" : "bg-white"}`}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Confetti particle
function Confetti() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: ["#ee0979", "#ff6a00", "#FFB800", "#00E676", "#00D4FF", "#B24BF3"][Math.floor(Math.random() * 6)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: "110vh",
            rotate: p.rotation + 720,
            opacity: [1, 1, 0],
            scale: [1, 0.8, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size * (Math.random() > 0.5 ? 1 : 0.6),
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("isla-last-order");
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch {}
      }
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!order && !orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-semibold mb-2">No order found</h1>
          <p className="text-text-muted mb-6">Looking for your tickets? Check your email.</p>
          <Link href="/events">
            <Button>Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayId = order?.id || orderId || "ISLA-2026-00000";
  const primaryItem = order?.items[0];

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-10"
          >
            {/* Checkmark circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 12 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-sunset mb-6"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-display text-3xl md:text-4xl font-bold mb-2"
            >
              {primaryItem ? (
                <>
                  You&apos;re going to{" "}
                  <span className="gradient-text-sunset">{primaryItem.eventName}</span>
                </>
              ) : (
                "Booking Confirmed"
              )}
            </motion.h1>

            {primaryItem && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-text-secondary"
              >
                {primaryItem.clubName} &middot;{" "}
                {new Date(primaryItem.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </motion.p>
            )}
          </motion.div>

          {/* QR Code Ticket */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <GlassCard elevated hover={false} className="text-center !py-8">
              <QRPattern orderId={displayId} />

              <p className="font-mono text-sm text-text-muted mt-4">
                Order <span className="text-text-primary font-semibold">{displayId}</span>
              </p>

              {order && (
                <div className="mt-4 space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-text-secondary">
                      {item.quantity}x {item.tierName} — {item.eventName}
                    </p>
                  ))}
                  <p className="font-mono font-semibold mt-2">
                    Total: &euro;{order.total.toFixed(2)}
                  </p>
                </div>
              )}

              <p className="text-[11px] text-text-muted mt-4">
                Show this QR code at the entrance. A copy has been sent to{" "}
                <span className="text-text-secondary">{order?.customerEmail || "your email"}</span>.
              </p>
            </GlassCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
          >
            {[
              {
                label: "Apple Wallet",
                icon: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
              },
              {
                label: "Google Wallet",
                icon: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
              },
              {
                label: "Add to Calendar",
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                label: "Share",
                icon: "M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM7 12a3 3 0 11-6 0 3 3 0 016 0zm14 7a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map((action) => (
              <button
                key={action.label}
                className="glass rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 hover:bg-glass-bg-hover transition-all group"
                onClick={() => {}}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-muted group-hover:text-text-primary transition-colors"
                >
                  <path d={action.icon} />
                </svg>
                <span className="text-[11px] text-text-muted group-hover:text-text-secondary transition-colors">{action.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Continue Browsing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12"
          >
            <GlassCard hover={false} className="text-center !py-8">
              <h3 className="font-display text-lg font-semibold mb-2">Still planning your night?</h3>
              <p className="text-sm text-text-muted mb-6">Check out more events happening this week.</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/events">
                  <Button>View More Events</Button>
                </Link>
                <Link href="/tonight">
                  <Button variant="glass">What&apos;s On Tonight</Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}
