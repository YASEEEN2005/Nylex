"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setLoading(true);

    try {
      // 1. Submit lead directly to Neon PostgreSQL database
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          service: "webdev",
        }),
      });
    } catch (err) {
      console.error("API contact error:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 7000);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full bg-white text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column Text & Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              LET&apos;S <br />
              WORK TOGETHER
            </h2>
            <p className="mt-4 font-inter text-base sm:text-lg text-neutral-600 max-w-md">
              Have a project in mind? Get in touch with us.
            </p>

            {/* Contact Details List */}
            <div className="mt-10 space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-xs text-neutral-500 font-medium">Email</p>
                  <a
                    href="mailto:buildwithnylex@gmail.com"
                    className="font-manrope text-sm sm:text-base font-bold text-neutral-900 hover:text-[#00507D] transition-colors"
                  >
                    buildwithnylex@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D] shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-xs text-neutral-500 font-medium">Phone</p>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <a
                      href="tel:+918921507051"
                      className="font-manrope text-sm sm:text-base font-bold text-neutral-900 hover:text-[#00507D] transition-colors"
                    >
                      +91 89215 07051
                    </a>
                    <a
                      href="tel:+918921442748"
                      className="font-manrope text-sm sm:text-base font-bold text-neutral-900 hover:text-[#00507D] transition-colors"
                    >
                      +91 89214 42748
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#00507D]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-xs text-neutral-500 font-medium">Location</p>
                  <p className="font-manrope text-sm sm:text-base font-bold text-neutral-900">
                    Kozhikode, Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-xs hover:border-[#00507D]/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#00507D] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#00507D] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#00507D] focus:bg-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-xs font-medium text-emerald-800 bg-emerald-50/90 border border-emerald-200/90 p-3.5 rounded-2xl shadow-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span>Thank you! Your message has been sent. We will get back to you shortly.</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00507D] hover:bg-[#003e61] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer w-full sm:w-auto group disabled:opacity-50"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
