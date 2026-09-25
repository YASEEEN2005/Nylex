"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Amelia Thorne",
      role: "CEO",
      company: "Vogue Couture",
      review:
        "NYLEX built our luxury retail platform with exceptional speed and clean aesthetics. Our online conversion rate increased significantly within 30 days of launch.",
      initials: "AT",
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Founder",
      company: "Amazink Tattoo Studio",
      review:
        "The team understood our artistic vision immediately. Their custom artist booking module is seamless and our clients love the mobile experience.",
      initials: "MV",
    },
    {
      id: 3,
      name: "Dr. Sarah Jenkins",
      role: "Director of Systems",
      company: "MediLink Group",
      review:
        "The custom dashboards engineered by NYLEX are intuitive and ultra-fast. Managing records and appointments is now completely effortless.",
      initials: "SJ",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => handleNext(), 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-[#FAF9F6] text-slate-900 overflow-hidden z-10 border-t border-slate-200/90 font-sans">
      <div className="max-w-4xl mx-auto px-6 relative flex flex-col items-center">
        
        {/* Section Tag */}
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5E3C] mb-4 font-mono">
          ✦ CLIENT TESTIMONIALS
        </span>
        <h2 className="font-serif font-bold text-[clamp(32px,5vw,60px)] leading-[1.08] text-slate-900 mb-12 text-center">
          What Our Partners Say
        </h2>

        {/* Testimonial Card */}
        <div className="w-full bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden min-h-[260px] flex flex-col justify-between">
          <Quote className="w-12 h-12 text-[#8B5E3C]/15 absolute top-6 right-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-800 text-base sm:text-xl font-medium leading-relaxed italic">
                "{active.review}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-[#8B5E3C] text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
                  {active.initials}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-900 text-sm">{active.name}</h4>
                  <span className="text-slate-500 text-xs font-medium">
                    {active.role}, {active.company}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-3">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "w-6 bg-[#8B5E3C]" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
