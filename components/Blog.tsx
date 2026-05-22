"use client";

import React from "react";

const posts = [
  {
    date: "May 12, 2025",
    title: "Why speed is the new competitive advantage.",
    link: "#",
    illustration: (
      <div className="w-full h-full bg-slate-950 flex items-center justify-center p-4">
        {/* Speed / Rocket Abstract Graphic */}
        <div className="w-full max-w-[120px] h-[70px] border border-slate-800 rounded-xl relative overflow-hidden p-2 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Speedometer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
          </div>
          <div className="flex items-end gap-1.5 h-6">
            <div className="w-2 h-2 bg-slate-800 rounded-sm"></div>
            <div className="w-2 h-4 bg-slate-800 rounded-sm"></div>
            <div className="w-2 h-5 bg-blue-600 rounded-sm"></div>
            <div className="w-2 h-3 bg-slate-800 rounded-sm"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    date: "May 08, 2025",
    title: "UI/UX trends shaping digital experiences.",
    link: "#",
    illustration: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-4">
        {/* UI / Glassmorphism Abstract Graphic */}
        <div className="relative w-[110px] h-[70px]">
          <div className="absolute top-0 left-0 w-16 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg z-10 flex flex-col justify-between p-2">
            <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
            <div className="w-8 h-1.5 bg-white/40 rounded"></div>
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-12 bg-blue-600/30 border border-blue-500/30 rounded-xl shadow-lg z-0"></div>
        </div>
      </div>
    ),
  },
  {
    date: "Apr 28, 2025",
    title: "How we build scalable web applications.",
    link: "#",
    illustration: (
      <div className="w-full h-full bg-[#0d1117] flex items-center justify-center p-4">
        {/* Code / Scalability Graphic */}
        <div className="w-full max-w-[120px] h-[75px] border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[6px] text-slate-500">
          <div className="flex gap-1.5 border-b border-slate-800/80 pb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
          </div>
          <div className="space-y-1 mt-1">
            <div className="text-blue-400 font-bold">npm run build</div>
            <div className="text-green-400">✓ Ready in 1207ms</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Blog() {
  return (
    <div className="space-y-8">
      {/* Blog Header */}
      <div className="space-y-2">
        <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-blue-600">
          Latest Insights
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase">
          Read our <br />
          <span className="text-blue-600">latest articles.</span>
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            className="flex flex-col group border border-slate-100 hover:border-blue-200/50 rounded-3xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.005)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
          >
            {/* Visual Cover */}
            <div className="h-[120px] w-full relative overflow-hidden bg-slate-50">
              {post.illustration}
            </div>

            {/* Text details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                  {post.date}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>

              {/* Read More Link */}
              <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                <span>Read More</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
