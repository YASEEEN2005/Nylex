"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 35, stiffness: 350, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Declaring inner dot springs at the top level to adhere to React Rules of Hooks
  const dotXSpring = useSpring(cursorX, { damping: 20, stiffness: 500 });
  const dotYSpring = useSpring(cursorY, { damping: 20, stiffness: 500 });

  const [cursorType, setCursorType] = useState("default");
  const [hoverText, setHoverText] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        setCursorType(type || "pointer");
        const text = target.getAttribute("data-cursor-text") || "";
        setHoverText(text);
      } else {
        setCursorType("default");
        setHoverText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  // Set visual properties based on cursorType
  let cursorSize = 32;
  let cursorStyleClass = "border border-blue-500 bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.3)]";
  
  if (cursorType === "pointer") {
    cursorSize = 64;
    cursorStyleClass = "bg-white/10 border border-white/20 backdrop-blur-[2px] shadow-[0_0_15px_rgba(255,255,255,0.2)]";
  } else if (cursorType === "expand") {
    cursorSize = 80;
    cursorStyleClass = "bg-blue-500/10 border border-blue-500/40 backdrop-blur-[2px] shadow-[0_0_20px_rgba(59,130,246,0.5)]";
  } else if (cursorType === "purple") {
    cursorSize = 70;
    cursorStyleClass = "bg-purple-500/10 border border-purple-500/40 backdrop-blur-[2px] shadow-[0_0_20px_rgba(139,92,246,0.5)]";
  } else if (cursorType === "view") {
    cursorSize = 90;
    cursorStyleClass = "bg-violet-600 border border-violet-500/60 shadow-[0_0_25px_rgba(139,92,246,0.8)]";
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: cursorSize,
          height: cursorSize,
        }}
        animate={{
          scale: cursorType !== "default" ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className={`w-full h-full rounded-full transition-all duration-300 ${cursorStyleClass} flex items-center justify-center relative overflow-hidden`}>
          {cursorType === "view" && (
            <span className="text-[11px] uppercase font-bold tracking-widest text-white whitespace-nowrap">
              {hoverText || "View"}
            </span>
          )}
        </div>
      </motion.div>
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-50 hidden md:block shadow-[0_0_8px_rgba(59,130,246,0.8)]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: 11,
          translateY: 11,
        }}
        animate={{
          scale: cursorType !== "default" ? 0.5 : 1,
          backgroundColor: cursorType === "purple" || cursorType === "view" ? "#8B5CF6" : "#3B82F6",
        }}
      />
    </>
  );
}
