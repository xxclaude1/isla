import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "sunset" | "available" | "low" | "sold-out" | "vip";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-card text-text-secondary border-glass-border",
  sunset: "bg-accent-pink/10 text-accent-pink border-accent-pink/20",
  available: "bg-status-available/10 text-status-available border-status-available/20",
  low: "bg-status-low/10 text-status-low border-status-low/20",
  "sold-out": "bg-status-sold-out/10 text-status-sold-out border-status-sold-out/20",
  vip: "bg-status-vip/10 text-status-vip border-status-vip/20",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-full border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
