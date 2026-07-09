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
      gradient: "from-[#8B5E3C] to-[#1C1510]",
    },
    {
      id: 3,
      name: "Dr. Sarah Jenkins",
      role: "Director of Systems",
      company: "MediLink Group",
      review:
        "The dashboards NYLEX designed are highly intuitive. Handling patient records, billing cycles, and scheduling matrices is now an effortless experience. Their tech stack choice has given us incredible scalability.",
      initials: "SJ",
      gradient: "from-[#A06F4C] to-[#1C1510]",
    },
    {
      id: 4,
      name: "Raymond Sterling",
      role: "Managing Partner",
      company: "Metropolis Realty",
      review:
        "An absolute masterclass in web engineering. The 3D map views and property filters work smoothly without lag on mobile devices. Working with NYLEX was professional, transparent, and high-end from day one.",
      initials: "RS",
      gradient: "from-[#EDE5DB] to-[#8B5E3C]",
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
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 bg-black overflow-hidden z-10 border-t border-white/10">
      {/* Background soft glowing highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative flex flex-col items-center">
        
        {/* Section tag */}
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C] mb-6 font-sans">
          CLIENT TESTIMONIALS
        </span>

        {/* Large Quote Mark */}
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 mb-8">
          <Quote className="w-5 h-5 fill-current" />
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
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-white text-xl sm:text-2xl font-normal leading-relaxed italic font-serif tracking-wide max-w-2xl">
                &ldquo;{active.review}&rdquo;
              </p>

              {/* Avatar + Author detail */}
              <div className="flex items-center gap-4 mt-2">
                {/* Custom Gradient Avatar */}
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-tr ${active.gradient} flex items-center justify-center text-white font-extrabold text-xs border border-white/20 shadow-md`}
                >
                  {active.initials}
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-white text-sm font-extrabold tracking-wide">
                    {active.name}
                  </h4>
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">
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
            data-cursor="pointer"
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/75 hover:text-white hover:border-[#8B5E3C] hover:bg-white/10 transition-all duration-300 active:scale-95 bg-white/5 shadow-xs"
            aria-label="Previous Testimonial"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={handleNext}
            data-cursor="pointer"
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/75 hover:text-white hover:border-[#8B5E3C] hover:bg-white/10 transition-all duration-300 active:scale-95 bg-white/5 shadow-xs"
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
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-5 bg-[#8B5E3C]" : "bg-white/20 hover:bg-white/45"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
