"use client";

import React from "react";

const services = [
  {
    title: "Web Development",
    description: "Fast, scalable and modern websites built with the latest technologies.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 20h10" />
        <path d="M9 16v4" />
        <path d="M15 16v4" />
        <circle cx="6" cy="7" r="1" fill="currentColor" />
        <circle cx="9" cy="7" r="1" fill="currentColor" />
        <circle cx="12" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description: "Clean, user-focused designs that create powerful digital experiences.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: "Branding",
    description: "Strong brand identities that communicate and build trust.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "SEO & Performance",
    description: "Optimized websites that rank higher and perform better.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-20 border-t border-slate-100/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

        {/* Header Left */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-blue-600">What We Do</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Services built for <br />
            <span className="text-blue-600">modern businesses.</span>
          </h2>
        </div>

        {/* Header Right */}
        <div className="lg:col-span-6 lg:pt-8">
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
            We combine strategy, design and technology to create digital products that deliver real results. Our custom workflow aligns with your business objectives to secure true market growth.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-blue-200/50 hover:translate-y-[-6px] transition-all duration-300 flex flex-col justify-between min-h-[250px] group cursor-pointer"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 bg-blue-50 border border-blue-100/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                {svc.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {svc.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {svc.description}
              </p>
            </div>

            {/* Bottom Arrow */}
            <div className="pt-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-100 bg-slate-50 text-slate-800 font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
