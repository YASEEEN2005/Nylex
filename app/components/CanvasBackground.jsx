"use client";

export default function CanvasBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-white pointer-events-none overflow-hidden"
    >
      {/* Subtle light background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Soft ambient light glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-100/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8B5E3C]/5 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}
