"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Insights", href: "/#insights" }
  ];

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] px-6 py-4 flex items-center justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.025)]">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <img 
              src="/logo.png" 
              alt="NYLEX Logo" 
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-slate-400 hover:text-slate-900 px-3.5 py-2 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-100/50 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Let's Talk CTA */}
        <div>
          <Link href="/#contact">
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
          </Link>
        </div>
      </div>
    </header>
  );
}
