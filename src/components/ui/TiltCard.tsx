"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import clsx from "clsx";
import { useFinePointer } from "@/lib/useFinePointer";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the far edge of the card. */
  max?: number;
  /** Adds a light source that tracks the cursor across the surface. */
  glare?: boolean;
};

/**
 * A surface that responds to the cursor as a physical plane.
 *
 * Disabled entirely for touch and for reduced motion, where it renders as a
 * plain static panel. Rotation is deliberately shallow: enough to read as
 * depth, not enough to make text hard to read mid-tilt.
 */
export function TiltCard({ children, className, max = 7, glare = true }: TiltCardProps) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const glareX = useSpring(useMotionValue(50), { stiffness: 180, damping: 26 });
  const glareY = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 });
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 180, damping: 30 });

  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(59,130,246,0.16), transparent 60%)`;

  function handleMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * max * 2);
    rotateX.set((0.5 - py) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  if (!enabled) {
    return <div className={clsx("relative", className)}>{children}</div>;
  }

  return (
    <div className="scene">
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className={clsx("preserve-3d relative", className)}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            style={{ background: glareBackground, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
          />
        )}
      </motion.div>
    </div>
  );
}
