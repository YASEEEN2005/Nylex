import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.local");

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
    }
  }
}

const showcaseReviews = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "Taste of Malabar",
    quote: "NYLEX Digital Studio delivered an amazing website for our business. The team is professional, creative, and remarkably easy to work with from concept to deployment.",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-05-14T10:00:00Z",
  },
  {
    name: "Michael Chen",
    role: "Founder & Creative Lead",
    company: "Amazink Collective",
    quote: "The custom booking system and web platform developed by NYLEX transformed our client experience and scaled our studio operations seamlessly across branches.",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-06-02T14:30:00Z",
  },
  {
    name: "Elena Rostova",
    role: "Product Lead",
    company: "Luxe Living",
    quote: "Exceptional engineering quality, blazing fast page load speed, and great attention to detail. Highly recommend NYLEX to any ambitious team looking to scale.",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-07-19T09:15:00Z",
  },
  {
    name: "David Al-Mansoor",
    role: "Managing Director",
    company: "Defense Security IT",
    quote: "Their Next.js architecture and UI/UX design took our brand to the next level. Seamless workflow, rapid turnaround, and robust post-launch support.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-08-11T12:00:00Z",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    company: "Sensix Global",
    quote: "Working with NYLEX was an absolute pleasure. They listened attentively to our specifications and delivered a modern web app that exceeded our highest expectations.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-09-05T16:45:00Z",
  },
  {
    name: "Thomas Matthew",
    role: "Executive Director",
    company: "Galaxy Granites",
    quote: "Precision, clean code, and premium design sensibility. NYLEX understood our industrial requirements and executed a flawless product catalog showcase.",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    created_at: "2024-09-28T11:20:00Z",
  },
];

async function seed() {
  const sql = neon(process.env.DATABASE_URL);
  console.log("Seeding showcase testimonials into PostgreSQL...");

  for (const review of showcaseReviews) {
    const existing = await sql`
      SELECT id FROM testimonials WHERE LOWER(name) = LOWER(${review.name}) LIMIT 1;
    `;
    if (existing.length === 0) {
      await sql`
        INSERT INTO testimonials (
          name, role, company, quote, avatar_url, rating, is_approved, created_at, updated_at
        ) VALUES (
          ${review.name},
          ${review.role},
          ${review.company},
          ${review.quote},
          ${review.avatar_url},
          ${review.rating},
          true,
          ${review.created_at}::timestamp with time zone,
          ${review.created_at}::timestamp with time zone
        );
      `;
      console.log(`✓ Seeded: ${review.name} (${review.company})`);
    } else {
      console.log(`- Already exists: ${review.name} (ID: ${existing[0].id})`);
    }
  }

  const all = await sql`SELECT id, name, company, is_approved FROM testimonials ORDER BY id ASC;`;
  console.log(`\nTotal testimonials in DB: ${all.length}`);
  console.table(all);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});

