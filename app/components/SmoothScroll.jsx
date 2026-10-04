"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize scroller with custom easing curve and duration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential inertial easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // Prevents mobile touch jitter while keeping momentum
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // RAF loop for buttery smooth 60/120fps animation
    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Smooth anchor click handling
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (target) {
        const href = target.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const targetId = href === "#top" ? "top" : href.slice(1);
          const element = document.getElementById(targetId) || document.querySelector(href);
          if (element) {
            lenis.scrollTo(element, {
              offset: -80,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
