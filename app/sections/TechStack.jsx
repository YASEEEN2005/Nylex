"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", color: "#000000" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { name: "Django", icon: "https://cdn.simpleicons.org/django/092E20", color: "#092E20" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717", color: "#181717" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-24 sm:py-32 bg-[#FAF9F6] text-slate-900 overflow-hidden z-10 border-t border-slate-200/90 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5E3C] font-mono">
            ✦ TECH STACK
          </span>
          <h2 className="font-serif font-bold text-[clamp(36px,5.5vw,72px)] leading-[1.05] text-slate-900">
            Technologies We Use
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-medium leading-relaxed">
            Modern battle-tested stack built for extreme speed, security, and scalability.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 w-full max-w-5xl">
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-3 text-center cursor-default group"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-bold font-mono text-slate-800">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
