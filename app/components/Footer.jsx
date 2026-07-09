"use client";

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
    { icon: <Facebook className="w-3.5 h-3.5" />, href: "https://facebook.com", name: "Facebook" },
    { icon: <Instagram className="w-3.5 h-3.5" />, href: "https://instagram.com", name: "Instagram" },
    { icon: <Linkedin className="w-3.5 h-3.5" />, href: "https://linkedin.com", name: "LinkedIn" },
    { icon: <Dribbble className="w-3.5 h-3.5" />, href: "https://dribbble.com", name: "Dribbble" },
  ];

  return (
    <footer className="relative py-8 bg-black border-t border-white/10 overflow-hidden z-10 text-white/50">
      {/* Ambient glow lights */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col gap-6">
        
        {/* Top bar: Branding & Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-2">
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, "#top")}
              className="flex items-center gap-2.5 group text-white text-xl font-extrabold tracking-widest"
            >
              <img
                src="/new n logo.png"
                alt="Nylex Logo"
                className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="text-xs font-extrabold tracking-widest text-white uppercase font-sans">NYLEX</span>
                <span className="text-[5px] font-bold tracking-[0.25em] text-[#8B5E3C] uppercase font-sans">DIGITAL STUDIO</span>
              </div>
            </a>
            <p className="text-white/40 text-[10px] max-w-sm font-sans">
              Building digital experiences that inspire and perform. Premium UI/UX & full-stack websites.
            </p>
          </div>

          {/* Social Links Panel */}
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#8B5E3C] hover:border-[#8B5E3C] hover:scale-105 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & inline menu links */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/40 font-sans">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" onClick={(e) => handleScrollTo(e, "#top")} className="hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-white transition-colors">About</a>
            <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-white transition-colors">Services</a>
            <a href="#work" onClick={(e) => handleScrollTo(e, "#work")} className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <span>© {currentYear} NYLEX. All rights reserved.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
