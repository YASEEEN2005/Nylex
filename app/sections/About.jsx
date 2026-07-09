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
    <section id="about" className="relative py-28 bg-black overflow-hidden z-10 border-t border-white/10">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Narrative Storytelling */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start gap-6 font-sans">
          
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
              ABOUT US
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          {/* Heading in display Serif font */}
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            {"We're More Than Just a Digital Studio"}
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-medium">
            Nylex is a team of passionate designers, developers, and problem solvers. We combine creativity with technology to build digital solutions that drive real results. We believe in visual perfection, robust engineering, and close collaboration.
          </p>

          <a
            href="#contact"
            data-cursor="pointer"
            className="px-7 py-3 rounded-full bg-white text-black hover:bg-[#8B5E3C] hover:text-white text-xs font-bold tracking-wider transition-all duration-300 shadow-sm"
          >
            More About Us
          </a>
        </div>

        {/* Right Column: Values 2x2 Grid */}
        <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 border-l border-white/10 pl-0 lg:pl-12">
          {values.map((val) => (
            <div
              key={val.title}
              className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              {/* Rounded icon container */}
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#8B5E3C] group-hover:border-[#8B5E3C] group-hover:text-black transition-colors duration-300">
                {val.icon}
              </div>

              <div className="flex flex-col gap-2 font-sans">
                <h3 className="text-white text-[16px] font-extrabold group-hover:text-[#8B5E3C] transition-colors">
                  {val.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
