"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-[#F7F4F0] overflow-hidden"
      style={{
        backgroundImage: "url('/hero_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Soft overlay to blend ambient lighting */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Typography & CTAs (overlayed on clean left canvas of background) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-start gap-6 font-sans">
          
          {/* Subtitle Tagline with horizontal line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[#7A7A7A] text-[10px] font-extrabold uppercase tracking-[0.25em]"
          >
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
            DIGITAL SOLUTIONS THAT DRIVE GROWTH
          </motion.div>

          {/* Large Serif Headline */}
          <h1 className="text-5xl sm:text-7xl xl:text-[5.2rem] font-normal tracking-tight text-[#1A1A1A] leading-[1.08] font-serif">
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block"
            >
              We Design.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              We Develop.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block text-[#8B5E3C]"
            >
              We Deliver.
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#7A7A7A] text-xs sm:text-sm leading-relaxed max-w-sm font-medium"
          >
            Nylex is a creative digital studio crafting modern websites, brands, and digital products that help businesses grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 w-full sm:w-auto mt-2"
          >
            <a
              href="#work"
              data-cursor="pointer"
              className="px-6 py-3.5 rounded bg-[#8B5E3C] text-white font-bold text-xs tracking-wider hover:bg-[#A06F4C] transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              Explore Our Work
              <span>→</span>
            </a>

            <a
              href="#services"
              data-cursor="pointer"
              className="px-6 py-3.5 rounded border border-[#8B5E3C] bg-transparent text-[#8B5E3C] hover:bg-[#EDE5DB]/20 font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center"
            >
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Right Column: Empty placeholder to let the background chair, table and dashboard show through */}
        <div className="col-span-1 lg:col-span-6 h-[400px] lg:h-[550px] pointer-events-none" />

      </div>
    </section>
  );
}
