"use client";

import { motion } from "framer-motion";
import { Zap, Code, Layout, Smartphone, Lock, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Zap className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Sub-Second Load Speed",
      desc: "Optimized Next.js dynamic routing for lightning-fast page transitions.",
    },
    {
      icon: <Code className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Clean Custom Code",
      desc: "100% custom-crafted codebase built without heavy site builders or plugins.",
    },
    {
      icon: <Layout className="w-5 h-5 text-[#8B5E3C]" />,
      title: "High Conversion UI",
      desc: "Strategic visual hierarchy designed to turn visitors into active clients.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Mobile Responsiveness",
      desc: "Flawless performance across smartphones, tablets, and wide monitors.",
    },
    {
      icon: <Lock className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Production Security",
      desc: "JWT authentication, encrypted database connections, and HTTPS SSL.",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Dedicated Support",
      desc: "Direct access to lead engineers with continuous post-launch maintenance.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden z-10 border-t border-slate-200/90 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="col-span-1 lg:col-span-4 flex flex-col gap-6 items-start"
        >
          <div className="flex items-center gap-2 text-[#8B5E3C]">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] font-mono">
              ✦ WHY NYLEX
            </span>
          </div>

          <h2 className="font-serif font-bold text-[clamp(36px,5vw,60px)] leading-[1.08] text-slate-900">
            Engineered For Measurable Results
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            We don't just build websites—we create high-performance digital tools that strengthen your brand equity.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8B5E3C] uppercase tracking-wider hover:underline pt-2"
          >
            <span>Schedule A Consultation →</span>
          </a>
        </motion.div>

        {/* Right Grid */}
        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reasons.map((r, idx) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col gap-3 justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  {r.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{r.title}</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
