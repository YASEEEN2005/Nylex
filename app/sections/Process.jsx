"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Process() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Animation #4: Active Phase Scroll Tracker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressScale = useTransform(scrollYProgress, [0.1, 0.9], [0.1, 1]);

  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We research your target audience, define business goals, and map project specifications.",
    },
    {
      num: "02",
      title: "UI/UX Architecture",
      desc: "We design clean visual layouts, interactive prototypes, and custom UI components.",
    },
    {
      num: "03",
      title: "Next.js Engineering",
      desc: "We build clean production code using Next.js, React, and MongoDB database infrastructure.",
    },
    {
      num: "04",
      title: "Testing & Launch",
      desc: "We run sub-second speed audits, security checks, custom domain SSL setup, and live deployment.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden z-10 border-t border-slate-200/90 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5E3C] font-mono">
            ✦ WORKFLOW PROCESS
          </span>
          <h2 className="font-serif font-bold text-[clamp(36px,5.5vw,72px)] leading-[1.05] text-slate-900">
            How We Execute Projects
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            A structured, 4-phase methodology engineered for predictability, speed, and exceptional quality.
          </p>

          {/* Scroll Progress Bar (Scroll Animation #4) */}
          <div className="w-full max-w-md h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <motion.div
              style={mounted ? { scaleX: progressScale, transformOrigin: "left" } : { transformOrigin: "left" }}
              suppressHydrationWarning
              className="h-full bg-gradient-to-r from-[#8B5E3C] to-indigo-600 rounded-full"
            />
          </div>
        </div>

        {/* Process Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-black text-[#8B5E3C]">
                    {step.num}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <span>Phase Completed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
