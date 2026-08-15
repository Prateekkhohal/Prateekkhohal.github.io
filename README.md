# Prateek Kumar, Portfolio

Source for [prateekkhohal.github.io](https://prateekkhohal.github.io/).

A portfolio for a backend and AI systems engineer. It covers a real-time
device fleet control platform and its Android Device Owner agent, forward
deployed work with clients, and Cortexa, a multi-tenant AI knowledge platform.

## Stack

- Next.js 14, App Router, exported as a static site
- TypeScript
- Tailwind CSS
- Framer Motion

No 3D library and no stock imagery. The hero renders a control plane and its
device lattice on a canvas with hand-rolled perspective projection, and each
featured project draws a generated SVG of its own mechanism.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

`next dev` and `next build` share the `.next` directory, so stop the dev server
before running a production build.

## Building and deploying

```bash
npm run build
```

That runs `next build`, which writes the static export to `out/`, then copies
it to `docs/` via `scripts/export-to-docs.mjs`.

GitHub Pages only serves a branch root or a `/docs` folder, never `/out`, so
`docs/` is the published directory and is committed. `out/` is ignored.

The copy also writes `docs/.nojekyll`. Without it Pages runs the output through
Jekyll, which skips every path starting with an underscore, and Next puts all
its JS and CSS under `_next/`.

Pages is configured to deploy from the `main` branch, `/docs` folder.

## Content

Site content lives in `src/data/portfolio.ts` as a single typed source.

## Accessibility and motion

Animation is used throughout, and all of it has a still fallback.
`prefers-reduced-motion` leaves zero animations running and zero content hidden
before scrolling. Cursor-driven effects are disabled on touch. The layout is
checked for horizontal overflow at 320, 768, 1024 and 1440 px.
