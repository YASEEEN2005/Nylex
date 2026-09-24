"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, ArrowLeft, ArrowRight, LayoutGrid, MonitorPlay } from "lucide-react";
import Image from "next/image";

export default function FeaturedProjects() {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState("theater"); // 'theater' or 'grid'

  const projects = [
    {
      id: "01",
      title: "Inkjector Tattoos",
      link: "https://www.inkjectortattoos.com/",
      category: "webdev",
      type: "Web Development",
      desc: "Premium website for a leading tattoo studio featuring custom booking architecture, high-resolution visual storytelling, and seamless responsive performance.",
      image: "/images/projects/inkjector.png",
      tags: ["Next.js", "Tailwind CSS", "Booking UI", "High Performance"],
      result: "40% Increase in Online Bookings",
    },
    {
      id: "02",
      title: "Amazink Tattoo",
      link: "https://www.amazinktatto.com/",
      category: "webdev",
      type: "Web Development",
      desc: "Bold, dark luxury website engineered for an elite tattoo studio to highlight artist portfolios and customer consultation flows.",
      image: "/images/projects/amazink.png",
      tags: ["React", "SEO Architecture", "Custom UI", "Artist Gallery"],
      result: "Top Search Engine Ranking",
    },
    {
      id: "03",
      title: "Taste of Malabar",
      link: "https://www.tasteofmalabarcaterers.com/",
      category: "webdev",
      type: "Web Development",
      desc: "Catering & event management web platform designed with modern UI elements, menu showcases, and direct reservation inquiries.",
      image: "/images/projects/taste_of_malabar.png",
      tags: ["Next.js", "Event Management", "Responsive UI", "Fast Load"],
      result: "Over 50+ Event Queries / Month",
    },
    {
      id: "04",
      title: "Vanyaa Rainforest Retreat",
      link: "https://resort-ashy.vercel.app/",
      category: "webapp",
      type: "Web Application",
      desc: "An immersive eco-resort web application showcasing nature experiences, chalet amenities, and interactive room booking options.",
      image: "/images/projects/vanyaa.png",
      tags: ["Web App", "Hospitality UI", "Smooth UX", "Retreat Booking"],
      result: "100/100 Lighthouse Performance",
    },
    {
      id: "05",
      title: "TechNova Solutions",
      link: "https://ai-powered-e-commerce-website-sable.vercel.app/",
      category: "webapp",
      type: "Web Application",
      desc: "Modern digital technology solutions platform featuring interactive service matrices, case studies, and fast client onboarding forms.",
      image: "/images/projects/swift_cart.png",
      tags: ["Web App", "E-Commerce", "High Speed", "Cloud Infrastructure"],
      result: "Instant Page Render Speed",
    },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const activeProject = filteredProjects[activeIndex % filteredProjects.length] || filteredProjects[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  return (
    <section id="work" className="relative py-16 sm:py-28 bg-white overflow-hidden z-10 text-slate-900 border-t border-slate-200 font-sans select-none">
      
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#8B5E3C]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-slate-100/90 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative flex flex-col items-center">
        
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center gap-3 mb-3"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#8B5E3C] font-mono font-bold">
            ✦ SELECTED WORK SHOWCASE
          </span>
        </motion.div>

        {/* Section Heading & View Mode Controls */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-slate-200/80 pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2.5 max-w-2xl"
          >
            <h2
              className="font-black tracking-tight leading-[1.05] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent"
              style={{ fontSize: "clamp(30px,5.5vw,68px)" }}
            >
              Projects That Speak for Us
            </h2>
            <p className="text-slate-600 text-xs sm:text-base font-medium leading-relaxed">
              Explore our engineering portfolio of custom web solutions and web applications built for real business growth.
            </p>
          </motion.div>

          {/* Controls: Filter Pills + View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            {/* Category Filter */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
              <button
                onClick={() => { setFilter("all"); setActiveIndex(0); }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  filter === "all" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => { setFilter("webdev"); setActiveIndex(0); }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  filter === "webdev" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Web Dev (3)
              </button>
              <button
                onClick={() => { setFilter("webapp"); setActiveIndex(0); }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  filter === "webapp" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Web Apps (2)
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
              <button
                onClick={() => setViewMode("theater")}
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  viewMode === "theater" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Theater Showcase Mode"
              >
                <MonitorPlay size={15} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  viewMode === "grid" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Grid Gallery View"
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: 2026 THEATER SHOWCASE (Interactive Spotlight) */}
        {viewMode === "theater" && (
          <div className="w-full flex flex-col gap-6 sm:gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-slate-50/90 border border-slate-200 rounded-[28px] sm:rounded-[36px] p-5 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative overflow-hidden"
              >
                {/* Left Side: Metadata & Details */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 sm:gap-6 font-sans order-2 lg:order-1">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-900 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center border border-slate-800 shadow-2xs">
                      {activeProject.id}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8B5E3C]">
                      ✦ {activeProject.type}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                    {activeProject.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-base font-medium leading-relaxed">
                    {activeProject.desc}
                  </p>

                  {/* Impact Result Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#8B5E3C] text-[11px] sm:text-xs font-bold w-fit font-sans">
                    <Sparkles size={13} />
                    <span>{activeProject.result}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Launch Button */}
                  <div className="pt-2 sm:pt-4 flex items-center gap-4">
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-slate-900 text-white hover:bg-[#8B5E3C] px-6 py-3.5 sm:px-8 sm:py-4 text-xs uppercase font-bold tracking-[0.2em] rounded-full transition-all duration-300 shadow-sm cursor-pointer w-full sm:w-auto"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Right Side: Showcase Display Without Top Browser Bar */}
                <div className="col-span-1 lg:col-span-7 order-1 lg:order-2 w-full">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-[24px] overflow-hidden shadow-xl border border-slate-300/80 bg-slate-950 group">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />

                    {/* Floating Launch Tag on Image */}
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-slate-900 text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-slate-900 hover:text-white transition-all duration-300"
                    >
                      <span>Explore Live</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Filmstrip Deck Selector Header & Controls */}
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                <span>SELECT PROJECT</span>
                <span>({activeIndex + 1}/{filteredProjects.length})</span>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-2xs cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-2xs cursor-pointer"
                  aria-label="Next Project"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Mobile Scrollable Horizontal Deck Selector (Prevents vertical scroll fatigue) */}
            <div className="flex overflow-x-auto scrollbar-none gap-3 sm:grid sm:grid-cols-3 md:grid-cols-5 w-full pb-2">
              {filteredProjects.map((p, idx) => {
                const isActive = p.id === activeProject.id;

                return (
                  <motion.div
                    key={p.id}
                    onClick={() => setActiveIndex(idx)}
                    whileHover={{ y: -3 }}
                    className={`shrink-0 w-[140px] sm:w-auto rounded-2xl p-2.5 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col gap-2 ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-[#8B5E3C]"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-white"
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-700/40">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="140px"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${isActive ? "text-[#8B5E3C]" : "text-slate-400"}`}>
                        #{p.id}
                      </span>
                      <h4 className="text-[11px] font-bold truncate leading-snug">
                        {p.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 2: FULL GRID GALLERY */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-slate-50/90 border border-slate-200 hover:border-[#8B5E3C]/60 hover:shadow-xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Image Viewport without any browser bar */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-300/70 shadow-md mb-5 sm:mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-md border border-slate-200 p-2 sm:p-2.5 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-md"
                    title="Visit Live Project"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2.5 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#8B5E3C]">
                      #{project.id} ✦ {project.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#8B5E3C] transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl"
        >
          <div className="flex items-center gap-3 text-left font-sans">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm">
              ✦
            </div>
            <div className="flex flex-col">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Want a custom website built for your business?</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">We design high-converting web applications and websites tailored to scale.</p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-[#8B5E3C] px-6 py-3 text-xs uppercase font-bold tracking-widest rounded-full transition-all duration-300 shrink-0 shadow-xs cursor-pointer w-full sm:w-auto"
          >
            Start Your Web Project
          </a>
        </motion.div>

      </div>
    </section>
  );
}
