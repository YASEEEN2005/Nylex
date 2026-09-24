"use client";

import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Services from "./sections/Services";
import FeaturedProjects from "./sections/FeaturedProjects";
import About from "./sections/About";
import WhyChooseUs from "./sections/WhyChooseUs";
import TechStack from "./sections/TechStack";
import Process from "./sections/Process";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Statistics counters */}
      <Stats />

      {/* Services Grid (What We Do) */}
      <Services />

      {/* Featured Projects Grid (Our Work) */}
      <FeaturedProjects />

      {/* About storytelling section (About Us) */}
      <About />

      {/* Value Propositions */}
      <WhyChooseUs />

      {/* Technology Cloud Grid */}
      <TechStack />

      {/* Workflow Phase Timeline */}
      <Process />

      {/* Testimonials Slider */}
      <Testimonials />

      {/* Client Submission Form */}
      <Contact />
    </>
  );
}
