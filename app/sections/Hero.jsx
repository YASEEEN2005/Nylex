"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. Cinematic Background Video Zoom-In (Zooms 1.0x -> 1.65x as you scroll into Services)
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.65]);

  // 2. Hero Headline & Description: Zooms slightly and fades smoothly
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // 3. Scroll Indicator fades early
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-wrapper"
      className="relative w-full h-[100dvh]"
    >
      <div id="top" className="absolute top-0" />

      {/* Sticky Fixed Hero Viewport - Stays fixed while zooming */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
        
        {/* Zoom-In Video */}
        <motion.div
          id="hero"
          style={{
            scale: videoScale,
          }}
          className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none select-none will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover object-center"
          >
            <source src="/videos/342580.mp4" type="video/mp4" />
          </video>

          {/* Clean Scrim for high contrast */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
        </motion.div>

        {/* Hero Main Content (Zooms slightly into viewer & fades cleanly) */}
        <motion.div
          style={{
            scale: textScale,
            opacity: textOpacity,
            y: textY,
          }}
          className="relative z-10 flex w-full flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto py-6 px-4 sm:px-6 lg:px-8 will-change-transform"
        >
          {/* Masked Headline Reveal */}
          <div className="overflow-hidden w-full">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-manrope text-[34px] xs:text-[38px] sm:text-[54px] md:text-[64px] lg:text-[74px] xl:text-[82px] font-normal leading-[1.06] tracking-[-0.03em] text-white uppercase break-words drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            >
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#53e6ff] to-[#0070f3]">
                DIGITAL
              </span>{" "}
              <br className="hidden sm:inline" />
              POSSIBILITIES
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-8 font-inter text-sm sm:text-base md:text-lg lg:text-xl text-neutral-200/90 max-w-2xl mx-auto leading-relaxed px-2 font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            We build high-performance websites, scalable software, and AI-powered solutions engineered for ambitious modern businesses.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            <motion.a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#00507D] hover:bg-[#003e61] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-xl transition-all duration-200 hover:shadow-2xl cursor-pointer group"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#work"
              onClick={(e) => handleScrollTo(e, "work")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:border-white/60 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              View Our Work
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-neutral-400 pointer-events-none"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-300/80">
            SCROLL DOWN
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#53e6ff]" />
        </motion.div>
      </div>
    </div>
  );
}
