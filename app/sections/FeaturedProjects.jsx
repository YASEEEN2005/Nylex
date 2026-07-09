"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function FeaturedProjects() {
  const projects = [
    {
      id: "01",
      title: "Inkjector Tattoos",
      link: "https://www.inkjectortattoos.com/",
      type: "Web Development",
      desc: "Premium website for a leading tattoo studio with modern UI and booking experience.",
      image: "/images/projects/inkjector.png",
      device: "macbook",
    },
    {
      id: "02",
      title: "Amazink Tattoo",
      link: "https://www.amazinktatto.com/",
      type: "Web Development",
      desc: "Bold, elegant and high-performance website for a luxury tattoo studio.",
      image: "/images/projects/amazink.png",
      device: "imac",
    },
    {
      id: "03",
      title: "Taste of Malabar",
      link: "https://www.tasteofmalabarcaterers.com/",
      type: "Web Development",
      desc: "Catering & event management website with modern design and seamless user experience.",
      image: "/images/projects/taste_of_malabar.png",
      device: "macbook",
    },
    {
      id: "04",
      title: "Vanyaa Rainforest Retreat",
      link: "https://resort-ashy.vercel.app/",
      type: "Web Application",
      desc: "A luxury resort website built to showcase nature, comfort and unforgettable experiences.",
      image: "/images/projects/vanyaa.png",
      device: "macbook",
    },
    {
      id: "05",
      title: "TechNova Solutions",
      link: "https://ai-powered-e-commerce-website-sable.vercel.app/",
      type: "Web Application",
      desc: "Technology and IT solutions website designed for a modern digital company.",
      image: "/images/projects/swift_cart.png",
      device: "macbook",
    },
  ];

  return (
    <section id="work" className="relative py-28 bg-black overflow-hidden z-10 text-white border-t border-white/10">
      
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col gap-20">
        
        {/* Row 1: Header (Left) and Project 01 (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Header Block & Buttons */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-7 font-sans">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#8B5E3C]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">OUR WORK</span>
                <span className="w-8 h-[1px] bg-[#8B5E3C]" />
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Projects That Speak for Us
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm font-medium">
                We build digital experiences that are not only beautiful but functional, scalable, and impactful.
              </p>
            </div>

            <div className="flex items-center gap-5 mt-2">
              <a
                href="#work"
                data-cursor="pointer"
                className="px-5 py-3 rounded-full bg-white hover:bg-[#8B5E3C] text-black hover:text-white font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-sm"
              >
                View All Projects
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                data-cursor="pointer"
                className="text-xs font-bold text-white hover:text-[#8B5E3C] transition-colors border-b border-white/20 hover:border-[#8B5E3C] pb-0.5"
              >
                Request a Proposal ↗
              </a>
            </div>
          </div>

          {/* Project 01 Showcase Card */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center bg-zinc-950/60 border border-white/10 hover:border-white/20 rounded-[32px] p-8 relative overflow-hidden transition-all duration-400 group">
            {/* Spinning Border Outline */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] overflow-hidden pointer-events-none z-0">
              <div 
                className="absolute inset-[-200%] animate-[spinGlow_12s_linear_infinite]"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.12), transparent 30%)"
                }}
              />
            </div>
            {/* Card inner backdrop clipping mask */}
            <div className="absolute inset-[1px] rounded-[31px] bg-zinc-950 z-[1]" />
            
            {/* Arch Outline Shape Background */}
            <div className="absolute -right-10 -bottom-10 w-72 h-72 border border-white/5 rounded-full pointer-events-none z-[1]" />
            
            <div className="sm:col-span-5 flex flex-col items-start gap-4 z-10 font-sans relative">
              {/* Sparkles Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-xs">
                <Sparkles className="w-3 text-[#8B5E3C]" />
                <span className="text-[8px] font-bold text-[#8B5E3C] uppercase tracking-wider">50+ Projects</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-4xl font-serif text-white/10 font-light">{projects[0].id}</span>
                <h3 className="text-base font-extrabold text-white tracking-tight">{projects[0].title}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">{projects[0].desc}</p>
              </div>

              <a
                href={projects[0].link}
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                className="text-[10px] font-extrabold text-[#8B5E3C] hover:text-white transition-colors flex items-center gap-1 mt-1 group"
              >
                View Case Study
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Laptop Mockup Visual */}
            <div className="sm:col-span-7 flex justify-center z-10 relative">
              <div className="w-full max-w-[340px] relative">
                {/* Macbook Base CSS */}
                <div className="relative w-full aspect-[16/10] bg-neutral-900 rounded-t-lg p-[1.5%] shadow-2xl border border-neutral-800">
                  <div className="relative w-full h-full rounded bg-zinc-950 overflow-hidden border border-neutral-800">
                    <Image
                      src={projects[0].image}
                      alt={projects[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[112%] h-[4%] bg-neutral-800 rounded-b-lg border-t border-neutral-700 shadow-md" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Projects Grid (02, 03, 04, 05) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.slice(1).map((project) => (
            <div
              key={project.id}
              className="bg-zinc-950/60 border border-white/10 hover:border-white/20 rounded-[32px] p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center transition-all duration-400 group relative overflow-hidden"
            >
              {/* Spinning Border Outline */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] overflow-hidden pointer-events-none z-0">
                <div 
                  className="absolute inset-[-200%] animate-[spinGlow_12s_linear_infinite]"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.12), transparent 30%)"
                  }}
                />
              </div>
              {/* Card inner backdrop clipping mask */}
              <div className="absolute inset-[1px] rounded-[31px] bg-zinc-950 z-[1]" />

              {/* Project Metadata Details */}
              <div className="sm:col-span-5 flex flex-col items-start gap-3 font-sans relative z-10">
                <span className="text-4xl font-serif text-white/10 font-light">{project.id}</span>
                <h3 className="text-base font-extrabold text-white tracking-tight">{project.title}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">{project.desc}</p>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="text-[10px] font-extrabold text-[#8B5E3C] hover:text-white transition-colors flex items-center gap-1 mt-1 group"
                >
                  View Case Study
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Dynamic Device Mockup Visual */}
              <div className="sm:col-span-7 flex justify-center relative z-10">
                <div className="w-full max-w-[280px]">
                  {project.device === "imac" ? (
                    /* iMac CSS Mockup */
                    <div className="relative flex flex-col items-center w-full">
                      <div className="relative w-11/12 aspect-[16/10] bg-neutral-900 rounded-lg p-[1.5%] shadow-xl border border-neutral-800">
                        <div className="relative w-full h-full rounded bg-zinc-950 overflow-hidden border border-neutral-800">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="w-[12%] h-7 bg-neutral-800 border-x border-neutral-700 shadow-inner" />
                      <div className="w-[28%] h-0.5 bg-neutral-700 rounded shadow-md" />
                    </div>
                  ) : (
                    /* Macbook CSS Mockup */
                    <div className="relative w-full aspect-[16/10] bg-neutral-900 rounded-t-lg p-[1.5%] shadow-xl border border-neutral-800">
                      <div className="relative w-full h-full rounded bg-zinc-950 overflow-hidden border border-neutral-800">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[112%] h-[4%] bg-neutral-800 rounded-b-lg border-t border-neutral-700 shadow-md" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
