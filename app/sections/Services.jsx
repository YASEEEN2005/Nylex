"use client";

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Zap } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Custom Web Development",
      desc: "High-performance, pixel-perfect websites engineered with Next.js and React.",
    },
    {
      icon: <Layout className="w-5 h-5" />,
      title: "Web Applications",
      desc: "Scalable, feature-rich web apps and dashboards built for modern business growth.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "UI/UX Design for Web",
      desc: "Intuitive, high-converting digital interfaces crafted to engage your users.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Speed & Performance",
      desc: "Instant load velocities, 100/100 Lighthouse scores, and search engine optimization.",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-slate-50/50 text-slate-900 overflow-hidden flex flex-col items-center px-4 sm:px-8 md:px-12 py-16 sm:py-24 select-none border-t border-slate-200 font-sans"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-8 sm:gap-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-3 sm:gap-4 max-w-2xl"
        >
          {/* Tagline Status */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8B5E3C] font-mono font-bold">
              ✦ WEB DEVELOPMENT SERVICES
            </span>
          </div>

          {/* Titles */}
          <div>
            <h2 className="font-extrabold leading-[1.1] tracking-tight text-[clamp(32px,5.5vw,72px)] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent">
              Digital Solutions
            </h2>
          </div>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
            We build state-of-the-art websites and custom web applications that load instantly and perform flawlessly.
          </p>
        </motion.div>

        {/* Mobile Swipe / Responsive Grid Container (prevents mobile scroll fatigue) */}
        <div className="w-full">
          {/* Mobile Swipe Hint */}
          <div className="sm:hidden flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span>SWIPE SERVICES →</span>
            <span>(1/4)</span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible w-full">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, borderColor: "rgba(139, 94, 60, 0.5)" }}
                className="snap-center shrink-0 w-[82vw] sm:w-auto group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 relative overflow-hidden cursor-default justify-between"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors duration-300 shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-slate-900 text-base font-extrabold group-hover:text-[#8B5E3C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-[10px] font-mono font-bold text-[#8B5E3C] uppercase tracking-wider opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>✦ Explore Service</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action button layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-2 w-full sm:w-auto"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-[#8B5E3C] px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 rounded-full cursor-pointer shadow-xs w-full sm:w-auto"
          >
            Get Started
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
