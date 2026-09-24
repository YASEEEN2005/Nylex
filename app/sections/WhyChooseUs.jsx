"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Search,
  Smartphone,
  Lock,
  Clock,
} from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: "Modern Design",
      desc: "Immersive Awwwards-level visual quality tailored to make your company stand out and feel highly authoritative.",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Fast Performance",
      desc: "Fully optimized static setups loading in milliseconds. Experience 100/100 Lighthouse scores on deployment.",
    },
    {
      icon: <Search className="w-4 h-4" />,
      title: "SEO Optimized",
      desc: "Clean semantic markdown structures built with Next.js Metadata API to index and rank your pages globally.",
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      title: "Mobile Responsive",
      desc: "Every pixel adapts seamlessly. Beautiful breakpoints designed for folders, phones, tablets, and wide monitors.",
    },
    {
      icon: <Lock className="w-4 h-4" />,
      title: "Secure Development",
      desc: "We follow industry-grade sanitization protocols, secure headers, and clean structures to keep databases safe.",
    },
    {
      icon: <Clock className="w-4 h-4" />,
      title: "Dedicated Support",
      desc: "Direct communication with engineers and active post-launch support channels for smooth scaling.",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden z-10 border-t border-slate-200 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Heading & Audit Link */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="col-span-1 lg:col-span-4 flex flex-col gap-6 items-start"
        >
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              THE NYLEX ADVANTAGE
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-extrabold leading-[1.1] tracking-tight text-[clamp(36px,5.5vw,72px)] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent">
              Why Partner With Us?
            </h2>
          </div>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            {"We don't build generic websites. We build premium digital assets designed to scale, load instantly, and leave a lasting impression of luxury and authority on your customers."}
          </p>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3 text-xs tracking-[0.25em] uppercase font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 rounded-full cursor-pointer mt-2 shadow-xs"
          >
            Request an Audit
          </motion.a>
        </motion.div>

        {/* Right Column: Grid */}
        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4, borderColor: "rgba(139, 94, 60, 0.5)" }}
              className="group p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col gap-3 relative overflow-hidden cursor-default"
            >
              <div className="flex items-center gap-3">
                {/* Circular Icon Container */}
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors duration-300 shrink-0">
                  {point.icon}
                </div>
                <h3 className="text-slate-900 text-sm font-extrabold group-hover:text-[#8B5E3C] transition-colors">
                  {point.title}
                </h3>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
