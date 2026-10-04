"use client";

import { motion } from "framer-motion";
import { Search, Map, Palette, Code2, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understanding your goals",
    icon: Search,
  },
  {
    num: "02",
    title: "Plan",
    desc: "Strategy and roadmap",
    icon: Map,
  },
  {
    num: "03",
    title: "Design",
    desc: "Creative and modern design",
    icon: Palette,
  },
  {
    num: "04",
    title: "Develop",
    desc: "Build with latest technologies",
    icon: Code2,
  },
  {
    num: "05",
    title: "Launch",
    desc: "Test, deploy and support",
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Header */}
        <div className="text-center lg:text-left pb-12 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              OUR PROCESS
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              A simple and transparent process to bring your ideas to life.
            </p>
          </motion.div>
        </div>

        {/* 5-Step Process Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col items-center sm:items-start text-center sm:text-left rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs hover:border-[#00507D]/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Step Number & Icon */}
                <div className="flex w-full items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                  <span className="font-manrope text-xl font-extrabold text-[#00507D] transition-transform duration-300 group-hover:scale-110">
                    {step.num}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D] group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="font-manrope text-lg sm:text-xl font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2 font-inter text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
