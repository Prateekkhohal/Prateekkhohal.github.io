"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { clientWork } from "@/data/portfolio";

export function ClientWorkSection() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // The spine fills as the reader moves through the phases. Scroll-linked
  // rather than time-based, so it never runs ahead of the content.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const scaleY = useTransform(fill, (value) => (reduced ? 1 : value));

  return (
    <section id="clients" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          title="Forward deployed work"
          lede="Plenty of engineers can build a system. The harder job is sitting with a customer, working out what their business actually needs, and shipping it into an environment you do not control. I have done both halves, and I have taken AI into a team that was not using it yet."
        />

        <div ref={trackRef} className="relative">
          {/* Spine. Sits behind the numerals and tracks reading position. */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[15px] top-2 w-px bg-white/10 sm:left-[19px]"
          >
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-[color:var(--accent-bright)] to-[color:var(--accent)]"
            />
          </div>

          <ol className="space-y-10 sm:space-y-14">
            {clientWork.map((phase, index) => (
              <Reveal as="li" key={phase.id} delay={index * 0.05} className="relative pl-12 sm:pl-16">
                <span
                  aria-hidden
                  className="mono absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[color:var(--base)] text-[10px] text-[color:var(--accent-bright)] sm:h-10 sm:w-10 sm:text-[11px]"
                >
                  {phase.step}
                </span>

                <h3 className="text-balance font-[family-name:var(--font-archivo)] text-lg font-bold tracking-tight sm:text-xl">
                  {phase.title}
                </h3>
                <p className="measure mt-3 text-pretty text-[15px] leading-relaxed text-[color:var(--muted)]">
                  {phase.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {phase.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-[color:var(--muted)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
