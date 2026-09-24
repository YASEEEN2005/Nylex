"use client";

import { motion } from "framer-motion";

export default function Process() {
  const phases = [
    {
      name: "Phase 1: Foundation",
      stepCount: "02",
      steps: [
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
      ],
    },
    {
      name: "Phase 2: Creation",
      stepCount: "02",
      steps: [
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
      ],
    },
    {
      name: "Phase 3: Deployment",
      stepCount: "03",
      steps: [
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
      ],
    },
  ];

  return (
    <section
      id="process"
      className="relative py-16 sm:py-24 bg-white overflow-hidden z-10 border-t border-slate-200 font-sans text-slate-900 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative flex flex-col items-start gap-8 sm:gap-12">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 sm:gap-5 items-start"
        >
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
              OUR WORKFLOW
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-extrabold leading-[1.1] tracking-tight text-[clamp(32px,5.5vw,72px)] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent">
              How We Execute
            </h2>
          </div>
          
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-xl font-medium">
            A meticulous, systematic execution pipeline engineered to deliver world-class digital assets on schedule.
          </p>
        </motion.div>

        {/* Horizontal Phases Flow with Mobile Horizontal Swipe Track */}
        <div className="flex flex-col gap-8 sm:gap-12 w-full mt-2 sm:mt-4">
          {phases.map((phase, pIdx) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: pIdx * 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Phase Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[#8B5E3C] font-mono text-[11px] sm:text-xs tracking-[0.2em] font-bold uppercase">
                  <span>{phase.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{phase.stepCount} Steps</span>
                </div>
                <div className="h-[1px] w-full bg-slate-200" />
              </div>

              {/* Mobile Swipeable horizontal track / Desktop Grid */}
              <div className="w-full">
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 pb-2 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible w-full">
                  {phase.steps.map((step) => (
                    <motion.div
                      key={step.num}
                      whileHover={{ y: -4, borderColor: "rgba(139, 94, 60, 0.5)" }}
                      className="snap-center shrink-0 w-[82vw] sm:w-auto group p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 relative overflow-hidden h-full cursor-default"
                    >
                      <div className="flex flex-col gap-2 relative z-10">
                        <div className="flex items-start justify-between">
                          <span className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#8B5E3C] transition-colors duration-300 select-none">
                            {step.num}
                          </span>
                        </div>
                        <h3 className="text-slate-900 text-sm sm:text-base font-extrabold group-hover:text-[#8B5E3C] transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed font-medium relative z-10">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
