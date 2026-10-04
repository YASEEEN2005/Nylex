"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "NYLEX Digital Studio delivered an amazing website for our business. The team is professional, creative and easy to work with.",
    name: "Sarah Johnson",
    role: "Business Owner, USA",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    quote:
      "The custom booking and web application developed by NYLEX transformed our customer experience and scaled our operations seamlessly.",
    name: "Michael Chen",
    role: "Founder, TechVentures",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    quote:
      "Exceptional quality, blazing fast page load speed, and great attention to detail. Highly recommend NYLEX to any ambitious team.",
    name: "Elena Rostova",
    role: "Product Lead, Luxe Living",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
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
              WHAT CLIENTS SAY
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              Trusted by businesses worldwide.
            </p>
          </motion.div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-10 md:p-12 shadow-sm"
          >
            {/* Quote Icon */}
            <div className="text-[#00507D] mb-4 sm:mb-6">
              <Quote className="h-8 w-8 sm:h-10 sm:w-10 fill-[#00507D]/10 rotate-180" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-manrope text-base sm:text-xl md:text-2xl font-medium text-neutral-900 leading-relaxed">
                  "{active.quote}"
                </p>

                {/* Author & Controls Row */}
                <div className="mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <img
                      src={active.avatar}
                      alt={active.name}
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover border border-neutral-200"
                    />
                    <div>
                      <h3 className="font-manrope text-sm sm:text-base md:text-lg font-bold text-neutral-950">
                        {active.name}
                      </h3>
                      <p className="font-inter text-xs sm:text-sm text-neutral-500">
                        {active.role}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={prev}
                      className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-all cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={next}
                      className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-all cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
