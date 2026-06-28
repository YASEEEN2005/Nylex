"use client";

import { motion } from "framer-motion";
import { Compass, HeartHandshake, Zap, CalendarCheck } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Compass className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Creative Approach",
      desc: "We blend creativity with strategy to build stunning, memorable digital experiences that set new benchmarks.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Client Focused",
      desc: "We listen, collaborate, and deliver bespoke solutions that truly align with your goals and make a real business impact.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Quality & Performance",
      desc: "We build fast, secure, and scalable solutions that grow alongside your business and deliver top Lighthouse grades.",
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-[#8B5E3C]" />,
      title: "On-Time Delivery",
      desc: "We respect your timelines, plan exhaustively, and maintain rigorous execution pipelines to deploy on schedule.",
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#F7F4F0] overflow-hidden z-10 border-t border-[#EDE5DB]">
      {/* Background gradients */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[100px] pointer-events-none" />

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
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] font-serif leading-tight">
            {"We're More Than Just a Digital Studio"}
          </h2>

          <p className="text-[#7A7A7A] text-sm sm:text-base leading-relaxed font-medium">
            Nylex is a team of passionate designers, developers, and problem solvers. We combine creativity with technology to build digital solutions that drive real results. We believe in visual perfection, robust engineering, and close collaboration.
          </p>

          <a
            href="#contact"
            data-cursor="pointer"
            className="px-7 py-3 rounded bg-[#8B5E3C] text-white hover:bg-[#A06F4C] text-xs font-bold tracking-wider transition-colors duration-300 shadow-sm"
          >
            More About Us
          </a>
        </div>

        {/* Right Column: Values 2x2 Grid */}
        <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 border-l border-[#EDE5DB] pl-0 lg:pl-12">
          {values.map((val) => (
            <div
              key={val.title}
              className="flex flex-col items-start gap-4 p-2"
            >
              {/* Rounded icon container on warm beige background */}
              <div className="w-11 h-11 rounded-full bg-[#EDE5DB]/70 border border-[#EDE5DB] flex items-center justify-center">
                {val.icon}
              </div>

              <div className="flex flex-col gap-2 font-sans">
                <h3 className="text-[#1A1A1A] text-[16px] font-extrabold">
                  {val.title}
                </h3>
                <p className="text-[#7A7A7A] text-xs leading-relaxed font-medium">
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
