"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafbfc] bg-grid-subtle text-slate-900 selection:bg-blue-100 selection:text-blue-800 flex flex-col justify-between">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main 404 Chassis */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-4 flex flex-col items-center justify-center py-20 text-center relative overflow-hidden">
        
        {/* Subtle glowing absolute orb background */}
        <div className="absolute top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[320px] h-[320px] rounded-full bg-blue-400/5 blur-[90px] pointer-events-none z-0"></div>

        {/* 404 Large Technical Title */}
        <div className="relative z-10 space-y-4">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[10px] font-extrabold uppercase tracking-widest text-red-500 mb-2"
          >
            ⚠️ ERROR_CODE: 404_NOT_FOUND
          </motion.div>

          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-black tracking-tighter leading-none uppercase select-none">
            <span className="block text-slate-200">PAGE</span>
            <span className="block text-blue-600 -mt-4">LOST.</span>
          </h1>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mt-6">
            The server was unable to locate the requested digital coordinates. The path might have been modified, deprecated, or offline.
          </p>
        </div>

        {/* Dynamic visual dashboard frame representing broken link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[340px] aspect-[16/9] bg-white border border-slate-100 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.015)] p-4 flex flex-col justify-between text-left mt-10 overflow-hidden"
        >
          <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="w-2 h-2 rounded-full bg-slate-100"></span>
              <span className="w-2 h-2 rounded-full bg-slate-100"></span>
            </div>
            <span className="text-[7px] font-bold tracking-wider text-slate-400 uppercase">system_diagnostic</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-2 py-2">
            <div className="flex items-center justify-between text-[9px] font-bold text-slate-600">
              <span>REQUESTED_URL:</span>
              <span className="text-red-500 font-mono">nylex.studio/unknown</span>
            </div>
            <div className="flex items-center justify-between text-[9px] font-bold text-slate-600">
              <span>SECTOR_STATUS:</span>
              <span className="text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded font-mono">CONNECTION_TERMINATED</span>
            </div>
          </div>

          <div className="border-t border-slate-50 pt-2 flex items-center justify-between text-[7px] font-bold text-slate-400 uppercase tracking-widest">
            <span>diagnose: complete</span>
            <span className="text-slate-300">code: index_miss</span>
          </div>
        </motion.div>

        {/* Back Home Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 relative z-10"
        >
          <Link href="/">
            <button className="bg-black text-white hover:bg-slate-900 px-8 py-3.5 rounded-full flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-xs tracking-wider uppercase cursor-pointer">
              Return to Home Station
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </Link>
        </motion.div>

      </main>

      {/* Floating Footer */}
      <Footer />
    </div>
  );
}
