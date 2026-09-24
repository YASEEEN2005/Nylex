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
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const services = [
    { id: "website", name: "Custom Web Development" },
    { id: "webapp", name: "Web Application" },
    { id: "design", name: "UI/UX Design for Web" },
    { id: "other", name: "Performance & SEO Solutions" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate mandatory fields: Name, Phone, and Service
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setErrorMsg("Please fill in your Name, Phone Number, and select a Required Service.");
      return;
    }

    setLoading(true);

    const recipient = "buildwithnylex@gmail.com";
    const subject = encodeURIComponent(`Web Project Inquiry - ${form.name}`);
    const selectedService = services.find((s) => s.id === form.service)?.name || form.service;

    const bodyText = `Hi NYLEX Team,

I would like to submit a web project inquiry with the following details:

- Full Name: ${form.name}
- Phone Number: ${form.phone}
- Required Service: ${selectedService}
- Email Address: ${form.email || "N/A"}

Project Details:
${form.details || "N/A"}

Best regards,
${form.name}`;

    const body = encodeURIComponent(bodyText);
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Redirect to mail client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "website",
        details: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 bg-white overflow-hidden z-10 border-t border-slate-200 font-sans text-slate-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 sm:gap-5 items-start mb-10 sm:mb-14"
        >
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 text-[#8B5E3C]">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
              GET IN TOUCH
            </span>
            <span className="w-8 h-[1px] bg-[#8B5E3C]" />
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-extrabold leading-[1.1] tracking-tight text-[clamp(32px,5.5vw,72px)] bg-gradient-to-r from-slate-900 via-[#8B5E3C] to-slate-800 bg-clip-text text-transparent">
              Start Your Journey
            </h2>
          </div>
          
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-xl font-medium">
            Have a project in mind? Fill out the details below, and our engineering team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Streamlined Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-slate-50/80 border border-slate-200 shadow-2xs">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                
                {/* Full Name (Required) & Phone Number (Required) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Full Name</span>
                      <span className="text-[#8B5E3C] font-mono text-[9px]">*Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#8B5E3C] focus:outline-none transition-all duration-300 placeholder:text-slate-400 font-medium shadow-2xs"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Phone Number</span>
                      <span className="text-[#8B5E3C] font-mono text-[9px]">*Required</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#8B5E3C] focus:outline-none transition-all duration-300 placeholder:text-slate-400 font-medium shadow-2xs"
                    />
                  </div>
                </div>

                {/* Required Service (Required) & Email Address (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Enquiry Service</span>
                      <span className="text-[#8B5E3C] font-mono text-[9px]">*Required</span>
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#8B5E3C] focus:outline-none transition-all duration-300 select-custom font-medium shadow-2xs cursor-pointer"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id} className="bg-white text-slate-900">
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#8B5E3C] focus:outline-none transition-all duration-300 placeholder:text-slate-400 font-medium shadow-2xs"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Describe your goals, requirements, or vision..."
                    className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#8B5E3C] focus:outline-none transition-all duration-300 placeholder:text-slate-400 resize-none font-medium shadow-2xs"
                  />
                </div>

                {/* Validation Error Alert */}
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full bg-slate-900 text-white hover:bg-[#8B5E3C] font-bold uppercase tracking-[0.25em] text-xs transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {loading ? (
                    <span>transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>

                {/* Success alert */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center"
                  >
                    Request transmitted successfully. We will reach out shortly!
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column: Address and Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="col-span-1 lg:col-span-5 flex flex-col gap-6"
          >
            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/918921442748"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.01 }}
              className="p-5 sm:p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100/60 border border-emerald-200 text-emerald-800 flex items-center justify-between transition-all duration-300 group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current text-emerald-600" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-slate-900 text-sm font-bold">Chat on WhatsApp</h4>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Fast Response</p>
                </div>
              </div>
              <span className="text-sm font-extrabold group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>

            {/* Contact info card block */}
            <motion.div
              whileHover={{ y: -2 }}
              className="p-6 sm:p-7 rounded-[28px] sm:rounded-[32px] bg-slate-50/80 border border-slate-200 flex flex-col gap-6 shadow-2xs group/info"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover/info:bg-[#8B5E3C] group-hover/info:text-white transition-colors duration-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-[9px] font-extrabold uppercase tracking-wider">Direct Email</h4>
                  <p className="text-slate-900 text-xs font-extrabold mt-0.5">buildwithnylex@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover/info:bg-[#8B5E3C] group-hover/info:text-white transition-colors duration-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-[9px] font-extrabold uppercase tracking-wider">Direct Hotline</h4>
                  <p className="text-slate-900 text-xs font-extrabold mt-0.5">+91 89214 42748</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover/info:bg-[#8B5E3C] group-hover/info:text-white transition-colors duration-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-[9px] font-extrabold uppercase tracking-wider">Location</h4>
                  <p className="text-slate-900 text-xs font-extrabold mt-0.5">Kozhikode, Kerala, India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
