"use client";

import { useEffect, useState } from "react";

/**
 * True only for devices with a precise pointer (mouse/trackpad).
 *
 * Every cursor-driven effect on the site is gated on this, so touch users get
 * a plain, working surface instead of a hover state that latches on tap.
 * Starts false so the server render and the first client paint agree.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
