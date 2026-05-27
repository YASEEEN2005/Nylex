"use client";

import React, { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "SwiftCart",
    category: "AI E-Commerce (MERN Stack)",
    github: "https://github.com/YASEEEN2005/AI-Powered-E-Commerce-Website.git",
    demo: "https://ai-powered-e-commerce-website-sable.vercel.app/",
    highlights: [
      "🤖 AI Personalization: Google Gemini API analyzes cart behavior for tailored product recommendations",
      "🔐 Secure Authentication: Firebase Phone Number OTP and Google OAuth sign-in integration",
      "💳 Payment Gateway: Razorpay integration secured with cryptographic HMAC SHA256 verification",
      "👥 Multi-Role portals: Specialized Client, Seller and Admin dashboards built on React 19 + Express"
    ],
    mockup: (
      <div className="w-full h-full bg-[#0a0d14] rounded-t-2xl flex flex-col relative overflow-hidden text-white">
        {/* Browser Top Bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-[#0b0e14]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[7.5px] text-slate-500 font-mono">swiftcart.vercel.app</span>
          <span className="w-4"></span>
        </div>
        {/* Image Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <Image
            src="/images/full stack ecomerce.png"
            alt="SwiftCart Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  },
  {
    title: "The Gallery",
    category: "Productivity Command Center",
    github: "https://github.com/YASEEEN2005/Personal-Dashboard.git",
    demo: "https://personal-dashboard-ten-gules.vercel.app/",
    highlights: [
      "🎛️ Bento-Grid Dashboard: Dynamic, responsive dashboard with Weather, Habits, and Focus trackers",
      "⏱️ Deep Work Integration: Daily pinnacle focus integrated directly with a robust Pomodoro timer",
      "💬 Gallery AI Assistant: Chat interface querying Wikipedia knowledge bases on-the-fly",
      "⚙️ Cmd Palette & Settings: Keyboard macOS-style command palette and centralized preferences engine"
    ],
    mockup: (
      <div className="w-full h-full bg-[#050608] rounded-t-2xl flex flex-col relative overflow-hidden text-white">
        {/* Browser Top Bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-[#0a0b0d]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[7.5px] text-slate-500 font-mono">the-gallery.vercel.app</span>
          <span className="w-4"></span>
        </div>
        {/* Image Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <Image
            src="/images/personal dashboard.png"
            alt="The Gallery Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Vanyaa Retreat",
    category: "Luxury Resort Platform",
    github: "https://github.com/YASEEEN2005/Resort.git",
    demo: "https://resort-ashy.vercel.app/",
    highlights: [
      "🌳 Scrollytelling Architecture: Lens-smooth scrolling coupled with high-fidelity Framer Motion parallax",
      "🗺️ 3D Resort Property Map: Interactive WebGL layout using React Three Fiber & Three.js",
      "🌐 Localization & Themes: Dynamic i18n custom context support and precise dark/light systems",
      "📅 Localized Booking widgets: Interactive weather gauges and optimized modular accommodation checkout"
    ],
    mockup: (
      <div className="w-full h-full bg-[#f8f6f2] rounded-t-2xl flex flex-col relative overflow-hidden">
        {/* Browser Top Bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-[#e9e4d9] bg-[#f0ede6]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c0b8a6]"></span>
            <span className="w-2 h-2 rounded-full bg-[#c0b8a6]"></span>
            <span className="w-2 h-2 rounded-full bg-[#c0b8a6]"></span>
          </div>
          <span className="text-[7.5px] text-[#8e8470] font-mono">vanyaa-retreat.vercel.app</span>
          <span className="w-4"></span>
        </div>
        {/* Image Content */}
        <div className="flex-1 relative overflow-hidden bg-[#e9e4d9]">
          <Image
            src="/images/vaniya resort.png"
            alt="Vanyaa Retreat Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Grilax App",
    category: "Kerala Dining & Reservations",
    github: "https://github.com/YASEEEN2005/grilex.git",
    demo: "https://grilex-vq7a.vercel.app/",
    highlights: [
      "📍 Geolocation coordinate checks: Automatically tells users exact distance to Kerala outlets",
      "💬 WhatsApp Reservation triggers: Decouples details formatting directly to business WhatsApp API",
      "🍔 Categorized Tabbed Menus: Interactive menu modules with special filters like bestseller/spicy",
      "✨ Reveal-On-Scroll transitions: Custom viewport tracking triggers content motion states"
    ],
    mockup: (
      <div className="w-full h-full bg-[#0a0705] rounded-t-2xl flex flex-col relative overflow-hidden text-white">
        {/* Browser Top Bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-stone-900 bg-[#140e0a]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
          </div>
          <span className="text-[7.5px] text-stone-600 font-mono">grilax-dining.vercel.app</span>
          <span className="w-4"></span>
        </div>
        {/* Image Content */}
        <div className="flex-1 relative overflow-hidden bg-stone-950">
          <Image
            src="/images/Grilex.png"
            alt="Grilax App Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      </div>
    ),
  }
];

export default function Work() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section id="work" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-28 border-t border-slate-100/80">
      {/* Work Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3">
          <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-blue-600">Featured Portfolio</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Bespoke software <br />
            <span className="text-blue-600">built for impact.</span>
          </h2>
        </div>

        {/* Right side description and navigation */}
        <div className="flex flex-col gap-6 max-w-md">
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            Explore a curated selection of full-stack MERN products, real-world utility platforms, WebGL integrations, and productivity dashboards.
          </p>

          <div className="flex items-center justify-between">
            {/* View All Work / Contact trigger */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 group text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
            >
              Start a Project
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
            className="w-[90vw] sm:w-[480px] shrink-0 snap-start flex flex-col bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_35px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] hover:border-blue-200/40 hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Mockup Display Box */}
            <div className="h-[210px] w-full border border-slate-100 rounded-2xl pt-4 px-4 flex flex-col justify-end bg-slate-50 overflow-hidden relative shadow-[0_5px_15px_rgba(0,0,0,0.005)]">
              {proj.mockup}
            </div>

            {/* Text Info */}
            <div className="mt-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>

                {/* Highlights List */}
                <ul className="mt-4 space-y-2 text-xs font-medium text-slate-500">
                  {proj.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="leading-relaxed flex items-start gap-1.5">
                      <span className="text-[10px] mt-0.5 shrink-0">▪</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons: GitHub & Live Demo */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-3">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-800 text-center font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(0,102,255,0.15)] hover:shadow-[0_4px_20px_rgba(0,102,255,0.25)]"
                >
                  Live Demo
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
