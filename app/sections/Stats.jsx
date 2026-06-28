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
    <section className="relative py-20 bg-[#050505] overflow-hidden z-10">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Glass Container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#050505]/40 hover:bg-white/[0.02] transition-colors duration-500 p-8 md:p-12 flex flex-col items-center text-center relative group"
            >
              {/* Subtle top border glow */}
              <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 font-space-grotesk drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
                {stat.label}
              </h3>
              
              <p className="text-xs text-gray-500 font-medium">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
