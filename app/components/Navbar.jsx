"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#top", id: "top" },
    { name: "Services", href: "#services", id: "services" },
    { name: "About", href: "#about", id: "about" },
    { name: "Work", href: "#work", id: "work" },
    { name: "Blog", href: "#blog", id: "blog" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("nylex-mobile-menu", { detail: { open: true } }));
    } else {
      document.body.style.overflow = "auto";
      window.dispatchEvent(new CustomEvent("nylex-mobile-menu", { detail: { open: false } }));
    }
    return () => {
      document.body.style.overflow = "auto";
      window.dispatchEvent(new CustomEvent("nylex-mobile-menu", { detail: { open: false } }));
    };
  }, [mobileMenu]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenu(false);

    const targetElement = document.getElementById(id === "top" ? "hero" : id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "h-16 sm:h-20 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-xs"
            : "h-20 sm:h-24 bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="h-full w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => handleLinkClick(e, "top")}
              className="flex shrink-0 items-center gap-2.5 sm:gap-3 group cursor-pointer"
              aria-label="Nylex Home"
            >
              <div className="relative flex items-center justify-center">
                <img
                  src="/nylex-icon.png"
                  alt="Nylex Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span
                  className={`font-manrope text-base sm:text-xl font-extrabold tracking-tight transition-colors ${
                    scrolled
                      ? "text-neutral-950 group-hover:text-[#00507D]"
                      : "text-white group-hover:text-[#53e6ff]"
                  }`}
                >
                  NYLEX
                </span>
                <span
                  className={`font-inter text-[8px] sm:text-[9px] font-bold tracking-[0.22em] uppercase transition-colors ${
                    scrolled ? "text-neutral-500" : "text-neutral-300"
                  }`}
                >
                  DIGITAL STUDIO
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`group relative font-inter text-sm font-semibold transition-colors duration-200 py-1 ${
                    scrolled
                      ? "text-neutral-600 hover:text-neutral-950"
                      : "text-neutral-200 hover:text-white"
                  }`}
                >
                  <span className="relative inline-block">
                    {link.name}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#00507D] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </a>
              ))}
            </nav>

            {/* Right Action / Mobile Trigger */}
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#00507D] hover:bg-[#003e61] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                Start a Project
              </motion.a>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setMobileMenu(true)}
                className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer ${
                  scrolled
                    ? "bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md"
                }`}
                aria-label="Open Navigation Menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Premium Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#07090e] text-white md:hidden font-inter flex flex-col justify-between overflow-y-auto"
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#00507D]/25 blur-[90px]" />
            <div className="pointer-events-none absolute top-1/2 -left-28 h-64 w-64 rounded-full bg-[#53e6ff]/10 blur-[100px]" />

            {/* Top Bar inside Drawer */}
            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#07090e]/80 backdrop-blur-md">
              <a
                href="#top"
                onClick={(e) => handleLinkClick(e, "top")}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <img
                  src="/nylex-icon.png"
                  alt="Nylex Logo"
                  className="h-8 w-8 object-contain"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-manrope text-base font-extrabold tracking-tight text-white">
                    NYLEX
                  </span>
                  <span className="font-inter text-[8px] font-bold tracking-[0.22em] text-[#53e6ff] uppercase">
                    DIGITAL STUDIO
                  </span>
                </div>
              </a>

              <button
                onClick={() => setMobileMenu(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links Area */}
            <div className="relative z-10 flex-1 px-6 py-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#53e6ff]">
                  <span className="h-2 w-2 rounded-full bg-[#53e6ff] animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] font-mono">
                    STUDIO MENU
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono tracking-wider">
                  06 SECTIONS
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group py-3.5 flex items-center justify-between border-b border-white/[0.05] hover:border-[#53e6ff]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs text-[#53e6ff]/80 font-medium tracking-wider">
                        0{idx + 1}
                      </span>
                      <span className="font-manrope text-[28px] xs:text-[32px] font-normal tracking-tight text-neutral-200 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-200">
                        {link.name}
                      </span>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] group-hover:bg-[#00507D] group-hover:border-[#00507D] text-neutral-400 group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bottom Drawer Footer & CTA */}
            <div className="relative z-10 px-6 pb-7 pt-4 border-t border-white/[0.08] bg-[#07090e]/90 flex flex-col gap-4">
              {/* Main CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00507D] via-[#006ca8] to-[#0088dd] hover:from-[#003e61] hover:to-[#006ca8] text-white font-semibold text-sm text-center shadow-[0_0_25px_rgba(0,112,243,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>

              {/* Direct Contact Links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="mailto:buildwithnylex@gmail.com"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-xs"
                >
                  <Mail className="h-3.5 w-3.5 text-[#53e6ff]" />
                  <span className="truncate">Email Us</span>
                </a>
                <a
                  href="https://wa.me/918921442748"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-xs"
                >
                  <Phone className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                <span className="truncate">buildwithnylex@gmail.com</span>
                <span className="text-neutral-400 font-mono">+91 89214 42748</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
