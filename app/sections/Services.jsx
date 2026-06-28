"use client";

import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Sparkles } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Code className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Web Development",
      desc: "Custom websites built with modern technologies for performance, scalability and growth.",
    },
    {
      icon: <Palette className="w-5 h-5 text-[#8B5E3C]" />,
      title: "UI/UX Design",
      desc: "Beautiful, user-friendly designs that create strong first impressions and engage users.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Mobile Development",
      desc: "Cross-platform mobile apps that deliver seamless experiences on any device.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#8B5E3C]" />,
      title: "Branding",
      desc: "Unique brand identities that communicate your value and build lasting trust.",
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-[#F7F4F0] overflow-hidden z-10 border-t border-[#EDE5DB]">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 font-sans">
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">WHAT WE DO</span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] font-serif tracking-tight leading-tight">
            Digital Solutions for Modern Businesses
          </h2>
          <p className="text-[#7A7A7A] text-sm sm:text-base max-w-xl font-sans font-medium">
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
              className="group p-7 rounded-2xl bg-white border border-[#EDE5DB] hover:border-[#8B5E3C]/50 hover:bg-[#F7F4F0]/50 shadow-xs transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col items-start gap-4">
                
                {/* Circular Sand Icon Container */}
                <div className="w-11 h-11 rounded-full bg-[#EDE5DB]/70 flex items-center justify-center text-[#8B5E3C] group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>

                <div className="flex flex-col gap-2.5 font-sans">
                  <h3 className="text-[#1A1A1A] text-[16px] font-extrabold group-hover:text-[#8B5E3C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#7A7A7A] text-xs leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="mt-6 text-[11px] font-bold text-[#1A1A1A]/70 hover:text-[#8B5E3C] transition-colors flex items-center gap-1 font-sans"
              >
                Learn More <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
