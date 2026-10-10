"use client";

const clients = [
  {
    name: "Defense Security & Surveillance",
    logo: "/clients/defense.png",
  },
  {
    name: "Amazink Tattoos",
    logo: "/clients/amazink.png",
  },
  {
    name: "Modern Blinds & Curtains",
    logo: "/clients/modern.png",
  },
  {
    name: "Taste of Malabar",
    logo: "/clients/taste-of-malabar.png",
  },
  {
    name: "Crown E",
    logo: "/clients/crown-e.png",
  },
  {
    name: "Techsmart Systems",
    logo: "/clients/techsmart.png",
  },
  {
    name: "Ideal",
    logo: "/clients/ideal.png",
  },
  {
    name: "Zeus Tattoo",
    logo: "/clients/zeus.png",
  },
  {
    name: "Galaxy Granites",
    logo: "/clients/galaxy-granites.png",
  },
];

export default function Clients() {
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

        {/* Full Color Logos Grid - Naturally flowing into neat rows & columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center justify-items-center gap-8 sm:gap-10 lg:gap-12 pt-2">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center w-full h-16 sm:h-20 lg:h-24 px-3 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-12 sm:max-h-14 lg:max-h-16 w-auto max-w-[90%] object-contain transition-opacity duration-300 hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
