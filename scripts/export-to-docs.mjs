/**
 * Publishes the static export to docs/.
 *
 * GitHub Pages will only serve a branch root or a /docs folder, never /out,
 * so `next build` writing to out/ is an intermediate step. This copies that
 * output to docs/, which is the directory Pages is pointed at.
 *
 * Runs automatically after `npm run build`.
 */

import { cpSync, existsSync, rmSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "out");
const target = join(root, "docs");

if (!existsSync(source)) {
  console.error("export-to-docs: out/ not found. Run `next build` first.");
  process.exit(1);
}

// Clear docs/ so files deleted from the build do not linger on the live site.
if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}

cpSync(source, target, { recursive: true });

/*
 * Without this, GitHub Pages runs the output through Jekyll, which skips every
 * path beginning with an underscore. Next puts all its JS and CSS under
 * _next/, so the whole site loads unstyled and scriptless. This one empty file
 * is the difference between a working deploy and a broken one.
 */
writeFileSync(join(target, ".nojekyll"), "");

const count = readdirSync(target).length;
console.log(`export-to-docs: copied out/ -> docs/ (${count} top-level entries, .nojekyll written)`);
