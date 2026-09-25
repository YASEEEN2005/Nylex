"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  MonitorPlay,
  CheckCircle2,
  Search,
  X,
  Eye,
  Globe,
  Layers,
  Award
} from "lucide-react";
import Image from "next/image";

const defaultProjects = [
  {
    id: "01",
    title: "Inkjector Tattoos Studio",
    link: "https://www.inkjectortattoos.com/",
    category: "webdev",
    type: "Web Development & Booking Platform",
    desc: "Custom booking platform and interactive showcase built for a high-volume tattoo studio in Kerala.",
    fullDesc: "Inkjector Tattoos required a sleek, high-performing digital platform to showcase their artist portfolio and streamline consultation appointments. We engineered a custom Next.js application with zero reliance on heavy site builders, achieving sub-second page loads and automated appointment routing.",
    image: "/images/projects/inkjector.png",
    tags: ["Next.js", "Tailwind CSS", "Booking System", "100 Speed"],
    result: "40% Increase in Online Bookings",
    client: "Inkjector Studio",
    year: "2026",
  },
  {
    id: "02",
    title: "Amazink Tattoo Collective",
    link: "https://www.amazinktatto.com/",
    category: "webdev",
    type: "Web Development & SEO Architecture",
    desc: "Modern artist portfolio platform with custom consultation booking flows and top-tier SEO ranking.",
    fullDesc: "Amazink Tattoo needed a visual-first digital brand experience. We crafted a high-contrast minimalist web design paired with strategic technical SEO structure that boosted organic Google search placement within weeks of deployment.",
    image: "/images/projects/amazink.png",
    tags: ["React", "SEO Architecture", "Custom UI", "High Ranking"],
    result: "Top Search Engine Ranking",
    client: "Amazink Collective",
    year: "2026",
  },
  {
    id: "03",
    title: "Taste of Malabar Caterers",
    link: "https://www.tasteofmalabarcaterers.com/",
    category: "webdev",
    type: "Web Development & Event Management",
    desc: "Luxury catering website featuring interactive menu showcases and direct booking inquiry systems.",
    fullDesc: "A premium catering service needed an interactive platform for corporate clients and event planners to explore custom dining packages. We built an intuitive menu calculator and responsive lead generation pipeline.",
    image: "/images/projects/taste_of_malabar.png",
    tags: ["Next.js", "Event Management", "Responsive UI", "Fast Load"],
    result: "50+ Event Queries / Month",
    client: "Taste of Malabar Group",
    year: "2026",
  },
  {
    id: "04",
    title: "Vanyaa Rainforest Retreat",
    link: "https://resort-ashy.vercel.app/",
    category: "webapp",
    type: "Web Application & Reservation Engine",
    desc: "Eco-resort booking application with immersive chalet exploration and reservation engine.",
    fullDesc: "Vanyaa Rainforest Retreat features interactive villa previews, custom room availability checking, and instant booking flows designed to provide guests with an effortless resort reservation experience.",
    image: "/images/projects/vanyaa.png",
    tags: ["Web App", "Hospitality UI", "Smooth UX", "Booking Engine"],
    result: "100/100 Lighthouse Score",
    client: "Vanyaa Resorts",
    year: "2026",
  },
];

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [projectsList, setProjectsList] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchLiveProjects();
  }, []);

  // Scroll Animation #2: 3D Parallax Transformation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], ["50px", "-30px"]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -3]);

  const fetchLiveProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.projects && data.projects.length > 0) {
        const formatted = data.projects.map((p, idx) => ({
          ...p,
          id: (idx + 1).toString().padStart(2, "0"),
        }));
        setProjectsList(formatted);
      }
    } catch (error) {
      console.error("Using fallback projects list", error);
    }
  };

  // Filter & Search Logic
  const filteredProjects = projectsList.filter((project) => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative py-24 sm:py-36 bg-white text-slate-900 overflow-hidden z-10 select-none border-t border-slate-200/90 font-sans"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[#8B5E3C]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative flex flex-col gap-12 sm:gap-16">
        
        {/* Header & Tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-3 max-w-2xl"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-[11px] font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>✦ #1 FLAGSHIP SHOWCASE</span>
            </div>
            <h2 className="font-serif font-bold leading-[1.04] tracking-tight text-[clamp(40px,6vw,80px)] text-slate-900">
              Featured Work
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Explore high-performance websites and web applications engineered for real business growth.
            </p>
          </motion.div>

          {/* Quick Search Bar & Category Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#8B5E3C] transition-colors w-full sm:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200">
              {[
                { id: "all", label: `All (${projectsList.length})` },
                { id: "webdev", label: "Web Dev" },
                { id: "webapp", label: "Web Apps" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    filter === tab.id
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Showcase Grid with 3D Scroll Parallax */}
        <motion.div
          style={mounted ? { y: cardY, rotateX: cardRotateX } : undefined}
          suppressHydrationWarning
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || project._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Showcase & Overlay Controls */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <Image
                    src={project.image || "/images/projects/vanyaa.png"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Impact Result Badge */}
                  {project.result && (
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/20 text-slate-900 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{project.result}</span>
                    </div>
                  )}

                  {/* Quick Preview Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Meta Content */}
                <div className="p-7 sm:p-8 flex flex-col gap-6 justify-between flex-1 bg-white">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8B5E3C]">
                        PROJECT {project.id}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                        {project.type || "Web Engineering"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 group-hover:text-[#8B5E3C] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech Badges & Visit Link CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags &&
                        project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-mono font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Details</span>
                      </button>

                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#8B5E3C] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header Bar */}
              <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8B5E3C]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {selectedProject.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
                <div className="relative aspect-[16/9] w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-200">
                  <Image
                    src={selectedProject.image || "/images/projects/vanyaa.png"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-[11px] font-mono font-bold uppercase">
                      {selectedProject.type || "Web Development"}
                    </span>
                    {selectedProject.result && (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{selectedProject.result}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {selectedProject.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {selectedProject.fullDesc || selectedProject.desc}
                  </p>
                </div>

                {/* Tech Stack Breakdown */}
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags &&
                      selectedProject.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-mono font-bold"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Modal CTA */}
                {selectedProject.link && (
                  <div className="pt-4 flex items-center justify-end">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#8B5E3C] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md cursor-pointer"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
