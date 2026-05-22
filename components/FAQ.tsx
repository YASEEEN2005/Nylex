"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We specialize in Web Development, UI/UX Design, Branding, and Search Engine Optimization (SEO). We offer full-cycle development from idea/wireframing to launch and maintenance.",
  },
  {
    question: "How long does a project take?",
    answer: "Project timelines vary depending on complexity. Typically, a standard landing page takes 2-4 weeks, while complex web applications can take 6-12 weeks. We map out precise schedules before starting.",
  },
  {
    question: "Do you work with startups?",
    answer: "Yes, we love working with startups! We build modern MVP applications, optimize existing projects for scalability, and help establish clean, strong branding to attract users and investors.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-blue-600">
          FAQ Accordion
        </span>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-5 first:pt-0 last:pb-0">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-800 hover:text-blue-600 transition-colors py-1 group cursor-pointer"
              >
                <span className="text-base sm:text-lg tracking-tight">
                  {faq.question}
                </span>
                <span className="ml-4 w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:border-blue-200 group-hover:text-blue-600 transition-all shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Animated content collapse */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-slate-500 text-sm leading-relaxed font-medium pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
