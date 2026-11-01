import Link from "next/link";
import {
  Globe,
  Smartphone,
  Code2,
  Bot,
  PenTool,
  ShoppingCart,
  Megaphone,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Our Services | NYLEX Digital Studio - Web, App & AI Solutions",
  description:
    "Explore our full suite of digital engineering services: high-performance web development, mobile apps, custom software, AI automation, UI/UX design, and SEO.",
  alternates: {
    canonical: "https://nylex.online/services",
  },
  openGraph: {
    title: "Services | NYLEX Digital Studio",
    description:
      "Modern web development, custom software architectures, and AI solutions built to scale ambitious businesses.",
    url: "https://nylex.online/services",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
  },
};

const serviceDetails = [
  {
    num: "01",
    title: "Web Development",
    icon: Globe,
    tagline: "High-performance, scalable websites and web applications.",
    description:
      "We design and build bespoke web experiences engineered for lightning-fast speeds, rock-solid security, and flawless responsive performance across every viewport.",
    deliverables: [
      "Next.js & React Full-Stack Architecture",
      "Sub-second Core Web Vitals Optimization",
      "Headless CMS & Content Management",
      "Mobile-First Responsive Systems",
      "Production Cloud Deployments",
    ],
  },
  {
    num: "02",
    title: "Application Development",
    icon: Smartphone,
    tagline: "Native and cross-platform mobile apps for iOS and Android.",
    description:
      "From mobile MVPs to mature enterprise applications, we build intuitive, reactive mobile apps integrated with resilient cloud APIs and offline-first storage.",
    deliverables: [
      "Cross-Platform iOS & Android Apps",
      "Real-Time Push Notifications",
      "Cloud Database & Auth Integration",
      "Fluid Touch Animations & Native Feel",
      "App Store & Google Play Publishing",
    ],
  },
  {
    num: "03",
    title: "Software Development",
    icon: Code2,
    tagline: "Tailored enterprise systems, APIs, and custom software architectures.",
    description:
      "Automate internal operations and replace fragmented legacy tooling with purpose-built software platforms engineered for your specific organizational workflows.",
    deliverables: [
      "Custom Enterprise SaaS Platforms",
      "REST & GraphQL API Engineering",
      "PostgreSQL & Database Design",
      "Role-Based Access Control (RBAC)",
      "Automated Testing & CI/CD Pipelines",
    ],
  },
  {
    num: "04",
    title: "AI Solutions & Automation",
    icon: Bot,
    tagline: "Intelligent automation, LLM workflows, and custom smart assistants.",
    description:
      "Harness the power of machine learning and large language models to automate support, qualify inbound leads, and eliminate repetitive manual bottlenecks.",
    deliverables: [
      "Custom AI Chatbots & Customer Agents",
      "Internal Knowledge Retrieval (RAG)",
      "Automated Inbound Lead Qualification",
      "Workflow Process Automation",
      "Predictive Analytics & Data Pipelines",
    ],
  },
  {
    num: "05",
    title: "UI/UX Design & Design Systems",
    icon: PenTool,
    tagline: "Minimalist, human-centered interfaces that convert visitors into clients.",
    description:
      "We translate complex product ideas into intuitive wireframes, clickable prototypes, and comprehensive design systems built with restraint and elegance.",
    deliverables: [
      "End-to-End User Experience Research",
      "Interactive High-Fidelity Prototypes",
      "Design Systems & Component Libraries",
      "Micro-Interactions & Motion Design",
      "Accessibility & Usability Audits",
    ],
  },
  {
    num: "06",
    title: "E-Commerce Solutions",
    icon: ShoppingCart,
    tagline: "High-converting storefronts, frictionless checkout, and catalog scale.",
    description:
      "Launch modern e-commerce stores optimized for rapid loading, seamless payment gateway integrations, and streamlined customer purchasing funnels.",
    deliverables: [
      "Custom Storefronts & Checkout Flows",
      "Stripe, Razorpay & Multi-Currency Gateways",
      "Real-Time Inventory & Order Tracking",
      "Conversion Rate Optimization (CRO)",
      "Secure Customer Account Portals",
    ],
  },
  {
    num: "07",
    title: "Digital Marketing & Positioning",
    icon: Megaphone,
    tagline: "Data-driven marketing campaigns that establish market authority.",
    description:
      "Amplify your brand message through strategic digital marketing, targeted performance campaigns, and clear positioning that resonates with your core demographic.",
    deliverables: [
      "Brand Identity & Messaging Strategy",
      "Targeted Social & Search Campaigns",
      "Content Marketing & Funnel Strategy",
      "Audience Segmentation & Tracking",
      "Analytics & Conversion Attribution",
    ],
  },
  {
    num: "08",
    title: "SEO & Digital Growth",
    icon: TrendingUp,
    tagline: "Technical search engine optimization that earns lasting organic visibility.",
    description:
      "Dominate Google rankings with clean semantic HTML, structured JSON-LD schemas, localized search visibility, and strategic organic content architecture.",
    deliverables: [
      "Technical SEO Architecture & Auditing",
      "Schema.org & Rich Snippet Formatting",
      "Page Speed & Core Web Vitals Tuning",
      "Keyword & Competitive Landscape Analysis",
      "Ongoing Organic Search Monitoring",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Hero Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
            CAPABILITIES & EXPERTISE
          </div>
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            Engineering Digital Products That Move Businesses Forward.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            From modern responsive websites to enterprise software platforms and AI automation,
            we partner with ambitious founders to engineer world-class digital solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-14 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {serviceDetails.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.num}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-10 transition-all duration-300 hover:border-[#00507D]/40 hover:bg-white hover:shadow-xl hover:shadow-[#00507D]/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#00507D] border border-[#00507D]/10 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-sm font-bold text-[#00507D] bg-white px-3 py-1 rounded-full border border-neutral-200/80 shadow-2xs">
                      {service.num}
                    </span>
                  </div>

                  <h2 className="font-manrope text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 group-hover:text-[#00507D] transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base font-medium text-neutral-800">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-inter">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-neutral-200/80">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Key Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-[#00507D] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200/60">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00507D] hover:text-[#003e61] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Request estimate for {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-20 sm:mt-28">
        <div className="rounded-3xl bg-[#07090e] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#00507D]/30 blur-[90px]" />
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#53e6ff]">
              READY TO BUILD?
            </span>
            <h2 className="font-manrope text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Let&apos;s build something extraordinary together.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300">
              Tell us about your project goals and we will deliver a tailored proposal within 24 hours.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 px-8 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

