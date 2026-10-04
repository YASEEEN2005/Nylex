"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Home", href: "#top" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Web Development", href: "#services" },
    { name: "Application Development", href: "#services" },
    { name: "Software Development", href: "#services" },
    { name: "AI Solutions", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "E-commerce", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "SEO & Growth", href: "#services" },
  ];

  return (
    <footer className="relative z-10 w-full bg-[#0a0a0a] text-neutral-400 font-inter border-t border-white/10 pt-16 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Main 4-Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-14 border-b border-white/10"
        >
          {/* Col 1: Branding & Socials */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a
              href="#top"
              onClick={(e) => handleScrollTo(e, "#top")}
              className="inline-flex items-center gap-3 group"
              aria-label="Nylex Home"
            >
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-white/[0.08] border border-white/10 shadow-[0_0_15px_rgba(0,112,243,0.15)] group-hover:border-[#00507D]/60 transition-all duration-300">
                <img
                  src="/nylex-icon.png"
                  alt="Nylex Logo"
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-manrope text-xl font-extrabold tracking-tight text-white group-hover:text-[#53e6ff] transition-colors">
                  NYLEX
                </span>
                <span className="font-inter text-[9px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
                  DIGITAL STUDIO
                </span>
              </div>
            </a>

            <p className="mt-5 text-sm text-neutral-400 leading-relaxed max-w-sm">
              We build modern websites, software and AI-powered solutions for ambitious businesses.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Discord / Community */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-manrope text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="lg:col-span-3">
            <h4 className="font-manrope text-sm font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    onClick={(e) => handleScrollTo(e, service.href)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-manrope text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <p>
                <a
                  href="mailto:buildwithnylex@gmail.com"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  buildwithnylex@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+918921507051"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  +91 89215 07051
                </a>
              </p>
              <p>
                <a
                  href="tel:+918921442748"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  +91 89214 42748
                </a>
              </p>
              <p className="text-neutral-400">
                Kozhikode, Kerala, India
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Legal Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2024 NYLEX Digital Studio. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for a better digital world.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
