import Link from "next/link";
import {
  Target,
  Compass,
  Zap,
  Users,
  Award,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | NYLEX Digital Studio - Vision, Team & Story",
  description:
    "Learn about NYLEX Digital Studio, founded by Nithanth Harsha and Muhammad Yaseen. Our mission, vision, core values, and craft in modern digital innovation.",
  alternates: {
    canonical: "https://nylex.online/about",
  },
  openGraph: {
    title: "About Us | NYLEX Digital Studio",
    description:
      "Combining creativity, technical expertise, and client-first engineering to turn bold ideas into high-converting digital products.",
    url: "https://nylex.online/about",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
  },
};

const stats = [
  { value: "2", label: "Founders" },
  { value: "50+", label: "Projects Completed" },
  { value: "20+", label: "Global Clients" },
  { value: "99.9%", label: "Uptime & Reliability" },
];

const founders = [
  {
    name: "Nithanth Harsha",
    role: "Co-Founder & Full-Stack Architect",
    initials: "NH",
    bio: "Passionate engineer focusing on modern Next.js systems, scalable architectures, cloud engineering, and technical SEO performance.",
  },
  {
    name: "Muhammad Yaseen",
    role: "Co-Founder & Technical Strategist",
    initials: "MY",
    bio: "Product strategist specializing in intuitive UI/UX design systems, AI workflow automation, and data-driven customer conversions.",
  },
];

const coreValues = [
  {
    title: "Innovation Driven",
    description:
      "We embrace modern technologies and forward-thinking paradigms to engineer digital experiences that outpace the competition.",
    icon: Zap,
  },
  {
    title: "Client Focused",
    description:
      "We listen deeply, understand unique business objectives, and craft tailored solutions that solve real business bottlenecks.",
    icon: Users,
  },
  {
    title: "Quality First",
    description:
      "We obsess over clean code, sub-second speeds, accessibility, and high visual refinement across every single screen.",
    icon: Award,
  },
  {
    title: "Long-Term Partnership",
    description:
      "We view every project as the beginning of a durable partnership, offering reliable ongoing maintenance and architectural growth.",
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
            WHO WE ARE
          </div>
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            We Turn Ideas Into Powerful Digital Experiences.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            NYLEX Digital Studio is a modern digital engineering and design practice founded in Kozhikode,
            Kerala. We engineer bespoke web applications, enterprise software, and AI solutions that empower
            businesses to dominate their digital landscapes.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-neutral-200/80">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950">
                {s.value}
              </p>
              <p className="font-inter text-xs sm:text-sm font-medium text-neutral-500 mt-1 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership / Founders */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-20 sm:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00507D] font-bold">
            LEADERSHIP
          </span>
          <h2 className="font-manrope text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-1">
            Meet the Founders
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            The people behind NYLEX Digital Studio, driven by creativity, technology, and a shared vision for digital innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="rounded-3xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-10 transition-all duration-300 hover:border-[#00507D]/40 hover:bg-white hover:shadow-xl hover:shadow-[#00507D]/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00507D] text-white font-manrope font-bold text-lg shadow-md shadow-[#00507D]/20">
                  {founder.initials}
                </div>
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#00507D]">
                    CO-FOUNDER
                  </span>
                  <h3 className="font-manrope text-xl sm:text-2xl font-bold text-neutral-950">
                    {founder.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-500">
                    {founder.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-inter">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-20 sm:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-10 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10">
                <Target className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00507D]">
                OUR PURPOSE
              </span>
            </div>
            <h2 className="font-manrope text-2xl sm:text-3xl font-bold text-neutral-950">
              Our Mission
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Our mission is to empower businesses with creative, reliable, and effective digital solutions
              that simplify their operations, strengthen their online presence, and help them scale in an
              increasingly digital economy.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-10 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00507D]">
                OUR HORIZON
              </span>
            </div>
            <h2 className="font-manrope text-2xl sm:text-3xl font-bold text-neutral-950">
              Our Vision
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Our vision is to become a globally trusted digital technology partner by consistently delivering
              meaningful user experiences, maintaining rigorous standards of engineering quality, and building
              enduring partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-20 sm:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00507D] font-bold">
            OUR PRINCIPLES
          </span>
          <h2 className="font-manrope text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-1">
            Our Core Values
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            The fundamental standards that guide our code, our decisions, and our client relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="group rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 transition-all duration-300 hover:border-[#00507D]/40 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10 group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-manrope text-lg font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                  {val.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-inter">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-20 sm:mt-28">
        <div className="rounded-3xl bg-[#07090e] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#53e6ff]">
              PARTNER WITH US
            </span>
            <h2 className="font-manrope text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Ready to elevate your digital presence?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300">
              Let&apos;s discuss your vision and build a high-performance solution tailored to your goals.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 px-8 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              <span>Start Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

