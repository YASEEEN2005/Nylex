import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import CanvasBackground from "./components/CanvasBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSocials from "./components/FloatingSocials";
import SmoothScroll from "./components/SmoothScroll";
import MouseFollower from "./components/MouseFollower";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nylex.in"),
  title: {
    default: "NYLEX | Web Development, Custom Software & AI Studio",
    template: "%s | NYLEX Digital Studio",
  },
  description:
    "NYLEX is a premier digital engineering studio specializing in high-performance Next.js websites, scalable custom software, UI/UX design, and AI solutions for ambitious businesses.",
  keywords: [
    "NYLEX",
    "NYLEX Digital Studio",
    "Web Development Company Kozhikode",
    "Next.js Development Agency",
    "Custom Software Development Kerala",
    "AI Solutions India",
    "UI UX Design Studio",
    "E-commerce Website Developers",
    "Full Stack Web Development",
    "High Performance Web Applications",
    "Software Engineering Studio",
    "Kozhikode Web Designers",
  ],
  authors: [{ name: "NYLEX Digital Studio", url: "https://nylex.in" }],
  creator: "NYLEX Digital Studio",
  publisher: "NYLEX Digital Studio",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NYLEX | Web Development, Custom Software & AI Studio",
    description:
      "Transforming ambitious ideas into world-class digital realities. High-performance web applications, scalable software, and AI-powered solutions.",
    url: "https://nylex.in",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/nylex-icon.png",
        width: 1200,
        height: 630,
        alt: "NYLEX Digital Studio - Engineering the Future of Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NYLEX | Web Development, Custom Software & AI Studio",
    description:
      "Transforming ambitious ideas into world-class digital realities. High-performance web applications, scalable software, and AI-powered solutions.",
    creator: "@nylex",
    images: ["/nylex-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/nylex-icon.png",
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#00507D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nylex.in/#organization",
      name: "NYLEX Digital Studio",
      url: "https://nylex.in",
      logo: {
        "@type": "ImageObject",
        url: "https://nylex.in/nylex-icon.png",
      },
      sameAs: [
        "https://instagram.com",
        "https://linkedin.com",
        "https://twitter.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8921507051",
        contactType: "customer service",
        email: "buildwithnylex@gmail.com",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Malayalam"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kozhikode",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://nylex.in/#service",
      name: "NYLEX Digital Studio",
      image: "https://nylex.in/nylex-icon.png",
      url: "https://nylex.in",
      telephone: "+918921507051",
      email: "buildwithnylex@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kozhikode",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Development",
              description: "Modern, high-performance responsive websites and web applications built with Next.js and React.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software Development",
              description: "Custom software solutions, enterprise platforms and scalable backend architectures.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Solutions & Automation",
              description: "AI integration, intelligent automation workflows, LLM applications and custom smart assistants.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX Design",
              description: "Stunning user interface design, design systems, interactive prototypes and intuitive user experiences.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://nylex.in/#website",
      url: "https://nylex.in",
      name: "NYLEX Digital Studio",
      publisher: {
        "@id": "https://nylex.in/#organization",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} overflow-x-clip`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} font-inter antialiased select-none bg-[#0a0a0a] text-[#f7fafc] overflow-x-clip`}>
        {/* Momentum Smooth Scrolling */}
        <SmoothScroll />

        {/* Custom Desktop Cursor Follower */}
        <MouseFollower />

        {/* Custom Interactive Background */}
        <CanvasBackground />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Workspace */}
        <main className="relative min-h-screen overflow-x-clip flex flex-col justify-start">
          <div id="top" />
          {children}
        </main>

        {/* Global Sitemap Footer */}
        <Footer />

        {/* Floating Social Quick Actions */}
        <FloatingSocials />
      </body>
    </html>
  );
}
