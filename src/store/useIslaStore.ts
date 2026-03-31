import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================
// Types
// ============================================

export interface CartItem {
  id: string; // unique key: `${eventSlug}-${tierId}`
  eventSlug: string;
  eventName: string;
  clubName: string;
  date: string;
  tierName: string;
  tierId: string;
  price: number;
  quantity: number;
  addedAt: number; // timestamp
}

export interface UrgencyState {
  lastSeenPercentage: number;
  lastSeenTimestamp: number;
  tiersSoldOut: string[];
}

// ============================================
// Store
// ============================================

interface IslaStore {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "id" | "addedAt">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;

  // Urgency
  urgencyStates: Record<string, UrgencyState>;
  updateUrgency: (eventSlug: string, percentage: number, soldOutTiers: string[]) => void;
  getUrgencyDelta: (eventSlug: string, currentPercentage: number) => number | null;
  getNewlySoldOutTiers: (eventSlug: string, currentSoldOut: string[]) => string[];

  // Recently Viewed
  recentlyViewed: string[]; // event slugs
  addRecentlyViewed: (slug: string) => void;

  // Viewer counts (simulated)
  viewerCounts: Record<string, number>;
  setViewerCount: (eventSlug: string, count: number) => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  duration?: number;
}

export const useIslaStore = create<IslaStore>()(
  persist(
    (set, get) => ({
      // ---- Cart ----
      cart: [],
      isCartOpen: false,

      addToCart: (item) => {
        const id = `${item.eventSlug}-${item.tierId}`;
        set((state) => {
          const existing = state.cart.find((c) => c.id === id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === id
                  ? { ...c, quantity: c.quantity + item.quantity }
                  : c
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, id, addedAt: Date.now() }],
            isCartOpen: true,
          };
        });

        get().addToast({
          message: `${item.quantity}x ${item.tierName} added for ${item.eventName}`,
          type: "success",
          duration: 3000,
        });
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((c) => c.id !== id)
              : state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
        })),

      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (open) => set({ isCartOpen: open }),

      // ---- Urgency ----
      urgencyStates: {},

      updateUrgency: (eventSlug, percentage, soldOutTiers) =>
        set((state) => ({
          urgencyStates: {
            ...state.urgencyStates,
            [eventSlug]: {
              lastSeenPercentage: percentage,
              lastSeenTimestamp: Date.now(),
              tiersSoldOut: soldOutTiers,
            },
          },
        })),

      getUrgencyDelta: (eventSlug, currentPercentage) => {
        const prev = get().urgencyStates[eventSlug];
        if (!prev) return null;
        return currentPercentage - prev.lastSeenPercentage;
      },

      getNewlySoldOutTiers: (eventSlug, currentSoldOut) => {
        const prev = get().urgencyStates[eventSlug];
        if (!prev) return [];
        return currentSoldOut.filter((t) => !prev.tiersSoldOut.includes(t));
      },

      // ---- Recently Viewed ----
      recentlyViewed: [],

      addRecentlyViewed: (slug) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((s) => s !== slug);
          return { recentlyViewed: [slug, ...filtered].slice(0, 8) };
        }),

      // ---- Viewer Counts ----
      viewerCounts: {},
      setViewerCount: (eventSlug, count) =>
        set((state) => ({
          viewerCounts: { ...state.viewerCounts, [eventSlug]: count },
        })),

      // ---- Toasts ----
      toasts: [],

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));

        if (toast.duration) {
          setTimeout(() => {
            get().removeToast(id);
          }, toast.duration);
        }
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "isla-store",
      partialize: (state) => ({
        cart: state.cart,
        urgencyStates: state.urgencyStates,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
