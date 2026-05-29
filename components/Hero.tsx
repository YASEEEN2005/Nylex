"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  // Preloading image sequence sequence
  useEffect(() => {
    const totalFrames = 141;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const pad = (num: number, size: number) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameStr = pad(i, 3);
      img.src = `/images/herosection/ezgif-frame-${frameStr}.png`;
      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / totalFrames) * 100);
        setProgress(percent);

        if (loadedCount === totalFrames) {
          imagesRef.current = loadedImages;
          setLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          imagesRef.current = loadedImages;
          setLoading(false);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Responsive drawing math for aspect ratio "cover" mode on HTML5 Canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;

    const imgWidth = img.width;
    const imgHeight = img.height;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    drawFrame(currentFrameRef.current);
  };

  useEffect(() => {
    if (!loading) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const frameObj = { frame: 0 };

    const ctx = gsap.context(() => {
      // 1. Map pinned scroll to canvas image frame index
      gsap.to(frameObj, {
        frame: 140,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
            const index = Math.min(140, Math.max(0, Math.round(frameObj.frame)));
            currentFrameRef.current = index;
            drawFrame(index);
          },
        },
      });

      // 2. Synchronized text slides animations
      const slides = gsap.utils.toArray(".feature-slide");

      slides.forEach((slide: any, index: number) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: `${index * 25 + (index === 0 ? 0 : 4)}% top`,
            end: `${(index + 1) * 25 - 4}% top`,
            scrub: true,
          },
        });

        if (index === 0) {
          // Slide 1 (0% to 21%): visible initially, fades out
          tl.to(slide, { opacity: 0, y: -50, ease: "power1.out" })
            .set(slide, { pointerEvents: "none" });
        } else if (index === 3) {
          // Slide 4 (75% to 100%): fades in, stays visible
          tl.set(slide, { pointerEvents: "auto" })
            .fromTo(
              slide,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, ease: "power1.inOut" }
            );
        } else {
          // Slide 2 & 3: fades in, stays, fades out
          tl.set(slide, { pointerEvents: "auto" })
            .fromTo(
              slide,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
            )
            .to(
              slide,
              { opacity: 0, y: -50, duration: 0.4, ease: "power1.in" },
              "+=0.2"
            )
            .set(slide, { pointerEvents: "none" });
        }
      });
    }, container);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, [loading]);

  return (
    <div ref={containerRef} className="relative w-full bg-slate-50 overflow-visible h-[500vh] hidden md:block">
      {/* Premium custom glass skeleton loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50"
          >
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-28 h-28 border-[3px] border-slate-200/80 rounded-full flex items-center justify-center relative bg-white/20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
                <div className="absolute inset-[-3px] border-[3px] border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-base font-black text-slate-800 font-serif italic">
                  {progress}%
                </span>
              </div>
              <span className="mt-8 text-[10px] tracking-[0.3em] font-extrabold uppercase text-slate-400">
                Loading Experience
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky viewport frame containing the components */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-slate-50 flex items-center justify-center">
        {/* Fullscreen Background Canvas */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none opacity-[0.93]">
          <canvas ref={canvasRef} className="w-full h-full hidden md:block" />
        </div>

        {/* Premium Luxury Background Ambient Glow Fields */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-1 select-none">
          <div className="absolute top-[10%] left-[20%] w-[380px] sm:w-[500px] aspect-square rounded-full bg-cyan-500/5 blur-[130px] animate-float-1"></div>
          <div className="absolute bottom-[15%] right-[15%] w-[320px] sm:w-[480px] aspect-square rounded-full bg-indigo-500/4 blur-[120px] animate-float-2"></div>
        </div>

        {/* Main responsive hero layout container */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 lg:px-4 h-full flex items-center z-10">
          <div className="w-full lg:w-[52%] xl:w-[48%] relative h-[70vh] flex flex-col justify-center">
            
            {/* Slide 1: Core Brand Identity */}
            <div className="feature-slide absolute inset-0 flex flex-col justify-center text-left pointer-events-auto">
              <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] font-extrabold uppercase text-slate-400 select-none mb-4 sm:mb-6">
                <span className="text-blue-600">NYLEX</span>
                <span className="w-8 h-[1px] bg-slate-300"></span>
                <span>DIGITAL STUDIO</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.4rem] font-black text-slate-900 tracking-tight leading-[1.08] uppercase mb-6">
                We build <br />
                <span className="font-serif italic font-light tracking-wide text-blue-600 normal-case font-medium">digital products</span> <br />
                that drive success.
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md font-medium mb-8">
                An engineered digital studio crafting high-performance websites and modern web applications with clean, functional design.
              </p>
              <div>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-slate-900 text-white hover:bg-black px-8 py-3.5 rounded-full flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Explore Our Work
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slide 2: UI/UX & Bespoke Design */}
            <div className="feature-slide absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none">
              <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] font-extrabold uppercase text-slate-400 select-none mb-4 sm:mb-6">
                <span className="text-blue-600">UI/UX DESIGN</span>
                <span className="w-8 h-[1px] bg-slate-300"></span>
                <span>BESPOKE EXPERIENCES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.4rem] font-black text-slate-900 tracking-tight leading-[1.08] uppercase mb-6">
                Immersive <br />
                <span className="font-serif italic font-light tracking-wide text-blue-600 normal-case font-medium">user journeys</span> <br />
                built pixel perfect.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md font-medium mb-8">
                Where creative vision meets seamless interfaces. We design beautiful, highly interactive paths that capture attention and tell your story.
              </p>
              <div>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-slate-900 text-white hover:bg-black px-8 py-3.5 rounded-full flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-xs tracking-wider uppercase cursor-pointer"
                >
                  View Services
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slide 3: Engineering & Performance */}
            <div className="feature-slide absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none">
              <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] font-extrabold uppercase text-slate-400 select-none mb-4 sm:mb-6">
                <span className="text-blue-600">ENGINEERING</span>
                <span className="w-8 h-[1px] bg-slate-300"></span>
                <span>SPEED & SCALABILITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.4rem] font-black text-slate-900 tracking-tight leading-[1.08] uppercase mb-6">
                Blazing fast <br />
                <span className="font-serif italic font-light tracking-wide text-blue-600 normal-case font-medium">next.js architecture</span> <br />
                with clean code.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md font-medium mb-8">
                We engineer scalable, secure and robust web applications with lightning-fast load speeds, optimizing every script for elite-tier Lighthouse scores.
              </p>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-blue-600">100%</span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                    Performance
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-slate-200 self-center"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">SEO</span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                    Optimized
                  </span>
                </div>
              </div>
            </div>

            {/* Slide 4: Brand Synthesis / CTA */}
            <div className="feature-slide absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none">
              <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] font-extrabold uppercase text-slate-400 select-none mb-4 sm:mb-6">
                <span className="text-blue-600">COLLABORATION</span>
                <span className="w-8 h-[1px] bg-slate-300"></span>
                <span>LET'S CREATE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.4rem] font-black text-slate-900 tracking-tight leading-[1.08] uppercase mb-6">
                Shape the <br />
                <span className="font-serif italic font-light tracking-wide text-blue-600 normal-case font-medium">future of your</span> <br />
                digital presence.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md font-medium mb-8">
                Ready to elevate your business with state-of-the-art web products? Get in touch and let's construct your digital identity together.
              </p>
              <div>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-slate-900 text-white hover:bg-black px-8 py-3.5 rounded-full flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Start a Project
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 select-none z-10 pointer-events-none">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <div className="w-[1.5px] h-8 bg-slate-200 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600 animate-scroll-indicator rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
