"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Metric } from "@/data/portfolio";

/** useLayoutEffect warns during SSR, so fall back on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type CountUpProps = Pick<Metric, "value" | "to" | "prefix" | "suffix" | "decimals"> & {
  className?: string;
  duration?: number;
};

/**
 * Counts a figure up when it scrolls into view.
 *
 * The canonical `value` string is what renders on the server, with scripting
 * off, and under reduced motion, so the number a reader sees is never wrong or
 * missing because an animation did not run. The animated path only replaces it
 * after mount, and always lands exactly on `value`.
 */
export function CountUp({
  value,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.1,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const animatable = to !== undefined && !reduced;

  const [display, setDisplay] = useState(value);

  // Drop to the start of the count before the browser paints, so the final
  // figure never flashes on screen first.
  useIsomorphicLayoutEffect(() => {
    if (!animatable) return;
    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);
  }, [animatable, prefix, suffix, decimals]);

  useEffect(() => {
    if (!animatable || !inView || to === undefined) return;

    let frame = 0;
    const start = performance.now();
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / totalMs);
      // Same decel curve as the rest of the site.
      const eased = 1 - Math.pow(1 - progress, 4);

      if (progress >= 1) {
        setDisplay(value);
        return;
      }
      setDisplay(`${prefix}${(to * eased).toFixed(decimals)}${suffix}`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animatable, inView, to, value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
