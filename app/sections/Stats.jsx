"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, animate } from "framer-motion";

function Counter({ value, suffix = "", duration = 1.5 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered", desc: "Crafting flawless products" },
    { value: 30, suffix: "+", label: "Happy Clients", desc: "Global trust & partnerships" },
    { value: 99, suffix: "%", label: "Client Satisfaction", desc: "Committed to visual elegance" },
    { value: 24, suffix: "/7", label: "Dedicated Support", desc: "Always here for your business" },
  ];

  return (
    <section className="relative py-16 bg-white overflow-hidden z-10 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Clean Light Container Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[28px] bg-slate-200/90 border border-slate-200 overflow-hidden shadow-xs">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-white hover:bg-slate-50 transition-all duration-300 p-8 md:p-10 flex flex-col items-center text-center relative group cursor-default"
            >
              {/* Top accent line */}
              <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B5E3C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#8B5E3C] mb-2 font-sans">
                {stat.label}
              </h3>
              
              <p className="text-xs text-slate-500 font-medium font-sans">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
