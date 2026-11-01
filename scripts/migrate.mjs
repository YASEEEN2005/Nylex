import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.local");

// Load local environment variables
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
}

async function runMigrations() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  console.log("⚡ Initializing Neon PostgreSQL Schema Migrations for NYLEX Studio...");
  const sql = neon(dbUrl);

  // 1. Admins Table
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: admins created / verified.");

  // 2. Projects Table
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255),
      link VARCHAR(500) DEFAULT '',
      category VARCHAR(100) DEFAULT 'webdev',
      type VARCHAR(100) DEFAULT 'Web Development',
      description TEXT DEFAULT '',
      image_url VARCHAR(1000) DEFAULT '',
      image_public_id VARCHAR(255) DEFAULT '',
      tags TEXT[] DEFAULT ARRAY[]::TEXT[],
      result VARCHAR(255) DEFAULT '',
      featured BOOLEAN DEFAULT true,
      order_index INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: projects created / verified.");

  // 3. Project Gallery Table
  await sql`
    CREATE TABLE IF NOT EXISTS project_gallery (
      id SERIAL PRIMARY KEY,
      project_id INT REFERENCES projects(id) ON DELETE CASCADE,
      image_url VARCHAR(1000) NOT NULL,
      public_id VARCHAR(255),
      caption VARCHAR(255),
      order_index INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: project_gallery created / verified.");

  // 4. Clients Table
  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255) DEFAULT '',
      email VARCHAR(255) DEFAULT '',
      phone VARCHAR(100) DEFAULT '',
      logo_url VARCHAR(1000) DEFAULT '',
      logo_public_id VARCHAR(255) DEFAULT '',
      status VARCHAR(50) DEFAULT 'Active',
      total_billed NUMERIC(12, 2) DEFAULT 0.00,
      notes TEXT DEFAULT '',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: clients created / verified.");

  // 4b. Client Logos Table (Dynamic Showcase for Our Clients Section)
  await sql`
    CREATE TABLE IF NOT EXISTS client_logos (
      id SERIAL PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      cloudinary_public_id VARCHAR(255) DEFAULT '',
      alt_text VARCHAR(255) DEFAULT '',
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_client_logos_order ON client_logos(display_order, id);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_client_logos_active ON client_logos(is_active);`;
  console.log("✓ Table: client_logos created / verified.");

  // 5. Services Table
  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT '',
      icon VARCHAR(100) DEFAULT 'Globe',
      order_index INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: services created / verified.");

  // 6. Testimonials Table (Client Reviews & Public Submissions)
  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) DEFAULT 'Client',
      company VARCHAR(255) DEFAULT '',
      quote TEXT NOT NULL,
      avatar_url VARCHAR(1000) DEFAULT '',
      avatar_public_id VARCHAR(255) DEFAULT '',
      rating INT DEFAULT 5,
      is_approved BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: testimonials created / verified.");

  // 7. Enquiries Table
  await sql`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) DEFAULT '',
      phone VARCHAR(100) DEFAULT '',
      service VARCHAR(100) DEFAULT 'webdev',
      message TEXT DEFAULT '',
      is_read BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: enquiries created / verified.");

  // 8. Invoices Table
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      invoice_number VARCHAR(100) UNIQUE NOT NULL,
      client_id INT REFERENCES clients(id) ON DELETE SET NULL,
      client_name VARCHAR(255) NOT NULL,
      client_email VARCHAR(255) DEFAULT '',
      client_phone VARCHAR(100) DEFAULT '',
      client_company VARCHAR(255) DEFAULT '',
      issue_date DATE DEFAULT CURRENT_DATE,
      due_date DATE,
      subtotal NUMERIC(12, 2) DEFAULT 0.00,
      tax NUMERIC(12, 2) DEFAULT 0.00,
      discount NUMERIC(12, 2) DEFAULT 0.00,
      total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      paid_amount NUMERIC(12, 2) DEFAULT 0.00,
      status VARCHAR(50) DEFAULT 'Pending',
      notes TEXT DEFAULT 'Thank you for partnering with NYLEX DIGITAL STUDIO.',
      meta JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS meta JSONB DEFAULT '{}';`;
  console.log("✓ Table: invoices created / verified.");

  // 9. Invoice Items Table
  await sql`
    CREATE TABLE IF NOT EXISTS invoice_items (
      id SERIAL PRIMARY KEY,
      invoice_id INT REFERENCES invoices(id) ON DELETE CASCADE,
      description VARCHAR(500) NOT NULL,
      subtitle VARCHAR(500) DEFAULT '',
      icon VARCHAR(50) DEFAULT 'code',
      quantity NUMERIC(10, 2) DEFAULT 1.00,
      price NUMERIC(12, 2) DEFAULT 0.00,
      amount NUMERIC(12, 2) DEFAULT 0.00
    );
  `;
  await sql`ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS subtitle VARCHAR(500) DEFAULT '';`;
  await sql`ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT 'code';`;
  console.log("✓ Table: invoice_items created / verified.");

  // 10. Payments Table (Partial & Full Payments Tracking)
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      invoice_id INT REFERENCES invoices(id) ON DELETE CASCADE,
      amount NUMERIC(12, 2) NOT NULL,
      payment_method VARCHAR(100) DEFAULT 'Bank Transfer',
      transaction_reference VARCHAR(255) DEFAULT '',
      receipt_url VARCHAR(1000) DEFAULT '',
      receipt_public_id VARCHAR(255) DEFAULT '',
      payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      notes TEXT DEFAULT ''
    );
  `;
  console.log("✓ Table: payments created / verified.");

  // 11. Website Settings Table
  await sql`
    CREATE TABLE IF NOT EXISTS website_settings (
      key VARCHAR(100) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table: website_settings created / verified.");

  // 12. Website Analytics Table (Comprehensive Analytics Schema)
  await sql`
    CREATE TABLE IF NOT EXISTS website_analytics (
      id SERIAL PRIMARY KEY,
      path VARCHAR(255) NOT NULL,
      referrer VARCHAR(500) DEFAULT '',
      user_agent VARCHAR(500) DEFAULT '',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Safely extend website_analytics columns if not already present
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS visitor_id VARCHAR(64) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS session_id VARCHAR(64) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS event_type VARCHAR(50) DEFAULT 'pageview';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS page_title VARCHAR(255) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS referrer_domain VARCHAR(255) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS traffic_source VARCHAR(50) DEFAULT 'Direct';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS device_type VARCHAR(50) DEFAULT 'desktop';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS browser VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS os VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS country_code VARCHAR(10) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS city VARCHAR(100) DEFAULT '';`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS duration_seconds INT DEFAULT 0;`;
  await sql`ALTER TABLE website_analytics ADD COLUMN IF NOT EXISTS is_new_visitor BOOLEAN DEFAULT true;`;
  console.log("✓ Table: website_analytics extended with visitor, session, and attribution schema.");

  // Indexes for performance
  await sql`CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_enquiries_is_read ON enquiries(is_read);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_path ON website_analytics(path);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON website_analytics(created_at);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON website_analytics(visitor_id);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON website_analytics(session_id);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_traffic_source ON website_analytics(traffic_source);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_country ON website_analytics(country);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_analytics_device ON website_analytics(device_type);`;
  console.log("✓ Performance indexes created.");

  // Seed Default Admin Account if not exists
  const defaultUser = process.env.ADMIN_DEFAULT_USER || "admin";
  const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "nylexadmin2026";

  const existingAdmin = await sql`SELECT id FROM admins WHERE username = ${defaultUser} LIMIT 1;`;
  if (existingAdmin.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(defaultPass, salt);
    await sql`
      INSERT INTO admins (username, password_hash, role)
      VALUES (${defaultUser}, ${hash}, 'admin');
    `;
    console.log(`✓ Default admin created: ${defaultUser}`);
  } else {
    console.log(`✓ Admin user "${defaultUser}" already exists.`);
  }

  // Seed Initial Showcase Testimonials if not already present
  const defaultShowcaseTestimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      company: "Taste of Malabar",
      quote: "NYLEX Digital Studio delivered an amazing website for our business. The team is professional, creative, and remarkably easy to work with from concept to deployment.",
      avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder & Creative Lead",
      company: "Amazink Collective",
      quote: "The custom booking system and web platform developed by NYLEX transformed our client experience and scaled our studio operations seamlessly across branches.",
      avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Product Lead",
      company: "Luxe Living",
      quote: "Exceptional engineering quality, blazing fast page load speed, and great attention to detail. Highly recommend NYLEX to any ambitious team looking to scale.",
      avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      name: "David Al-Mansoor",
      role: "Managing Director",
      company: "Defense Security IT",
      quote: "Their Next.js architecture and UI/UX design took our brand to the next level. Seamless workflow, rapid turnaround, and robust post-launch support.",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      company: "Sensix Global",
      quote: "Working with NYLEX was an absolute pleasure. They listened attentively to our specifications and delivered a modern web app that exceeded our highest expectations.",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      name: "Thomas Matthew",
      role: "Executive Director",
      company: "Galaxy Granites",
      quote: "Precision, clean code, and premium design sensibility. NYLEX understood our industrial requirements and executed a flawless product catalog showcase.",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
  ];

  for (const t of defaultShowcaseTestimonials) {
    const existing = await sql`SELECT id FROM testimonials WHERE LOWER(name) = LOWER(${t.name}) LIMIT 1;`;
    if (existing.length === 0) {
      await sql`
        INSERT INTO testimonials (name, role, company, quote, avatar_url, rating, is_approved)
        VALUES (${t.name}, ${t.role}, ${t.company}, ${t.quote}, ${t.avatar_url}, ${t.rating}, true);
      `;
    }
  }
  console.log("✓ Initial showcase testimonials verified/seeded.");

  // Seed Initial Featured Projects if empty
  const existingProjects = await sql`SELECT id FROM projects LIMIT 1;`;
  if (existingProjects.length === 0) {
    await sql`
      INSERT INTO projects (title, link, category, type, description, image_url, tags, result, featured, order_index)
      VALUES
        ('Taste of Malabar Caterers', 'https://www.tasteofmalabarcaterers.com/', 'webdev', 'Web Development', 'High-conversion catering showcase with booking system', '/projects/taste_of_malabar.jpg', ARRAY['Next.js', 'Tailwind', 'SEO'], '100% Custom Build', true, 1),
        ('Amazink Tattoo Collective', 'https://www.amazinktatto.com/', 'webdev', 'Web Development', 'Modern tattoo studio website and artist booking portfolio', '/projects/amazink_tattoo.jpg', ARRAY['Next.js', 'Framer Motion'], 'Premium Aesthetic', true, 2),
        ('Defense Security IT', 'https://www.defensesecurityit.in/', 'webapp', 'Custom Web Application', 'Corporate enterprise portal with robust asset security monitoring', '/projects/defense_security.jpg', ARRAY['React', 'Node.js', 'Tailwind'], 'Enterprise Security', true, 3),
        ('Techsmart Systems', 'https://www.techsmartsystems.co.in/', 'webdev', 'Web Development', 'B2B technology systems provider digital platform', '/projects/techsmart_systems.jpg', ARRAY['Next.js', 'Tailwind'], 'Modern Showcase', true, 4),
        ('Sensix Global', 'https://www.sensixglobal.com/', 'webdev', 'Web Development', 'Global supply chain enterprise website with international presence', '/projects/sensix_global.jpg', ARRAY['Next.js', 'Cloudinary'], 'Global Brand Identity', true, 5),
        ('Galaxy Granites', 'https://www.galaxygranites.co.in/', 'webdev', 'Web Development', 'Luxury architectural stone catalog and product quote system', '/projects/galaxy_granites.jpg', ARRAY['Next.js', 'Catalog'], 'Product Showcase', true, 6);
    `;
    console.log("✓ Initial featured projects seeded.");
  }

  console.log("\n🎉 ALL MIGRATIONS COMPLETED SUCCESSFULLY!");
}

runMigrations().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});

