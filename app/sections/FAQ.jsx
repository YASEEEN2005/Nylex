"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    q: "What types of businesses do you work with?",
    a: "We partner with startups, scale-ups, and established enterprises across industries like SaaS, E-Commerce, healthcare, retail, and real estate seeking high-performance web platforms.",
  },
  {
    q: "How do you ensure each solution aligns with our business goals?",
    a: "We conduct deep discovery and architecture planning before writing code, ensuring every design decision directly drives your key conversion and business growth metrics.",
  },
  {
    q: "How do you manage project timelines and communication?",
    a: "We work in structured agile sprints with regular milestone demos, continuous updates, and direct real-time communication channels.",
  },
  {
    q: "Can your web platforms scale as our business grows?",
    a: "Yes. We build on modern cloud architectures (Next.js, React, Vercel/AWS) with scalable databases capable of supporting millions of active visitors seamlessly.",
  },
  {
    q: "Do you provide ongoing support and maintenance after launch?",
    a: "Yes, we provide post-launch warranties, security monitoring, performance audits, and flexible monthly retainer SLA packages.",
  },
  {
    q: "How do you protect our data and intellectual property?",
    a: "We sign strict NDAs before project kickoff. All source code, design assets, and intellectual property belong 100% to you.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-36 border-t border-black/10 font-inter">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between h-full lg:col-span-4 text-center sm:text-left"
          >
            <div>
              <p className="eyebrow text-secondary-black">FAQ</p>
              <h2 className="section-h2 text-primary-black">
                Answers Before You Get Started
              </h2>
              <p className="lead-text text-secondary-black hidden sm:block">
                We compiled a list of answers to address your most pressing questions regarding our web engineering services.
              </p>
            </div>

            {/* Support Card */}
            <div className="hidden lg:block mt-12 rounded-sm bg-accent-secondary p-7 text-primary-white shadow-lg">
              <h4 className="font-manrope text-xl font-semibold text-primary-white mb-2">
                Still Have Questions?
              </h4>
              <p className="text-xs leading-relaxed text-primary-white/80 mb-6">
                Connect directly with our engineering team—we are happy to help discuss your architecture.
              </p>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-primary-white px-5 py-3 text-xs font-semibold text-primary-black hover:bg-slate-100 transition-colors"
              >
                <span>Contact Support</span>
                <Phone className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion with Laser Glow Border Trail */}
          <div className="lg:col-span-8 flex flex-col">
            {faqs.map((faq, idx) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={active === idx}
                onToggle={() => setActive(active === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, isOpen, onToggle }) {
  const [mouseX, setMouseX] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-b border-black/10 first:border-t transition-colors"
    >
      {/* Signature Laser Light Line tracking cursor X position */}
      {hovered && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <span
            className="absolute top-0 h-[1.5px] w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-secondary to-transparent transition-all duration-75"
            style={{ left: `${mouseX}px` }}
          />
          <span
            className="absolute bottom-0 h-[1.5px] w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-secondary to-transparent transition-all duration-75"
            style={{ left: `${mouseX}px` }}
          />
        </div>
      )}

      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-5 py-6 text-left text-primary-black focus:outline-none cursor-pointer"
        >
          <span className="text-base sm:text-lg font-medium leading-relaxed">
            {faq.q}
          </span>

          <span
            aria-hidden="true"
            className="relative flex h-5 w-5 shrink-0 items-center justify-center text-primary-black"
          >
            <span className="absolute h-[1.5px] w-4 bg-current" />
            <span
              className={`absolute h-4 w-[1.5px] bg-current transition-transform duration-300 ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        className={`grid transition-all duration-400 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 overflow-hidden"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pr-8 text-sm sm:text-base leading-relaxed text-secondary-black">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}
