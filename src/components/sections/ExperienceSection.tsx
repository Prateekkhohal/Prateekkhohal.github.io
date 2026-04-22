"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, GraduationCap } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#18181B] mb-4">
            Journey & <span className="text-[#2563EB]">Experience</span>
          </h2>
          <p className="text-lg text-[#3F3F46] max-w-2xl">
            My professional path blending game development, creative technology, and enterprise solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl liquid-glass text-[#2563EB]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:via-[#2563EB]/50 before:to-transparent">
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] bg-[#2563EB] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute md:static left-0 transform -translate-x-1/2 md:transform-none z-10" />

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 p-6 rounded-2xl liquid-glass hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="text-sm font-bold text-[#2563EB] tracking-wider uppercase">{exp.duration}</span>
                      <h4 className="text-xl font-bold text-[#18181B]">{exp.title}</h4>
                      <span className="text-sm text-[#3F3F46] font-medium">{exp.company} • {exp.location}</span>
                    </div>
                    <p className="text-[#3F3F46] leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl liquid-glass text-[#2563EB]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:via-[#2563EB]/50 before:to-transparent">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] bg-[#18181B] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute md:static left-0 transform -translate-x-1/2 md:transform-none z-10" />

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 p-6 rounded-2xl liquid-glass hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="text-sm font-bold text-[#18181B] tracking-wider uppercase">{edu.duration}</span>
                      <h4 className="text-xl font-bold text-[#18181B]">{edu.degree}</h4>
                      <span className="text-sm text-[#3F3F46] font-medium">{edu.institution} • {edu.location}</span>
                    </div>
                    <p className="text-[#3F3F46] leading-relaxed">
                      {edu.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Core Skills</h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 rounded-full liquid-glass text-sm font-medium text-[#18181B] border-white/40"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
