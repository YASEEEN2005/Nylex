"use client";

import { motion } from "framer-motion";

// Inline SVG for Instagram
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-white"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Inline SVG for WhatsApp
const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-white fill-current"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-3.5 select-none pointer-events-auto">
      
      {/* Instagram Button */}
      <motion.a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        data-cursor="pointer"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFB800] via-[#FF007A] to-[#7A00FF] flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(255,0,122,0.35)]"
      >
        {/* Tooltip */}
        <span className="absolute right-14 bg-zinc-950 text-white border border-white/10 text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-lg uppercase font-sans whitespace-nowrap">
          Instagram
        </span>
        <InstagramIcon />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/918921442748"
        target="_blank"
        rel="noreferrer"
        data-cursor="pointer"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(37,211,102,0.35)]"
      >
        {/* Tooltip */}
        <span className="absolute right-14 bg-zinc-950 text-white border border-white/10 text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-lg uppercase font-sans whitespace-nowrap">
          WhatsApp
        </span>
        <WhatsappIcon />
      </motion.a>

    </div>
  );
}
