"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#top", id: "top" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Work", href: "#work", id: "work" },
    { name: "Tech Stack", href: "#techstack", id: "techstack" },
    { name: "Process", href: "#process", id: "process" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
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
      <nav
        className={
          scrolled
            ? "fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 flex items-center justify-between px-6 md:px-10 py-3.5 backdrop-blur-xl bg-white/85 border border-slate-200/90 rounded-full select-none shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-500"
            : "fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-white/60 border-b border-slate-100 select-none transition-all duration-500"
        }
      >
        
        {/* Left branding logo */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, "top")}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <img
            src="/new n logo.png"
            alt="Nylex Logo"
            className="w-9.5 h-9.5 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="text-[13px] sm:text-[14px] font-extrabold tracking-widest text-slate-900 uppercase font-sans">
              NYLEX
            </span>
            <span className="text-[5.5px] sm:text-[6px] font-bold tracking-[0.25em] text-[#8B5E3C] uppercase font-sans">
              WEB DEVELOPMENT STUDIO
            </span>
          </div>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center gap-7 lg:gap-9 text-xs tracking-widest text-slate-600 uppercase font-sans">
          {navLinks.map((link) => (
            <li
              key={link.name}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="relative hover:text-slate-900 transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full font-semibold"
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Live dynamic ticking clock */}
        <div className="hidden md:block text-[10px] tracking-[0.3em] text-slate-500 uppercase font-mono">
          {time}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-slate-900 z-50 cursor-pointer p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-slate-900 uppercase tracking-[0.3em] text-sm md:hidden font-sans">
          
          <div className="absolute top-28 text-center font-sans">
            <p className="text-[10px] text-slate-400 tracking-[0.3em] mb-2 font-bold">
              TIME
            </p>
            <h2 className="text-2xl tracking-widest font-semibold font-mono text-slate-900">
              {time}
            </h2>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="relative cursor-pointer after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full font-bold text-slate-900"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
