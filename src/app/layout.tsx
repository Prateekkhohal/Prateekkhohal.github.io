import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { personal } from "@/data/portfolio";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const description =
  "Prateek Kumar, Software Engineer working on backend and AI systems. Real-time services on Node.js and WebSockets, multi-tenant RAG on FastAPI and pgvector, and native Android at Device Owner level.";

export const metadata: Metadata = {
  metadataBase: new URL("https://prateekkhohal.github.io"),
  title: `${personal.name} | ${personal.title}`,
  description,
  keywords: [
    "Backend Engineer",
    "Software Engineer",
    "Node.js",
    "WebSocket",
    "FastAPI",
    "RAG",
    "pgvector",
    "Android",
    "Device Owner",
    "MDM",
    "Real-time systems",
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    type: "website",
    title: `${personal.name} | ${personal.title}`,
    description,
    url: "https://prateekkhohal.github.io",
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.title}`,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/*
          Entrance animations ship their resting state as inline opacity:0.
          If scripts never run, the copy must still be readable, so force
          every animated element back to visible.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={clsx(
          archivo.variable,
          spaceGrotesk.variable,
          "grain min-h-screen antialiased"
        )}
      >
        {/* Static depth field. No parallax, so it never fights the scroll. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="grid-floor absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(85%_60%_at_50%_0%,black,transparent)]" />
          <div className="absolute -top-[20%] left-1/2 h-[45vw] w-[45vw] -translate-x-1/2 rounded-full bg-[color:var(--accent)]/[0.12] blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-white/[0.03] blur-[120px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
