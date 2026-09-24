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
    <section id="techstack" className="relative py-16 sm:py-24 bg-slate-50/50 text-slate-900 overflow-hidden z-10 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative flex flex-col items-center">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-16 font-sans max-w-xl"
        >
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C]">
            ENGINEERING STACK
          </span>
          <h2 className="font-extrabold leading-[1.1] tracking-tight text-[clamp(32px,5.5vw,72px)] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent">
            Our Core Technologies
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-medium leading-relaxed">
            We employ modern, production-grade tools designed for web application security, loading speeds, and robust functionality.
          </p>
        </motion.div>

        {/* Clean, Compact Technology Card Grid Optimized for Mobile */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-6 w-full max-w-5xl">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -5, scale: 1.04, borderColor: "#8B5E3C" }}
              className="group p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center cursor-default"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2 sm:p-2.5 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-800 font-bold uppercase tracking-wider font-mono group-hover:text-[#8B5E3C] transition-colors truncate w-full">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
