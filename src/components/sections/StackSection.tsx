"use client";

import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { education, skills } from "@/data/portfolio";

export function StackSection() {
  return (
    <section id="stack" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          title="Stack"
          lede="What I have actually shipped with. Nothing here is aspirational."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.04}>
              <div className="h-full bg-[color:var(--base)] p-6 transition-colors duration-300 hover:bg-[color:var(--surface)]">
                <h3 className="mono text-[11px] text-[color:var(--accent-bright)]">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[12px] text-[color:var(--muted)] transition-colors duration-200 hover:border-white/25 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="panel mt-4 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[color:var(--accent-bright)]">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-archivo)] text-base font-bold tracking-tight">
                  {education.degree}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{education.institution}</p>
                <p className="mt-2 text-sm text-[color:var(--accent-bright)]">{education.note}</p>
              </div>
            </div>
            <p className="mono shrink-0 text-[11px] text-[color:var(--dim)]">{education.dates}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
