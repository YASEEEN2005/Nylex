"use client";

import React, { useRef } from "react";

const projects = [
  {
    title: "Sleek Studio",
    category: "Web Design / Development",
    accent: "bg-[#f8f9fa] text-slate-800",
    link: "#",
    mockup: (
      <div className="w-full h-full bg-[#f1f3f5] rounded-t-2xl p-5 flex flex-col relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
        {/* Browser Header */}
        <div className="flex gap-1.5 mb-5 select-none">
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
        </div>
        {/* Mock Content */}
        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-7 space-y-3">
            <h4 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Sleek.</h4>
            <div className="space-y-1.5 opacity-60">
              <div className="h-2 bg-slate-400 rounded-full w-5/6"></div>
              <div className="h-2 bg-slate-400 rounded-full w-2/3"></div>
            </div>
          </div>
          <div className="col-span-5 h-full flex items-end justify-center">
            <div className="w-16 h-28 bg-white rounded-t-xl border border-slate-200/50 shadow-sm relative overflow-hidden flex flex-col p-1.5 gap-1.5">
              <div className="w-full h-1 bg-slate-200 rounded"></div>
              <div className="w-2/3 h-1 bg-slate-200 rounded"></div>
              <div className="w-full h-12 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-600">
                Hi.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Nexora",
    category: "Web Development",
    accent: "bg-[#090b0e] text-white",
    link: "#",
    mockup: (
      <div className="w-full h-full bg-[#0d1117] rounded-t-2xl p-5 flex flex-col relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
        {/* Browser Header */}
        <div className="flex gap-1.5 mb-5 select-none">
          <span className="w-2 h-2 rounded-full bg-slate-700"></span>
          <span className="w-2 h-2 rounded-full bg-slate-700"></span>
          <span className="w-2 h-2 rounded-full bg-slate-700"></span>
        </div>
        {/* Mock Content */}
        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-8 space-y-3">
            <h4 className="text-xl font-bold tracking-tight text-white leading-snug">
              Elevating Digital <br />Experiences.
            </h4>
            <div className="h-6 w-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[8px] font-bold text-blue-400 tracking-wider uppercase">
              Web Dev
            </div>
          </div>
          <div className="col-span-4 h-full flex items-end justify-center relative">
            <div className="w-20 h-20 bg-blue-600/30 rounded-xl filter blur-xl absolute -bottom-5"></div>
            <div className="w-16 h-24 bg-slate-900 border border-slate-800 rounded-t-xl p-2 relative z-10 flex flex-col justify-between">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              </div>
              <div className="h-2 bg-blue-500 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Brandify",
    category: "Branding / UI UX",
    accent: "bg-[#faf8f5] text-slate-800",
    link: "#",
    mockup: (
      <div className="w-full h-full bg-[#f4f1eb] rounded-t-2xl p-5 flex flex-col relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
        {/* Browser Header */}
        <div className="flex gap-1.5 mb-5 select-none">
          <span className="w-2 h-2 rounded-full bg-amber-800/20"></span>
          <span className="w-2 h-2 rounded-full bg-amber-800/20"></span>
          <span className="w-2 h-2 rounded-full bg-amber-800/20"></span>
        </div>
        {/* Mock Content */}
        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-7 space-y-2">
            <h4 className="text-lg font-extrabold tracking-tight text-amber-950 leading-tight">
              Crafting Brands That Stand Out.
            </h4>
            <div className="h-1 bg-amber-950/20 rounded w-12"></div>
          </div>
          <div className="col-span-5 h-full flex items-end justify-center relative">
            <div className="w-20 h-28 bg-white shadow-md border border-amber-900/5 rounded-t-lg rotate-[-6deg] translate-y-4 overflow-hidden flex flex-col">
              <div className="w-full h-12 bg-amber-950/5 flex items-center justify-center">
                <span className="font-serif italic text-amber-950 text-xs">B</span>
              </div>
              <div className="p-1.5 space-y-1">
                <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                <div className="h-1 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Work() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.getBoundingClientRect().width : 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24, // width + gap-6
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.getBoundingClientRect().width : 300;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 24), // width + gap-6
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-100/80">
      {/* Work Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3">
          <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-blue-600">Featured Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Some things <br />
            <span className="text-blue-600">we're proud of.</span>
          </h2>
        </div>

        {/* Right side description and navigation */}
        <div className="flex flex-col gap-6 max-w-md">
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            Real projects. Real impact. See how we help brands grow digitally with our custom builds and high performance optimization.
          </p>

          <div className="flex items-center justify-between">
            {/* View All Work */}
            <a 
              href="#contact" 
              className="inline-flex items-center gap-1.5 group text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
            >
              View All Work
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Slider arrows */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrev}
                aria-label="Previous Project"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-lg">←</span>
              </button>
              <button 
                onClick={handleNext}
                aria-label="Next Project"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Container snap-scroll list */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {projects.map((proj, idx) => (
          <div 
            key={idx}
            className="w-[88vw] sm:w-[calc(50vw-20px)] lg:w-[calc(33.333vw-24px)] xl:w-[384px] shrink-0 snap-start flex flex-col group cursor-pointer"
          >
            {/* Mockup Display Box */}
            <div className="h-[260px] w-full border border-slate-100 rounded-3xl pt-5 px-5 flex flex-col justify-end bg-slate-50 overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.005)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] transition-shadow duration-300">
              {proj.mockup}
            </div>

            {/* Text Info */}
            <div className="mt-6 flex items-center justify-between px-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">
                  {proj.category}
                </p>
              </div>
              <span className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-500 bg-white group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-105 transition-all duration-300">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
