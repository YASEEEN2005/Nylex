"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] bg-white text-slate-900 font-sans flex items-center justify-center px-4 sm:px-8 select-none overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#8B5E3C]/5 via-slate-100 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10 py-16">
        
        {/* Status Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-8 shadow-2xs"
        >
          <Compass className="w-3.5 h-3.5 text-[#8B5E3C] animate-spin" style={{ animationDuration: "12s" }} />
          <span>404 // Page Not Found</span>
        </motion.div>

        {/* Large 404 Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-4"
        >
          <h1 className="text-[clamp(90px,18vw,200px)] font-serif font-extrabold leading-none tracking-tight text-slate-900 select-none">
            404
          </h1>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#8B5E3C] whitespace-nowrap">
            Lost In Space
          </span>
        </motion.div>

        {/* Subtitle & Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col gap-3 max-w-lg mb-10"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            This Page Does Not Exist Or Has Been Relocated
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
            The link you followed may be broken or the URL was entered incorrectly. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-[#8B5E3C] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </motion.div>
          </Link>

          <Link href="/#work">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8B5E3C]" />
              <span>View Portfolio</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
