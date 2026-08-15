"use client";

import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  index: string;
  title: string;
  lede?: string;
};

/**
 * Section masthead. The index numeral sits on a deeper plane behind the title,
 * which is where the page gets its sense of layering without any motion.
 */
export function SectionHeader({ index, title, lede }: SectionHeaderProps) {
  return (
    <header className="relative mb-12 sm:mb-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 select-none font-[family-name:var(--font-archivo)] text-[5.5rem] font-bold leading-none text-white/[0.035] sm:-top-10 sm:text-[9rem]"
      >
        {index}
      </span>

      <Reveal className="relative">
        <div className="mono mb-4 flex items-center gap-3 text-[11px] text-[color:var(--dim)]">
          <span className="h-px w-8 bg-white/25" />
          {index}
        </div>
        <h2 className="text-balance font-[family-name:var(--font-archivo)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {lede && (
          <p className="measure mt-4 text-pretty text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
            {lede}
          </p>
        )}
      </Reveal>
    </header>
  );
}
