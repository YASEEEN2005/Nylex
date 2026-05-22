"use client";

import React, { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Nylex team is professional, fast and delivers outstanding quality. Highly recommended!",
    author: "Rohit Sharma",
    role: "Founder, Nexora",
    avatarColor: "bg-blue-600",
    initials: "RS",
  },
  {
    quote: "Working with Nylex transformed our product. Their attention to detail and performance optimization is top-notch.",
    author: "Sarah Jenkins",
    role: "CTO, Sleek Studio",
    avatarColor: "bg-emerald-600",
    initials: "SJ",
  },
  {
    quote: "The website they built for us has doubled our conversions. The team is communicative and extremely talented.",
    author: "Marcus Chen",
    role: "Director, Brandify",
    avatarColor: "bg-purple-600",
    initials: "MC",
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.015)] h-full flex flex-col justify-between min-h-[350px]">
      <div>
        {/* Label & Quote Icon */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-blue-600">Clients Love Us</span>
          <span className="text-blue-600 text-5xl font-serif leading-none select-none opacity-20">“</span>
        </div>

        {/* Testimonial Quote - Fully Responsive Dynamic Height */}
        <div className="relative overflow-visible">
          {testimonials.map((t, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={idx}
                className={`transition-all duration-500 flex flex-col justify-center ${
                  isActive 
                    ? "opacity-100 translate-x-0 relative z-10" 
                    : "opacity-0 translate-x-4 pointer-events-none absolute top-0 left-0 w-full"
                }`}
              >
                <p className="text-slate-800 text-lg md:text-xl font-bold leading-relaxed">
                  {t.quote}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer User Info & Dots */}
      <div className="pt-8 border-t border-slate-50 flex items-center justify-between mt-6">
        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${testimonials[activeIdx].avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
            {testimonials[activeIdx].initials}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 transition-all duration-300">
              {testimonials[activeIdx].author}
            </h4>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {testimonials[activeIdx].role}
            </p>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx ? "w-6 bg-blue-600" : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
