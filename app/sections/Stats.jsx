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
    <section className="relative py-20 bg-black overflow-hidden z-10 border-t border-white/10">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Glass Container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 rounded-[32px] bg-zinc-950/60 border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-zinc-950/40 hover:bg-white/5 transition-all duration-400 p-8 md:p-12 flex flex-col items-center text-center relative group"
            >
              {/* Subtle top border glow */}
              <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5E3C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#8B5E3C] mb-2 font-sans">
                {stat.label}
              </h3>
              
              <p className="text-xs text-white/60 font-medium font-sans">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
