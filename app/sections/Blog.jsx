"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "How to Build a Modern Business Website",
    category: "Web Development",
    date: "June 10, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    desc: "Key principles for building fast, high-converting digital storefronts that drive leads.",
  },
  {
    title: "The Future of AI in Business",
    category: "AI & Automation",
    date: "June 5, 2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    desc: "How modern machine learning and generative workflows empower operational scale.",
  },
  {
    title: "UI/UX Trends in 2024",
    category: "Design",
    date: "May 28, 2024",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    desc: "Crafting minimalist interfaces, micro-interactions, and accessible user journeys.",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Header */}
        <div className="text-center lg:text-left pb-12 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              OUR BLOG
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              Insights, tips and updates from our team.
            </p>
          </motion.div>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs hover:border-[#00507D]/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Image with Smooth Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-xs">
                  {post.category}
                </div>
              </div>

              {/* Content & Footer */}
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-manrope text-lg sm:text-xl font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-inter text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {post.date}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 group-hover:border-[#00507D] group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
