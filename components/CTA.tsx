"use client";

import React from "react";

export default function CTA() {
  return (
    <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100/50 rounded-3xl p-8 lg:p-10 relative overflow-hidden h-full flex flex-col justify-between min-h-[350px] group">
      
      {/* Decorative Vector Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute right-0 bottom-0 w-64 h-64 opacity-60 text-blue-600/30" viewBox="0 0 200 200" fill="none">
          <path 
            d="M20 180 C 70 120, 120 150, 180 80" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeDasharray="4 4" 
          />
          <path 
            d="M40 180 C 90 100, 130 140, 200 60" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            className="text-blue-600 transition-all duration-700 group-hover:stroke-blue-700"
          />
          <circle cx="200" cy="60" r="5" fill="currentColor" className="text-blue-600" />
          <circle cx="180" cy="80" r="3" fill="currentColor" className="text-blue-600" />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Label */}
        <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-blue-600 block">
          Ready to Start?
        </span>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-slate-900 tracking-tight leading-tight uppercase max-w-md">
          Let's build something <br />
          <span className="text-blue-600">amazing together.</span>
        </h2>

        {/* Subtext */}
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
          Have a project in mind or want to discuss an idea? We're just a message away. Let's make it real.
        </p>
      </div>

      {/* Button */}
      <div className="relative z-10 pt-6">
        <a 
          href="#contact"
          className="inline-flex items-center gap-2 bg-black text-white hover:bg-slate-900 px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] font-semibold text-xs cursor-pointer group-hover:translate-y-[-2px]"
        >
          Let's Talk
          <svg 
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </div>
  );
}
