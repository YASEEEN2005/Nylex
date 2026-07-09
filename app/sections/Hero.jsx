"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const text = "NYLEX";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  const techs = ["UI/UX Design", "Web Development", "Mobile Apps", "Branding"];

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 200);
    }
    type();
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        id="hero"
        className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black select-none flex flex-col justify-between"
      >
        {/* Background artwork eye centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/hero image.png"
            alt="Hero Eye Visual"
            className="h-[90%] w-[90%] object-contain object-center opacity-70"
          />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-28 pb-10">
          
          {/* Main display grid */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 w-full">
            {/* Interactive Big Typed Header */}
            <h1
              onClick={() => setColorMode((prev) => (prev + 1) % colors.length)}
              className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[20vw] md:text-[14vw] lg:text-[12rem] cursor-pointer transition-all duration-300 ${colors[colorMode]}`}
            >
              {displayed || "\u00A0"}
            </h1>

            <p className="md:absolute md:top-28 md:right-12 mt-4 md:mt-0 text-left md:text-right text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-xs md:max-w-md font-[Poppins] font-bold tracking-wide text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-white/60 to-white animate-shine">
              We Design.
              <br />
              We Develop.
              <br />
              We Deliver.
            </p>
          </div>

          {/* Bottom detail and action rows */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mt-auto w-full">
            
            {/* Left side: descriptions and cards */}
            <div className="flex flex-col gap-5 max-w-xl font-sans">
              <p className="relative text-sm sm:text-base leading-relaxed font-[Poppins] font-medium tracking-wide text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-white/70 to-white animate-shine">
                Nylex is a creative digital studio crafting premium websites, brands, and digital products that help modern businesses establish authority and scale.
              </p>

              {/* Cards / Badges */}
              <div className="flex flex-wrap gap-2.5">
                {techs.map((tech) => (
                  <div
                    key={tech}
                    className="relative group px-4 py-2 rounded-xl text-xs font-semibold text-white/90 bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
                  >
                    <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-[#8B5E3C]/20 via-[#8B5E3C]/10 to-transparent" />
                    <span className="relative z-10">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Action CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center shrink-0">
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "work")}
                className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-300 rounded-full cursor-pointer"
              >
                Explore Work
                <ArrowUpRight size={15} />
              </a>

              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, "services")}
                className="inline-flex items-center gap-3 border border-white/10 bg-white/5 text-white/80 px-6 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:border-white/30 hover:text-white transition-all duration-300 rounded-full cursor-pointer"
              >
                Services
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Marquee Strip below Hero */}
      <div className="bg-black border-y border-white/10 py-5 overflow-hidden select-none">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {["UI/UX Design", "Web Development", "Mobile Apps", "Branding", "Creative Agency"].map((logo, i) => (
            <span
              key={i}
              className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-2"
            >
              <span>✦</span> {logo}
            </span>
          ))}
          {/* repeated to loop */}
          {["UI/UX Design", "Web Development", "Mobile Apps", "Branding", "Creative Agency"].map((logo, i) => (
            <span
              key={i + 20}
              className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-2"
            >
              <span>✦</span> {logo}
            </span>
          ))}
          {/* repeated to loop */}
          {["UI/UX Design", "Web Development", "Mobile Apps", "Branding", "Creative Agency"].map((logo, i) => (
            <span
              key={i + 40}
              className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-2"
            >
              <span>✦</span> {logo}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
