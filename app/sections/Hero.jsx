"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldCheck, Globe2 } from "lucide-react";

export default function Hero() {
  const text = "NYLEX";
  const [displayed, setDisplayed] = useState("");

  const techs = ["Web Development", "Web Applications", "UI/UX Design", "Performance & SEO"];

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 140);
    }
    type();
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        id="hero"
        className="relative w-full min-h-[85vh] lg:min-h-[90vh] overflow-hidden bg-white select-none flex flex-col justify-between pt-24 sm:pt-32 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 font-sans text-slate-900"
      >
        {/* Soft luxury background ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-slate-100/90 to-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#8B5E3C]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between flex-grow gap-10 sm:gap-14">
          
          {/* Top Status & Live Badge Bar */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between border-b border-slate-200/80 pb-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5E3C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B5E3C]"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#8B5E3C]">
                NYLEX WEB STUDIO ✦ HIGH-PERFORMANCE WEB ENGINEERING
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
              <span className="flex items-center gap-1.5"><Globe2 size={13} className="text-[#8B5E3C]" /> KOZHIKODE, IN</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#8B5E3C]" /> NEXT.JS CERTIFIED</span>
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="flex flex-col items-start gap-5 sm:gap-6 my-auto pt-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold text-slate-700 uppercase tracking-widest shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B5E3C]" />
              WEB DEVELOPMENT STUDIO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase leading-[0.82] tracking-[-0.04em] text-[24vw] sm:text-[20vw] md:text-[16vw] lg:text-[12.5rem] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent drop-shadow-xs"
            >
              {displayed || "\u00A0"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-slate-600 font-medium text-base sm:text-xl md:text-2xl leading-relaxed max-w-3xl pt-2"
            >
              Nylex is a specialized web development studio building high-performance websites and custom web applications for modern businesses.
            </motion.p>
          </div>

          {/* Bottom Row: Tech Badges & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 sm:pt-8 border-t border-slate-200/80"
          >
            {/* Left side: Service pills */}
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-slate-800 bg-slate-100/90 border border-slate-200/90 hover:border-[#8B5E3C] hover:bg-white hover:shadow-xs transition-all duration-200 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                  {tech}
                </motion.div>
              ))}
            </div>

            {/* Right side: Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center shrink-0 w-full sm:w-auto">
              <motion.a
                href="#work"
                onClick={(e) => handleScrollTo(e, "work")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white border border-slate-900 px-7 py-3.5 sm:px-8 sm:py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#8B5E3C] hover:border-[#8B5E3C] transition-all duration-300 rounded-full shadow-sm cursor-pointer w-full sm:w-auto"
              >
                Explore Work
                <ArrowUpRight size={15} />
              </motion.a>

              <motion.a
                href="#services"
                onClick={(e) => handleScrollTo(e, "services")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-3 border border-slate-200 bg-slate-100/80 text-slate-800 px-7 py-3.5 sm:px-8 sm:py-4 text-xs tracking-[0.25em] uppercase font-bold hover:border-slate-400 hover:bg-slate-200 transition-all duration-300 rounded-full cursor-pointer w-full sm:w-auto"
              >
                Services
              </motion.a>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Marquee Strip below Hero */}
      <div className="bg-slate-50 border-y border-slate-200/80 py-4 overflow-hidden select-none font-sans">
        <div className="flex items-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
          {["Custom Web Development", "Web Applications", "Next.js & React", "UI/UX Design", "Performance Engineering"].map((logo, i) => (
            <span
              key={i}
              className="text-slate-600 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold flex items-center gap-2"
            >
              <span className="text-[#8B5E3C]">✦</span> {logo}
            </span>
          ))}
          {/* repeated to loop */}
          {["Custom Web Development", "Web Applications", "Next.js & React", "UI/UX Design", "Performance Engineering"].map((logo, i) => (
            <span
              key={i + 20}
              className="text-slate-600 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold flex items-center gap-2"
            >
              <span className="text-[#8B5E3C]">✦</span> {logo}
            </span>
          ))}
          {/* repeated to loop */}
          {["Custom Web Development", "Web Applications", "Next.js & React", "UI/UX Design", "Performance Engineering"].map((logo, i) => (
            <span
              key={i + 40}
              className="text-slate-600 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold flex items-center gap-2"
            >
              <span className="text-[#8B5E3C]">✦</span> {logo}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
