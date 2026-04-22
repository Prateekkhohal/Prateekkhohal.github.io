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
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          archivo.variable,
          spaceGrotesk.variable,
          "font-sans bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-[#2563EB] selection:text-white min-h-screen"
        )}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#2563EB]/5 blur-[120px] mix-blend-multiply animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#18181B]/5 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {children}
      </body>
    </html>
  );
}
