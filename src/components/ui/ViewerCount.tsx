"use client";

import { useEffect, useRef } from "react";
import { useIslaStore } from "@/store/useIslaStore";

interface ViewerCountProps {
  eventSlug: string;
  availability: number;
  className?: string;
}

export function ViewerCount({ eventSlug, availability, className = "" }: ViewerCountProps) {
  const { viewerCounts, setViewerCount } = useIslaStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Only show when >50% sold
  const shouldShow = availability > 50;

  useEffect(() => {
    if (!shouldShow) return;

    // Initialize with realistic count based on availability
    const baseCount = Math.floor(50 + availability * 2.5);
    setViewerCount(eventSlug, baseCount);

    // Fluctuate naturally every 15-30 seconds
    intervalRef.current = setInterval(() => {
      const current = useIslaStore.getState().viewerCounts[eventSlug] || baseCount;
      const delta = Math.floor(Math.random() * 15) - 5; // -5 to +10
      setViewerCount(eventSlug, Math.max(30, current + delta));
    }, 15000 + Math.random() * 15000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [eventSlug, shouldShow, setViewerCount]);

  if (!shouldShow) return null;

  const count = viewerCounts[eventSlug];
  if (!count) return null;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-amber opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-amber" />
      </span>
      <span className="text-xs text-text-muted">
        <span className="font-mono text-text-secondary">{count}</span> people viewing
      </span>
    </div>
  );
}
