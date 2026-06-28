"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Outer Center Alignment Wrapper */}
      <div className="fixed top-0 left-0 w-full z-45 flex justify-center pointer-events-none">
        
        {/* Floating Pill Nav Bar Container */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-[92%] max-w-6xl pointer-events-auto transition-all duration-500 rounded-full border border-[#EDE5DB] flex items-center justify-between ${
            scrolled
              ? "mt-3 py-2.5 px-6 sm:px-8 bg-[#F7F4F0]/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
              : "mt-6 py-4 px-8 sm:px-10 bg-[#F7F4F0]/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
          }`}
        >
          {/* Logo signature matching reference image */}
          <a
            href="#top"
            data-cursor="pointer"
            onClick={handleLinkClick}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            {/* Double-N Line Logo Monogram */}
            <svg
              className="w-6.5 h-6.5 text-[#8B5E3C] group-hover:text-[#A06F4C] transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 4v16M19 4v16M5 4l14 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[13px] sm:text-[14px] font-extrabold tracking-widest text-[#1A1A1A] uppercase font-sans">
                NYLEX
              </span>
              <span className="text-[5.5px] sm:text-[6px] font-bold tracking-[0.25em] text-[#8B5E3C] uppercase font-sans">
                DIGITAL STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-cursor="pointer"
                className="relative text-[12px] text-[#7A7A7A] hover:text-[#8B5E3C] font-semibold tracking-wide transition-colors duration-300 py-1 group font-sans"
              >
                {link.name}
                {/* Clean sand-gold highlight line */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#8B5E3C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Let's Talk Button in luxury brown */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              data-cursor="pointer"
              className="px-4 lg:px-5 py-2.5 rounded-full bg-[#8B5E3C] text-white hover:bg-[#A06F4C] text-[11px] font-bold tracking-wider transition-colors duration-300 flex items-center gap-1.5 shadow-sm"
            >
              {"Let's Talk"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Navigation Trigger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#1A1A1A]/80 hover:text-[#1A1A1A] focus:outline-none transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Side Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#F7F4F0] pt-28 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            {/* Background luxury lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#8B5E3C]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col gap-5 text-center mt-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-xl font-bold text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col items-center gap-6"
            >
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full text-center py-3.5 rounded-full bg-[#8B5E3C] text-white font-bold tracking-wide hover:bg-[#A06F4C] transition-all shadow-sm"
              >
                {"Let's Talk"}
              </a>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                NYLEX DIGITAL STUDIO © {new Date().getFullYear()}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
