"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Code2,
  Bot,
  PenTool,
  ShoppingCart,
  Megaphone,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "Modern, high-performance responsive websites and web applications built with the latest technologies.",
    icon: Globe,
  },
  {
    num: "02",
    title: "Application Development",
    description: "Native and cross-platform mobile apps for iOS and Android engineered with scalable cloud backends.",
    icon: Smartphone,
  },
  {
    num: "03",
    title: "Software Development",
    description: "Custom software solutions, enterprise platforms and scalable backend architectures for your business.",
    icon: Code2,
  },
  {
    num: "04",
    title: "AI Solutions",
    description: "AI integration, intelligent automation workflows, LLM applications and custom smart assistants.",
    icon: Bot,
  },
  {
    num: "05",
    title: "UI/UX Design",
    description: "Stunning user interface design, design systems, interactive prototypes and intuitive user experiences.",
    icon: PenTool,
  },
  {
    num: "06",
    title: "E-commerce Solutions",
    description: "High-converting online storefronts, payment gateways, product catalogs and seamless checkout pipelines.",
    icon: ShoppingCart,
  },
  {
    num: "07",
    title: "Digital Marketing",
    description: "Targeted digital marketing campaigns, social media growth, performance ads and brand positioning strategies.",
    icon: Megaphone,
  },
  {
    num: "08",
    title: "SEO & Digital Growth",
    description: "Technical SEO optimization, speed enhancement, search visibility and performance-driven digital strategies.",
    icon: TrendingUp,
  },
];

export default function Services() {
  const handleScrollTo = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative z-20 w-full bg-white text-primary-black py-16 sm:py-24 lg:py-32 font-inter rounded-t-[28px] sm:rounded-t-[44px] shadow-[0_-25px_60px_rgba(0,0,0,0.35)] border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Section Heading */}
        <div className="text-center lg:text-left pb-10 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              OUR SERVICES
            </h2>
            <p className="mt-3 sm:mt-4 font-inter text-sm sm:text-base md:text-lg text-neutral-600">
              End-to-end digital solutions to help your business grow.
            </p>
          </motion.div>
        </div>

        {/* Numbered Services List with Scroll Reveal */}
        <div className="flex flex-col divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => handleScrollTo(e, "contact")}
                className="group relative flex items-center justify-between gap-3 sm:gap-6 py-4 sm:py-6 md:py-8 transition-all duration-300 hover:px-3 sm:hover:px-6 hover:bg-neutral-50/80 rounded-2xl cursor-pointer"
              >
                {/* Left: Number, Icon & Title */}
                <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                  <span className="font-mono text-sm sm:text-lg md:text-xl font-bold text-[#00507D] shrink-0">
                    {service.num}
                  </span>

                  <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D] group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <h3 className="font-manrope text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors truncate sm:whitespace-normal">
                    {service.title}
                  </h3>
                </div>

                {/* Right: Description (Hidden on Mobile) & Arrow */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0 md:max-w-md lg:max-w-lg">
                  <p className="hidden md:block font-inter text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 group-hover:border-[#00507D] group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300 shadow-2xs">
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
