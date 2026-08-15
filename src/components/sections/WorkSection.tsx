"use client";

import clsx from "clsx";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { experience } from "@/data/portfolio";

function TagRow({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-[color:var(--muted)]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function WorkSection() {
  const [current, ...earlier] = experience;

  return (
    <section id="work" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          title="Work"
          lede="One system, built and shipped by me: a control plane, and the Android agent on the other end of it."
        />

        {/* Current role. Given the most space on the page, deliberately. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="mono text-[11px] text-[color:var(--accent-bright)]">{current.dates}</p>
            <h3 className="mt-3 font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-tight sm:text-3xl">
              {current.company}
            </h3>
            <p className="mt-1.5 text-sm text-[color:var(--muted)]">{current.role}</p>
            <p className="mono mt-1 text-[10px] text-[color:var(--dim)]">{current.location}</p>
            <div className="rule my-6" />
            <p className="text-pretty text-[15px] leading-relaxed text-[color:var(--muted)]">
              {current.lead}
            </p>
          </Reveal>

          <div className="scene grid gap-4 sm:grid-cols-2">
            {current.blocks?.map((block, index) => {
              // The platform and the Android agent are the two halves that
              // carry the positioning, so they get the full width.
              const wide = block.id === "platform" || block.id === "mdm";
              return (
                <Reveal
                  key={block.id}
                  delay={index * 0.04}
                  tilt
                  className={clsx(wide && "sm:col-span-2")}
                >
                  <TiltCard max={5} className="h-full rounded-2xl">
                    <article
                      className={clsx(
                        "panel preserve-3d h-full rounded-2xl p-6 transition-colors duration-300 hover:border-white/20 sm:p-7",
                        wide && "sm:p-8"
                      )}
                    >
                      <div className="layer-1">
                        <h4
                          className={clsx(
                            "font-[family-name:var(--font-archivo)] font-bold tracking-tight",
                            wide ? "text-xl sm:text-2xl" : "text-lg"
                          )}
                        >
                          {block.title}
                        </h4>
                        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[color:var(--muted)]">
                          {block.body}
                        </p>
                        <TagRow tags={block.tags} />
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Earlier roles. Present, complete, and visibly secondary. */}
        <div className="mt-20 sm:mt-28">
          <Reveal>
            <div className="rule mb-10" />
          </Reveal>

          <div className="space-y-12">
            {earlier.map((role, index) => (
              <Reveal key={role.id} delay={index * 0.05}>
                <article className="grid gap-5 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-10">
                  <div>
                    <p className="mono text-[11px] text-[color:var(--dim)]">{role.dates}</p>
                    <h3 className="mt-2 font-[family-name:var(--font-archivo)] text-xl font-bold tracking-tight">
                      {role.company}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{role.role}</p>
                    <p className="mono mt-1 text-[10px] text-[color:var(--dim)]">{role.location}</p>
                  </div>
                  <ul className="space-y-3.5 border-l border-white/10 pl-5 md:pl-7">
                    {role.bullets?.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-pretty text-[15px] leading-relaxed text-[color:var(--muted)]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
