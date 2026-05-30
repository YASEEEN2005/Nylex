"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultTestimonials = [
  {
    quote: "Nylex team is professional, fast and delivers outstanding quality. Highly recommended!",
    author: "Rohit Sharma",
    role: "Founder, Nexora",
    avatarColor: "bg-blue-600",
    initials: "RS",
    rating: 5,
  },
  {
    quote: "Working with Nylex transformed our product. Their attention to detail and performance optimization is top-notch.",
    author: "Sarah Jenkins",
    role: "CTO, Sleek Studio",
    avatarColor: "bg-emerald-600",
    initials: "SJ",
    rating: 5,
  },
  {
    quote: "The website they built for us has doubled our conversions. The team is communicative and extremely talented.",
    author: "Marcus Chen",
    role: "Director, Brandify",
    avatarColor: "bg-purple-600",
    initials: "MC",
    rating: 5,
  },
];

export default function Testimonials() {
  const [isMounted, setIsMounted] = useState(false);
  const [list, setList] = useState(defaultTestimonials);
  const [activeIdx, setActiveIdx] = useState(0);

  // Form inputs
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Load custom testimonials from Database on mount
  useEffect(() => {
    setIsMounted(true);
    
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            setList([...defaultTestimonials, ...data.data]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    
    fetchReviews();
  }, []);

  // Form Submit Handler
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim() || rating === 0) return;

    // Build Initials
    const initials = name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newReview = {
      quote: quote.trim(),
      author: name.trim(),
      role: "Independent Reviewer",
      avatarColor: "bg-blue-600",
      initials: initials || "UX",
      rating,
    };

    // Save client reviews to Database
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const updatedList = [...list, data.data];
          setList(updatedList);
          setActiveIdx(updatedList.length - 1);
        }
      } else {
        const updatedList = [...list, newReview];
        setList(updatedList);
        setActiveIdx(updatedList.length - 1);
      }
    } catch (err) {
      console.error('Failed to save review:', err);
      const updatedList = [...list, newReview];
      setList(updatedList);
      setActiveIdx(updatedList.length - 1);
    }

    // Clear form
    setName("");
    setQuote("");
    setRating(0);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  if (!isMounted) return null;

  return (
    <section id="review" className="py-16 md:py-20 bg-[#fafcff] relative overflow-hidden font-sans">
      
      {/* Decorative Dots Pattern */}
      <div className="absolute left-10 md:left-32 top-32 opacity-20 pointer-events-none hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-blue-500">
          <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      {/* Decorative Radial Waves Pattern */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block overflow-visible w-[400px] h-[600px]">
        <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-[-100px] top-0 w-[500px] h-[600px]">
          <circle cx="450" cy="300" r="100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"/>
          <circle cx="450" cy="300" r="150" stroke="#3b82f6" strokeWidth="1" opacity="0.2"/>
          <circle cx="450" cy="300" r="200" stroke="#3b82f6" strokeWidth="1" opacity="0.1"/>
          <circle cx="450" cy="300" r="250" stroke="#3b82f6" strokeWidth="2" opacity="0.05"/>
          <circle cx="450" cy="300" r="300" stroke="#3b82f6" strokeWidth="2" opacity="0.05"/>
          <circle cx="450" cy="300" r="350" stroke="#3b82f6" strokeWidth="4" opacity="0.03"/>
          <circle cx="450" cy="300" r="400" stroke="#3b82f6" strokeWidth="4" opacity="0.02"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-[1440px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-blue-600 font-extrabold tracking-widest uppercase text-[10px] md:text-xs mb-3">Testimonials</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">Loved by clients. Proven by results.</h2>
          <p className="text-slate-500 text-base md:text-lg">Real reviews from real people who chose Nylex.</p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Testimonial Display */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full relative min-h-[360px] flex flex-col justify-between">
              
              <div className="mb-6">
                {/* Quotation Icon */}
                <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col"
                >
                  {/* Stars Display */}
                  <div className="flex gap-1.5 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${star <= (list[activeIdx].rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote Text */}
                  <h4 className="text-xl md:text-[22px] font-bold text-slate-900 leading-[1.5] mb-6 flex-grow">
                    {list[activeIdx].quote}
                  </h4>

                  <hr className="border-slate-100 mb-6" />

                  {/* Author Block */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${list[activeIdx].avatarColor || 'bg-blue-600'} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
                        {list[activeIdx].initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-[15px]">{list[activeIdx].author}</div>
                        {list[activeIdx].role && (
                          <div className="text-slate-500 text-[13px] font-medium">{list[activeIdx].role}</div>
                        )}
                      </div>
                    </div>
                    {/* Small Quotes icon on the right */}
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-200 flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button onClick={handlePrev} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-colors bg-white shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <div className="flex items-center gap-2">
                {list.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? "w-6 bg-blue-600" : "w-2 bg-slate-200 hover:bg-slate-300"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-colors bg-white shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#f8faff] rounded-3xl p-6 md:p-8 border border-slate-100/50 shadow-sm w-full relative">
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center mb-5 shadow-sm border border-slate-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">Share your experience</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Your feedback helps us grow and helps others make confident decisions.</p>

            <form onSubmit={handlePublish}>
              
              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Your name</label>
                <input
                  required
                  type="text"
                  maxLength={30}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Rating Section */}
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Your rating</label>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-6 h-6 ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300 stroke-slate-300 fill-transparent'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <span className="text-slate-400 text-[13px] font-medium">Select a star</span>
                </div>
              </div>

              {/* Review Textarea */}
              <div className="mb-8">
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Your review</label>
                <textarea
                  required
                  rows={4}
                  maxLength={180}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder:text-slate-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#0a1128] text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
              >
                Submit Review
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"></path>
                  <path d="M7 7h10v10"></path>
                </svg>
              </button>

              <div className="flex items-center gap-2 mt-5 text-[11px] text-slate-500 font-medium justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your review is public and may be displayed on our website.
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
