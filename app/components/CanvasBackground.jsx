"use client";

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white pointer-events-none overflow-hidden">
      {/* Subtle background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft ambient light glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#8B5E3C]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-slate-100 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}
