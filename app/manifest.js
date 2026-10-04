export default function manifest() {
  return {
    name: "NYLEX Digital Studio",
    short_name: "NYLEX",
    description: "Premium digital studio building high-performance websites, scalable software, and AI solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#00507D",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/nylex-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/nylex-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
