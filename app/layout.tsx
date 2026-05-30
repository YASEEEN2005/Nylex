import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Nylex | Engineered Digital Studio",
    template: "%s | Nylex",
  },
  description: "Nylex is a premium digital studio crafting high-performance websites and modern web applications with clean, functional design. Engineered for speed, designed for impact.",
  keywords: [
    "Digital Studio", "Web Development", "Next.js", "Tailwind CSS", "UI/UX Design", 
    "Performance Optimization", "React Agency", "Web Design", "SEO Optimized Web Apps", "Custom Web Development", "Nylex", "Software Engineering"
  ],
  authors: [{ name: "Nylex Studio" }],
  creator: "Nylex",
  publisher: "Nylex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nylex.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nylex | Engineered Digital Studio",
    description: "We craft high-performance websites and modern web applications with clean, functional design.",
    url: 'https://nylex.online',
    siteName: 'Nylex Studio',
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nylex Digital Studio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nylex | Engineered Digital Studio",
    description: "We craft high-performance websites and modern web applications with clean, functional design.",
    creator: '@nylexstudio',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
