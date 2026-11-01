import Contact from "../sections/Contact";
import { MessageSquare, Phone, Mail, Clock, HelpCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact Us | Start Your Project with NYLEX Digital Studio",
  description:
    "Get in touch with NYLEX Digital Studio. Contact our team in Kozhikode, Kerala for web development, custom software, and AI solutions inquiries.",
  alternates: {
    canonical: "https://nylex.online/contact",
  },
  openGraph: {
    title: "Contact Us | NYLEX Digital Studio",
    description:
      "Ready to build? Send us your project requirements and receive a comprehensive proposal within 24 hours.",
    url: "https://nylex.online/contact",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
  },
};

const faqs = [
  {
    q: "How quickly can NYLEX begin working on our project?",
    a: "We typically onboard new projects within 3 to 7 business days following requirement alignment and contract initiation.",
  },
  {
    q: "What is your typical project turnaround time?",
    a: "High-performance marketing websites typically launch in 2 to 4 weeks. Custom web apps and enterprise software range from 4 to 12 weeks depending on scope.",
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes. We offer ongoing maintenance, security updates, feature additions, and 99.9% uptime monitoring retainers.",
  },
  {
    q: "Can we hire you for AI integrations or workflow automation?",
    a: "Absolutely. We specialize in custom AI customer assistants, internal LLM tooling, and workflow automation tailored to your stack.",
  },
];

export default function ContactPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Hero Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
            DIRECT COMMUNICATION
          </div>
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            Let&apos;s Build Something Impactful Together.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Whether you need a cutting-edge web application, custom software architecture, or an
            AI-driven transformation, our team is ready to deliver.
          </p>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <Contact />

      {/* Frequently Asked Questions */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-16 sm:mt-24 pt-16 border-t border-neutral-200/80">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#00507D]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-manrope text-2xl sm:text-4xl font-bold text-neutral-950">
            Common Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 sm:p-8"
            >
              <h3 className="font-manrope text-base sm:text-lg font-bold text-neutral-950">
                {faq.q}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-inter">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

