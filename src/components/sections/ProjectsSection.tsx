"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Smartphone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { CountUp } from "@/components/ui/CountUp";
import { ProjectGlyph } from "@/components/visuals/ProjectGlyph";
import { featuredProjects, smallProjects, type FeaturedProject } from "@/data/portfolio";
import { ease } from "@/lib/motion";

/**
 * The pipeline behind Cortexa, so the card has something real to open.
 *
 * The ordering carries the argument: four of the five steps are Cortexa's own
 * layer, and the model is the last and most replaceable one.
 */
const cortexaFlow = [
  {
    step: "Ingest",
    body: "Documents land in a Redis and Celery queue, processed inside the client's own deployment.",
  },
  {
    step: "Index",
    body: "Chunks are embedded into PostgreSQL with pgvector, scoped and keyed per client.",
  },
  {
    step: "Retrieve",
    body: "Cortexa's own retrieval and ranking assembles the context. This layer is the product.",
  },
  {
    step: "Encode",
    body: "Values are substituted against the client's own salt, so what goes out carries the question without the identifiers.",
  },
  {
    step: "Answer",
    body: "Any provider generates the reply. Groq, Claude, OpenAI or Ollama, swapped without touching anything above it.",
  },
];

function FeaturedCard({ project, index }: { project: FeaturedProject; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const flipped = index % 2 === 1;
  const isCortexa = project.id === "cortexa";

  return (
    <Reveal tilt distance={28}>
      <TiltCard max={4} className="rounded-3xl">
        <article className="panel preserve-3d overflow-hidden rounded-3xl">
          <div
            className={clsx(
              "grid gap-0 lg:grid-cols-2",
              flipped && "lg:[&>*:first-child]:order-2"
            )}
          >
            {/* Generated visual */}
            <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[color:var(--void)] sm:h-64 lg:h-auto lg:min-h-[22rem] lg:border-b-0 lg:border-r">
              <ProjectGlyph kind={project.glyph} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_50%,transparent_30%,var(--void)_100%)]"
              />
            </div>

            {/* Copy */}
            <div className="layer-1 p-6 sm:p-8 lg:p-10">
              <div className="mono mb-4 flex flex-wrap items-center gap-2 text-[10px]">
                <span
                  className={clsx(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                    project.live
                      ? "border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 text-[color:var(--accent-bright)]"
                      : "border-white/15 bg-white/[0.04] text-[color:var(--muted)]"
                  )}
                >
                  {project.live && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-bright)]" />
                  )}
                  {project.status}
                </span>
                <span className="text-[color:var(--dim)]">{project.kicker}</span>
              </div>

              <h3 className="font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-tight sm:text-3xl">
                {project.name}
              </h3>

              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[color:var(--muted)] sm:text-base">
                {project.summary}
              </p>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[color:var(--dim)]">
                {project.detail}
              </p>

              {project.stats && (
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd>
                        <CountUp
                          {...stat}
                          className="block bg-gradient-to-br from-white to-[color:var(--accent-bright)] bg-clip-text font-[family-name:var(--font-archivo)] text-xl font-bold tabular-nums text-transparent sm:text-2xl"
                        />
                      </dd>
                      <dt className="mono mt-1 text-[10px] text-[color:var(--dim)]">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              )}

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-[color:var(--muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[color:var(--accent-bright)] hover:text-white sm:w-auto sm:justify-start"
                  >
                    <span className="inline-flex items-center gap-2">
                      {project.id === "hue-and-seek" && (
                        <Smartphone className="h-4 w-4" aria-hidden />
                      )}
                      Open {project.name}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-controls={`${project.id}-architecture`}
                    className="group inline-flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5 sm:w-auto sm:justify-start"
                  >
                    {open ? "Hide the architecture" : "Open the architecture"}
                    <ChevronDown
                      className={clsx(
                        "h-4 w-4 transition-transform duration-300",
                        open && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                )}

                {project.hrefLabel && (
                  <p className="mono mt-3 text-[10px] text-[color:var(--dim)]">
                    {project.hrefLabel}
                  </p>
                )}
                {isCortexa && !open && (
                  <p className="mono mt-3 text-[10px] text-[color:var(--dim)]">
                    No live link yet, it is still in development
                  </p>
                )}
              </div>

              {isCortexa && (
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`${project.id}-architecture`}
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <ol className="mt-6 space-y-3 border-t border-white/10 pt-6">
                        {cortexaFlow.map((item, i) => (
                          <li key={item.step} className="flex gap-4">
                            <span className="mono mt-0.5 w-6 shrink-0 text-[10px] text-[color:var(--accent-bright)]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                              <span className="text-sm font-semibold text-white">{item.step}</span>
                              <span className="mt-1 block text-[14px] leading-relaxed text-[color:var(--muted)]">
                                {item.body}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          title="Projects"
          lede="Three that carry the work, and a set of smaller repos underneath them. Every one of them opens."
        />

        <div className="space-y-6 sm:space-y-8">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Tier two: kept because the range is real, sized so it does not
            compete with the work above it. */}
        <div className="mt-20 sm:mt-28">
          <Reveal>
            <div className="rule mb-8" />
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-[family-name:var(--font-archivo)] text-lg font-bold tracking-tight">
                Earlier builds
              </h3>
              <p className="text-sm text-[color:var(--dim)]">
                Unity and iOS repositories, all public on GitHub.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {smallProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.04}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full cursor-pointer gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.05]"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[color:var(--void)]">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold leading-tight text-white">
                        {project.name}
                      </h4>
                      <FaGithub
                        className="h-3.5 w-3.5 shrink-0 text-[color:var(--dim)] transition-colors group-hover:text-white"
                        aria-hidden
                      />
                    </div>
                    <p className="mono mt-1 text-[10px] text-[color:var(--dim)]">
                      {project.category}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-snug text-[color:var(--muted)]">
                      {project.description}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
