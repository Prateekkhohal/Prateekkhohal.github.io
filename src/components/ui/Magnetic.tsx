"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useFinePointer } from "@/lib/useFinePointer";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to chase the cursor, in px. */
  strength?: number;
};

/**
 * Pulls its child toward the cursor on approach, then springs back.
 *
 * Inert on touch and under reduced motion. The wrapper never changes layout,
 * so nothing around it shifts while the element moves.
 */
export function Magnetic({ children, className, strength = 12 }: MagneticProps) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.6 });

  function handleMove(event: ReactPointerEvent<HTMLSpanElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set((dx / (rect.width / 2)) * strength);
    y.set((dy / (rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
