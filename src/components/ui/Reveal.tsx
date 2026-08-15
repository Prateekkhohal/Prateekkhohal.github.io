"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ease, viewportOnce } from "@/lib/motion";
import clsx from "clsx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px. Kept small so text never appears to fly in. */
  distance?: number;
  delay?: number;
  /** Adds a slight rotation on the X axis so the block settles onto its plane. */
  tilt?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll reveal. Reduced motion renders the child at rest with no transition,
 * and the travel distance is small enough that reading is never gated on it.
 */
export function Reveal({
  children,
  className,
  distance = 24,
  delay = 0,
  tilt = false,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={clsx(tilt && "preserve-3d", className)}
      initial={{ opacity: 0, y: distance, rotateX: tilt ? 8 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </Component>
  );
}
