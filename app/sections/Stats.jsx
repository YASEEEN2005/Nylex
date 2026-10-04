"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

function Counter({ value, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
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
    {
      value: 50,
      suffix: "+",
      title: "Projects Delivered",
      desc: "Across websites, custom applications, and business systems.",
    },
    {
      value: 35,
      suffix: "+",
      title: "Trusted Businesses",
      desc: "Many on their second or third project with our team.",
    },
    {
      value: 10,
      suffix: "+",
      title: "Regions Served",
      desc: "From local enterprises to international clients.",
    },
    {
      value: 100,
      suffix: "%",
      title: "Code Quality & SLA",
      desc: "Continuous post-launch support and sub-second performance.",
    },
  ];

  return (
    <section id="impact" className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-36 border-t border-black/10 font-inter">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="eyebrow text-secondary-black">Our Impact</p>
          <h2 className="section-h2 text-primary-black">
            <span className="font-bold">Built For Scale,</span>{" "}
            <span className="text-secondary-black">Engineered To Last</span>
          </h2>
          <p className="lead-text max-w-3xl mx-auto text-secondary-black">
            We partner with ambitious businesses to engineer digital products that drive long-term value — not one-off templates that stop mattering after launch.
          </p>
        </div>

        {/* 4 Statistics Columns */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.title} className="text-center">
              <p className="statistic-text text-primary-black tabular-nums font-bold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>

              <div className="mt-4 sm:mt-6">
                <h3 className="card-title text-base sm:text-lg text-primary-black">
                  {stat.title}
                </h3>
                <p className="mt-2 body-text text-secondary-black max-w-[200px] mx-auto text-xs leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
