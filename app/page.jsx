"use client";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import FeaturedProjects from "./sections/FeaturedProjects";
import WhyChooseUs from "./sections/WhyChooseUs";
import TechStack from "./sections/TechStack";
import Process from "./sections/Process";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      {/* Hero Section (incorporates Stats panel) */}
      <Hero />

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

      {/* Client Submission Form */}
      <Contact />
    </>
  );
}
