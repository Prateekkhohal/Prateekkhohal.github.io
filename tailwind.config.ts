import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      // No colour aliases here on purpose. Registering a colour named `base`
      // shadows Tailwind's built-in `text-base` font-size utility and silently
      // repaints that text in the page background colour. Colours are read
      // straight from the CSS variables instead, e.g. text-[color:var(--muted)].
      boxShadow: {
        depth1: "var(--depth-1)",
        depth2: "var(--depth-2)",
        depth3: "var(--depth-3)",
        depth4: "var(--depth-4)",
      },
    },
  },
  plugins: [],
};
export default config;
