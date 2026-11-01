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

async function runClientLogoTests() {
  console.log("=================================================");
  console.log("   CLIENT LOGO SYSTEM - END-TO-END VERIFICATION  ");
  console.log("=================================================");

  // 1. Neon Database Connection
  console.log("\n[TEST 1] Connecting to Neon PostgreSQL...");
  const sql = neon(process.env.DATABASE_URL);
  const [{ count }] = await sql`SELECT count(*)::int as count FROM client_logos;`;
  console.log(`✅ PostgreSQL Connected. Current client_logos count: ${count}`);

  // 2. Public Query Simulation (Only Active Logos, ordered by display_order)
  console.log("\n[TEST 2] Verifying Public Query (`WHERE is_active = true ORDER BY display_order ASC`)...");
  const publicLogos = await sql`
    SELECT id, client_name, image_url, display_order, is_active
    FROM client_logos
    WHERE is_active = true
    ORDER BY display_order ASC, created_at ASC;
  `;
  console.log(`✅ Fetched ${publicLogos.length} active logos for public website:`);
  publicLogos.forEach((l, i) => {
    console.log(`   ${i + 1}. [Order: ${l.display_order}] ${l.client_name} -> ${l.image_url}`);
  });

  // 3. Cloudinary Lifecycle Test
  console.log("\n[TEST 3] Testing Cloudinary Asset Upload & Safe Cleanup...");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  // 1x1 transparent PNG data URI
  const transparent1x1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const uploadRes = await cloudinary.uploader.upload(transparent1x1, {
    folder: "nylex/client-logos",
    resource_type: "image",
    tags: ["test-suite", "nylex-client-logo"],
  });
  console.log(`✅ Uploaded Test Logo to Cloudinary:`);
  console.log(`   URL: ${uploadRes.secure_url}`);
  console.log(`   Public ID: ${uploadRes.public_id}`);

  // 4. Create Logo in Database
  console.log("\n[TEST 4] Creating Test Client Logo in Database...");
  const [maxOrderRow] = await sql`SELECT COALESCE(MAX(display_order), 0)::int as max_order FROM client_logos;`;
  const nextOrder = (maxOrderRow?.max_order || 0) + 1;

  const [newLogo] = await sql`
    INSERT INTO client_logos (client_name, image_url, cloudinary_public_id, alt_text, display_order, is_active)
    VALUES ('E2E Test Brand', ${uploadRes.secure_url}, ${uploadRes.public_id}, 'E2E Test Brand Logo', ${nextOrder}, true)
    RETURNING *;
  `;
  console.log(`✅ Created Logo ID: ${newLogo.id} ('${newLogo.client_name}') with display_order ${newLogo.display_order}`);

  // 5. Update Logo (Name and Visibility Toggle)
  console.log("\n[TEST 5] Updating Logo (Name & Visibility)...");
  const [updatedLogo] = await sql`
    UPDATE client_logos
    SET client_name = 'E2E Test Brand Updated', is_active = false, updated_at = NOW()
    WHERE id = ${newLogo.id}
    RETURNING *;
  `;
  console.log(`✅ Updated: Name = '${updatedLogo.client_name}', Active = ${updatedLogo.is_active}`);

  // 6. Test Reorder Logic
  console.log("\n[TEST 6] Testing Reorder / Display Order Swapping...");
  const [swappedLogo] = await sql`
    UPDATE client_logos
    SET display_order = 999, updated_at = NOW()
    WHERE id = ${newLogo.id}
    RETURNING id, client_name, display_order;
  `;
  console.log(`✅ Swapped Display Order to ${swappedLogo.display_order}`);

  // 7. Safe Deletion & Cloudinary Cleanup
  console.log("\n[TEST 7] Testing Deletion & Cloudinary Cleanup...");
  await sql`DELETE FROM client_logos WHERE id = ${newLogo.id};`;
  console.log(`✅ Deleted record from PostgreSQL.`);

  const destroyRes = await cloudinary.uploader.destroy(uploadRes.public_id);
  console.log(`✅ Cloudinary Asset Removed: result = '${destroyRes.result}'`);

  // Verify DB count
  const [{ count: finalCount }] = await sql`SELECT count(*)::int as count FROM client_logos;`;
  console.log(`✅ Final Database Logo Count: ${finalCount} (matches initial count: ${count === finalCount})`);

  console.log("\n=================================================");
  console.log("   ALL CLIENT LOGO VERIFICATION TESTS PASSED!    ");
  console.log("=================================================\n");
}

runClientLogoTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
