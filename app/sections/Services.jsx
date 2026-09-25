"use client";

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Zap } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Custom Web Development",
      desc: "High-speed, responsive custom websites built with Next.js, React, and modern CSS animation architecture.",
    },
    {
      icon: <Layout className="w-5 h-5" />,
      title: "Web Applications & SaaS",
      desc: "Scalable web applications, interactive portals, and real-time custom business dashboards.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "UI/UX Experience Design",
      desc: "Aesthetic, user-first interfaces designed for maximum engagement and brand distinction.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Speed & SEO Optimization",
      desc: "Sub-second page load times, 100/100 Lighthouse performance, and technical SEO structure.",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF9F6] text-slate-900 overflow-hidden flex flex-col items-center px-4 sm:px-8 md:px-12 py-20 sm:py-28 select-none border-t border-slate-200/80 font-sans"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-10 sm:gap-14 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-3 sm:gap-4 max-w-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#8B5E3C] font-mono font-bold">
              ✦ CORE EXPERTISE
            </span>
          </div>

          <h2 className="font-serif font-bold leading-[1.05] tracking-tight text-[clamp(36px,5.5vw,72px)] text-slate-900">
            Our Specialist Services
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Clean, high-performance web solutions engineered to scale your digital presence.
          </p>
        </motion.div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6 cursor-default"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#8B5E3C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-slate-900 text-lg font-bold group-hover:text-[#8B5E3C] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#8B5E3C] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Details →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-[#8B5E3C] px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded-full cursor-pointer shadow-md"
          >
            Start Your Project
          </motion.a>
        </div>
      </div>
    </section>
  );
}
