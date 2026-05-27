"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TechTab = "legacy" | "react" | "nylex";

export default function TechSandbox() {
  // Sandbox state
  const [activeTab, setActiveTab] = useState<TechTab>("nylex");

  // Slider state
  const [sliderPos, setSliderPos] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Dragging logic for Before/After Slider
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  // Tab Details
  const tabData = {
    legacy: {
      name: "Legacy WP / Builder",
      lcp: "4.8s",
      lcpStatus: "Poor",
      lcpColor: "text-red-500 bg-red-50 border-red-100",
      lighthouse: 48,
      lighthouseColor: "stroke-red-500 text-red-500",
      vitals: "Fail",
      vitalsColor: "bg-red-500",
      cost: "$$$",
      desc: "Heavy plugins, unoptimized legacy databases, and bloated standard templates slow down initial paint times, damaging conversion rates and SEO ranks.",
    },
    react: {
      name: "Standard React SPA",
      lcp: "2.3s",
      lcpStatus: "Average",
      lcpColor: "text-amber-500 bg-amber-50 border-amber-100",
      lighthouse: 82,
      lighthouseColor: "stroke-amber-500 text-amber-500",
      vitals: "Warning",
      vitalsColor: "bg-amber-500",
      cost: "$$",
      desc: "Client-side rendering overhead causes a delay on initial load while Javascript bundles compile, resulting in empty white screens during first paint.",
    },
    nylex: {
      name: "NYLEX Next.js v15",
      lcp: "0.4s",
      lcpStatus: "Excellent",
      lcpColor: "text-green-500 bg-green-50 border-green-100",
      lighthouse: 100,
      lighthouseColor: "stroke-green-500 text-green-500",
      vitals: "Pass",
      vitalsColor: "bg-green-500",
      cost: "$",
      desc: "Fully server-rendered on Edge networks. Code-split bundles and optimized dynamic route caching result in instant page displays and perfect SEO marks.",
    },
  };

  return (
    <section id="insights" className="hidden md:block w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-20 border-t border-slate-100/80">

      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
          ⚙️ Performance & Tech Lab
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-none font-black text-black tracking-tight uppercase">
          We Don't Just Design.<br />
          <span className="text-blue-600">We Engineer Speeds.</span>
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Drag, click, and explore how our advanced technical setups outclass legacy platforms in real-time speed, conversions, and metrics.
        </p>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Play 1: Tech Comparison Sandbox */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.015)] flex flex-col justify-between overflow-hidden relative">

          <div className="space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-black text-black uppercase tracking-tight">1. Tech Stack Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">Interactively switch frameworks to measure performance impact.</p>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">Live Metric Simulator</span>
            </div>

            {/* Framework Selectors */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100/80">
              {(Object.keys(tabData) as TechTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[120px] text-center px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${activeTab === tab
                      ? "bg-white text-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100"
                      : "text-slate-500 hover:text-slate-900 bg-transparent border border-transparent"
                    }`}
                >
                  {tabData[tab].name}
                </button>
              ))}
            </div>

            {/* Performance Metric Scorecards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">

              {/* Speed LCP card */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">LCP Load Speed</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 flex items-baseline gap-2"
                  >
                    <span className="text-3xl font-black text-black tracking-tight">{tabData[activeTab].lcp}</span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${tabData[activeTab].lcpColor}`}>
                      {tabData[activeTab].lcpStatus}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Server cost card */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Edge Server Costs</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 flex items-baseline gap-2"
                  >
                    <span className="text-3xl font-black text-black tracking-tight">{tabData[activeTab].cost}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Per 100k Users</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lighthouse Gauge Chart */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lighthouse</span>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Core Vitals:</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${tabData[activeTab].vitalsColor}`}></span>
                    <span className="text-[9px] font-black uppercase text-slate-800">{tabData[activeTab].vitals}</span>
                  </div>
                </div>

                {/* SVG Gauge */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-slate-100"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      key={activeTab}
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${tabData[activeTab].lighthouse}, 100` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={tabData[activeTab].lighthouseColor}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute text-xs font-black text-slate-900"
                    >
                      {tabData[activeTab].lighthouse}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>

          {/* Tab Framework Description */}
          <div className="mt-8 pt-6 border-t border-slate-50 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Technical Analysis</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-slate-500 leading-relaxed font-medium"
                >
                  {tabData[activeTab].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Play 2: Before / After Split-Screen Viewport Slider */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.015)] flex flex-col justify-between">

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-black uppercase tracking-tight">2. Design & Speed Slider</h3>
              <p className="text-xs text-slate-400 mt-1">Drag the divider horizontally to compare Legacy vs. NYLEX builds.</p>
            </div>

            {/* Slider Container Chassis */}
            <div
              ref={sliderContainerRef}
              onPointerDown={handlePointerDown}
              className="relative w-full h-[220px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
            >
              {/* LEGACY BACKGROUND LAYOUT (Bottom Layer) */}
              <div className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between bg-slate-100/60 filter grayscale opacity-75">
                <div className="flex justify-between items-center">
                  <div className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase font-serif">Outdated Agency</div>
                  <span className="text-[8px] font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded">LOAD: 4.8s</span>
                </div>
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded-md w-full border border-slate-300/40 flex items-center justify-center text-[9px] font-bold text-slate-400 uppercase">
                  Legacy Template Layout
                </div>
              </div>

              {/* NYLEX OPTIMIZED FRONT LAYOUT (Top Layer - Width controlled by sliderPos) */}
              <div
                className="absolute inset-y-0 left-0 h-full p-4 flex flex-col justify-between bg-white border-r border-blue-500/30 overflow-hidden z-10 transition-shadow"
                style={{ width: `${sliderPos}%` }}
              >
                {/* Min-width wrapper to prevent styling squeeze */}
                <div className="w-[300px] sm:w-[400px] h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <div className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span className="text-[10px] font-black text-black tracking-widest uppercase">NYLEX LOGO</span>
                    </div>
                    <span className="text-[8px] font-black text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase tracking-wider">LOAD: 0.4s</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-black tracking-tight leading-none uppercase">WE ENGINEER HIGH-PERFORMANCE WEBSITES</h4>
                    <p className="text-[9px] text-slate-400 max-w-[200px] leading-snug">Clean functional architecture powered by Next.js server actions.</p>
                  </div>
                  <div className="h-8 bg-black text-white rounded-full w-[160px] flex items-center justify-center text-[9px] font-black uppercase tracking-wider shadow-sm">
                    Live Demo Project
                  </div>
                </div>
              </div>

              {/* Sliding Handle (The dragging line indicator) */}
              <div
                className="absolute inset-y-0 w-[2px] bg-blue-600 z-20 pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag circle button details */}
                <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold pointer-events-none select-none">
                  ↔
                </div>
              </div>

            </div>
          </div>

          {/* Comparison metadata details */}
          <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            <span className="text-red-500">← Slide for Legacy</span>
            <span className="text-green-600">Slide for NYLEX →</span>
          </div>

        </div>

      </div>

    </section>
  );
}
