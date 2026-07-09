"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Smartphone, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

// Load 3D physics card component only on client side to avoid Next.js SSR build errors
const BandCard = dynamic(() => import("../components/BandCard"), {
  ssr: false,
});

export default function Services() {
  const [showCard, setShowCard] = useState(true);
  const [mounted, setMounted] = useState(false);

  const services = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Web Development",
      desc: "Custom websites built with modern technologies for performance, scalability and growth.",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "UI/UX Design",
      desc: "Beautiful, user-friendly designs that create strong first impressions and engage users.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Development",
      desc: "Cross-platform mobile apps that deliver seamless experiences on any device.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Branding",
      desc: "Unique brand identities that communicate your value and build lasting trust.",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center px-6 md:px-20 pt-28 pb-16 select-none border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[-10%] w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-[#8B5E3C]/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Heading & Services Grid */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start gap-6 font-sans">
          
          {/* Tagline Status */}
          <div className="flex items-center">
            <motion.span
              animate={{
                width: ["0ch", "16ch", "16ch", "0ch"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.8, 1],
              }}
              className="inline-block overflow-hidden whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-[#8B5E3C] font-mono font-bold"
            >
              ✦ WHAT WE DO
            </motion.span>

            <motion.span
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
              className="text-[#8B5E3C] font-mono ml-[2px]"
            >
              |
            </motion.span>
          </div>

          {/* Huge design model styled titles */}
          <div>
            <h2 className="font-extrabold leading-[1.05] tracking-tight text-white text-[clamp(48px,7vw,90px)]">
              Digital
            </h2>
            <h2 className="font-extrabold leading-[1.05] tracking-tight text-white/70 text-[clamp(48px,7vw,90px)] mb-3">
              Solutions
            </h2>
          </div>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg font-medium font-sans">
            We build state-of-the-art websites, brands and custom applications that load instantly and perform flawlessly.
          </p>

          {/* Services 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-5 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/15 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/80 group-hover:bg-[#8B5E3C] group-hover:text-black transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-white text-sm font-extrabold group-hover:text-[#8B5E3C] transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-white/50 text-[11px] leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Toggle button layout */}
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setShowCard((s) => !s)}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-300 rounded-full cursor-pointer"
            >
              {showCard ? "Hide ID Card" : "Show ID Card"}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-white/80 px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:border-white/30 hover:text-white transition-all duration-300 rounded-full cursor-pointer"
            >
              Get Started
            </a>
          </div>

        </div>

        {/* Right Column: Swinging 3D ID Card Container */}
        <div
          className="col-span-1 lg:col-span-5 h-[480px] w-full flex items-center justify-center relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-950/20"
        >
          <AnimatePresence>
            {showCard && mounted && (
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-[5]"
              >
                <Suspense fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xs font-mono">
                    LOADING 3D PASS...
                  </div>
                }>
                  <BandCard />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
