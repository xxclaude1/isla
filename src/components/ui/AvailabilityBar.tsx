"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AvailabilityBarProps {
  percentage: number;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

function getStatus(pct: number) {
  if (pct === 100) return { label: "Sold out", color: "var(--status-sold-out)", pulse: false };
  if (pct >= 95) return { label: "Last tickets", color: "var(--status-sold-out)", pulse: true };
  if (pct >= 85) return { label: "Final allocation", color: "var(--status-sold-out)", pulse: true };
  if (pct >= 70) return { label: "High demand", color: "var(--status-low)", pulse: false };
  if (pct >= 50) return { label: "Filling up", color: "var(--status-low)", pulse: false };
  if (pct <= 10) return { label: "Just released", color: "var(--status-available)", pulse: false };
  return { label: "", color: "var(--status-available)", pulse: false };
}

export function AvailabilityBar({
  percentage,
  showLabel = true,
  size = "sm",
  className = "",
}: AvailabilityBarProps) {
  const [mounted, setMounted] = useState(false);
  const status = getStatus(percentage);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Bar */}
      <div
        className={`w-full rounded-full overflow-hidden bg-white/[0.06] ${
          size === "sm" ? "h-1" : "h-1.5"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: mounted ? `${percentage}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full ${status.pulse ? "pulse-glow" : ""}`}
          style={{ background: status.color }}
        />
      </div>

      {/* Label */}
      {showLabel && status.label && (
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] font-medium"
            style={{ color: status.color }}
          >
            {status.label}
          </span>
          <span className="text-[11px] text-text-muted font-mono">
            {percentage}% allocated
          </span>
        </div>
      )}
    </div>
  );
}
