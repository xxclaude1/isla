"use client";

import { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  hover?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export function GlassCard({
  children,
  className = "",
  elevated = false,
  hover = true,
  onClick,
  style,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      style={style}
      className={`
        rounded-2xl p-6
        ${elevated ? "glass-elevated" : "glass"}
        ${hover ? "cursor-pointer transition-all duration-300 hover:border-glass-border-hover hover:bg-glass-bg-hover hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
