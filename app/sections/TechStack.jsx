"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/00507D" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Django", icon: "https://cdn.simpleicons.org/django/092E20" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/FF9900" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000" },
];

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative z-10 w-full bg-[#f8fafc] text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Header */}
        <div className="text-center lg:text-left pb-12 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              TECHNOLOGIES WE USE
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              We work with modern tools and technologies to deliver high-quality solutions.
            </p>
          </motion.div>
        </div>

        {/* 12 Tech Cards Grid with Stagger & Micro-interactions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs hover:border-[#00507D]/50 hover:shadow-xl transition-all duration-300 gap-3 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f9ff] group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#e0f2fe]">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="font-manrope text-sm font-bold text-neutral-900 group-hover:text-[#00507D] transition-colors">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
