"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Process() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "01",
      title: "Discovery Phase",
      desc: "Deep research. We analyze your market footprint, define user personas, map competitor models, and document product specifications.",
    },
    {
      num: "02",
      title: "Strategy & Planning",
      desc: "We design sitemaps, draft wireframes, choose appropriate technology stacks, and finalize execution timelines.",
    },
    {
      num: "03",
      title: "Premium UI/UX Design",
      desc: "Bespoke prototyping. We design immersive visual identities, interactions, and style kits in Figma for client review.",
    },
    {
      num: "04",
      title: "Full-Stack Development",
      desc: "Pixel-perfect engineering. We build using Next.js, clean styles, and optimized database indexing to ensure flawless loads.",
    },
    {
      num: "05",
      title: "QA & Speed Auditing",
      desc: "Rigorous testing. We perform cross-device rendering audits, load velocity checks, and security penetration testing.",
    },
    {
      num: "06",
      title: "Production Launch",
      desc: "Zero-downtime deployment. We set up SSL certificates, secure CDN routing, cache layers, and hook up DNS domains.",
    },
    {
      num: "07",
      title: "Continuous Support",
      desc: "Scaling assistance. We conduct weekly backups, monitor performance indexes, and push version updates regularly.",
    },
  ];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-24 bg-[#F7F4F0] overflow-hidden z-10 border-t border-[#EDE5DB]"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-center">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C] font-sans">
            OUR WORKFLOW
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] font-serif tracking-tight leading-tight">
            How We Execute
          </h2>
          <p className="text-[#7A7A7A] text-sm sm:text-base max-w-md font-sans font-medium">
            A meticulous, systematic execution pipeline engineered to deliver world-class digital assets on schedule.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-4xl flex flex-col gap-12 md:gap-20">
          
          {/* Vertical Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#EDE5DB] -translate-x-1/2 hidden sm:block">
            {/* Active filled line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#8B5E3C] via-[#1C1510] to-[#8B5E3C] origin-top shadow-[0_0_8px_rgba(139,94,60,0.3)]"
            />
          </div>

          {/* Timeline Nodes */}
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.num}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between w-full relative ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Connecting node dot */}
                <div className="absolute left-4 md:left-1/2 top-1.5 md:top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#F7F4F0] border-2 border-[#8B5E3C] shadow-[0_0_8px_rgba(139,94,60,0.15)] -translate-x-1/2 hidden sm:block z-10" />

                {/* Left/Right Card Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                  data-cursor="pointer"
                  className="w-full sm:w-[45%] pl-10 sm:pl-0 flex flex-col gap-3 relative"
                >
                  {/* Step Card */}
                  <div className="p-6 rounded-2xl bg-white border border-[#EDE5DB] hover:border-[#8B5E3C]/50 hover:bg-[#F7F4F0]/40 transition-all duration-300 relative group overflow-hidden shadow-xs">
                    <span className="absolute top-2 right-4 text-3xl font-extrabold font-serif bg-gradient-to-b from-[#8B5E3C]/20 to-transparent bg-clip-text text-transparent group-hover:from-[#8B5E3C]/15 group-hover:to-transparent transition-all duration-300 select-none">
                      {step.num}
                    </span>
                    
                    <h3 className="text-[#1A1A1A] text-lg font-bold font-sans mb-1.5 group-hover:text-[#8B5E3C] transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#7A7A7A] text-xs leading-relaxed font-medium font-sans">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Spacing placeholder */}
                <div className="w-[45%] hidden sm:block" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
