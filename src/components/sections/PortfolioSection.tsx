"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Selected <span className="text-blue-500">Works</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl">
              A collection of my recent projects showcasing game development, VR experiences, and creative coding.
            </p>
          </div>

          <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors duration-300 w-fit">
            View All Projects
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 liquid-glass p-2 border border-white/10 group-hover:border-blue-500/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-zinc-900">
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" />

                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                     <span className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out">
                       <ArrowUpRight className="w-6 h-6" />
                     </span>
                   </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
