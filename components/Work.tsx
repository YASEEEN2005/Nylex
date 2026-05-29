"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const projects = [
  {
    title: "SwiftCart",
    category: "AI E-COMMERCE",
    categoryClass: "bg-purple-50 text-purple-600",
    description: "AI-powered eCommerce platform with personalization, secure payments, and multi-role dashboards.",
    shortHighlights: [
      "AI Personalization",
      "Multi-Role Dashboards",
      "Secure Payments",
      "OAuth & Integrations"
    ],
    github: "https://github.com/YASEEEN2005/AI-Powered-E-Commerce-Website.git",
    demo: "https://ai-powered-e-commerce-website-sable.vercel.app/",
    mockup: (
      <div className="w-full h-full bg-[#0a0d14] rounded-t-2xl flex flex-col relative overflow-hidden text-white">
        <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-[#0b0e14]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[7.5px] text-slate-500 font-mono">swiftcart.vercel.app</span>
          <span className="w-4"></span>
        </div>
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <Image
            src="/images/full stack ecomerce.png"
            alt="SwiftCart Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  },
  {
    title: "The Gallery",
    category: "PRODUCTIVITY DASHBOARD",
    categoryClass: "bg-blue-50 text-blue-600",
    description: "Bento-grid dashboard for habits, focus tracking, weather insights & productivity analytics.",
    shortHighlights: [
      "Bento-Grid Dashboard",
      "Weather & Habits",
      "Deep Work Integrations",
      "Cmd Palette & Settings"
    ],
    github: "https://github.com/YASEEEN2005/Personal-Dashboard.git",
    demo: "https://personal-dashboard-ten-gules.vercel.app/",
    mockup: (
      <div className="w-full h-full bg-[#050608] rounded-t-2xl flex flex-col relative overflow-hidden text-white">
        <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-[#0a0b0d]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[7.5px] text-slate-500 font-mono">the-gallery.vercel.app</span>
          <span className="w-4"></span>
        </div>
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <Image
            src="/images/personal dashboard.png"
            alt="The Gallery Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Vanyaa Retreat",
    category: "3D & WEBGL",
    categoryClass: "bg-emerald-50 text-emerald-600",
    description: "Immersive resort website with 3D experiences, dynamic themes & seamless booking.",
    shortHighlights: [
      "3D Resort Map (Three.js)",
      "Interactive Gallery",
      "Dynamic Themes",
      "Booking Widgets"
    ],
    github: "https://github.com/YASEEEN2005/Resort.git",
    demo: "https://resort-ashy.vercel.app/",
    mockup: (
      <div className="w-full h-full bg-[#f8f6f2] rounded-t-2xl flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 border-b border-[#e9e4d9] bg-[#f0ede6]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c0b8a6]"></span>
            <span className="w-2 h-2 rounded-full bg-[#c0b8a6]"></span>
            <span className="w-2 h-2 rounded-full bg-[#c0b8a6]"></span>
          </div>
          <span className="text-[7.5px] text-[#8e8470] font-mono">vanyaa-retreat.vercel.app</span>
          <span className="w-4"></span>
        </div>
        <div className="flex-1 relative overflow-hidden bg-[#e9e4d9]">
          <Image
            src="/images/vaniya resort.png"
            alt="Vanyaa Retreat Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Grilax App",
    category: "DINING PLATFORM",
    categoryClass: "bg-amber-50 text-amber-600",
    description: "Kerala Dining & Reservations app with real-time location and WhatsApp API integration.",
    shortHighlights: [
      "Geolocation Checks",
      "WhatsApp Reservations",
      "Categorized Menus",
      "Reveal-On-Scroll"
    ],
    github: "https://github.com/YASEEEN2005/grilex.git",
    demo: "https://grilex-vq7a.vercel.app/",
    mockup: (
      <div className="w-full h-full bg-[#0a0705] rounded-t-2xl flex flex-col relative overflow-hidden text-white">
        <div className="flex justify-between items-center px-4 py-2 border-b border-stone-900 bg-[#140e0a]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
          </div>
          <span className="text-[7.5px] text-stone-600 font-mono">grilax-dining.vercel.app</span>
          <span className="w-4"></span>
        </div>
        <div className="flex-1 relative overflow-hidden bg-stone-950">
          <Image
            src="/images/Grilex.png"
            alt="Grilax App Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  }
];

export default function Work() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll snap to update active index
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
    const gap = 24; // gap-6
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.getBoundingClientRect().width : 320;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24, // width + gap-6
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.getBoundingClientRect().width : 320;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 24), // width + gap-6
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="work" className="w-full relative bg-[#fcfdff] pt-24 pb-32 font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-4">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-10">
          {/* Left Text */}
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
              Featured Portfolio
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Bespoke Software,<br />
              <span className="text-blue-600">Built for Impact.</span>
            </h2>
            
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Explore a curated selection of full-stack MERN products, real-world platforms, WebGL integrations, and productivity dashboards.
            </p>
            
            <a href="#contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
              Start a Project 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Right Decor Area (CSS Pattern) */}
          <div className="hidden lg:block relative w-full max-w-lg h-64 pointer-events-none opacity-60">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-blue-50/20 to-transparent rounded-3xl blur-xl"></div>
            <div className="absolute inset-0 border border-white/50 shadow-sm bg-white/40 backdrop-blur-3xl rounded-3xl grid grid-cols-6 grid-rows-4 gap-2 p-6">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="bg-blue-50/50 rounded-lg"></div>
              ))}
            </div>
            {/* Floating glass elements */}
            <div className="absolute -top-10 -left-10 w-32 h-20 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg flex items-center justify-center text-blue-600">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <div className="absolute -bottom-5 right-10 w-24 h-24 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg grid grid-cols-2 gap-2 p-3">
               <div className="bg-blue-100 rounded-md"></div>
               <div className="bg-blue-400 rounded-md"></div>
               <div className="bg-blue-100 rounded-md"></div>
               <div className="bg-blue-100 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative w-full group/carousel">
          
          {/* Navigation Arrows (Absolute on sides) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20 hidden md:block">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20 hidden md:block">
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-4 px-2"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="w-[90vw] sm:w-[400px] shrink-0 snap-start flex flex-col bg-white border border-slate-100 rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group"
              >
                {/* Mockup */}
                <div className="h-[200px] w-full border border-slate-100 rounded-2xl pt-4 px-4 flex flex-col justify-end bg-slate-50 overflow-hidden relative shadow-inner mb-6">
                  {proj.mockup}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  {/* Title & Category */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[22px] font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                      {proj.title}
                    </h3>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${proj.categoryClass}`}>
                      {proj.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Short Highlights Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-8">
                    {proj.shortHighlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 leading-tight">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-4">
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-center font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      Live Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 320;
                  scrollContainerRef.current.scrollTo({
                    left: idx * (cardWidth + 24),
                    behavior: "smooth"
                  });
                }
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-blue-600" : "w-2.5 bg-slate-200 hover:bg-slate-300"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
