"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("sending");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("idle");
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("idle");
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="w-full max-w-[1440px] pt-2 mx-auto px-4 lg:px-4 py-20 lg:py-28 border-t border-slate-100/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Header and Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-blue-600">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              Let's talk about <br />
              <span className="text-blue-600">your project.</span>
            </h2>
          </div>

          <p className="text-slate-500 text-base leading-relaxed max-w-sm font-medium">
            We are always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Contact Details cards */}
          <div className="space-y-4 max-w-sm">
            <a
              href="mailto:buildwithnylex@gmail.com"
              className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-200/50 hover:bg-slate-50/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-blue-50 border border-blue-100/50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Email</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">buildwithnylex@gmail.com</span>
              </div>
            </a>

            <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-2xl hover:border-blue-200/50 hover:bg-slate-50/50 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100/50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Phone</span>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <a href="tel:+917594842869" className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors block">+91 75948 42869</a>
                    <a href="tel:+918921592748" className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors block">+91 89215 92748</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-200/50 hover:bg-slate-50/50 transition-all duration-300 group">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100/50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Location</span>
                <span className="text-sm font-bold text-slate-800">Kerala, India <span className="text-slate-400 font-semibold text-xs ml-1">Available Worldwide</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_35px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="form-name" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Your Name</label>
                <input
                  type="text"
                  id="form-name"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="form-email" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Your Email</label>
                <input
                  type="email"
                  id="form-email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="form-phone" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Your Phone (Optional)</label>
                <input
                  type="tel"
                  id="form-phone"
                  placeholder="+91 89215 92748"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="form-msg" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Your Message</label>
              <textarea
                rows={4}
                id="form-msg"
                placeholder="Tell us about your project..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white resize-none transition-all duration-200"
              ></textarea>
            </div>

            {/* Button / Status Feedback */}
            <div className="pt-2">
              {status === "success" ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-2xl px-6 py-4 text-sm flex items-center gap-2 animate-fade-in">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto bg-black text-white hover:bg-slate-900 disabled:bg-slate-400 px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-md font-bold text-sm cursor-pointer group"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
