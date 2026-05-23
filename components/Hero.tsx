"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // virtual scroll mapping: parent is h-[240vh], sticky top grid tracks the timeline
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Buttery-smooth spring to drive the interactive storyboard timeline
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  // Automated entry drawing animation of the functional SVG blue path (completes in 2s)
  const lineProgress = useMotionValue(0.1);
  const pathLength = useSpring(lineProgress, { stiffness: 45, damping: 15 });

  useEffect(() => {
    const controls = animate(lineProgress, 1, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1]
    });
    return () => controls.stop();
  }, [lineProgress]);

  // Storyboard Phase Mappings:
  // Phase 1 (Baseline Warning): Scroll 0% to 25%
  // Phase 2 (Engineering Optimization Scan): Scroll 25% to 65%
  // Phase 3 (Explosion Dispersion & Success): Scroll 65% to 100%
  const scoreRaw = useTransform(smoothScrollProgress, [0, 0.25, 0.65, 1], [42, 42, 100, 100]);
  const speedRaw = useTransform(smoothScrollProgress, [0, 0.25, 0.65, 1], [4.8, 4.8, 0.4, 0.4]);

  // Dynamic reactive states for metric scoreboards
  const [score, setScore] = useState(42);
  const [speed, setSpeed] = useState("4.8s");
  const [status, setStatus] = useState("Poor");
  const [statusColor, setStatusColor] = useState("text-red-500 bg-red-50 border-red-100");
  const [gaugeColor, setGaugeColor] = useState("stroke-red-500 text-red-500");
  const [panelStatus, setPanelStatus] = useState("status_check: heavy_baseline_warning");
  const [panelStatusColor, setPanelStatusColor] = useState("text-red-500 bg-red-50/30 border-red-100/30");

  useEffect(() => {
    const scoreUnsubscribe = scoreRaw.on("change", (latest) => {
      const rounded = Math.round(latest);
      setScore(rounded);
      
      if (rounded < 60) {
        setStatus("Poor");
        setStatusColor("text-red-500 bg-red-50 border-red-100");
        setGaugeColor("stroke-red-500 text-red-500");
        setPanelStatus("status_check: heavy_baseline_warning");
        setPanelStatusColor("text-red-500 bg-red-50/20 border-red-100/20");
      } else if (rounded < 92) {
        setStatus("Average");
        setStatusColor("text-amber-500 bg-amber-50 border-amber-100");
        setGaugeColor("stroke-amber-500 text-amber-500");
        setPanelStatus("status_check: core_vitals_optimizing");
        setPanelStatusColor("text-amber-500 bg-amber-50/20 border-amber-100/20");
      } else {
        setStatus("Stellar");
        setStatusColor("text-green-500 bg-green-50 border-green-100");
        setGaugeColor("stroke-green-500 text-green-500");
        setPanelStatus("status_check: production_optimized");
        setPanelStatusColor("text-green-500 bg-green-50/20 border-green-100/20");
      }
    });

    const speedUnsubscribe = speedRaw.on("change", (latest) => {
      setSpeed(latest.toFixed(1) + "s");
    });

    return () => {
      scoreUnsubscribe();
      speedUnsubscribe();
    };
  }, [scoreRaw, speedRaw]);

  // Glowing laser scanner bar transforms (Phase 2 only)
  const yScanner = useTransform(smoothScrollProgress, [0.25, 0.65], ["-5%", "105%"]);
  const opacityScanner = useTransform(smoothScrollProgress, [0, 0.23, 0.25, 0.65, 0.67, 1], [0, 0, 1, 1, 0, 0]);

  // Parallax & Flight Dispersion of Cards (Triggers on Phase 3: scroll 65% to 100%)
  const yCard1 = useTransform(smoothScrollProgress, [0, 0.65, 1], [0, 0, -120]);
  const xCard1Scroll = useTransform(smoothScrollProgress, [0, 0.65, 1], [0, 0, 45]);
  const opCard1 = useTransform(smoothScrollProgress, [0, 0.65, 0.95], [1, 1, 0]);

  const yCard2 = useTransform(smoothScrollProgress, [0, 0.65, 1], [0, 0, 100]);
  const xCard2Scroll = useTransform(smoothScrollProgress, [0, 0.65, 1], [0, 0, 35]);
  const opCard2 = useTransform(smoothScrollProgress, [0, 0.65, 0.95], [1, 1, 0]);

  const yCard3 = useTransform(smoothScrollProgress, [0, 0.65, 1], [0, 0, -50]);
  const xCard3Scroll = useTransform(smoothScrollProgress, [0, 0.65, 1], [0, 0, -75]);
  const opCard3 = useTransform(smoothScrollProgress, [0, 0.65, 0.95], [1, 1, 0]);

  // Main visual chassis moves (Phases 1 & 2 scale slightly, Phase 3 shrinks and pushes back)
  const opacityBg = useTransform(smoothScrollProgress, [0, 0.8], [1, 0.25]);
  const scaleBg = useTransform(smoothScrollProgress, [0, 1], [1, 0.88]);
  const rotateXBg = useTransform(smoothScrollProgress, [0, 1], [0, -12]);
  const rotateYBg = useTransform(smoothScrollProgress, [0, 1], [0, 6]);
  const yBg = useTransform(smoothScrollProgress, [0, 1], [0, -60]);

  // Magnetic Button Physics
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const mBtnX = useSpring(buttonX, { stiffness: 180, damping: 12 });
  const mBtnY = useSpring(buttonY, { stiffness: 180, damping: 12 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = e.clientX - rect.left - rect.width / 2;
    const yVal = e.clientY - rect.top - rect.height / 2;
    buttonX.set(xVal * 0.4);
    buttonY.set(yVal * 0.4);
  };

  const handleButtonMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  // Cursor-aware 3D Tilt Hook for Card 1
  const cardX1 = useMotionValue(0);
  const cardY1 = useMotionValue(0);
  const rotX1 = useSpring(useTransform(cardY1, [-150, 150], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY1 = useSpring(useTransform(cardX1, [-150, 150], [-8, 8]), { stiffness: 200, damping: 20 });

  // Cursor-aware 3D Tilt Hook for Card 2
  const cardX2 = useMotionValue(0);
  const cardY2 = useMotionValue(0);
  const rotX2 = useSpring(useTransform(cardY2, [-150, 150], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY2 = useSpring(useTransform(cardX2, [-150, 150], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardNum: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = e.clientX - rect.left - rect.width / 2;
    const yVal = e.clientY - rect.top - rect.height / 2;
    if (cardNum === 1) {
      cardX1.set(xVal);
      cardY1.set(yVal);
    } else {
      cardX2.set(xVal);
      cardY2.set(yVal);
    }
  };

  const handleCardMouseLeave = (cardNum: number) => {
    if (cardNum === 1) {
      cardX1.set(0);
      cardY1.set(0);
    } else {
      cardX2.set(0);
      cardY2.set(0);
    }
  };

  return (
    <div ref={scrollContainerRef} className="relative w-full h-[220vh] bg-transparent">
      {/* Pinned sticky screen grid */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden bg-transparent">
        
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Side: Typography */}
          <section className="lg:col-span-6 flex flex-col space-y-4 lg:space-y-3 z-10 text-left">
            
            {/* Subtle Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] font-extrabold uppercase text-slate-400"
            >
              <span className="text-blue-600">NYLEX</span>
              <span className="w-8 h-[1px] bg-slate-200"></span>
              <span>Digital Studio</span>
            </motion.div>

            {/* Heading with staggered line reveals */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black text-black tracking-tight leading-[1.05] uppercase max-w-lg">
                {["We build", "digital products", "that drive"].map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-0.5">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: idx * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.36,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-blue-600 block"
                  >
                    businesses forward.
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Subtext description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md font-medium"
            >
              An engineered digital studio crafting high-performance websites and modern web applications with clean, functional design.
            </motion.p>

            {/* CTA Area */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1"
            >
              <motion.button
                style={{ x: mBtnX, y: mBtnY }}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                className="bg-black text-white hover:bg-slate-900 px-7 py-3 rounded-full flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Explore Our Work
                <svg 
                  className="w-3.5 h-3.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
            </motion.div>
          </section>

          {/* Right Side: Pinned Interactive Storyboard Dashboard */}
          <section className="lg:col-span-6 relative w-full h-full min-h-[280px] lg:min-h-[380px] flex items-center justify-center">
            
            {/* Main Visual Chassis Box (Dashboard outline) */}
            <motion.div 
              style={{ 
                opacity: opacityBg, 
                y: yBg,
                scale: scaleBg,
                rotateX: rotateXBg,
                rotateY: rotateYBg,
                transformPerspective: 1000
              }}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[380px] lg:max-w-[420px] xl:max-w-[460px] aspect-[4/3] bg-white border border-slate-100 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.015)] p-4 lg:p-5 overflow-hidden flex flex-col justify-between"
            >
              {/* Glowing laser scanner bar (Phase 2 Sweep) */}
              <motion.div 
                style={{ y: yScanner, opacity: opacityScanner }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.9)] z-30 pointer-events-none"
              />

              {/* Top Bar Details */}
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-100"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-100"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-100"></span>
                </div>
                <span className={`text-[7px] font-extrabold tracking-widest uppercase transition-colors duration-300 ${
                  score < 60 ? "text-red-400" : score < 95 ? "text-amber-400" : "text-green-500"
                }`}>
                  {panelStatus}
                </span>
              </div>

              {/* Middle Dynamic Code Node list */}
              <div className="flex-1 flex flex-col justify-center space-y-2 pt-2 pb-1 font-mono text-[8px] font-bold">
                {score < 90 ? (
                  <>
                    <div className="flex justify-between items-center text-red-500 bg-red-50/50 p-1.5 rounded-lg border border-red-100/30 transition-all duration-300">
                      <span>⚠️ UNOPTIMIZED_SQL_QUERIES</span>
                      <span>1.8 MB</span>
                    </div>
                    <div className="flex justify-between items-center text-amber-500 bg-amber-50/50 p-1.5 rounded-lg border border-amber-100/30 transition-all duration-300">
                      <span>⚠️ BLOCKED_RENDER_SCRIPTS</span>
                      <span>420 ms</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-green-600 bg-green-50/50 p-1.5 rounded-lg border border-green-100/30 transition-all duration-300">
                      <span>✓ EDGE_SSR_COMPILED</span>
                      <span>22 ms</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600 bg-green-50/50 p-1.5 rounded-lg border border-green-100/30 transition-all duration-300">
                      <span>✓ DYNAMIC_CACHING_INIT</span>
                      <span>HIT</span>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[7px] font-extrabold text-slate-400 uppercase tracking-widest">
                <span>status: online</span>
                <span>100% cloud delivery</span>
              </div>
            </motion.div>

            {/* SVG Progress Path & Glowing Dots */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
              <svg 
                className="w-full max-w-[380px] lg:max-w-[420px] xl:max-w-[460px] aspect-[4/3] overflow-visible" 
                viewBox="0 0 540 405" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dash Reference Path */}
                <path 
                  d="M 90,80 L 90,320 M 90,320 Q 90,340 110,340 L 450,340" 
                  stroke="#f1f5f9" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                />

                {/* Active animated blue path */}
                <motion.path 
                  d="M 90,80 L 90,320 M 90,320 Q 90,340 110,340 L 450,340" 
                  stroke={score < 90 ? "#ef4444" : "#0066FF"} 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  style={{ pathLength }}
                />

                {/* Glowing Dots */}
                {/* Dot 1 */}
                <circle cx="90" cy="80" r="14" fill="#0066FF" fillOpacity="0.04" />
                <circle cx="90" cy="80" r="4.5" fill={score < 90 ? "#ef4444" : "#0066FF"} />

                {/* Dot 2 */}
                <circle cx="90" cy="200" r="14" fill="#0066FF" fillOpacity="0.04" />
                <circle cx="90" cy="200" r="4.5" fill={score < 90 ? "#ef4444" : "#0066FF"} />

                {/* Dot 3 */}
                <circle cx="90" cy="320" r="14" fill="#0066FF" fillOpacity="0.04" />
                <circle cx="90" cy="320" r="4.5" fill={score < 90 ? "#ef4444" : "#0066FF"} />
              </svg>
            </div>

            {/* Floating Card 1: Performance (Top Right) */}
            <motion.div 
              style={{ 
                y: yCard1, 
                x: xCard1Scroll,
                opacity: opCard1,
                rotateX: rotX1, 
                rotateY: rotY1, 
                transformStyle: "preserve-3d" 
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              className="absolute top-[6%] -right-2 lg:right-[1%] xl:right-[8%] w-[140px] lg:w-[155px] bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.025)] p-3 lg:p-3.5 z-20 cursor-pointer transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
            >
              <span className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-widest block">Performance Score</span>
              <div className="flex items-baseline gap-1 mt-0.5 mb-1.5">
                <span className="text-xl font-black text-black">{score}%</span>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border transition-colors ${statusColor} ml-2`}>
                  {status}
                </span>
              </div>
              
              {/* Sparkline chart SVG */}
              <div className="h-5">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 133 24">
                  <motion.path 
                    d="M0,20 C15,20 25,12 38,15 C51,18 60,6 75,9 C90,12 105,2 133,2" 
                    stroke={score < 90 ? "#ef4444" : "#0066FF"} 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                </svg>
              </div>
            </motion.div>

            {/* Floating Card 2: Status (Bottom Right) */}
            <motion.div 
              style={{ 
                y: yCard2, 
                x: xCard2Scroll,
                opacity: opCard2,
                rotateX: rotX2, 
                rotateY: rotY2, 
                transformStyle: "preserve-3d" 
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              className="absolute bottom-[8%] -right-2 lg:right-[3%] xl:right-[10%] w-[155px] lg:w-[170px] bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.025)] p-3 lg:p-3.5 z-20 cursor-pointer transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-1 text-[7.5px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${score < 90 ? "bg-red-500" : "bg-blue-600"}`}></span>
                <span>Delivering Impact</span>
              </div>
              
              {/* Status Checklist wireframe */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold select-none transition-all ${
                    score > 90 
                      ? "bg-green-50 border-green-100 text-green-600" 
                      : "bg-red-50 border-red-100 text-red-500"
                  }`}>
                    {score > 90 ? "✓" : "!"}
                  </span>
                  <span className="text-[9px] font-bold text-slate-800">Core Optimization</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold select-none transition-all ${
                    score > 90 
                      ? "bg-green-50 border-green-100 text-green-600" 
                      : "bg-red-50 border-red-100 text-red-500"
                  }`}>
                    {score > 90 ? "✓" : "!"}
                  </span>
                  <span className="text-[9px] font-bold text-slate-800">SEO Structuring</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3: Speed (Middle Left) */}
            <motion.div 
              style={{ 
                y: yCard3,
                x: xCard3Scroll,
                opacity: opCard3
              }}
              className="absolute top-[38%] -left-3 lg:left-[1%] w-[90px] lg:w-[100px] bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.025)] p-2.5 lg:p-3 z-20"
            >
              <span className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-widest block">LCP LOAD</span>
              <span className={`text-base font-black block mt-0.5 ${score < 90 ? "text-red-500" : "text-black"}`}>{speed}</span>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-[-6%] left-[90px] hidden lg:flex items-center gap-2 text-[8px] font-extrabold text-slate-400 uppercase tracking-widest select-none pointer-events-none"
            >
              <div className="w-3.5 h-6 border-2 border-slate-300 rounded-full p-1 flex justify-center">
                <motion.div 
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                />
              </div>
              <span>scroll down to optimize</span>
            </motion.div>

          </section>

        </main>

      </div>
    </div>
  );
}
