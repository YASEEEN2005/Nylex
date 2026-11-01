import { getDb } from "./db";

export const fallbackProjects = [
  {
    id: 1,
    slug: "taste-of-malabar-caterers",
    title: "Taste of Malabar Caterers",
    link: "https://www.tasteofmalabarcaterers.com/",
    category: "webdev",
    type: "Web Development & Branding",
    description: "An authentic, high-converting digital storefront and menu ordering platform designed for a premier catering enterprise.",
    image_url: "/projects/taste_of_malabar.jpg",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
    result: "300% increase in online inquiries",
    featured: true,
  },
  {
    id: 2,
    slug: "amazink-tattoo-collective",
    title: "Amazink Tattoo Collective",
    link: "https://www.amazinktatto.com/",
    category: "webdev",
    type: "Custom Web Application",
    description: "An artistic, dark-luxury booking and portfolio platform for an elite international tattoo collective and studio.",
    image_url: "/projects/amazink_tattoo.jpg",
    tags: ["React", "UI/UX Design", "Booking Engine", "Cloudinary"],
    result: "Over 500+ monthly client appointments booked",
    featured: true,
  },
  {
    id: 3,
    slug: "defense-security-it",
    title: "Defense Security IT",
    link: "https://www.defensesecurityit.in/",
    category: "software",
    type: "Enterprise IT Security Platform",
    description: "Corporate enterprise platform highlighting cybersecurity systems, surveillance infrastructure, and defense hardware integrations.",
    image_url: "/projects/defense_security.jpg",
    tags: ["Next.js", "Enterprise Architecture", "Security Auditing", "PostgreSQL"],
    result: "Enterprise government contract acquisition",
    featured: true,
  },
  {
    id: 4,
    slug: "techsmart-systems",
    title: "Techsmart Systems",
    link: "https://www.techsmartsystems.co.in/",
    category: "software",
    type: "Automation & Systems Engineering",
    description: "An industrial automation engineering showcase showcasing custom hardware solutions, IoT platforms, and smart building technology.",
    image_url: "/projects/techsmart_systems.jpg",
    tags: ["IoT Showcase", "Technical SEO", "High-Performance Next.js"],
    result: "Doubled organic B2B lead generation",
    featured: true,
  },
  {
    id: 5,
    slug: "sensix-global",
    title: "Sensix Global",
    link: "https://www.sensixglobal.com/",
    category: "webdev",
    type: "Global Corporate Showcase",
    description: "A sleek international corporate portal delivering multi-regional compliance, high-availability architecture, and brand authority.",
    image_url: "/projects/sensix_global.jpg",
    tags: ["Corporate Portal", "Global CDN", "Cloud Infrastructure"],
    result: "Global partner expansion across 4 continents",
    featured: true,
  },
  {
    id: 6,
    slug: "galaxy-granites",
    title: "Galaxy Granites",
    link: "https://www.galaxygranites.co.in/",
    category: "ecommerce",
    type: "Architectural Stone & Material Catalog",
    description: "An interactive architectural stone catalog with real-time material textures, export inquiry pipeline, and stone inventory showcase.",
    image_url: "/projects/galaxy_granites.jpg",
    tags: ["Material Showcase", "Fast Image CDN", "Lead Capture Funnel"],
    result: "45% reduction in quote turnaround time",
    featured: true,
  },
];

export async function getAllProjects() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT
        p.id, p.title, p.slug, p.link, p.category, p.type, p.description,
        p.image_url, p.image_public_id, p.tags, p.result, p.featured, p.order_index, p.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', g.id,
              'image_url', g.image_url,
              'public_id', g.public_id,
              'caption', g.caption,
              'order_index', g.order_index
            ) ORDER BY g.order_index ASC, g.id ASC
          ) FILTER (WHERE g.id IS NOT NULL),
          '[]'
        ) as gallery
      FROM projects p
      LEFT JOIN project_gallery g ON g.project_id = p.id
      GROUP BY p.id
      ORDER BY p.order_index ASC, p.id DESC;
    `;
    if (rows && rows.length > 0) {
      return rows;
    }
  } catch (err) {
    // Graceful fallback to static portfolio data if DB query fails during build or network disconnect
  }
  return fallbackProjects;
}

export async function getProjectBySlug(slugOrId) {
  const all = await getAllProjects();
  return (
    all.find(
      (p) =>
        (p.slug && p.slug.toLowerCase() === slugOrId.toLowerCase()) ||
        String(p.id) === String(slugOrId) ||
        (p.title &&
          p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") === slugOrId.toLowerCase())
    ) || null
  );
}

