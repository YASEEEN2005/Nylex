"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldCheck, Globe2 } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Animation #1: Parallax Scale & Y Drift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const pillDriftLeft = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const pillDriftRight = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[90vh] bg-white text-slate-900 select-none flex flex-col justify-between pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 font-sans overflow-hidden border-b border-slate-100"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#8B5E3C]/5 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center relative z-10 py-12">
        
        {/* Status Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ y: headlineY }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-8 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for New Projects 2026</span>
          <Sparkles className="w-3.5 h-3.5 text-[#8B5E3C]" />
        </motion.div>

        {/* Hero Headline with Scroll Animation #1 */}
        <motion.div
          style={mounted ? { y: headlineY, opacity: headlineOpacity } : undefined}
          suppressHydrationWarning
          className="flex flex-col items-center gap-4 max-w-5xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(40px,7.5vw,96px)] font-serif font-bold leading-[1.02] tracking-tight text-slate-900"
          >
            Crafting Digital Platforms <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent italic font-normal">
              That Define Brands
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-600 text-sm sm:text-lg max-w-2xl font-medium leading-relaxed mt-2"
          >
            NYLEX builds ultra-high performance websites, web applications, and digital experiences engineered for visual elegance and high conversion.
          </motion.p>
        </motion.div>

        {/* Primary CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <motion.a
            href="#work"
            onClick={(e) => handleScrollTo(e, "work")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-[#8B5E3C] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get In Touch</span>
          </motion.a>
        </motion.div>

        {/* Floating Drifting Service Pills (Scroll Drift Animation) */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 max-w-3xl">
          <motion.div
            style={{ x: pillDriftLeft }}
            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-2 shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#8B5E3C]" />
            <span>Next.js App Architecture</span>
          </motion.div>

          <motion.div
            style={{ x: pillDriftRight }}
            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-2 shadow-2xs"
          >
            <Globe2 className="w-4 h-4 text-emerald-600" />
            <span>100/100 Lighthouse Performance</span>
          </motion.div>

          <motion.div
            style={{ x: pillDriftLeft }}
            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-2 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Custom UI/UX Engineering</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
