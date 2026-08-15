"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { personal, sections } from "@/data/portfolio";
import { ease } from "@/lib/motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section the reader is in, for the nav indicator.
  useEffect(() => {
    // Kept outside the callback because observers only report what changed.
    // Without it the indicator stays lit on the last section once the reader
    // scrolls back up into the hero, which belongs to no nav item.
    const inView = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        const currentId = sections.find((section) => inView.has(section.id))?.id ?? "";
        setActive(currentId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={reduced ? false : { y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={clsx(
            "border-b transition-colors duration-500",
            scrolled
              ? "border-white/10 bg-[color:var(--base)]/80 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
            <a
              href="#top"
              className="group flex items-baseline gap-2.5 text-sm font-semibold tracking-tight"
            >
              <span className="font-[family-name:var(--font-archivo)] text-base">
                {personal.name}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[color:var(--accent)] sm:block" />
              <span className="mono hidden text-[10px] font-normal text-[color:var(--dim)] sm:block">
                Backend &amp; AI Systems
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={clsx(
                    "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    active === section.id
                      ? "text-white"
                      : "text-[color:var(--muted)] hover:text-white"
                  )}
                >
                  {active === section.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {section.label}
                </a>
              ))}
              <a
                href={personal.resume}
                target="_blank"
                rel="noreferrer"
                className="ml-2 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-white/30 hover:bg-white/5"
              >
                Résumé
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Reading progress. Scroll-linked, and harmless when motion is reduced. */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-bright)]"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--surface)]/95 p-2 shadow-[var(--depth-3)] backdrop-blur-xl md:hidden"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] cursor-pointer items-center justify-between rounded-xl px-4 text-base text-white transition-colors hover:bg-white/5"
              >
                {section.label}
                <span className="mono text-[10px] text-[color:var(--dim)]">
                  {String(sections.indexOf(section) + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
            <a
              href={personal.resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 flex min-h-[48px] cursor-pointer items-center justify-between rounded-xl bg-[color:var(--accent)] px-4 text-base font-medium text-white"
            >
              Résumé
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
