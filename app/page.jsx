"use client";

import Hero from "./sections/Hero";
import Services from "./sections/Services";
import About from "./sections/About";
import FeaturedProjects from "./sections/FeaturedProjects";
import Process from "./sections/Process";
import Clients from "./sections/Clients";
import Testimonials from "./sections/Testimonials";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      {/* 01. Homepage (Hero Section) */}
      <Hero />

      {/* 02. Services */}
      <Services />

      {/* 03. About */}
      <About />

      {/* 04. Portfolio / Work */}
      <FeaturedProjects />

      {/* 05. Process */}
      <Process />

      {/* 06. Clients */}
      <Clients />

      {/* 07. Testimonials */}
      <Testimonials />

      {/* 08. Blog */}
      <Blog />

      {/* 09. Contact */}
      <Contact />
    </>
  );
}
