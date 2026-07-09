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
      className="relative py-28 bg-black overflow-hidden z-10 border-t border-white/10 font-sans"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-start gap-12">
        
        {/* Section Title */}
        <div className="flex flex-col gap-6 items-start">
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              OUR WORKFLOW
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          {/* Heading in display clamp style */}
          <div className="flex flex-col">
            <h2 className="font-extrabold leading-[1.05] tracking-tight text-white text-[clamp(48px,7vw,90px)]">
              How We
            </h2>
            <h2 className="font-extrabold leading-[1.05] tracking-tight text-white/70 text-[clamp(48px,7vw,90px)]">
              Execute
            </h2>
          </div>
          
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            A meticulous, systematic execution pipeline engineered to deliver world-class digital assets on schedule.
          </p>
        </div>

        {/* Horizontal Phases Flow */}
        <div className="flex flex-col gap-12 w-full mt-6">
          {phases.map((phase, pIdx) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: pIdx * 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Phase Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[#8B5E3C] font-mono text-xs tracking-[0.2em] font-semibold uppercase">
                  <span>{phase.name}</span>
                  <span className="text-[10px] text-white/40">{phase.stepCount} Steps</span>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#8B5E3C] via-[#8B5E3C]/20 to-transparent" />
              </div>

              {/* Steps responsive grid inside phase */}
              <div
                className={`grid grid-cols-1 gap-6 w-full ${
                  phase.steps.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                }`}
              >
                {phase.steps.map((step) => (
                  <div
                    key={step.num}
                    className="group p-6 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-[#8B5E3C]/30 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden h-full"
                  >
                    {/* Radial gold hover reflection backdrop */}
                    <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#8B5E3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="flex items-start justify-between">
                        <span className="text-3xl font-black bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent group-hover:from-[#8B5E3C] group-hover:to-transparent transition-all duration-300 select-none">
                          {step.num}
                        </span>
                      </div>
                      <h3 className="text-white text-base font-extrabold group-hover:text-[#8B5E3C] transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-white/50 text-[12px] leading-relaxed font-medium relative z-10">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
