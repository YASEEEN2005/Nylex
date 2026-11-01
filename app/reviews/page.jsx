import Testimonials from "../sections/Testimonials";
import { Sparkles, Star, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Client Reviews & Testimonials | NYLEX Digital Studio",
  description:
    "Read verified client experiences and testimonials from ambitious founders and business leaders who built with NYLEX Digital Studio.",
  alternates: {
    canonical: "https://nylex.online/reviews",
  },
  openGraph: {
    title: "Client Reviews | NYLEX Digital Studio",
    description:
      "Explore real feedback and ratings from business leaders who partnered with NYLEX Digital Studio.",
    url: "https://nylex.online/reviews",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
            CLIENT SATISFACTION & TRUST
          </div>
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            Authentic Feedback from Ambitious Founders.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Our reputation is built on reliability, transparent communication, and engineering
            excellence. Read firsthand reviews from clients who trusted us with their digital products.
          </p>
        </div>
      </section>

      {/* Render the redesigned Testimonials section */}
      <Testimonials />
    </main>
  );
}

