"use client";

import React from "react";

const steps = [
  {
    id: "01",
    title: "Discover",
    description: "We understand your business, goals and target audience.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Design",
    description: "We create wireframes and designs that bring ideas to life.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Develop",
    description: "We build fast, responsive and scalable solutions.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Deliver",
    description: "We test, optimize and launch with perfection.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 border-t border-slate-100/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Left Headline */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-blue-600">Our Process</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            A clear process. <br />
            <span className="text-blue-600">Better results.</span>
          </h2>
        </div>

        {/* Right Info */}
        <div className="lg:col-span-6 lg:pt-8">
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
            We follow a simple, transparent process that keeps you involved at every step. From discovery to deployment, we make sure your vision is realized.
          </p>
        </div>
      </div>

      {/* Timeline Steps Wrapper */}
      <div className="relative">
        {/* Connecting Horizontal Line for Desktop */}
        <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[1.5px] bg-slate-100 z-0">
          <div className="w-1/3 h-full bg-blue-600 animate-[draw_2s_ease-in-out_infinite] origin-left"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center text-center group">
              {/* Step Number Circle */}
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center font-bold text-sm text-slate-500 mb-6 transition-all duration-300 group-hover:border-blue-600 group-hover:text-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.1)] relative z-10">
                {step.id}
              </div>

              {/* Icon Box */}
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-50 group-hover:border-blue-100/50 transition-all duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[220px] font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
