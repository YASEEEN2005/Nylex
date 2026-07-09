"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const techs = ["UI/UX Design", "Web Development", "Mobile Apps", "Branding"];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center pt-24 pb-16 select-none"
    >
      {/* Decorative Ambient Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-white/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] bg-[#8B5E3C]/20 blur-[110px] rounded-full" />
      </div>

      {/* Repeating Marquee Band (placed under the navbar) */}
      <div className="absolute top-[88px] left-0 right-0 z-10 bg-white/5 border-y border-white/10 backdrop-blur-md overflow-hidden py-3">
        <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap text-[10px] uppercase tracking-widest font-mono text-white/50 gap-10">
          <span>✦ Premium UI/UX Design</span>
          <span>✦ Full-Stack Development</span>
          <span>✦ React & Next.js Experts</span>
          <span>✦ Zero-Downtime Deployment</span>
          <span>✦ Custom Digital Solutions</span>
          <span>✦ Optimized Lighthouse Performance</span>
          {/* Repeated for continuous loop */}
          <span>✦ Premium UI/UX Design</span>
          <span>✦ Full-Stack Development</span>
          <span>✦ React & Next.js Experts</span>
          <span>✦ Zero-Downtime Deployment</span>
          <span>✦ Custom Digital Solutions</span>
          <span>✦ Optimized Lighthouse Performance</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 mt-12 lg:mt-8">
        
        {/* Left Column: Typography & CTAs */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start gap-6 font-sans">
          
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-white/60 text-[10px] font-bold uppercase tracking-[0.25em]"
          >
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
            ✦ AVAILABLE FOR NEW PROJECTS
          </motion.div>

          {/* Large Display Typography */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[clamp(44px,7vw,88px)] font-black leading-[1.05] tracking-tight text-white font-sans">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="block"
              >
                We Design.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-white/70"
              >
                We Develop.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-[#8B5E3C] to-white animate-[shine_4s_linear_infinite]"
              >
                We Deliver.
              </motion.span>
            </h1>
          </div>

          {/* Premium Shine Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg font-medium font-sans"
          >
            Nylex is a creative digital studio crafting premium websites, brands, and digital products that help modern businesses establish authority and scale.
          </motion.p>

          {/* Tech Badges Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-2.5 mt-2"
          >
            {techs.map((tech) => (
              <div
                key={tech}
                className="relative group px-4 py-2 rounded-xl text-xs font-semibold text-white/80 bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-[#8B5E3C]/20 via-[#8B5E3C]/10 to-transparent" />
                <span className="relative z-10">{tech}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
          >
            <a
              href="#work"
              data-cursor="pointer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-bold text-xs tracking-wider hover:bg-[#8B5E3C] hover:text-white transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
            >
              Explore Our Work
              <span>→</span>
            </a>

            <a
              href="#services"
              data-cursor="pointer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black font-bold text-xs tracking-wider transition-all duration-300 text-center flex items-center justify-center"
            >
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Right Column: Floating Artwork Visual with ambient background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="col-span-1 lg:col-span-5 flex justify-center items-center relative h-[380px] lg:h-[480px]"
        >
          {/* Subtle spinning concentric ring behind the artwork */}
          <div className="absolute w-[80%] aspect-square rounded-full border border-white/5 animate-[spinGlow_24s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[95%] aspect-square rounded-full border border-dashed border-white/10 animate-[spinGlow_40s_linear_infinite] pointer-events-none" />

          {/* Floating graphic container */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="w-[90%] h-[90%] relative flex items-center justify-center"
          >
            <Image
              src="/hero-eye.png"
              alt="Luxury Graphic Artwork"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.06)]"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
