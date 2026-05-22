import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafbfc] bg-grid-subtle text-slate-900 selection:bg-blue-100 selection:text-blue-800">
      {/* Smooth Scroll Lenis Controller */}
      <SmoothScroll />

      {/* Floating Header Navigation */}
      <Navbar />

      {/* Main Hero Visuals & Copy */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Process Section */}
      <Process />

      {/* Work Section */}
      <Work />

      {/* Testimonials & CTA Combined Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-100/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5">
            <Testimonials />
          </div>
          <div className="lg:col-span-7">
            <CTA />
          </div>
        </div>
      </section>

      {/* FAQ & Blog Combined Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-100/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <FAQ />
          </div>
          <div className="lg:col-span-7">
            <Blog />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
