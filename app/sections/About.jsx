"use client";

import { motion } from "framer-motion";
import { Zap, Users, ShieldCheck, HeartHandshake } from "lucide-react";

export default function About() {
  const features = [
    { text: "Innovation Driven", icon: Zap },
    { text: "Client Focused", icon: Users },
    { text: "Quality First", icon: ShieldCheck },
    { text: "Long Term Partnership", icon: HeartHandshake },
  ];

  return (
    <section
      id="about"
      className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              ABOUT NYLEX
            </h2>

            <p className="mt-6 font-inter text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed">
              We are a team of passionate developers, designers and problem solvers building digital products that make an impact.
            </p>
          </motion.div>

          {/* Bullet Points Grid */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-4 transition-colors hover:border-[#00507D]/40 hover:bg-white shadow-2xs"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-manrope text-sm sm:text-base font-semibold text-neutral-900">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-14 pt-8 border-t border-neutral-200/80 flex items-center justify-start gap-6 sm:gap-14 flex-wrap sm:flex-nowrap"
          >
            <div>
              <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">2</p>
              <p className="font-inter text-xs sm:text-sm text-neutral-500 mt-0.5">Founders</p>
            </div>
            <div className="h-10 w-px bg-neutral-200" />
            <div>
              <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">50+</p>
              <p className="font-inter text-xs sm:text-sm text-neutral-500 mt-0.5">Projects</p>
            </div>
            <div className="h-10 w-px bg-neutral-200" />
            <div>
              <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">20+</p>
              <p className="font-inter text-xs sm:text-sm text-neutral-500 mt-0.5">Clients</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
