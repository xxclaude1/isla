"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useIslaStore } from "@/store/useIslaStore";
import { Button, Badge } from "@/components/ui";

const HOLD_DURATION = 10 * 60 * 1000; // 10 minutes

function formatTimeLeft(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useIslaStore();

  const [now, setNow] = useState(Date.now());

  // Tick every second for timer
  useEffect(() => {
    if (!isCartOpen || cart.length === 0) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [isCartOpen, cart.length]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Find oldest item for timer
  const oldestItem = cart.length > 0 ? cart.reduce((oldest, item) => (item.addedAt < oldest.addedAt ? item : oldest)) : null;
  const timeLeft = oldestItem ? Math.max(0, HOLD_DURATION - (now - oldestItem.addedAt)) : 0;
  const timerExpired = oldestItem ? timeLeft <= 0 : false;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-bg-surface border-l border-glass-border flex flex-col"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-glass-border flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-display text-lg font-semibold">Your Cart</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  {itemCount} {itemCount === 1 ? "ticket" : "tickets"}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Timer */}
            {cart.length > 0 && !timerExpired && (
              <div className="px-4 md:px-6 py-3 border-b border-glass-border bg-accent-amber/5">
                <div className="flex items-center gap-2 text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-accent-amber">
                    Tickets held for <span className="font-mono font-semibold">{formatTimeLeft(timeLeft)}</span>
                  </span>
                </div>
              </div>
            )}

            {timerExpired && cart.length > 0 && (
              <div className="px-4 md:px-6 py-3 border-b border-glass-border bg-status-sold-out/5">
                <p className="text-xs text-status-sold-out">
                  Reservation expired — re-add tickets to check availability.
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted mb-4">
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-text-muted mb-2">Your cart is empty</p>
                  <Button variant="ghost" size="sm" onClick={() => setCartOpen(false)}>
                    Browse Events
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="glass rounded-xl p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm truncate">{item.eventName}</h4>
                        <p className="text-xs text-text-muted mt-0.5">
                          {item.clubName} &middot;{" "}
                          {new Date(item.date).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-text-muted hover:text-status-sold-out transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge>{item.tierName}</Badge>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-bg-card border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-all text-sm"
                        >
                          &minus;
                        </button>
                        <span className="font-mono text-sm font-semibold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                          className="w-7 h-7 rounded-lg bg-bg-card border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-all text-sm"
                        >
                          +
                        </button>
                        <span className="font-mono font-semibold text-sm ml-2">
                          &euro;{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 md:p-6 border-t border-glass-border space-y-4 shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Subtotal ({itemCount} tickets)</span>
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

                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <Button size="lg" className="w-full">
                    Checkout — &euro;{total.toFixed(2)}
                  </Button>
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full text-xs text-text-muted hover:text-status-sold-out transition-colors text-center py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
