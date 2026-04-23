"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ChevronDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import clsx from "clsx";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass w-fit border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-gray-300">Available for new opportunities</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            <span className="block text-gray-400 text-3xl md:text-4xl mb-4 font-normal tracking-normal">Hi, I'm {portfolioData.personal.name}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x inline-block pb-2">
              Creative Technologist
            </span>
            <br />
            & Game Developer
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
            {portfolioData.personal.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              Get in Touch <Mail className="w-4 h-4" />
            </a>
            <a
              href="#portfolio"
              className="liquid-glass text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors duration-300 cursor-pointer"
            >
              View Work
            </a>
          </div>

          <div className="flex items-center gap-6 pt-8 text-gray-400">
            {[
              { icon: FaLinkedin, href: portfolioData.personal.socials.linkedin },
              { icon: FaGithub, href: portfolioData.personal.socials.github },
              { icon: FaTwitter, href: portfolioData.personal.socials.twitter }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors duration-200 cursor-pointer p-2 -m-2"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center"
        >
          {/* Abstract liquid shapes */}
          <motion.div
            animate={{
              borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[80%] h-[80%] bg-gradient-to-br from-blue-600/30 to-purple-600/30 blur-2xl"
          />
          <motion.div
            animate={{
              borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[70%] h-[70%] bg-gradient-to-tr from-blue-400/20 to-transparent liquid-glass border border-white/10"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-32 h-32 rounded-full liquid-glass flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-xl border border-white/20">
                <span className="text-5xl">🎮</span>
             </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-medium tracking-wider text-[#3F3F46] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#2563EB]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
