"use client";

import { ArrowUpRight } from "lucide-react";
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
    <section id="work" className="relative py-28 bg-black overflow-hidden z-10 text-white border-t border-white/10 font-sans">
      
      {/* Background visual lights */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-center">
        
        {/* Label (Design Model Style) */}
        <div className="relative flex items-center justify-center gap-4 mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">
          <div className="relative w-10 h-px bg-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">
            OUR WORK
          </span>
          <div className="relative w-10 h-px bg-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </div>

        {/* Heading (Design Model Style) */}
        <div className="relative overflow-hidden mb-16 text-center">
          <h2
            className="text-center font-black tracking-tight leading-[1.05] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white opacity-0 animate-[headingReveal_1s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]"
            style={{ fontSize: "clamp(32px,6vw,80px)" }}
          >
            <span className="block bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent">
              Projects That
            </span>
            <span className="block bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
              Speak for Us
            </span>
          </h2>
        </div>

        {/* Symmetrical Centered Project Cards Flex Layout */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 w-full mt-4">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="group flex flex-col gap-5 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] opacity-0"
              style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s forwards` }}
            >
              {/* Mockup Container Box */}
              <div className="relative aspect-[16/10] w-full bg-zinc-950/60 border border-white/5 group-hover:border-white/15 rounded-[24px] p-8 flex items-center justify-center overflow-hidden transition-all duration-400">
                {/* Hover subtle radial reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Device mockup */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-500 group-hover:scale-105">
                  {project.device === "imac" ? (
                    /* iMac Mockup */
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
                    /* Macbook Mockup */
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

              {/* Project Card Text Details */}
              <div className="flex flex-col gap-2 px-1">
                <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">
                  {project.type}
                </span>
                <h3 className="text-base font-extrabold text-white group-hover:text-[#8B5E3C] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-medium">
                  {project.desc}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="text-xs font-bold text-white group-hover:text-[#8B5E3C] transition-colors flex items-center gap-1 mt-1 group/btn w-fit border-b border-white/10 hover:border-[#8B5E3C] pb-0.5 cursor-pointer font-sans"
                >
                  View Case Study
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded keyframe styles matching the design model */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
