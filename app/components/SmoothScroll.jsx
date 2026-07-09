"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize scroller with custom easing curve and duration
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Inertial exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true, // Enables smooth inertial scrolling on touch devices
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8, // Slightly higher for immediate scroll response
      infinite: false,
    });

    // Handle scroll animations in dynamic loops
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis scroll to global anchor clicks
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (target) {
        const href = target.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element, {
              offset: -80,
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
