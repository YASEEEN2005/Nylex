"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll bindings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth springs for scroll animation
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Progressive drawing of the functional SVG blue path
  const pathLength = useTransform(smoothScrollProgress, [0, 0.8], [0.1, 1]);

  // Different parallax speeds for floating UI cards
  const yCard1 = useTransform(smoothScrollProgress, [0, 1], [0, -35]);
  const yCard2 = useTransform(smoothScrollProgress, [0, 1], [0, 25]);
  const yCard3 = useTransform(smoothScrollProgress, [0, 1], [0, -15]);

  // Background dashboard fade, reveal blur and upward shift
  const opacityBg = useTransform(smoothScrollProgress, [0, 0.8], [1, 0.35]);
  const yBg = useTransform(smoothScrollProgress, [0, 0.8], [0, -30]);

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
    <main 
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-transparent flex flex-col justify-center overflow-visible py-16 lg:py-24"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Typography */}
        <section className="lg:col-span-6 flex flex-col space-y-8 z-10 text-left">
          
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
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black text-black tracking-tight leading-[1.05] uppercase max-w-xl">
              {["We build", "digital products", "that drive"].map((line, idx) => (
                <span key={idx} className="block overflow-hidden py-1">
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
              <span className="block overflow-hidden py-1">
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
            className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md font-medium"
          >
            An engineered digital studio crafting high-performance websites and modern web applications with clean, functional design.
          </motion.p>

          {/* CTA Area */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2"
          >
            <motion.button
              style={{ x: mBtnX, y: mBtnY }}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="bg-black text-white hover:bg-slate-900 px-8 py-3.5 rounded-full flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-xs tracking-wider uppercase cursor-pointer"
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

        {/* Right Side: Interactive Animated UI Dashboard */}
        <section className="lg:col-span-6 relative w-full h-full min-h-[350px] lg:min-h-[480px] flex items-center justify-center">
          
          {/* Main Visual Chassis Box (Dashboard outline) */}
          <motion.div 
            style={{ opacity: opacityBg, y: yBg }}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-[4/3] bg-white border border-slate-100 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.015)] p-6 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar Details */}
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100"></span>
              </div>
              <span className="text-[8px] font-extrabold tracking-widest text-slate-400 uppercase">production_metrics_dashboard</span>
            </div>

            {/* Middle Grid */}
            <div className="flex-1 grid grid-cols-12 gap-4 pt-6 pb-2">
              <div className="col-span-8 space-y-3">
                <div className="h-3 bg-slate-50 rounded-full w-1/4"></div>
                <div className="h-2 bg-slate-50 rounded-full w-5/6"></div>
                <div className="h-2 bg-slate-50 rounded-full w-2/3"></div>
              </div>
              <div className="col-span-4 space-y-2">
                <div className="h-6 bg-slate-50 rounded-lg w-full"></div>
                <div className="h-6 bg-slate-50 rounded-lg w-full"></div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-50 pt-4 flex items-center justify-between text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">
              <span>status: online</span>
              <span>100% cloud delivery</span>
            </div>
          </motion.div>

          {/* SVG Progress Path & Glowing Dots */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
            <svg 
              className="w-full max-w-[480px] lg:max-w-[540px] aspect-[4/3] overflow-visible" 
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
                stroke="#0066FF" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                style={{ pathLength }}
              />

              {/* Glowing Dots */}
              {/* Dot 1 */}
              <circle cx="90" cy="80" r="14" fill="#0066FF" fillOpacity="0.04" />
              <circle cx="90" cy="80" r="4.5" fill="#0066FF" />

              {/* Dot 2 */}
              <circle cx="90" cy="200" r="14" fill="#0066FF" fillOpacity="0.04" />
              <circle cx="90" cy="200" r="4.5" fill="#0066FF" />

              {/* Dot 3 */}
              <circle cx="90" cy="320" r="14" fill="#0066FF" fillOpacity="0.04" />
              <circle cx="90" cy="320" r="4.5" fill="#0066FF" />
            </svg>
          </div>

          {/* Floating Card 1: Performance (Top Right) */}
          <motion.div 
            style={{ y: yCard1, rotateX: rotX1, rotateY: rotY1, transformStyle: "preserve-3d" }}
            onMouseMove={(e) => handleCardMouseMove(e, 1)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            className="absolute top-[8%] right-[8%] w-[165px] bg-white border border-slate-100 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.03)] p-4 z-20 cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
          >
            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block">Performance Score</span>
            <div className="flex items-baseline gap-1 mt-1 mb-2">
              <span className="text-2xl font-black text-black">100%</span>
              <span className="text-blue-600 text-[10px] font-bold">↗</span>
            </div>
            
            {/* Sparkline chart SVG */}
            <div className="h-6">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 133 24">
                <path 
                  d="M0,20 C15,20 25,12 38,15 C51,18 60,6 75,9 C90,12 105,2 133,2" 
                  stroke="#0066FF" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  fill="none" 
                />
              </svg>
            </div>
          </motion.div>

          {/* Floating Card 2: Status (Bottom Right) */}
          <motion.div 
            style={{ y: yCard2, rotateX: rotX2, rotateY: rotY2, transformStyle: "preserve-3d" }}
            onMouseMove={(e) => handleCardMouseMove(e, 2)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            className="absolute bottom-[10%] right-[12%] w-[185px] bg-white border border-slate-100 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.03)] p-4.5 z-20 cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-1.5 text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span>Delivering Impact</span>
            </div>
            
            {/* Status Checklist wireframe */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-[8px] font-bold select-none">✓</span>
                <span className="text-[10px] font-bold text-slate-800">Core Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-[8px] font-bold select-none">✓</span>
                <span className="text-[10px] font-bold text-slate-800">SEO Structuring</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 3: Speed (Middle Left) */}
          <motion.div 
            style={{ y: yCard3 }}
            className="absolute top-[40%] left-[2%] w-[110px] bg-white border border-slate-100 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.03)] p-3.5 z-20"
          >
            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block">LCP LOAD</span>
            <span className="text-lg font-black text-black block mt-0.5">0.8s</span>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-[-10%] left-[90px] hidden lg:flex items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest select-none pointer-events-none"
          >
            <div className="w-4 h-7 border-2 border-slate-300 rounded-full p-1 flex justify-center">
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 bg-slate-400 rounded-full"
              />
            </div>
            <span>scroll to explore</span>
          </motion.div>

        </section>

      </div>
    </main>
  );
}
