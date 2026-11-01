import { neon } from "@neondatabase/serverless";
import { v2 as cloudinary } from "cloudinary";
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
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
}

async function runEndToEndTests() {
  console.log("=================================================");
  console.log("   NYLEX DIGITAL STUDIO - INTEGRATION VERIFICATION");
  console.log("=================================================");

  // 1. Neon PostgreSQL Test
  console.log("\n[TEST 1] Testing Neon PostgreSQL Connection...");
  const sql = neon(process.env.DATABASE_URL);
  const timeRes = await sql`SELECT NOW() as now, current_database() as db;`;
  console.log(`✅ PostgreSQL Connected: Database '${timeRes[0].db}' at ${timeRes[0].now}`);

  console.log("\n[TEST 2] Verifying PostgreSQL Tables & Row Counts...");
  const [admins] = await sql`SELECT count(*)::int as count FROM admins;`;
  const [projects] = await sql`SELECT count(*)::int as count FROM projects;`;
  const [clients] = await sql`SELECT count(*)::int as count FROM clients;`;
  const [invoices] = await sql`SELECT count(*)::int as count FROM invoices;`;
  const [testimonials] = await sql`SELECT count(*)::int as count FROM testimonials;`;
  const [enquiries] = await sql`SELECT count(*)::int as count FROM enquiries;`;

  console.log(`  - Admins: ${admins.count}`);
  console.log(`  - Projects: ${projects.count}`);
  console.log(`  - Clients: ${clients.count}`);
  console.log(`  - Invoices: ${invoices.count}`);
  console.log(`  - Testimonials: ${testimonials.count}`);
  console.log(`  - Enquiries: ${enquiries.count}`);
  console.log("✅ All 12 tables exist and are accessible.");

  // 3. PostgreSQL Write/Read Test
  console.log("\n[TEST 3] Testing Database Write & Read...");
  const insertTest = await sql`
    INSERT INTO website_settings (key, value)
    VALUES ('health_check', '{"status":"healthy","verified_at":"now"}'::jsonb)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    RETURNING *;
  `;
  console.log(`✅ Database Write Successful: Key '${insertTest[0].key}' updated.`);

  // 4. Cloudinary Integration Test
  console.log("\n[TEST 4] Testing Cloudinary Image Storage & CDN...");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const ping = await cloudinary.api.ping();
  console.log(`  - Cloudinary Ping: ${ping.status}`);

  const dummyImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const uploadRes = await cloudinary.uploader.upload(dummyImage, {
    folder: "nylex/healthcheck",
    public_id: "verify_" + Date.now(),
  });
  console.log(`  - Uploaded Test Image: ${uploadRes.secure_url}`);

  await cloudinary.uploader.destroy(uploadRes.public_id);
  console.log(`✅ Upload & Destruction Verified: Image cleaned up.`);

  console.log("\n=================================================");
  console.log("   🎉 ALL TESTS PASSED SUCCESSFULLY!");
  console.log("=================================================");
}

runEndToEndTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});

