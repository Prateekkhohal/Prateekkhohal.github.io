"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Send } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-[3rem] p-12 md:p-20 shadow-2xl relative border-white/50"
        >
          <span className="text-sm font-bold tracking-widest text-[#2563EB] uppercase mb-4 block">What's Next?</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#18181B] mb-6">
            Let's work together.
          </h2>
          <p className="text-lg text-[#3F3F46] max-w-xl mx-auto mb-10 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="inline-flex items-center gap-3 bg-[#2563EB] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1d4ed8] hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            Say Hello <Send className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <footer className="mt-32 text-center text-[#3F3F46] border-t border-black/5 pt-8">
        <p className="mb-2">Designed with Liquid Glass • Built with Next.js & Framer Motion</p>
        <p className="font-medium text-[#18181B]">&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </section>
  );
}
