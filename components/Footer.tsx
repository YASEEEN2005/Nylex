"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 border-t border-slate-100/80">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
        
        {/* Left Side: Logo & Desc */}
        <div className="lg:col-span-4 space-y-6">
          <span className="font-extrabold text-xl tracking-[0.35em] text-slate-900 block cursor-pointer">
            NYLEX
          </span>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
            We build digital experiences that help businesses grow in the digital world. Our team focuses on high performance and clean UI/UX designs.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100/50 transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-100/50 transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="mailto:buildwithnylex@gmail.com" aria-label="Email" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100/50 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Company</h4>
          <ul className="space-y-2.5">
            {["About", "Our Process", "Careers", "Contact"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(" ", "")}`} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Services</h4>
          <ul className="space-y-2.5">
            {["Web Development", "UI/UX Design", "Branding", "SEO & Performance"].map((link) => (
              <li key={link}>
                <a href="#services" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Resources</h4>
          <ul className="space-y-2.5">
            {["Insights", "Case Studies", "FAQs", "Blog"].map((link) => (
              <li key={link}>
                <a href="#blog" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Let's Build CTA */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Let's Build</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Have a project in mind? Let's create something great together.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-1 group text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors"
          >
            Let's Talk
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-400 font-semibold">
          © {new Date().getFullYear()} NYLEX. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
