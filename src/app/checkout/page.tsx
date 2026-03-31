"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useIslaStore } from "@/store/useIslaStore";
import { Button, GlassCard, Badge } from "@/components/ui";

// ===== Stripe Setup =====
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// ===== Timer =====
const HOLD_DURATION = 10 * 60 * 1000;

function formatTimeLeft(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ===== Validation =====
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Stripe Payment Form =====
function StripePaymentForm({
  onSuccess,
  processing,
  setProcessing,
  disabled,
}: {
  onSuccess: (paymentIntentId: string) => void;
  processing: boolean;
  setProcessing: (v: boolean) => void;
  disabled: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const cart = useIslaStore((s) => s.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    if (!stripe || !elements || disabled) return;
    setError(null);
    setProcessing(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    }
  };

  return (
    <div className="space-y-4">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      {error && (
        <p className="text-[12px] text-status-sold-out">{error}</p>
      )}

      {/* Desktop CTA inside Stripe form */}
      <div className="hidden lg:block pt-2">
        <Button
          size="lg"
          className="w-full"
          disabled={disabled || processing || !stripe}
          onClick={handleSubmit}
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            `Complete Purchase — €${total.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
}

// ===== Main Page =====
export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    clearCart,
  } = useIslaStore();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // UI state
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState(Date.now());
  const [stripeReady, setStripeReady] = useState(false);

  // Timer
  useEffect(() => {
    if (cart.length === 0) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [cart.length]);

  // Close cart drawer if open
  useEffect(() => {
    if (isCartOpen) setCartOpen(false);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const oldestItem = cart.length > 0 ? cart.reduce((oldest, item) => (item.addedAt < oldest.addedAt ? item : oldest)) : null;
  const timeLeft = oldestItem ? Math.max(0, HOLD_DURATION - (now - oldestItem.addedAt)) : 0;
  const timerExpired = oldestItem ? timeLeft <= 0 : false;

  const detailsValid = name.trim().length >= 2 && validateEmail(email) && termsAccepted;

  // Create PaymentIntent when details are valid
  const createPaymentIntent = useCallback(async () => {
    if (!detailsValid || cart.length === 0 || clientSecret) return;

    try {
      setPaymentError(null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            eventName: item.eventName,
            clubName: item.clubName,
            date: item.date,
            tierName: item.tierName,
            tierId: item.tierId,
            price: item.price,
            quantity: item.quantity,
          })),
          customerEmail: email,
          customerName: name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment");

      setClientSecret(data.clientSecret);
      setStripeReady(true);
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : "Payment setup failed");
    }
  }, [detailsValid, cart, clientSecret, email, name]);

  // Inline validation
  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let error = "";
    if (field === "name" && value.trim().length < 2) error = "Enter your full name";
    if (field === "email" && !validateEmail(value)) error = "Enter a valid email";
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    const orderId = `ISLA-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;

    const orderData = {
      id: orderId,
      paymentIntentId,
      items: cart.map((item) => ({
        eventName: item.eventName,
        clubName: item.clubName,
        date: item.date,
        tierName: item.tierName,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      customerName: name,
      customerEmail: email,
      paidAt: Date.now(),
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("isla-last-order", JSON.stringify(orderData));
    }

    clearCart();
    setProcessing(false);
    router.push(`/confirmation?order=${orderId}`);
  };

  // Empty cart
  if (cart.length === 0 && !processing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-md">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted mx-auto mb-4">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="font-display text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-text-muted mb-6">Add some tickets to get started.</p>
          <Link href="/events">
            <Button>Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-40 md:pb-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/events" className="text-sm text-text-muted hover:text-text-secondary transition-colors mb-4 inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to events
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-4">Checkout</h1>
          <p className="text-text-secondary mt-1">Guest checkout — no account needed.</p>
        </motion.div>

        {/* Timer */}
        <AnimatePresence>
          {!timerExpired && cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-amber/5 border border-accent-amber/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-xs text-accent-amber">
                  Tickets held for <span className="font-mono font-semibold">{formatTimeLeft(timeLeft)}</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {timerExpired && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-status-sold-out/5 border border-status-sold-out/20">
            <p className="text-xs text-status-sold-out">Reservation expired — please return to events and re-add tickets.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ===== LEFT: Forms ===== */}
          <div className="lg:col-span-3 space-y-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard elevated hover={false}>
                <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 py-3 border-b border-glass-border last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">{item.eventName}</p>
                        <p className="text-xs text-text-muted mt-0.5">
                          {item.clubName} &middot;{" "}
                          {new Date(item.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge>{item.tierName}</Badge>
                          <span className="text-xs text-text-muted">&times; {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-mono font-semibold text-sm">&euro;{(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] text-text-muted hover:text-status-sold-out transition-colors mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Your Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard elevated hover={false}>
                <h2 className="font-display text-lg font-semibold mb-1">Your Details</h2>
                <p className="text-xs text-text-muted mb-6">Tickets will be sent to your email.</p>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs text-text-secondary font-medium mb-1.5">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setClientSecret(null); }}
                      onBlur={() => handleBlur("name", name)}
                      placeholder="Your full name"
                      className={`w-full h-12 px-4 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 transition-all ${
                        touched.name && errors.name ? "border-status-sold-out/50" : "border-glass-border focus:border-accent-pink/40"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-[11px] text-status-sold-out mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs text-text-secondary font-medium mb-1.5">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setClientSecret(null); }}
                      onBlur={() => handleBlur("email", email)}
                      placeholder="you@email.com"
                      className={`w-full h-12 px-4 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 transition-all ${
                        touched.email && errors.email ? "border-status-sold-out/50" : "border-glass-border focus:border-accent-pink/40"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-[11px] text-status-sold-out mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label htmlFor="phone" className="block text-xs text-text-secondary font-medium mb-1.5">Phone <span className="text-text-muted">(optional)</span></label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full h-12 px-4 rounded-xl bg-bg-card border border-glass-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-pink/30 focus:border-accent-pink/40 transition-all"
                    />
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        termsAccepted ? "bg-accent-pink border-accent-pink" : "border-text-muted group-hover:border-text-secondary"
                      }`}>
                        {termsAccepted && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary leading-relaxed">
                      I accept the <span className="text-text-primary underline underline-offset-2">Terms of Service</span> and <span className="text-text-primary underline underline-offset-2">Refund Policy</span>. Tickets are non-transferable and subject to venue rules.
                    </span>
                  </label>
                </div>
              </GlassCard>
            </motion.div>

            {/* Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard elevated hover={false}>
                <h2 className="font-display text-lg font-semibold mb-6">Payment</h2>

                {!stripePromise ? (
                  // No Stripe key configured — show setup message
                  <div className="rounded-xl border border-accent-amber/20 bg-accent-amber/5 p-4">
                    <div className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="1.5" className="shrink-0 mt-0.5">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-accent-amber mb-1">Stripe not configured</p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Add your Stripe keys to <code className="font-mono text-text-primary bg-bg-card px-1 py-0.5 rounded">.env.local</code> to enable payments:
                        </p>
                        <pre className="mt-2 text-[11px] font-mono text-text-muted bg-bg-card rounded-lg p-3 overflow-x-auto">
{`STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`}
                        </pre>
                        <p className="text-[11px] text-text-muted mt-2">
                          Get keys at <span className="text-text-secondary">dashboard.stripe.com/apikeys</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : !detailsValid ? (
                  // Details not filled yet
                  <div className="text-center py-8">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted mx-auto mb-3">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <p className="text-sm text-text-muted">Fill in your details above to continue to payment.</p>
                  </div>
                ) : !clientSecret ? (
                  // Ready to init Stripe
                  <div className="text-center py-6">
                    <Button onClick={createPaymentIntent} disabled={!detailsValid}>
                      Continue to Payment
                    </Button>
                    {paymentError && (
                      <p className="text-[12px] text-status-sold-out mt-3">{paymentError}</p>
                    )}
                  </div>
                ) : (
                  // Stripe Elements loaded
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#ee0979",
                          colorBackground: "#0f0f14",
                          colorText: "#e8e6f0",
                          colorDanger: "#FF3B5C",
                          fontFamily: "Inter, system-ui, sans-serif",
                          borderRadius: "12px",
                          spacingUnit: "4px",
                        },
                        rules: {
                          ".Input": {
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "none",
                            backgroundColor: "#16161e",
                          },
                          ".Input:focus": {
                            border: "1px solid rgba(238,9,121,0.4)",
                            boxShadow: "0 0 0 2px rgba(238,9,121,0.15)",
                          },
                          ".Tab": {
                            border: "1px solid rgba(255,255,255,0.08)",
                            backgroundColor: "#16161e",
                          },
                          ".Tab--selected": {
                            border: "1px solid rgba(238,9,121,0.4)",
                            backgroundColor: "rgba(238,9,121,0.05)",
                          },
                          ".Label": {
                            fontSize: "12px",
                            fontWeight: "500",
                          },
                        },
                      },
                    }}
                  >
                    <StripePaymentForm
                      onSuccess={handlePaymentSuccess}
                      processing={processing}
                      setProcessing={setProcessing}
                      disabled={timerExpired}
                    />
                  </Elements>
                )}

                <div className="flex items-center justify-center gap-4 mt-6 text-text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  <span className="text-[11px]">Secured with 256-bit SSL encryption</span>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* ===== RIGHT: Price Breakdown (Sticky) ===== */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard elevated hover={false}>
                  <h3 className="font-display text-base font-semibold mb-4">Price Breakdown</h3>

                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-text-muted truncate mr-2">
                          {item.quantity}x {item.tierName}
                        </span>
                        <span className="font-mono shrink-0">&euro;{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm pb-3 border-b border-glass-border">
                    <span className="text-text-muted">Subtotal ({itemCount} tickets)</span>
                    <span className="font-mono">&euro;{total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm py-3 border-b border-glass-border">
                    <span className="text-text-muted">Service fee</span>
                    <span className="font-mono text-status-available">&euro;0.00</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold pt-3">
                    <span>Total</span>
                    <span className="font-mono">&euro;{total.toFixed(2)}</span>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE STICKY CTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-elevated safe-area-bottom border-t border-glass-border">
        <div className="px-4 py-3 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">{itemCount} tickets</span>
            <span className="font-display font-semibold font-mono">&euro;{total.toFixed(2)}</span>
          </div>
          {!stripeReady ? (
            <Button
              size="lg"
              className="w-full"
              disabled={!detailsValid || !stripePromise}
              onClick={createPaymentIntent}
            >
              Continue to Payment
            </Button>
          ) : (
            <p className="text-xs text-text-muted text-center py-2">
              Complete payment in the form above
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
