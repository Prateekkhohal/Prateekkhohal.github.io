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
          className="liquid-glass rounded-[3rem] p-8 md:p-16 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative border-white/10 text-left max-w-2xl mx-auto"
        >
          <span className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4 block">What's Next?</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Let's work together.
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <form action="https://getform.io/f/149c099d-f036-4fb6-a487-e67f726ce64f" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
              <textarea id="message" name="message" required rows={4} placeholder="Tell me about your project..." className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>
            <input type="hidden" name="_gotcha" style={{ display: 'none' }} />
            <button type="submit" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 w-full justify-center">
              Send Message <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="mt-32 text-center text-gray-500 border-t border-white/5 pt-8">
        <p className="mb-2">Designed with Liquid Glass • Built with Next.js & Framer Motion</p>
        <p className="font-medium text-gray-400">&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </section>
  );
}
