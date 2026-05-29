"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const lastUpdated = "May 2026";

  return (
    <div className="min-h-screen bg-[#fafbfc] bg-grid-subtle text-slate-900 selection:bg-blue-100 selection:text-blue-800 flex flex-col justify-between">
      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Privacy Policy Layout */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 lg:px-4 py-20">
        
        {/* Header Block */}
        <div className="space-y-4 mb-16 text-left border-b border-slate-100 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
            🔒 Legal Coordinate
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight uppercase leading-none">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Last Updated: {lastUpdated} • Nylex Digital Studio
          </p>
        </div>

        {/* Content Body Grid */}
        <div className="space-y-12 text-slate-600 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1: Overview */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              1. Overview & Scope
            </h2>
            <p>
              At Nylex ("we," "us," "our"), we are committed to safeguarding the privacy and digital identity of our clients, visitors, and partners. This Privacy Policy details how we collect, store, verify, and utilize personal and business data gathered through our digital systems, portfolio products, and primary communication forms.
            </p>
            <p>
              By accessing our landing page (nylex.studio) or submitting queries through our structured communication channels, you consent to the data policies established in this document.
            </p>
          </section>

          {/* Section 2: Data Collection */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              2. Data We Collect
            </h2>
            <p>
              To maintain our industry-leading performance and provide tailored full-stack digital solution consultations, we collect data across several scopes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity & Communications:</strong> Full Name, Primary E-mail (<code className="text-xs font-bold text-slate-800 bg-slate-100 px-1 py-0.5 rounded">buildwithnylex@gmail.com</code>), and Optional Contact Phone Numbers submitted via our contact forms.
              </li>
              <li>
                <strong>Consultation Metadata:</strong> Core business specifications, requested digital framework models (Next.js, React, MERN), estimated project budget frames, and tech roadmap queries.
              </li>
              <li>
                <strong>Diagnostic Logging:</strong> IP addresses, browser engine user-agents, Core Web Vital performance scores, LCP loading speeds, and site navigation trajectories.
              </li>
            </ul>
          </section>

          {/* Section 3: Gemini AI & Personalization */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              3. AI-Powered Personalization & Diagnostics
            </h2>
            <p>
              As a premier engineered digital studio, our full-stack implementations may utilize advanced cognitive models (such as the Google Gemini 2.5 Flash API) to analyze user interaction behavior. 
            </p>
            <p>
              No private identity details (like your emails or phone numbers) are shared with third-party cognitive model endpoints. All AI analytics are run on completely anonymized contextual markers to guarantee absolute privacy sandboxing.
            </p>
          </section>

          {/* Section 4: Security Protocols */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              4. Security & Payment Gateways
            </h2>
            <p>
              We implement industry-standard cryptographic protocols to protect raw data buffers. All payment milestones and financial records are processed through secure multi-role architectures (such as Razorpay or Stripe integrations) verified with cryptographic HMAC verifications.
            </p>
            <p>
              Raw credit card buffers, tokenized bank hashes, or secure payment keys are never logged or stored locally on Nylex servers.
            </p>
          </section>

          {/* Section 5: Cookies & Performance Tracking */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              5. Cookies & Local Storage
            </h2>
            <p>
              We utilize cookies and local storage tokens to preserve layout states (such as active light/dark modes) and optimize global rendering performance. You can choose to disable browser cookies, though some interactive visual features may degrade.
            </p>
          </section>

          {/* Section 6: Contact Information */}
          <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] space-y-4">
            <h3 className="text-sm font-black text-black uppercase tracking-widest">Legal Queries & Coordinates</h3>
            <p className="text-xs text-slate-500">
              For questions regarding this Privacy Policy, your cached diagnostic metrics, or data deletions, reach out directly to the Nylex legal office:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-800 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-widest mb-1">E-mail Contact</span>
                <a href="mailto:buildwithnylex@gmail.com" className="text-blue-600 hover:underline">
                  buildwithnylex@gmail.com
                </a>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-widest mb-1">Secure Support Lines</span>
                <span>+91 75948 42869<br/>+91 89215 92748</span>
              </div>
            </div>
          </section>

        </div>

      </main>

      {/* Floating Footer */}
      <Footer />
    </div>
  );
}
