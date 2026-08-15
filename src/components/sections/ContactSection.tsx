"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { personal } from "@/data/portfolio";

export function ContactSection() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          title="Get in touch"
          lede="The fastest route is email. I read everything that arrives there."
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Direct routes first. A recruiter on a phone should not need a form. */}
          <div className="space-y-4">
            <Reveal>
              <Magnetic strength={6}>
                <a
                  href={`mailto:${personal.email}`}
                  className="panel group flex cursor-pointer items-center justify-between gap-4 rounded-2xl p-6 transition-colors duration-300 hover:border-white/25 sm:p-7"
                >
                  <span className="min-w-0">
                    <span className="mono block text-[10px] text-[color:var(--dim)]">Email</span>
                    <span className="mt-2 block truncate font-[family-name:var(--font-archivo)] text-lg font-bold tracking-tight sm:text-xl">
                      {personal.email}
                    </span>
                  </span>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-[color:var(--accent)] group-hover:bg-[color:var(--accent)]">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              </Magnetic>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="panel group flex h-full cursor-pointer items-center justify-between gap-3 rounded-2xl p-6 transition-colors duration-300 hover:border-white/25"
                >
                  <span className="flex items-center gap-3">
                    <FaLinkedin className="h-5 w-5 text-[color:var(--muted)]" aria-hidden />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[color:var(--dim)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden
                  />
                </a>
              </Reveal>

              <Reveal delay={0.1}>
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="panel group flex h-full cursor-pointer items-center justify-between gap-3 rounded-2xl p-6 transition-colors duration-300 hover:border-white/25"
                >
                  <span className="flex items-center gap-3">
                    <FaGithub className="h-5 w-5 text-[color:var(--muted)]" aria-hidden />
                    <span className="text-sm font-medium">GitHub</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[color:var(--dim)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden
                  />
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 px-6 py-5 text-sm text-[color:var(--muted)]">
                <MapPin className="h-4 w-4 shrink-0 text-[color:var(--dim)]" aria-hidden />
                {personal.location}
              </div>
            </Reveal>
          </div>

          {/* Form kept from the previous site. Same endpoint, new surface. */}
          <Reveal delay={0.1}>
            <form
              action="https://getform.io/f/149c099d-f036-4fb6-a487-e67f726ce64f"
              method="POST"
              onSubmit={() => setSending(true)}
              className="panel h-full rounded-2xl p-6 sm:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="min-h-[48px] w-full rounded-xl border border-white/10 bg-black/40 px-4 text-[16px] text-white placeholder-[color:var(--placeholder)] transition-colors duration-200 focus:border-[color:var(--accent)] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="min-h-[48px] w-full rounded-xl border border-white/10 bg-black/40 px-4 text-[16px] text-white placeholder-[color:var(--placeholder)] transition-colors duration-200 focus:border-[color:var(--accent)] focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-[16px] leading-relaxed text-white placeholder-[color:var(--placeholder)] transition-colors duration-200 focus:border-[color:var(--accent)] focus:outline-none"
                    placeholder="What is the role, and what would I be building?"
                  />
                </div>
                <input type="hidden" name="_gotcha" style={{ display: "none" }} />
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[color:var(--accent-bright)] disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? "Sending" : "Send message"}
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <footer className="mt-20 border-t border-white/10 pt-8 sm:mt-28">
          <div className="flex flex-col gap-3 text-sm text-[color:var(--dim)] sm:flex-row sm:items-center sm:justify-between">
            <p>
              {personal.name}, {personal.title}
            </p>
            <p className="mono text-[10px]">
              &copy; {new Date().getFullYear()} &middot; Built with Next.js
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
