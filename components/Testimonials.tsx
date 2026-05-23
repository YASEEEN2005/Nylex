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
  },
  {
    quote: "Working with Nylex transformed our product. Their attention to detail and performance optimization is top-notch.",
    author: "Sarah Jenkins",
    role: "CTO, Sleek Studio",
    avatarColor: "bg-emerald-600",
    initials: "SJ",
  },
  {
    quote: "The website they built for us has doubled our conversions. The team is communicative and extremely talented.",
    author: "Marcus Chen",
    role: "Director, Brandify",
    avatarColor: "bg-purple-600",
    initials: "MC",
  },
];

const colorOptions = [
  { class: "bg-blue-600", label: "Blue" },
  { class: "bg-emerald-600", label: "Emerald" },
  { class: "bg-purple-600", label: "Purple" },
  { class: "bg-rose-600", label: "Rose" },
  { class: "bg-amber-500", label: "Amber" },
];

export default function Testimonials() {
  const [isMounted, setIsMounted] = useState(false);
  const [list, setList] = useState(defaultTestimonials);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Form inputs
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [chosenColor, setChosenColor] = useState("bg-blue-600");

  // Load custom testimonials from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("nylex_user_reviews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setList([...defaultTestimonials, ...parsed]);
        }
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, []);

  // Auto-rotating timer
  useEffect(() => {
    if (showForm) return; // pause rotation while writing review

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [list.length, showForm]);

  if (!isMounted) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.015)] h-full flex flex-col justify-between min-h-[420px] animate-pulse">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="h-3 bg-slate-100 rounded-full w-24"></div>
            <div className="h-6 bg-slate-100 rounded-lg w-8 opacity-40"></div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="h-4 bg-slate-100 rounded-full w-full"></div>
            <div className="h-4 bg-slate-100 rounded-full w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded-full w-4/5"></div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100"></div>
            <div className="space-y-1.5">
              <div className="h-3 bg-slate-100 rounded-full w-20"></div>
              <div className="h-2 bg-slate-100 rounded-full w-16"></div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-100"></div>
            <div className="w-2 h-2 rounded-full bg-slate-100"></div>
            <div className="w-2 h-2 rounded-full bg-slate-100"></div>
          </div>
        </div>
      </div>
    );
  }

  // Form Submit Handler
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

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
      role: role.trim() || "Independent Reviewer",
      avatarColor: chosenColor,
      initials: initials || "UX",
    };

    const updatedList = [...list, newReview];
    setList(updatedList);

    // Save client reviews only to LocalStorage
    try {
      const stored = localStorage.getItem("nylex_user_reviews");
      const currentStored = stored ? JSON.parse(stored) : [];
      localStorage.setItem(
        "nylex_user_reviews",
        JSON.stringify([...currentStored, newReview])
      );
    } catch (err) {
      console.error(err);
    }

    // Set view to newly published review
    setActiveIdx(updatedList.length - 1);

    // Clear and hide form
    setName("");
    setRole("");
    setQuote("");
    setChosenColor("bg-blue-600");
    setShowForm(false);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.015)] h-full flex flex-col justify-between min-h-[420px] transition-all duration-300">

      <div>
        {/* Card Header Nav */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-blue-600">
            {showForm ? "Share Your Experience" : "Clients Love Us"}
          </span>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50/60 border border-blue-100/60 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,102,255,0.04)] hover:shadow-[0_4px_15px_rgba(0,102,255,0.15)] group"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600 group-hover:bg-white transition-colors duration-300"></span>
              </span>
              + Write Review
            </button>
          ) : (
            <span className="text-blue-600 text-3xl font-serif leading-none select-none opacity-20">“</span>
          )}
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-[140px]"
            >
              {list.map((t, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={idx}
                    className={`transition-all duration-500 flex flex-col justify-center ${isActive
                        ? "opacity-100 translate-x-0 relative z-10"
                        : "opacity-0 translate-x-4 pointer-events-none absolute top-0 left-0 w-full"
                      }`}
                  >
                    <p className="text-slate-800 text-base sm:text-lg lg:text-xl font-bold leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.form
              key="review-form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handlePublish}
              className="space-y-4 pt-1"
            >
              {/* Review Textarea */}
              <div className="space-y-1">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Your Review</label>
                <textarea
                  required
                  rows={2}
                  maxLength={180}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="The site speed is outstanding! Absolutely transformed our metric scoreboards..."
                  className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-blue-500/30 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Name & Role Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    required
                    type="text"
                    maxLength={30}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rohit Sharma"
                    className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500/30 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Company / Role</label>
                  <input
                    type="text"
                    maxLength={35}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Founder, Nexora"
                    className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500/30 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Avatar Color Choice */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Profile Color Accent</label>
                <div className="flex items-center gap-2">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.class}
                      type="button"
                      onClick={() => setChosenColor(opt.class)}
                      className={`w-5 h-5 rounded-full ${opt.class} transition-all duration-200 cursor-pointer ${chosenColor === opt.class
                          ? "ring-2 ring-blue-500 ring-offset-2 scale-110"
                          : "opacity-80 hover:opacity-100"
                        }`}
                      aria-label={`Select ${opt.label} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info Display & Switchers */}
      {!showForm && list[activeIdx] && (
        <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-6">
          {/* User Profile Card */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${list[activeIdx].avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0`}>
              {list[activeIdx].initials}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 transition-all duration-300">
                {list[activeIdx].author}
              </h4>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {list[activeIdx].role}
              </p>
            </div>
          </div>

          {/* Carousel Slider Controls */}
          <div className="flex items-center gap-2">
            {list.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIdx ? "w-6 bg-blue-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
