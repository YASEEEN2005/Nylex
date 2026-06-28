"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "website",
    budget: "$10k - $25k",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgets = ["<$10k", "$10k - $25k", "$25k - $50k", "$50k+"];

  const services = [
    { id: "website", name: "Website Development" },
    { id: "webapp", name: "Web App Development" },
    { id: "branding", name: "Branding Experiences" },
    { id: "other", name: "Custom Solutions" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const recipient = "buildwithnylex@gmail.com";
    const subject = encodeURIComponent(`Project Request - ${form.name}`);
    const selectedService = services.find(s => s.id === form.service)?.name || form.service;
    
    const bodyText = `Hi NYLEX Team,

I would like to submit a project inquiry with the following details:

- Name: ${form.name}
- Email: ${form.email}
- Phone: ${form.phone || "N/A"}
- Service: ${selectedService}
- Budget Range: ${form.budget}

Project Details:
${form.details}

Best regards,
${form.name}`;

    const body = encodeURIComponent(bodyText);
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Redirect to email client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "website",
        budget: "$10k - $25k",
        details: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#F7F4F0] overflow-hidden z-10 border-t border-[#EDE5DB]">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Title */}
        <div className="flex flex-col items-start gap-4 mb-20 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5E3C] font-sans">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] font-serif tracking-tight leading-tight">
            Start Your Digital Journey
          </h2>
          <p className="text-[#7A7A7A] text-sm sm:text-base max-w-md font-sans font-medium">
            Have a project in mind? Fill out the details below, and our engineering team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
          
          {/* Left Column: Form */}
          <div className="col-span-1 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white border border-[#EDE5DB] shadow-sm"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      suppressHydrationWarning
                      className="px-5 py-3.5 rounded-lg bg-[#F7F4F0] border border-[#EDE5DB] text-[#1A1A1A] text-xs focus:border-[#8B5E3C] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      suppressHydrationWarning
                      className="px-5 py-3.5 rounded-lg bg-[#F7F4F0] border border-[#EDE5DB] text-[#1A1A1A] text-xs focus:border-[#8B5E3C] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 font-medium"
                    />
                  </div>
                </div>

                {/* Phone & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      suppressHydrationWarning
                      className="px-5 py-3.5 rounded-lg bg-[#F7F4F0] border border-[#EDE5DB] text-[#1A1A1A] text-xs focus:border-[#8B5E3C] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Required Service
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      suppressHydrationWarning
                      className="px-5 py-3.5 rounded-lg bg-[#F7F4F0] border border-[#EDE5DB] text-[#1A1A1A] text-xs focus:border-[#8B5E3C] focus:bg-white focus:outline-none transition-all duration-300 select-custom font-medium"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id} className="bg-white text-[#1A1A1A]">
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Project Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        suppressHydrationWarning
                        className={`py-3 rounded-lg text-[10px] font-bold tracking-wider transition-all duration-300 border ${
                          form.budget === b
                            ? "bg-[#8B5E3C] border-[#8B5E3C] text-white shadow-sm"
                            : "bg-[#F7F4F0] border-[#EDE5DB] text-gray-500 hover:text-[#1A1A1A] hover:border-[#8B5E3C]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Describe your goals, requirements, sitemaps, or vision..."
                    suppressHydrationWarning
                    className="px-5 py-3.5 rounded-lg bg-[#F7F4F0] border border-[#EDE5DB] text-[#1A1A1A] text-xs focus:border-[#8B5E3C] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 resize-none font-medium"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="pointer"
                  suppressHydrationWarning
                  className="w-full py-4 rounded-lg bg-[#8B5E3C] hover:bg-[#A06F4C] text-white font-bold tracking-wider text-xs shadow-sm transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {/* Success alert */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-bold text-center"
                  >
                    Request transmitted successfully. We will reach out shortly!
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Right Column: Address and Map */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/918921442748"
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                className="p-6 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-between transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-current text-emerald-600" />
                  </div>
                  <div className="text-left font-sans">
                    <h4 className="text-[#1A1A1A] text-sm font-bold">Chat on WhatsApp</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Fast Response</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold group-hover:translate-x-0.5 transition-transform">→</span>
              </a>

              {/* Contact info card block */}
              <div className="p-6 rounded-2xl bg-white border border-[#EDE5DB] flex flex-col gap-5 shadow-xs">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EDE5DB]/70 flex items-center justify-center border border-[#EDE5DB] text-[#8B5E3C] shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-[9px] font-extrabold uppercase tracking-wider">Direct Email</h4>
                    <p className="text-[#1A1A1A] text-xs font-extrabold mt-0.5">buildwithnylex@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EDE5DB]/70 flex items-center justify-center border border-[#EDE5DB] text-[#8B5E3C] shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-[9px] font-extrabold uppercase tracking-wider">Direct Hotline</h4>
                    <p className="text-[#1A1A1A] text-xs font-extrabold mt-0.5">+91 89214 42748</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EDE5DB]/70 flex items-center justify-center border border-[#EDE5DB] text-[#8B5E3C] shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-[9px] font-extrabold uppercase tracking-wider">Location</h4>
                    <p className="text-[#1A1A1A] text-xs font-extrabold mt-0.5">Kozhikode, Kerala, India</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
