"use client";

import { motion } from "framer-motion";
import { Compass, HeartHandshake, Zap, CalendarCheck } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Creative Approach",
      desc: "We blend creativity with strategy to build stunning, memorable digital experiences that set new benchmarks.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      title: "Client Focused",
      desc: "We listen, collaborate, and deliver bespoke solutions that truly align with your goals and make a real business impact.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quality & Performance",
      desc: "We build fast, secure, and scalable solutions that grow alongside your business and deliver top Lighthouse grades.",
    },
    {
      icon: <CalendarCheck className="w-5 h-5" />,
      title: "On-Time Delivery",
      desc: "We respect your timelines, plan exhaustively, and maintain rigorous execution pipelines to deploy on schedule.",
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-slate-50/50 overflow-hidden z-10 border-t border-slate-200 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Narrative Storytelling */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="col-span-1 lg:col-span-5 flex flex-col items-start gap-6 font-sans"
        >
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
              ABOUT US
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-extrabold leading-[1.1] tracking-tight text-[clamp(36px,5.5vw,72px)] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent">
              We're More Than a Studio
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Nylex is a team of passionate designers, developers, and problem solvers. We combine creativity with technology to build digital solutions that drive real results. We believe in visual perfection, robust engineering, and close collaboration.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3 text-xs tracking-[0.25em] uppercase font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 rounded-full cursor-pointer mt-2 shadow-xs"
          >
            More About Us
          </motion.a>
        </motion.div>

        {/* Right Column: Values 2x2 Grid */}
        <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 border-l border-slate-200 pl-0 lg:pl-12">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4, borderColor: "rgba(139, 94, 60, 0.5)" }}
              className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:shadow-md transition-all duration-300 flex flex-col gap-3 relative overflow-hidden cursor-default"
            >
              {/* Rounded icon container */}
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors duration-300 shrink-0">
                {val.icon}
              </div>

              <div className="flex flex-col gap-1.5 font-sans">
                <h3 className="text-slate-900 text-sm font-extrabold group-hover:text-[#8B5E3C] transition-colors">
                  {val.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
