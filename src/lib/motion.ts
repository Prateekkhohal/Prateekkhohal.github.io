import type { Transition, Variants } from "framer-motion";

/** Long, soft decel curve. Nothing on this site uses linear. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 26,
  mass: 0.8,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

/**
 * Entrance variants.
 *
 * `reduced` collapses every variant to the resting state, so a reduced-motion
 * visitor gets the finished composition immediately rather than a faded one.
 */
export function riseVariants(reduced: boolean, distance = 24): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease },
    },
  };
}

export function staggerVariants(reduced: boolean, stagger = 0.07): Variants {
  if (reduced) return { hidden: {}, show: {} };
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };
}

/** Shared viewport config: fires slightly before the element is fully on screen. */
export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
} as const;
