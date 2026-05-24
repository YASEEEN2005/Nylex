"use client";

import React from "react";

export default function MobileHero() {
  return (
    <section className="relative w-full h-screen bg-white bg-[url('/mobile-hero-section.png')] bg-cover bg-bottom md:hidden flex flex-col justify-between pt-28 pb-10 px-6 overflow-hidden">
      {/* Top/Middle Content */}
      <div className="flex flex-col items-start text-left max-w-md">
        {/* Label */}
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-blue-600 uppercase mb-5">
          <span>Digital Studio</span>
          <div className="h-[1.5px] w-12 bg-slate-200" />
        </div>

        {/* Headline */}
        <h1 className="text-[34px] sm:text-[38px] font-extrabold text-black tracking-tight leading-[1.2] mb-6">
          We build <br />
          digital experiences <br />
          that move <br />
          <span className="text-blue-600">businesses forward.</span>
        </h1>

        {/* Paragraph */}
        <p className="text-[15px] sm:text-base leading-relaxed text-slate-500 font-normal mb-8 max-w-[95%]">
          We design and build fast, modern and scalable websites & digital products that drive real growth.
        </p>

        {/* Explore Button */}
        <button
          onClick={() => {
            const el = document.getElementById("services");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-black text-white hover:bg-slate-900 px-6 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-slate-900/10"
        >
          <span>Explore Our Work</span>
          <span className="text-xs font-bold">↗</span>
        </button>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center gap-1.5 w-full text-center mt-auto">
        <span className="text-[9px] tracking-[0.25em] font-extrabold text-slate-400 uppercase">
          Scroll to explore
        </span>
        <span className="text-slate-600 text-lg animate-bounce">↓</span>
      </div>
    </section>
  );
}
