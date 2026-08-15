"use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { CountUp } from "@/components/ui/CountUp";
import { ease, viewportOnce } from "@/lib/motion";
import type { Metric } from "@/data/portfolio";

/**
 * A single figure, given weight: gradient numerals, a glow that reads as a
 * light source behind the digits, and a rule that draws itself in beneath.
 */
export function StatCard({ metric, index }: { metric: Metric; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="group relative min-w-0"
    >
      {/* Light behind the digits. Pure decoration, hidden from assistive tech. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 -top-3 h-16 w-24 rounded-full bg-[color:var(--accent)]/25 blur-2xl transition-opacity duration-500 group-hover:bg-[color:var(--accent)]/40"
      />

      <span className="relative block">
        <CountUp
          {...metric}
          className={clsx(
            "block bg-gradient-to-br from-white via-white to-[color:var(--accent-bright)]",
            "bg-clip-text font-[family-name:var(--font-archivo)] text-4xl font-bold",
            "tabular-nums tracking-tight text-transparent sm:text-5xl"
          )}
        />
      </span>

      {/* Rule draws in from the left as the figure settles. */}
      <motion.span
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease, delay: index * 0.08 + 0.15 }}
        className="mt-3 block h-px origin-left bg-gradient-to-r from-[color:var(--accent)] to-transparent"
      />

      <span className="mt-3 block text-[13px] leading-snug text-[color:var(--dim)]">
        {metric.label}
      </span>
    </motion.div>
  );
}
