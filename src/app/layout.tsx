import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Prateek Kumar | Game Developer & Creative Technologist",
  description: "Portfolio of Prateek Kumar, Game Developer & Creative Technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={clsx(
          archivo.variable,
          spaceGrotesk.variable,
          "font-sans bg-black text-white antialiased selection:bg-blue-600 selection:text-white min-h-screen"
        )}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
           {/* Dark mode glowing orbs */}
           <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {children}
      </body>
    </html>
  );
}
