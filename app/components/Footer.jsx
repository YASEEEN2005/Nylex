"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Reviews", href: "/reviews" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Web Development", href: "/services" },
    { name: "Application Development", href: "/services" },
    { name: "Software Development", href: "/services" },
    { name: "AI Solutions", href: "/services" },
    { name: "UI/UX Design", href: "/services" },
    { name: "E-commerce", href: "/services" },
    { name: "Digital Marketing", href: "/services" },
    { name: "SEO & Growth", href: "/services" },
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
            <Link
              href="/"
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
            </Link>

            <p className="mt-5 text-sm text-neutral-400 leading-relaxed max-w-sm">
              We build modern websites, software and AI-powered solutions for ambitious businesses worldwide.
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

              {/* WhatsApp */}
              <a
                href="https://wa.me/918921442748"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.45 0.742.966 1.201.664.591 1.224.774 1.397.86.173.086.274.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z" />
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
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    href={service.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
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
            <span>for ambitious founders worldwide.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
