"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  Layers,
  Atom,
  Box,
  Flame,
  LayoutGrid,
} from "lucide-react";

// Inline GitHub SVG
const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function TechStack() {
  const techs = [
    { name: "HTML5", icon: <Code2 className="w-5 h-5" />, glowColor: "rgba(139, 94, 60, 0.08)", text: "Structure" },
    { name: "CSS3", icon: <LayoutGrid className="w-5 h-5" />, glowColor: "rgba(237, 229, 219, 0.08)", text: "Styling" },
    { name: "JavaScript", icon: <Terminal className="w-5 h-5" />, glowColor: "rgba(139, 94, 60, 0.08)", text: "Interaction" },
    { name: "React", icon: <Atom className="w-5 h-5" />, glowColor: "rgba(237, 229, 219, 0.08)", text: "UI Componentry" },
    { name: "Next.js", icon: <Layers className="w-5 h-5" />, glowColor: "rgba(139, 94, 60, 0.08)", text: "Core Framework" },
    { name: "Python", icon: <Terminal className="w-5 h-5" />, glowColor: "rgba(237, 229, 219, 0.08)", text: "Data Scripts" },
    { name: "Django", icon: <Cpu className="w-5 h-5" />, glowColor: "rgba(139, 94, 60, 0.08)", text: "Backend REST" },
    { name: "MySQL", icon: <Database className="w-5 h-5" />, glowColor: "rgba(237, 229, 219, 0.08)", text: "Relational DB" },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5" />, glowColor: "rgba(139, 94, 60, 0.08)", text: "Enterprise DB" },
    { name: "Tailwind CSS", icon: <Flame className="w-5 h-5" />, glowColor: "rgba(237, 229, 219, 0.08)", text: "Styles Utility" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, glowColor: "rgba(139, 94, 60, 0.08)", text: "DevOps VCS" },
    { name: "Docker", icon: <Box className="w-5 h-5" />, glowColor: "rgba(237, 229, 219, 0.08)", text: "Containers" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative py-24 bg-[#F7F4F0] overflow-hidden z-10 border-t border-[#EDE5DB]">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-center">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C] font-sans">
            ENGINEERING STACK
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] font-serif tracking-tight leading-tight">
            Our Core Technologies
          </h2>
          <p className="text-[#7A7A7A] text-sm sm:text-base max-w-md font-sans font-medium">
            We employ modern, production-grade tools designed for web application security, loading speeds, and robust functionality.
          </p>
        </div>

        {/* Tech Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 w-full"
        >
          {techs.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: `0 10px 25px -5px ${tech.glowColor}`,
                borderColor: "#8B5E3C",
              }}
              data-cursor="pointer"
              className="group p-5 rounded-2xl bg-white border border-[#EDE5DB] hover:bg-[#F7F4F0]/30 backdrop-blur-xl flex flex-col gap-3 transition-all duration-300 text-center items-center justify-center relative overflow-hidden shadow-xs"
            >
              {/* Inner glowing dot */}
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#8B5E3C] opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="w-10 h-10 rounded-full bg-[#EDE5DB]/70 border border-[#EDE5DB] flex items-center justify-center text-[#8B5E3C] group-hover:bg-[#8B5E3C] group-hover:text-white transition-all duration-300">
                {tech.icon}
              </div>

              <div className="flex flex-col gap-0.5 font-sans">
                <span className="text-[#1A1A1A] text-sm font-extrabold">
                  {tech.name}
                </span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                  {tech.text}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
