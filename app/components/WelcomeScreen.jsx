"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, Globe } from "lucide-react";
import { useEffect } from "react";

export default function WelcomeScreen() {
  const icons = [Code2, Sparkles, Globe];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-white overflow-hidden p-5 font-sans"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative text-center text-slate-900 flex flex-col items-center gap-5 w-full max-w-[340px]"
      >
        {/* Icons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="flex gap-4 items-center justify-center"
        >
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.5,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-[48px] h-[48px] rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 shadow-xs"
            >
              <Icon size={20} className="text-slate-900" />
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1 font-sans">
          <div className="flex items-center justify-center gap-2 flex-wrap text-slate-900">
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(22px,5vw,34px)] font-black tracking-tight"
            >
              Welcome
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(22px,5vw,34px)] font-black tracking-tight"
            >
              to
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[clamp(24px,6vw,38px)] font-black tracking-tight leading-tight text-center text-slate-900"
          >
            NYLEX STUDIO
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="text-xs text-slate-500 tracking-wider font-medium"
        >
          Building Premium Digital Experiences.
        </motion.p>

        {/* Website Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.4,
            duration: 0.5,
          }}
          className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-[10px] tracking-[0.25em] text-slate-600 font-mono shadow-xs overflow-hidden"
        >
          <motion.span
            initial={{ width: "0ch" }}
            animate={{ width: "16ch" }}
            transition={{
              delay: 1.5,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            www.nylex.agency
          </motion.span>

          <motion.span
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
            className="ml-[2px] text-[#8B5E3C]"
          >
            |
          </motion.span>
        </motion.div>

        {/* Bottom Loading Line */}
        <div className="mt-8 w-[240px] bg-slate-100 h-[2px] overflow-hidden rounded-full border border-slate-200/50">
          <motion.div
            initial={{ width: "10%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full bg-slate-900"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
