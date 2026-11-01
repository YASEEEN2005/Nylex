"use client";

import { useState, useEffect } from "react";

const INITIAL_FALLBACK_CLIENTS = [
  { id: 1, client_name: "Defense Security & Surveillance", image_url: "/clients/defense.png", alt_text: "Defense Security & Surveillance" },
  { id: 2, client_name: "Amazink Tattoos", image_url: "/clients/amazink.png", alt_text: "Amazink Tattoos" },
  { id: 3, client_name: "Modern Blinds & Curtains", image_url: "/clients/modern.png", alt_text: "Modern Blinds & Curtains" },
  { id: 4, client_name: "Taste of Malabar", image_url: "/clients/taste-of-malabar.png", alt_text: "Taste of Malabar" },
  { id: 5, client_name: "Crown E", image_url: "/clients/crown-e.png", alt_text: "Crown E" },
  { id: 6, client_name: "Techsmart Systems", image_url: "/clients/techsmart.png", alt_text: "Techsmart Systems" },
  { id: 7, client_name: "Ideal", image_url: "/clients/ideal.png", alt_text: "Ideal" },
  { id: 8, client_name: "Zeus Tattoo", image_url: "/clients/zeus.png", alt_text: "Zeus Tattoo" },
  { id: 9, client_name: "Galaxy Granites", image_url: "/clients/galaxy-granites.png", alt_text: "Galaxy Granites" },
];

export default function Clients() {
  const [logos, setLogos] = useState(INITIAL_FALLBACK_CLIENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchLogos() {
      try {
        const res = await fetch("/api/client-logos");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.logos) && data.logos.length > 0) {
            setLogos(data.logos);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic client logos, using fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchLogos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="clients"
      className="relative z-10 w-full bg-white text-primary-black py-16 sm:py-24 lg:py-28 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Header - Matching Reference Screenshot */}
        <div className="text-left pb-12 sm:pb-16 max-w-2xl">
          <span className="text-[#00507D] font-semibold text-sm sm:text-base tracking-wide block mb-3">
            Our Clients
          </span>

          <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-950 leading-[1.15]">
            From Startups <br />
            To Growing Businesses.
          </h2>
        </div>

        {/* Dynamic Logos Grid - Clean spacing, responsive layout, centered logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center justify-items-center gap-8 sm:gap-10 lg:gap-12 pt-2">
          {logos.map((client, idx) => {
            const name = client.client_name || client.name || "Client";
            const imageUrl = client.image_url || client.logo;
            const alt = client.alt_text || name;

            return (
              <div
                key={`client-logo-${client.id ?? "logo"}-${idx}`}
                className="flex items-center justify-center w-full h-16 sm:h-20 lg:h-24 px-3 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={imageUrl}
                  alt={alt}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 lg:max-h-16 w-auto max-w-[90%] object-contain transition-opacity duration-300 hover:opacity-90"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
