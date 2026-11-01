"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star, CheckCircle2, X, PenLine } from "lucide-react";

const fallbackTestimonials = [
  {
    id: 1,
    quote:
      "NYLEX Digital Studio delivered an amazing website for our business. The team is professional, creative, and remarkably easy to work with from concept to deployment.",
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "Taste of Malabar",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-05-14T10:00:00Z",
  },
  {
    id: 2,
    quote:
      "The custom booking system and web platform developed by NYLEX transformed our client experience and scaled our studio operations seamlessly across branches.",
    name: "Michael Chen",
    role: "Founder & Creative Lead",
    company: "Amazink Collective",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-06-02T14:30:00Z",
  },
  {
    id: 3,
    quote:
      "Exceptional engineering quality, blazing fast page load speed, and great attention to detail. Highly recommend NYLEX to any ambitious team looking to scale.",
    name: "Elena Rostova",
    role: "Product Lead",
    company: "Luxe Living",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-07-19T09:15:00Z",
  },
  {
    id: 4,
    quote:
      "Their Next.js architecture and UI/UX design took our brand to the next level. Seamless workflow, rapid turnaround, and robust post-launch support.",
    name: "David Al-Mansoor",
    role: "Managing Director",
    company: "Defense Security IT",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-08-11T12:00:00Z",
  },
  {
    id: 5,
    quote:
      "Working with NYLEX was an absolute pleasure. They listened attentively to our specifications and delivered a modern web app that exceeded our highest expectations.",
    name: "Priya Sharma",
    role: "Head of Operations",
    company: "Sensix Global",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-09-05T16:45:00Z",
  },
  {
    id: 6,
    quote:
      "Precision, clean code, and premium design sensibility. NYLEX understood our industrial requirements and executed a flawless product catalog showcase.",
    name: "Thomas Matthew",
    role: "Executive Director",
    company: "Galaxy Granites",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-09-28T11:20:00Z",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Review Submission Modal State
  const [reviewModal, setReviewModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials)) {
          if (data.testimonials.length > 0) {
            setTestimonials(data.testimonials);
          }
        }
      }
    } catch (err) {
      // Retains fallback testimonials
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        await fetchTestimonials();
        setTimeout(() => {
          setReviewModal(false);
          setSubmittedSuccess(false);
          setNewReview({ name: "", role: "", company: "", quote: "", rating: 5 });
        }, 1800);
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Mobile swipe & button navigation helpers
  const handleMobileScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    const targetScroll =
      direction === "next"
        ? container.scrollLeft + cardWidth
        : container.scrollLeft - cardWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const onScrollUpdate = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    const activeIdx = Math.round(container.scrollLeft / cardWidth);
    setMobileIndex(Math.min(testimonials.length - 1, Math.max(0, activeIdx)));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recent Client";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Recent Client";
    }
  };

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full bg-[#fcfdfd] text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Section Header & Write Review Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
              CLIENT EXPERIENCES
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              WHAT CLIENTS SAY
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600 max-w-xl">
              Trusted by businesses and ambitious founders worldwide.
            </p>
          </motion.div>

          {/* Prominent Minimalist & Premium "Write a Review" Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 self-start md:self-auto"
          >
            <button
              onClick={() => setReviewModal(true)}
              className="group relative inline-flex items-center gap-3.5 sm:gap-4 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-neutral-950 hover:bg-[#00507D] text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,80,125,0.28)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-neutral-800 hover:border-[#00507D]/60"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
                <PenLine className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-bold font-manrope tracking-tight leading-tight text-white">
                  Write a Review
                </span>
                <span className="text-[11px] text-neutral-400 group-hover:text-white/85 font-medium font-inter leading-tight mt-0.5">
                  Share your experience
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 pl-3 ml-1 border-l border-white/15">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & LAPTOP LAYOUT: Multi-Column Independent Review Cards Grid        */}
        {/* ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {testimonials.map((review, index) => {
            const initials = review.name
              ? review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "CL";

            return (
              <motion.article
                key={`desktop-rev-${review.id ?? "fb"}-${index}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-7 sm:p-8 shadow-xs hover:border-[#00507D]/35 hover:shadow-xl hover:shadow-[#00507D]/5 transition-all duration-300"
              >
                <div>
                  {/* Top Row: 5 Gold Stars & Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-1 text-amber-400" aria-label={`${review.rating || 5} out of 5 stars`}>
                      {Array.from({ length: review.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100/80 border border-neutral-200/70 text-[10px] font-semibold text-neutral-600 font-inter">
                      <CheckCircle2 className="w-3 h-3 text-[#00507D]" />
                      <span>Verified Client</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="font-inter text-neutral-800 text-sm sm:text-[15px] leading-relaxed line-clamp-5">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Reviewer Profile & Publication Info */}
                <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {review.avatar_url ? (
                      <img
                        src={review.avatar_url}
                        alt={review.name}
                        className="h-10 w-10 rounded-full object-cover border border-neutral-200 shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-[#f0f9ff] text-[#00507D] font-bold font-manrope text-xs flex items-center justify-center border border-[#00507D]/20 shrink-0">
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-manrope text-sm font-bold text-neutral-950 truncate">
                        {review.name}
                      </h4>
                      <p className="font-inter text-xs text-neutral-500 truncate">
                        {review.role}
                        {review.company ? ` • ${review.company}` : ""}
                      </p>
                    </div>
                  </div>

                  {review.created_at && (
                    <span className="text-[11px] font-mono text-neutral-400 shrink-0 hidden sm:inline">
                      {formatDate(review.created_at)}
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE REVIEW BROWSING: Compact Card-by-Card with Scroll Snapping         */}
        {/* ========================================================================= */}
        <div className="md:hidden">
          {/* Scroll-Snap Container */}
          <div
            ref={scrollContainerRef}
            onScroll={onScrollUpdate}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-1"
          >
            {testimonials.map((review, index) => {
              const initials = review.name
                ? review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "CL";

              return (
                <div
                  key={`mobile-rev-${review.id ?? "fb"}-${index}`}
                  className="w-[88vw] shrink-0 snap-center rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Rating & Verified Indicator */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: review.rating || 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-medium text-neutral-600">
                        <CheckCircle2 className="w-3 h-3 text-[#00507D]" />
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="font-inter text-neutral-800 text-sm leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      {review.avatar_url ? (
                        <img
                          src={review.avatar_url}
                          alt={review.name}
                          className="h-10 w-10 rounded-full object-cover border border-neutral-200 shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#f0f9ff] text-[#00507D] font-bold font-manrope text-xs flex items-center justify-center border border-[#00507D]/20 shrink-0">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-manrope text-sm font-bold text-neutral-950 truncate">
                          {review.name}
                        </h4>
                        <p className="font-inter text-xs text-neutral-500 truncate">
                          {review.role}
                          {review.company ? ` • ${review.company}` : ""}
                        </p>
                      </div>
                    </div>

                    {review.created_at && (
                      <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                        {formatDate(review.created_at)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation Controls & Dots Indicator */}
          <div className="mt-4 flex items-center justify-between pt-2">
            {/* Visual Indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={`testimonial-dot-${i}`}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const cardWidth = scrollContainerRef.current.offsetWidth * 0.88;
                      scrollContainerRef.current.scrollTo({
                        left: i * cardWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    mobileIndex === i ? "w-6 bg-[#00507D]" : "w-1.5 bg-neutral-300"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Left / Right Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMobileScroll("prev")}
                disabled={mobileIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
                aria-label="Previous review"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleMobileScroll("next")}
                disabled={mobileIndex === testimonials.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
                aria-label="Next review"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: SUBMIT USER REVIEW DIRECTLY TO NEON POSTGRESQL                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {reviewModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button
                onClick={() => setReviewModal(false)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold mb-2">
                  <PenLine className="w-3.5 h-3.5" />
                  <span>CLIENT FEEDBACK</span>
                </div>
                <h3 className="text-xl font-bold font-manrope text-neutral-950">Write a Review</h3>
                <p className="text-xs text-neutral-500 font-inter mt-1">
                  Share your experience working with NYLEX Digital Studio.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-manrope font-bold text-emerald-900 text-base">Thank You!</h4>
                  <p className="text-xs text-emerald-700 font-inter">
                    Your review has been successfully submitted and added to the website!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-inter">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Founder, CEO"
                        value={newReview.role}
                        onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Tech"
                        value={newReview.company}
                        onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider">
                        Overall Rating *
                      </label>
                      <span className="text-xs font-semibold text-neutral-700 font-inter">
                        {(hoverRating || newReview.rating) === 5
                          ? "5.0 - Excellent"
                          : (hoverRating || newReview.rating) === 4
                          ? "4.0 - Very Good"
                          : (hoverRating || newReview.rating) === 3
                          ? "3.0 - Good"
                          : (hoverRating || newReview.rating) === 2
                          ? "2.0 - Fair"
                          : "1.0 - Poor"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const activeStar = star <= (hoverRating || newReview.rating);
                        return (
                          <button
                            type="button"
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1 hover:scale-125 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                activeStar
                                  ? "text-amber-400 fill-amber-400 drop-shadow-xs"
                                  : "text-neutral-300 hover:text-neutral-400"
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold font-manrope text-neutral-800 ml-auto">
                        {(hoverRating || newReview.rating)}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Your Review / Experience *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share details of the digital experience created for your business..."
                      value={newReview.quote}
                      onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setReviewModal(false)}
                      className="px-4 py-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Post Review"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
