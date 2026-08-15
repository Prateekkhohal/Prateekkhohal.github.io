"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FleetLattice } from "@/components/visuals/FleetLattice";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";
import { StatCard } from "@/components/ui/StatCard";
import { metrics, personal } from "@/data/portfolio";
import { ease } from "@/lib/motion";

const PORTRAIT_KEY = "pk:hide-portrait";

export function HeroSection() {
  const reduced = useReducedMotion();
  // Hidden by default. The server renders the hidden state too, so the photo
  // never flashes on screen before the preference is read.
  const [portraitHidden, setPortraitHidden] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PORTRAIT_KEY);
      // Only a deliberate "show" reveals it; no stored choice means hidden.
      setPortraitHidden(stored === null ? true : stored === "1");
    } catch {
      // Storage can be blocked. The portrait simply stays hidden.
    }
  }, []);

  function togglePortrait() {
    setPortraitHidden((hidden) => {
      const next = !hidden;
      try {
        window.localStorage.setItem(PORTRAIT_KEY, next ? "1" : "0");
      } catch {
        // Preference is not persisted, but the toggle still works this visit.
      }
      return next;
    });
  }

  // Short entrance. Nothing here gates reading for more than ~350ms.
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease, delay },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pb-24"
    >
      {/* Faded out at the foot so it does not run through the figures. */}
      <div className="fade-bottom-soft pointer-events-none absolute inset-0">
        <FleetLattice className="h-full w-full opacity-[0.32] md:opacity-70" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_10%_40%,var(--base)_30%,transparent_78%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          <div>
            <motion.div
              {...rise(0.05)}
              className="mono mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[color:var(--dim)]"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent-bright)] opacity-70" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-bright)]" />
                </span>
                Open to new roles
              </span>
              <span>{personal.location}</span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="font-[family-name:var(--font-archivo)] text-[3.1rem] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[5.2rem]"
            >
              {personal.name}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className="mt-5 text-balance font-[family-name:var(--font-archivo)] text-lg font-semibold tracking-tight text-[color:var(--accent-bright)] sm:text-2xl"
            >
              {personal.title}
            </motion.p>

            <motion.p
              {...rise(0.24)}
              className="measure mt-5 text-pretty text-base leading-relaxed text-[color:var(--muted)] sm:text-lg"
            >
              {personal.bio}
            </motion.p>

            <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.9)] transition-colors duration-200 hover:bg-[color:var(--accent-bright)]"
                >
                  See the work
                  <ArrowDown
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors duration-200 hover:border-white/35 hover:bg-white/5"
                >
                  Résumé
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </Magnetic>

              <div className="flex items-center gap-1 pl-1">
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  <FaLinkedin className="h-[18px] w-[18px]" aria-hidden />
                </a>
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  <FaGithub className="h-[18px] w-[18px]" aria-hidden />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Portrait, in full colour, set on its own plane so it tilts with
              the cursor. */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="order-first flex flex-col items-center gap-2 lg:order-none lg:items-end"
          >
            <AnimatePresence initial={false}>
              {!portraitHidden && (
                <motion.div
                  key="portrait"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease }}
                  className="w-28 sm:w-36 lg:w-44"
                >
                  <TiltCard max={10} glare={false} className="rounded-2xl">
                    <div className="preserve-3d relative">
                      {/* Light behind the figure, standing in for the backdrop
                          that was keyed out of the photograph. */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-[16%] h-[64%] w-[88%] -translate-x-1/2 rounded-full bg-[color:var(--accent)]/30 blur-[42px]"
                      />
                      <div className="relative aspect-[389/493]">
                        <Image
                          src="/Assets/IMAGES/Profile-cutout.webp"
                          alt={`${personal.name}, ${personal.title}`}
                          fill
                          sizes="(max-width: 1024px) 144px, 176px"
                          className="fade-bottom object-contain object-bottom saturate-[1.06] drop-shadow-[0_18px_38px_rgba(0,0,0,0.75)]"
                        />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={togglePortrait}
              aria-pressed={portraitHidden}
              className="mono inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-3 text-[10px] text-[color:var(--dim)] transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {portraitHidden ? (
                <Eye className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <EyeOff className="h-3.5 w-3.5" aria-hidden />
              )}
              {portraitHidden ? "Show photo" : "Hide photo"}
            </button>
          </motion.div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-white/10 pt-10 sm:mt-16 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric, index) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <StatCard metric={metric} index={index} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
