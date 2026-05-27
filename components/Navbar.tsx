"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Insights", href: "/#insights" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pointer-events-none">
      <div className={`pointer-events-auto flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md  border-slate-100 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] px-6 py-4"
          : "bg-transparent px-6 py-4 md:bg-white md:backdrop-blur-md md:border md:border-slate-100 md:rounded-[24px] md:shadow-[0_8px_30px_rgb(0,0,0,0.015)] md:hover:shadow-[0_12px_40px_rgb(0,0,0,0.025)]"
      }`}>
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center font-bold tracking-[0.25em] text-black text-lg sm:text-xl select-none">
              <span>NYL</span>
              <span className="inline-flex flex-col justify-between h-3.5 w-4.5 mx-1.5 mt-[1px]">
                <span className="h-[2px] w-full bg-blue-600 rounded-[1px]" />
                <span className="h-[2px] w-full bg-blue-600 rounded-[1px]" />
                <span className="h-[2px] w-full bg-blue-600 rounded-[1px]" />
              </span>
              <span className="tracking-normal">X</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
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

        {/* Mobile Controls */}
        <div className="flex items-center md:hidden gap-3">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center w-6 h-6 space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="block w-full h-0.5 bg-black" />
            <span className="block w-full h-0.5 bg-black" />
            <span className="block w-full h-0.5 bg-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 m-4 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-50 flex flex-col p-6 h-auto pointer-events-auto">
          {/* Header row in overlay */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center font-bold tracking-[0.25em] text-black text-lg select-none">
              <span>NYL</span>
              <span className="inline-flex flex-col justify-between h-3.5 w-4.5 mx-1.5 mt-[1px]">
                <span className="h-[2.5px] w-full bg-blue-600 rounded-[1px]" />
                <span className="h-[2.5px] w-full bg-blue-600 rounded-[1px]" />
                <span className="h-[2.5px] w-full bg-blue-600 rounded-[1px]" />
              </span>
              <span className="tracking-normal">X</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl text-black hover:text-slate-600 font-bold focus:outline-none"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Links and Contact Button */}
          <nav className="flex flex-col gap-4 py-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors py-2 flex items-center justify-between border-b border-slate-50/50"
              >
                <span>{link.label}</span>
                <span className="text-slate-400 text-xs font-mono">0{idx + 1}</span>
              </Link>
            ))}
            
            {/* Contact Button directly after Insights */}
            <div className="mt-4 w-full flex justify-center">
              <Link href="/#contact" onClick={() => setMenuOpen(false)} className="w-full">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3.5 rounded-full text-sm font-medium transition-shadow shadow-[0_4px_12px_rgba(0,102,255,0.15)]">
                  Contact
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
