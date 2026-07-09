"use client";

import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Sparkles, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Web Development",
      desc: "Custom websites built with modern technologies for performance, scalability and growth.",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "UI/UX Design",
      desc: "Beautiful, user-friendly designs that create strong first impressions and engage users.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Development",
      desc: "Cross-platform mobile apps that deliver seamless experiences on any device.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Branding",
      desc: "Unique brand identities that communicate your value and build lasting trust.",
    },
  ];

  return (
    <section id="services" className="relative py-28 bg-black overflow-hidden z-10 border-t border-white/10">
      {/* Background Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 font-sans">
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">WHAT WE DO</span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Digital Solutions for Modern Businesses
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl font-medium">
            We offer end-to-end digital solutions to help your brand stand out and grow in the digital world.
          </p>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              data-cursor="pointer"
              className="group relative p-8 rounded-[28px] bg-zinc-950/60 border border-white/10 hover:border-white/20 hover:scale-[1.01] transition-all duration-400 overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
              {/* Spinning border outline glow shown on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px] overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-[-200%] animate-[spinGlow_8s_linear_infinite]"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent 30%)"
                  }}
                />
              </div>

              {/* Solid inner background overlay to clip the rotating border */}
              <div className="absolute inset-[1px] rounded-[27px] bg-zinc-950 z-[1]" />

              {/* Card Contents */}
              <div className="relative z-[2] flex flex-col items-start gap-5">
                
                {/* Circular Icon Container */}
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#8B5E3C] group-hover:border-[#8B5E3C] group-hover:text-black transition-colors duration-300">
                  {service.icon}
                </div>

                <div className="flex flex-col gap-3 font-sans">
                  <h3 className="text-white text-lg font-bold group-hover:text-[#8B5E3C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Card Action Link */}
              <a
                href="#contact"
                className="relative z-[2] mt-6 text-[11px] font-bold text-white/70 hover:text-white transition-colors flex items-center gap-1.5 font-sans"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
