"use client";

import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] bg-[#0a0a0a] text-primary-white font-inter flex items-center justify-center px-4 sm:px-8 select-none overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#00507D]/20 via-[#53E6FF]/10 to-transparent blur-[140px]"
      />

      <div className="max-w-2xl w-full flex flex-col items-center text-center relative z-10 py-16">
        <p className="eyebrow text-accent-primary">404 Error</p>

        <h1 className="statistic-text text-6xl sm:text-8xl font-bold text-primary-white tracking-tight">
          404
        </h1>

        <h2 className="section-h2 text-xl sm:text-2xl mt-4 text-primary-white">
          Page Not Found
        </h2>

        <p className="lead-text text-secondary-white max-w-md mt-2 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="group relative isolate inline-flex min-h-12 items-center justify-center overflow-hidden rounded-sm border border-white/15 px-8 py-3.5 text-sm font-semibold text-primary-white shadow-xl transition-all"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] p-px [mask-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff)] [mask-origin:content-box,border-box] [mask-clip:content-box,border-box] [mask-composite:exclude] [-webkit-mask-composite:xor]"
          >
            <span className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2">
              <span className="block h-full w-full animate-spin-slow bg-[conic-gradient(transparent_55%,#488FEF_72%,#53E6FF_86%,transparent_98%)]" />
            </span>
          </span>

          <span
            aria-hidden="true"
            className="absolute inset-px z-[1] rounded-[inherit] bg-[#0e141d] transition-colors group-hover:bg-[#15202d]"
          />

          <span className="relative z-10 flex items-center gap-2">
            <Home className="h-4 w-4 text-accent-cyan" />
            <span>Return to Home</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
