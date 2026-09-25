"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Zap, Clock, Sparkles } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Animation #3: Vertical Line Fill & Scale Reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  const values = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Performance First",
      desc: "Every line of code is optimized for instant speed, responsiveness, and zero lag.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Clean Engineering",
      desc: "Robust Next.js architecture built without bloated templates or code complexity.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "On-Time Execution",
      desc: "Direct developer communication with strict milestone-based delivery.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 sm:py-32 bg-[#FAF9F6] text-slate-900 overflow-hidden z-10 border-t border-slate-200/90 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
        
        {/* Left Column: Storytelling & Vision */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="col-span-1 lg:col-span-5 flex flex-col items-start gap-6 font-sans"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5E3C] font-mono">
              ✦ OUR STUDIO PHILOSOPHY
            </span>
          </div>

          <h2 className="font-serif font-bold text-[clamp(36px,5vw,64px)] leading-[1.08] text-slate-900">
            Design Engineering Driven By Excellence
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            At NYLEX, we bridge the gap between high-end aesthetic design and robust technical engineering. We build web platforms that elevate your brand narrative while driving measurable conversions.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-mono font-bold text-slate-800">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#8B5E3C]" />
              <span>Full-Stack Expertise</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Values Timeline with Scroll Animation #3 */}
        <div className="col-span-1 lg:col-span-7 relative pl-6 sm:pl-8">
          
          {/* Scroll Progress Line */}
          <div className="absolute left-0 top-2 bottom-2 w-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              style={mounted ? { height: lineHeight } : undefined}
              suppressHydrationWarning
              className="w-full bg-[#8B5E3C] rounded-full"
            />
          </div>

          <div className="flex flex-col gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ x: 6 }}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#8B5E3C]">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
