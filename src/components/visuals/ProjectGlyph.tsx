"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FeaturedProject } from "@/data/portfolio";

/**
 * Generated artwork for the featured projects. Each one draws the mechanism it
 * describes rather than decorating the card, and all of it is inline SVG so the
 * static export carries no extra image requests.
 */
export function ProjectGlyph({ kind }: { kind: FeaturedProject["glyph"] }) {
  const reduced = useReducedMotion();

  const common = {
    viewBox: "0 0 320 220",
    className: "h-full w-full",
    "aria-hidden": true as const,
    preserveAspectRatio: "xMidYMid slice",
  };

  if (kind === "cortexa") {
    // Three tenants, three isolated embedding clusters, one query that is
    // answered from a single tenant. That isolation is the product.
    const tenants = [
      { cx: 70, cy: 70, seed: 0 },
      { cx: 165, cy: 140, seed: 1 },
      { cx: 258, cy: 66, seed: 2 },
    ];
    return (
      <svg {...common}>
        <defs>
          <radialGradient id="cx-core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
        </defs>
        {tenants.map((tenant, ti) => (
          <g key={ti}>
            <circle
              cx={tenant.cx}
              cy={tenant.cy}
              r={44}
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeDasharray="3 5"
            />
            {ti === 1 && <circle cx={tenant.cx} cy={tenant.cy} r={52} fill="url(#cx-core)" />}
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2 + tenant.seed;
              const radius = 12 + ((i * 7 + tenant.seed * 13) % 28);
              const x = tenant.cx + Math.cos(angle) * radius;
              const y = tenant.cy + Math.sin(angle) * radius;
              const active = ti === 1;
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={active ? 2.4 : 1.8}
                  fill={active ? "#93c5fd" : "rgba(228,228,231,0.5)"}
                  initial={false}
                  animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={
                    reduced
                      ? undefined
                      : { duration: 3.2, repeat: Infinity, delay: (i % 7) * 0.24, ease: "easeInOut" }
                  }
                />
              );
            })}
          </g>
        ))}
        <motion.path
          d="M20 196 C 90 196, 120 168, 165 140"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={false}
          animate={reduced ? undefined : { strokeDashoffset: [0, -40] }}
          transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="20" cy="196" r="3.5" fill="#dbeafe" />
      </svg>
    );
  }

  if (kind === "hue") {
    // Background pixels sampled on a grid, resolving into the painted target.
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="hue-sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e4e4e7" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {Array.from({ length: 11 }).map((_, row) =>
          Array.from({ length: 16 }).map((__, col) => {
            const x = col * 20 + 2;
            const y = row * 20 + 2;
            const dist = Math.hypot(col - 8, row - 5.5);
            const inside = dist < 4.4;
            return (
              <motion.rect
                key={`${row}-${col}`}
                x={x}
                y={y}
                width={16}
                height={16}
                rx={2}
                fill={inside ? "url(#hue-sweep)" : "rgba(255,255,255,0.045)"}
                stroke="rgba(255,255,255,0.05)"
                initial={false}
                animate={reduced ? undefined : { opacity: inside ? [0.45, 1, 0.45] : 1 }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 3.6, repeat: Infinity, delay: dist * 0.16, ease: "easeInOut" }
                }
              />
            );
          })
        )}
        <circle cx="163" cy="112" r="46" fill="none" stroke="rgba(147,197,253,0.5)" strokeWidth="1.2" />
        <circle cx="163" cy="112" r="60" fill="none" stroke="rgba(147,197,253,0.18)" strokeWidth="1" />
      </svg>
    );
  }

  // Lens: concentric optics with tracked feature points around them.
  return (
    <svg {...common}>
      {[26, 46, 66, 86].map((r, i) => (
        <motion.circle
          key={r}
          cx="160"
          cy="110"
          r={r}
          fill="none"
          stroke={i === 1 ? "rgba(96,165,250,0.55)" : "rgba(255,255,255,0.09)"}
          strokeWidth={i === 1 ? 1.4 : 1}
          initial={false}
          animate={reduced ? undefined : { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
          transition={
            reduced ? undefined : { duration: 4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }
          }
          style={{ transformOrigin: "160px 110px" }}
        />
      ))}
      {Array.from({ length: 22 }).map((_, i) => {
        const angle = (i / 22) * Math.PI * 2;
        const radius = 96 + (i % 3) * 10;
        return (
          <circle
            key={i}
            cx={160 + Math.cos(angle) * radius}
            cy={110 + Math.sin(angle) * radius * 0.78}
            r={1.7}
            fill="rgba(228,228,231,0.45)"
          />
        );
      })}
      <circle cx="160" cy="110" r="6" fill="#dbeafe" />
    </svg>
  );
}
