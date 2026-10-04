"use client";

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a] pointer-events-none overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Soft cyan & sapphire ambient light glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#00507D]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#53E6FF]/10 rounded-full blur-[180px] pointer-events-none" />
    </div>
  );
}
