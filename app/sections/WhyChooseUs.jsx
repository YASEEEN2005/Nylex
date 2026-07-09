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
      icon: <Sparkles className="w-5 h-5" />,
      title: "Modern Design",
      desc: "Immersive Awwwards-level visual quality tailored to make your company stand out and feel highly authoritative.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast Performance",
      desc: "Fully optimized static setups loading in milliseconds. Experience 100/100 Lighthouse scores on deployment.",
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "SEO Optimized",
      desc: "Clean semantic markdown structures built with Next.js Metadata API to index and rank your pages globally.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Responsive",
      desc: "Every pixel adapts seamlessly. Beautiful breakpoints designed for folders, phones, tablets, and wide monitors.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Secure Development",
      desc: "We follow industry-grade sanitization protocols, secure headers, and clean structures to keep databases safe.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Dedicated Support",
      desc: "Direct communication with engineers and active post-launch support channels for smooth scaling.",
    },
  ];

  return (
    <section className="relative py-28 bg-black overflow-hidden z-10 border-t border-white/10">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Heading & Audit Link */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 font-sans">
          
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
              THE NYLEX ADVANTAGE
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Why Partner With Us?
          </h2>
          
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-medium">
            {"We don't build generic websites. We build premium digital assets designed to scale, load instantly, and leave a lasting impression of luxury and authority on your customers."}
          </p>
          
          <a
            href="#contact"
            data-cursor="pointer"
            className="w-fit text-[11px] font-bold uppercase tracking-widest text-white border-b border-[#8B5E3C] hover:text-[#8B5E3C] hover:border-[#8B5E3C] transition-colors pb-1.5 font-sans"
          >
            Request a technical audit →
          </a>
        </div>

        {/* Right Column: Grid */}
        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              data-cursor="pointer"
              className="group p-6 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-sm flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                {/* Circular Icon Container */}
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/80 group-hover:bg-[#8B5E3C] group-hover:border-[#8B5E3C] group-hover:text-black transition-colors duration-300 shrink-0">
                  {point.icon}
                </div>
                <h3 className="text-white font-bold font-sans">
                  {point.title}
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-medium font-sans">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
