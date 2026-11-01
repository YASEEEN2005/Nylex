"use client";

import { motion } from "framer-motion";
import {
  Target,
  Compass,
  Zap,
  Users,
  Award,
  HeartHandshake,
} from "lucide-react";

// 1. Company Statistics (Strictly authentic figures)
const stats = [
  { value: "2", label: "Founders" },
  { value: "50+", label: "Projects" },
  { value: "20+", label: "Clients" },
];

// 2. Core Values
const coreValues = [
  {
    title: "Innovation Driven",
    description:
      "We embrace new ideas and modern technologies to create better digital experiences.",
    icon: Zap,
  },
  {
    title: "Client Focused",
    description:
      "We listen carefully, understand each client's goals, and develop solutions that meet their needs.",
    icon: Users,
  },
  {
    title: "Quality First",
    description:
      "We prioritize quality, performance, usability, and attention to detail in every project.",
    icon: Award,
  },
  {
    title: "Long-Term Partnership",
    description:
      "We aim to build lasting relationships by providing dependable support and solutions that grow with our clients.",
    icon: HeartHandshake,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-36 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {/* ============================================================ */}
        {/* 1. ABOUT SECTION CONTENT & COMPANY STATISTICS                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
              ABOUT NYLEX DIGITAL STUDIO
            </div>

            {/* Main Heading */}
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950 leading-[1.15]">
              We Turn Ideas Into Powerful Digital Experiences.
            </h2>
          </motion.div>

          {/* Right Column: Introduction + Authentic Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            {/* Introduction Copy */}
            <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed font-inter">
              <p>
                At NYLEX Digital Studio, we help businesses establish a strong
                digital presence through innovative web solutions, thoughtful
                design, and modern technology. We believe every business has a
                unique story, and our mission is to transform that story into a
                meaningful digital experience that attracts customers, builds
                trust, and supports long-term growth.
              </p>
              <p>
                Founded by{" "}
                <span className="font-semibold text-neutral-900">
                  Nithanth Harsha
                </span>{" "}
                and{" "}
                <span className="font-semibold text-neutral-900">
                  Muhammad Yaseen
                </span>
                , our studio combines creativity, technical expertise, and a
                client-first approach to create digital solutions tailored to
                each business&apos;s goals.
              </p>
            </div>

            {/* Co-Founders Minimalist Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                Co-Founders:
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-xs font-semibold text-neutral-900 font-inter">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
                Nithanth Harsha
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-xs font-semibold text-neutral-900 font-inter">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
                Muhammad Yaseen
              </div>
            </div>

            {/* Company Statistics (Accurate & Authentic) */}
            <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-neutral-200/80 grid grid-cols-3 gap-4 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950">
                    {stat.value}
                  </p>
                  <p className="font-inter text-xs sm:text-sm font-medium text-neutral-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 2. OUR MISSION & VISION (Two Premium Cards)                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-10 transition-all duration-300 hover:border-[#00507D]/40 hover:bg-white hover:shadow-xl hover:shadow-[#00507D]/5 overflow-hidden"
          >
            {/* Decorative brand blue top edge accent */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#00507D]/30 to-transparent group-hover:via-[#00507D] transition-colors duration-300" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10 group-hover:scale-105 transition-transform duration-300">
                <Target className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00507D] bg-[#f0f9ff] px-2.5 py-1 rounded-md border border-[#00507D]/10">
                Our Purpose
              </span>
            </div>

            <h3 className="font-manrope text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Our Mission
            </h3>
            <p className="mt-4 font-inter text-base sm:text-lg text-neutral-600 leading-relaxed">
              Our mission is to empower businesses with creative, reliable, and
              effective digital solutions that simplify their operations,
              strengthen their online presence, and help them grow in an
              increasingly digital world.
            </p>
          </motion.div>

          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-10 transition-all duration-300 hover:border-[#00507D]/40 hover:bg-white hover:shadow-xl hover:shadow-[#00507D]/5 overflow-hidden"
          >
            {/* Decorative brand blue top edge accent */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#00507D]/30 to-transparent group-hover:via-[#00507D] transition-colors duration-300" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10 group-hover:scale-105 transition-transform duration-300">
                <Compass className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00507D] bg-[#f0f9ff] px-2.5 py-1 rounded-md border border-[#00507D]/10">
                Our Horizon
              </span>
            </div>

            <h3 className="font-manrope text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Our Vision
            </h3>
            <p className="mt-4 font-inter text-base sm:text-lg text-neutral-600 leading-relaxed">
              Our vision is to become a trusted digital technology partner for
              businesses by delivering meaningful digital experiences,
              maintaining high standards of quality, and building long-lasting
              relationships with our clients.
            </p>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 3. OUR CORE VALUES (4 Improved Value Cards)                  */}
        {/* ============================================================ */}
        <div className="space-y-10 sm:space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center sm:text-left max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
              OUR PRINCIPLES
            </div>
            <h3 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950">
              Our Core Values
            </h3>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              The fundamental standards that guide our work, decisions, and client relationships.
            </p>
          </motion.div>

          {/* 4 Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 transition-all duration-300 hover:border-[#00507D]/40 hover:bg-white hover:shadow-lg hover:shadow-neutral-900/5"
                >
                  <div>
                    {/* Icon Container */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10 group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300 group-hover:scale-105 mb-4">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Value Title */}
                    <h4 className="font-manrope text-lg font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                      {val.title}
                    </h4>

                    {/* Value Description */}
                    <p className="mt-2 font-inter text-sm text-neutral-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  {/* Decorative subtle blue dot */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="h-1.5 w-6 rounded-full bg-neutral-200 group-hover:bg-[#00507D] transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
