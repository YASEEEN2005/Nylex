"use client";

import { Mail, Phone, MapPin } from "lucide-react";

// Inline brand SVGs for the footer socials
const Facebook = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Dribbble = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.84c-6.62-1.41-12.15 1-13.88 7.85" />
    <path d="M5.16 19.13c2.72-7.72 10.15-9.75 14.34-2.22" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com", name: "Facebook" },
    { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com", name: "Instagram" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", name: "LinkedIn" },
    { icon: <Dribbble className="w-4 h-4" />, href: "https://dribbble.com", name: "Dribbble" },
  ];

  return (
    <footer className="relative pt-20 pb-10 bg-[#1C1510] border-t border-white/5 overflow-hidden z-10 text-white/70">
      {/* Ambient glow lights */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-5">
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, "#top")}
              className="flex items-center gap-2.5 group text-white text-2xl font-extrabold tracking-widest"
            >
              <svg className="w-6.5 h-6.5 text-[#EDE5DB]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4v16M19 4v16M5 4l14 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="text-sm font-extrabold tracking-widest text-white uppercase font-sans">NYLEX</span>
                <span className="text-[6px] font-bold tracking-[0.25em] text-[#EDE5DB] uppercase font-sans">DIGITAL STUDIO</span>
              </div>
            </a>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-sans">
              Building digital experiences that inspire and perform. We deliver premium UI/UX, full-stack websites, and custom web applications.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1 sm:col-span-3 md:col-span-2 flex flex-col gap-4 font-sans">
            <h4 className="text-white text-[10px] font-extrabold uppercase tracking-widest">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-300">
              <a href="#" onClick={(e) => handleScrollTo(e, "#top")} className="hover:text-[#EDE5DB] transition-colors duration-200">Home</a>
              <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-[#EDE5DB] transition-colors duration-200">About</a>
              <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-[#EDE5DB] transition-colors duration-200">Services</a>
              <a href="#work" onClick={(e) => handleScrollTo(e, "#work")} className="hover:text-[#EDE5DB] transition-colors duration-200">Projects</a>
              <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-[#EDE5DB] transition-colors duration-200">Contact</a>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1 sm:col-span-3 md:col-span-2 flex flex-col gap-4 font-sans">
            <h4 className="text-white text-[10px] font-extrabold uppercase tracking-widest">Services</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-300">
              <span className="hover:text-[#EDE5DB] transition-colors duration-200 cursor-default">Web Development</span>
              <span className="hover:text-[#EDE5DB] transition-colors duration-200 cursor-default">UI/UX Design</span>
              <span className="hover:text-[#EDE5DB] transition-colors duration-200 cursor-default">Mobile Development</span>
              <span className="hover:text-[#EDE5DB] transition-colors duration-200 cursor-default">Branding</span>
            </div>
          </div>

          {/* Contact Us Column */}
          <div className="col-span-1 sm:col-span-3 md:col-span-2.5 flex flex-col gap-4 font-sans">
            <h4 className="text-white text-[10px] font-extrabold uppercase tracking-widest">Contact Us</h4>
            <div className="flex flex-col gap-3 text-xs text-gray-300">
              <a href="tel:+918921442748" className="flex items-center gap-2.5 hover:text-[#EDE5DB] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#EDE5DB]" />
                +91 89214 42748
              </a>
              <a href="mailto:buildwithnylex@gmail.com" className="flex items-center gap-2.5 hover:text-[#EDE5DB] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#EDE5DB]" />
                buildwithnylex@gmail.com
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#EDE5DB] mt-0.5 shrink-0" />
                <span>Kozhikode, Kerala, India</span>
              </div>
            </div>
          </div>

          {/* Follow Us Column */}
          <div className="col-span-1 sm:col-span-3 md:col-span-1.5 flex flex-col gap-4 font-sans">
            <h4 className="text-white text-[10px] font-extrabold uppercase tracking-widest">Follow Us</h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#8B5E3C] hover:border-[#8B5E3C] transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 font-sans">
          <div>
            © {currentYear} NYLEX Agency. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
