"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIslaStore } from "@/store/useIslaStore";

const typeStyles = {
  info: "border-accent-blue/30 bg-accent-blue/5",
  warning: "border-accent-amber/30 bg-accent-amber/5",
  success: "border-status-available/30 bg-status-available/5",
};

const typeIcons = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
};

const typeColors = {
  info: "#00D4FF",
  warning: "#FFB800",
  success: "#00E676",
};

export function ToastContainer() {
  const { toasts, removeToast } = useIslaStore();

  return (
    <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2 max-w-[340px] w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto glass-elevated rounded-xl p-3 border ${typeStyles[toast.type]} cursor-pointer`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="flex items-start gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={typeColors[toast.type]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
              >
                <path d={typeIcons[toast.type]} />
              </svg>
              <p className="text-sm text-text-secondary leading-snug">{toast.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
