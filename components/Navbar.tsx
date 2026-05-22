"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] px-6 py-4 flex items-center justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.025)]">
        {/* Logo */}
        <div className="flex items-center">
          <span className="font-extrabold text-xl tracking-[0.35em] text-slate-900 cursor-pointer hover:opacity-80 transition-opacity">
            NYLEX
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Work", "Services", "About", "Process", "Insights"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[14px] font-medium text-slate-600 hover:text-slate-950 transition-colors duration-200 relative group py-1"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Let's Talk CTA */}
        <div>
          <button className="bg-black text-white hover:bg-slate-900 px-6 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md font-semibold text-sm cursor-pointer group">
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
          </button>
        </div>
      </div>
    </header>
  );
}
