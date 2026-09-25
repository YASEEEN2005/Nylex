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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setErrorMsg("Please fill in your Name, Phone Number, and select a Required Service.");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          details: form.details,
        }),
      });
    } catch (err) {
      console.error("API contact error:", err);
    }

    const recipient = "buildwithnylex@gmail.com";
    const subject = encodeURIComponent(`Web Project Inquiry - ${form.name}`);
    const selectedService = services.find((s) => s.id === form.service)?.name || form.service;

    const bodyText = `Hi NYLEX Team,

I would like to submit a web project inquiry:

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
    <section id="contact" className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden z-10 border-t border-slate-200/90 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 sm:gap-4 items-start mb-12 sm:mb-16"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5E3C] font-mono">
            ✦ START A PROJECT
          </span>
          <h2 className="font-serif font-bold text-[clamp(36px,5.5vw,72px)] leading-[1.05] text-slate-900">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            Have a project in mind? Send us a message and our lead engineers will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-7"
          >
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-600 font-bold uppercase font-mono tracking-wider flex items-center justify-between">
                      <span>Full Name</span>
                      <span className="text-[#8B5E3C]">*Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#8B5E3C] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-600 font-bold uppercase font-mono tracking-wider flex items-center justify-between">
                      <span>Phone Number</span>
                      <span className="text-[#8B5E3C]">*Required</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#8B5E3C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-600 font-bold uppercase font-mono tracking-wider">
                      Required Service
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#8B5E3C] transition-colors"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-600 font-bold uppercase font-mono tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#8B5E3C] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-slate-600 font-bold uppercase font-mono tracking-wider">
                    Project Requirements / Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project timeline, goals, and specific features..."
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#8B5E3C] transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-mono font-bold">{errorMsg}</p>
                )}

                {submitted && (
                  <p className="text-xs text-emerald-600 font-mono font-bold">
                    ✓ Thank you! Your inquiry has been submitted successfully.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-[#8B5E3C] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending..." : "Submit Project Inquiry"}</span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-5 flex flex-col gap-6"
          >
            <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col gap-6 shadow-xl">
              <h3 className="font-serif font-bold text-2xl text-white">Direct Communication</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                Prefer direct messaging or WhatsApp? Reach out to our engineering lead directly.
              </p>

              <div className="flex flex-col gap-4 pt-4 border-t border-slate-800">
                <a
                  href="mailto:buildwithnylex@gmail.com"
                  className="flex items-center gap-3 text-slate-200 hover:text-white text-xs font-mono font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8B5E3C]" />
                  <span>buildwithnylex@gmail.com</span>
                </a>
                <a
                  href="tel:+918921442748"
                  className="flex items-center gap-3 text-slate-200 hover:text-white text-xs font-mono font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+91 89214 42748</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/918921442748"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat On WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
