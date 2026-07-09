import "./globals.css";
import CanvasBackground from "./components/CanvasBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSocials from "./components/FloatingSocials";
import SmoothScroll from "./components/SmoothScroll";

export const metadata = {
  title: "NYLEX // Building Premium Digital Experiences",
  description:
    "NYLEX crafts high-performance websites, web applications, branding experiences, and digital solutions for modern businesses seeking luxury and visual excellence.",
  keywords: [
    "Digital Agency",
    "Creative Studio",
    "Web Development",
    "UI/UX Design",
    "Premium Websites",
    "Three.js",
    "Next.js Agency",
    "Awwwards Web Design",
  ],
  authors: [{ name: "NYLEX" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased select-none bg-black text-white">
        {/* Momentum Smooth Scrolling */}
        <SmoothScroll />

        {/* Custom Interactive 3D Background */}
        <CanvasBackground />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Workspace */}
        <main className="relative min-h-screen overflow-x-hidden flex flex-col justify-start">
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
