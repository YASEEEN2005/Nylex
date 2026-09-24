"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Amelia Thorne",
      role: "CEO",
      company: "Vogue Couture",
      review:
        "NYLEX re-engineered our couture platform from scratch. The aesthetic appeal of the interface is stunning, and the performance is spectacular. Our conversion rate increased by 40% in the first quarter post-launch.",
      initials: "AT",
      gradient: "from-[#A06F4C] to-[#8B5E3C]",
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Founder",
      company: "Inked Masters",
      review:
        "We needed a studio interface that looked raw, modern, and high-end. The team at NYLEX understood our visual language immediately. Their booking scheduling module is seamless, and our clients love the design.",
      initials: "MV",
      gradient: "from-[#8B5E3C] to-[#5C3A21]",
    },
    {
      id: 3,
      name: "Dr. Sarah Jenkins",
      role: "Director of Systems",
      company: "MediLink Group",
      review:
        "The dashboards NYLEX designed are highly intuitive. Handling patient records, billing cycles, and scheduling matrices is now an effortless experience. Their tech stack choice has given us incredible scalability.",
      initials: "SJ",
      gradient: "from-[#A06F4C] to-[#5C3A21]",
    },
    {
      id: 4,
      name: "Raymond Sterling",
      role: "Managing Partner",
      company: "Metropolis Realty",
      review:
        "An absolute masterclass in web engineering. The 3D map views and property filters work smoothly without lag on mobile devices. Working with NYLEX was professional, transparent, and high-end from day one.",
      initials: "RS",
      gradient: "from-[#C4A482] to-[#8B5E3C]",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-slate-50/50 overflow-hidden z-10 border-t border-slate-200 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto px-6 relative flex flex-col items-center">
        
        {/* Section tag */}
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C] mb-6 font-sans">
          CLIENT TESTIMONIALS
        </span>

        {/* Large Quote Mark */}
        <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs mb-8">
          <Quote className="w-5 h-5 fill-current text-[#8B5E3C]" />
        </div>

        {/* Testimonial slider body */}
        <div className="w-full min-h-[220px] relative overflow-hidden flex items-center justify-center text-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-slate-800 text-xl sm:text-2xl font-normal leading-relaxed italic font-serif tracking-wide max-w-2xl">
                &ldquo;{active.review}&rdquo;
              </p>

              {/* Avatar + Author detail */}
              <div className="flex items-center gap-4 mt-2">
                {/* Custom Gradient Avatar */}
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-tr ${active.gradient} flex items-center justify-center text-white font-extrabold text-xs shadow-xs`}
                >
                  {active.initials}
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-slate-900 text-sm font-extrabold tracking-wide">
                    {active.name}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                    {active.role}, <span className="text-[#8B5E3C]">{active.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-10 z-20">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-white hover:border-[#8B5E3C] hover:bg-slate-900 transition-all duration-300 active:scale-95 shadow-xs cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-white hover:border-[#8B5E3C] hover:bg-slate-900 transition-all duration-300 active:scale-95 shadow-xs cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-1.5 mt-8">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-5 bg-[#8B5E3C]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
