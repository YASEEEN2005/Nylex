"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const allProjects = [
  {
    id: "01",
    title: "Taste of Malabar Caterers",
    link: "https://www.tasteofmalabarcaterers.com/",
    image: "/projects/taste_of_malabar.jpg",
  },
  {
    id: "02",
    title: "Amazink Tattoo Collective",
    link: "https://www.amazinktatto.com/",
    image: "/projects/amazink_tattoo.jpg",
  },
  {
    id: "03",
    title: "Defense Security IT",
    link: "https://www.defensesecurityit.in/",
    image: "/projects/defense_security.jpg",
  },
  {
    id: "04",
    title: "Techsmart Systems",
    link: "https://www.techsmartsystems.co.in/",
    image: "/projects/techsmart_systems.jpg",
  },
  {
    id: "05",
    title: "Sensix Global",
    link: "https://www.sensixglobal.com/",
    image: "/projects/sensix_global.jpg",
  },
  {
    id: "06",
    title: "Galaxy Granites",
    link: "https://www.galaxygranites.co.in/",
    image: "/projects/galaxy_granites.jpg",
  },
];

export default function FeaturedProjects() {
  return (
    <section
      id="work"
      className="relative z-10 w-full bg-[#f8fafc] text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              OUR WORK
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              A selection of our recent projects across different industries.
            </p>
          </motion.div>
        </div>

        {/* Clean Sharp-Cornered Project Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {allProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col"
            >
              {/* Project Image Link with Sharp Corners & Smooth Zoom */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-neutral-200/60 block cursor-pointer shadow-xs group-hover:shadow-lg transition-all duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </a>

              {/* Project Info (Title & External Link Icon - No Category) */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <h3 className="font-manrope text-base sm:text-lg font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <span>{project.title}</span>
                  </a>
                </h3>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 group-hover:text-[#00507D] group-hover:bg-white group-hover:shadow-2xs transition-all duration-300"
                  aria-label={`Visit ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
