"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsConditions() {
  const lastUpdated = "May 2026";

  return (
    <div className="min-h-screen bg-[#fafbfc] bg-grid-subtle text-slate-900 selection:bg-blue-100 selection:text-blue-800 flex flex-col justify-between">
      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Terms & Conditions Layout */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 lg:px-4 py-20">
        
        {/* Header Block */}
        <div className="space-y-4 mb-16 text-left border-b border-slate-100 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
            📄 Regulatory Coordinate
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight uppercase leading-none">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Last Updated: {lastUpdated} • Nylex Digital Studio
          </p>
        </div>

        {/* Content Body Grid */}
        <div className="space-y-12 text-slate-600 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1: Acceptance of Terms */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              1. Acceptance of Terms & Services
            </h2>
            <p>
              These Terms & Conditions ("Terms") govern the professional relationships, digital services, and active client agreements provided by Nylex ("we," "us," "our"). By engaging Nylex for engineering, designing, or consulting on web architectures, you fully accept and agree to follow these Terms.
            </p>
            <p>
              If you do not agree to these regulatory conditions, you must refrain from signing project agreements or commissioning full-stack products from Nylex.
            </p>
          </section>

          {/* Section 2: Client Cooperation & Deliverables */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              2. Client Cooperation & Inputs
            </h2>
            <p>
              To maintain our rapid delivery timelines (such as our high-performance 2-3 week Next.js landing page targets), the client agrees to provide necessary copy, assets, branding guidelines, and secure endpoint documentation in a timely manner.
            </p>
            <p>
              Delays in input materials may alter the projected milestone dates and overall delivery schedules.
            </p>
          </section>

          {/* Section 3: Scope Changes & Project Iteration */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              3. Scope Changes & Code Iterations
            </h2>
            <p>
              Each project phase outlines a specific technical scope of work. Any additions, architectural restructures, or post-agreement functionality expansions requested during development will constitute a "Change of Scope" and will be priced accordingly under separate milestone revisions.
            </p>
          </section>

          {/* Section 4: Payment Milestones & Invoicing */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              4. Payment Milestones & Security
            </h2>
            <p>
              We operate under standard milestone invoicing structures. Invoices are dispatched on successful completion of target scopes (e.g. Wireframing, Styling System, Frontend Deployment, Integration).
            </p>
            <p>
              Payments must be settled through our secure integration nodes (such as Razorpay). We reserve the right to pause production or withhold edge-deployment files if payment invoices remain outstanding.
            </p>
          </section>

          {/* Section 5: Intellectual Property Transfer */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              5. Intellectual Property Rights
            </h2>
            <p>
              Upon complete settlement of all milestone payment invoices, the complete custom codebase, designed interfaces, branding components, and visual assets are transferred 100% to the client. 
            </p>
            <p>
              We retain the right to showcase the completed project screenshots, design layers, and verified speed achievements inside the Nylex work catalog for agency promotional purposes.
            </p>
          </section>

          {/* Section 6: Contact Information */}
          <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] space-y-4">
            <h3 className="text-sm font-black text-black uppercase tracking-widest">Legal Queries & Coordinates</h3>
            <p className="text-xs text-slate-500">
              For questions regarding these Terms, milestone outlines, or IP transfers, reach out directly to the Nylex legal office:
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
