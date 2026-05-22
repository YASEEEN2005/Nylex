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

export const metadata: Metadata = {
  title: "Nylex | Engineered Digital Studio",
  description: "We craft high-performance websites and modern web applications with clean, functional design. Engineered for speed, designed for impact.",
  keywords: ["Digital Studio", "Web Development", "Next.js", "Tailwind CSS", "UI/UX Design", "Performance"],
  authors: [{ name: "Nylex" }],
  openGraph: {
    title: "Nylex | Engineered Digital Studio",
    description: "We craft high-performance websites and modern web applications with clean, functional design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
