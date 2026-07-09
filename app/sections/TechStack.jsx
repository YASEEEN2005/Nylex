"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", color: "#FFFFFF" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { name: "Django", icon: "https://cdn.simpleicons.org/django/092E20", color: "#092E20" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF", color: "#FFFFFF" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
];

export default function TechStack() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rotX = useRef(0.3);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.004);
  const isDragging = useRef(false);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const dragVX = useRef(0);
  const dragVY = useRef(0);
  const rafId = useRef();
  const itemEls = useRef([]);

  const RADIUS = 150;
  const n = techStack.length;

  // Fibonacci sphere positions
  const positions = useRef([]);
  useEffect(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    positions.current = Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, [n]);

  function project(pos, rx, ry) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = pos.y * cosX - z1 * sinX;
    const z2 = pos.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  useEffect(() => {
    const els = itemEls.current;

    function render() {
      if (!isDragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;
        velX.current *= 0.97;
        velY.current = velY.current * 0.99 + 0.004 * 0.01;
        if (rotX.current > 0.6) velX.current -= 0.0005;
        if (rotX.current < -0.1) velX.current += 0.0005;
      }

      if (positions.current.length > 0) {
        const projected = positions.current.map((pos, i) => ({
          el: els[i],
          p: project(pos, rotX.current, rotY.current),
        }));

        projected
          .slice()
          .sort((a, b) => a.p.z - b.p.z)
          .forEach(({ el, p }, idx) => {
            if (!el) return;
            const x = p.x * RADIUS + 180 - 32;
            const y = p.y * RADIUS + 180 - 32;
            const depth = (p.z + 1) / 2;
            const opacity = 0.2 + depth * 0.8;
            const scale = 0.6 + depth * 0.5;
            el.style.cssText = `position:absolute;left:${x}px;top:${y}px;opacity:${opacity};transform:scale(${scale});z-index:${idx};width:64px;height:64px;`;
          });
      }

      rafId.current = requestAnimationFrame(render);
    }

    rafId.current = requestAnimationFrame(render);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  // Mouse events
  const onMouseDown = (e) => {
    isDragging.current = true;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMX.current;
      const dy = e.clientY - lastMY.current;
      dragVX.current = dy * 0.005;
      dragVY.current = dx * 0.005;
      rotX.current += dragVX.current;
      rotY.current += dragVY.current;
      lastMX.current = e.clientX;
      lastMY.current = e.clientY;
    };
    const onMouseUp = () => {
      if (isDragging.current) {
        velX.current = dragVX.current;
        velY.current = dragVY.current || 0.004;
        isDragging.current = false;
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Touch events
  const onTouchStart = (e) => {
    isDragging.current = true;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMX.current;
    const dy = e.touches[0].clientY - lastMY.current;
    dragVX.current = dy * 0.005;
    dragVY.current = dx * 0.005;
    rotX.current += dragVX.current;
    rotY.current += dragVY.current;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
  };
  const onTouchEnd = () => {
    velX.current = dragVX.current;
    velY.current = dragVY.current || 0.004;
    isDragging.current = false;
  };

  return (
    <section className="relative py-28 bg-black overflow-hidden z-10 border-t border-white/10">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-center">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C] font-sans">
            ENGINEERING STACK
          </span>
          <h2 className="font-extrabold leading-[1.1] tracking-tight text-white text-[clamp(36px,5.5vw,72px)]">
            Our Core <span className="text-white/70">Technologies</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-md font-medium">
            We employ modern, production-grade tools designed for web application security, loading speeds, and robust functionality.
          </p>
        </div>

        {/* 3D Interactive Dome Sphere */}
        <div className="w-full flex flex-col items-center select-none max-w-lg relative">
          
          {/* Sphere Info Strip */}
          <div className="flex items-center justify-center gap-3 text-white/40 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[9px] uppercase tracking-[0.35em] font-mono">
              Drag to rotate tech dome
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <div
            ref={containerRef}
            className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ height: "380px" }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Ambient inner glow inside sphere */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
              }}
            />

            {/* Scene Container */}
            <div
              ref={sceneRef}
              className="relative"
              style={{ width: "360px", height: "360px" }}
            >
              {techStack.map((tech, i) => (
                <div
                  key={tech.name}
                  ref={(el) => { if (el) itemEls.current[i] = el; }}
                  style={{ position: "absolute", width: 64, height: 64 }}
                >
                  <div
                    className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(10,10,10,0.85)",
                      backdropFilter: "blur(8px)",
                      boxShadow: `0 0 15px -8px ${tech.color}44`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      loading="lazy"
                      className="w-7 h-7 object-contain"
                    />
                    <span className="text-[8px] text-white/50 font-mono uppercase tracking-wider text-center">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ambient sphere edge shading */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{ boxShadow: "inset 0 0 60px 20px rgba(0,0,0,0.8)" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
