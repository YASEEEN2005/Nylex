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

async function run() {
  const sql = neon(process.env.DATABASE_URL);

  const meta = {
    title: "Full Payment",
    tagline: "FAST. MODERN. SCALABLE.",
    client_director: "Director: Dhanesh Krishnan",
    client_address: "Kozhikode, Kerala",
    from_name: "Nylex",
    from_phone: "+91 89214 42748",
    from_email: "buildwithnylex@gmail.com",
    from_website: "nylex.online",
    currency: "₹",
    payment_method: "gpay",
    payment_method_label: "UPI (GPay)",
    stamp_type: "PAID",
    stamp_top_text: "FULL PAYMENT",
    stamp_main_text: "PAID",
    stamp_bottom_text: "THANK YOU",
    highlight_cards: [
      {
        id: "1",
        label: "PROJECT COST",
        amount: "₹14,000",
        subtitle: "(Website Design & Development)",
        icon: "default",
      },
      {
        id: "2",
        label: "DOMAIN CHARGES (EXTRA)",
        amount: "₹500",
        subtitle: "(.com Domain – Not Included in Project Cost)",
        icon: "domain",
      },
    ],
    breakdown_rows: [
      { id: "b1", label: "Total Project Cost", amount: 14000 },
      { id: "b2", label: "Domain Charges (Extra)", amount: 500 },
    ],
    payment_breakdown: [
      { id: "p1", label: "Advance Received (Paid on 21/10/2026)", amount: 2000 },
      { id: "p2", label: "Second Payment Received (Paid on 31/10/2026)", amount: 2500 },
      { id: "p3", label: "Final Payment Received (Paid on 31/10/2026)", amount: 10000 },
    ],
    notes_list: [
      "This invoice acknowledges the receipt of the full payment for the website project.",
      "Project Cost: ₹14,000",
      "Domain Upgrade (.com): ₹500 (Extra)",
      "Total Amount Received: ₹14,500 (Fully Paid)",
      "Thank you for choosing Nylex.",
    ],
  };

  const existing = await sql.query(
    "SELECT id FROM invoices WHERE invoice_number = 'INX-FP-431' LIMIT 1"
  );

  let invId;
  if (existing.length > 0) {
    invId = existing[0].id;
    await sql.query(
      `UPDATE invoices SET
        client_name = $1,
        client_company = $2,
        client_phone = $3,
        client_email = $4,
        issue_date = $5,
        due_date = $6,
        subtotal = $7,
        tax = 0,
        discount = 0,
        total = $8,
        paid_amount = $9,
        status = 'Paid',
        notes = $10,
        meta = $11
      WHERE id = $12`,
      [
        "DK Dance Company (DKDC)",
        "DK Dance Company",
        "+91 99952 72083",
        "dkdc.official@gmail.com",
        "2026-10-31",
        "2026-10-31",
        14500,
        14500,
        14500,
        "Thank you for choosing Nylex.",
        JSON.stringify(meta),
        invId,
      ]
    );
    await sql.query("DELETE FROM invoice_items WHERE invoice_id = $1", [invId]);
  } else {
    const res = await sql.query(
      `INSERT INTO invoices (
        invoice_number, client_name, client_company, client_phone, client_email,
        issue_date, due_date, subtotal, tax, discount, total, paid_amount, status, notes, meta
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, $9, $10, 'Paid', $11, $12)
      RETURNING id`,
      [
        "INX-FP-431",
        "DK Dance Company (DKDC)",
        "DK Dance Company",
        "+91 99952 72083",
        "dkdc.official@gmail.com",
        "2026-10-31",
        "2026-10-31",
        14500,
        14500,
        14500,
        "Thank you for choosing Nylex.",
        JSON.stringify(meta),
      ]
    );
    invId = res[0].id;
  }

  await sql.query(
    `INSERT INTO invoice_items (invoice_id, description, subtitle, icon, quantity, price, amount)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      invId,
      "Website Design and Development",
      "Complete Website Design and Development (Project Cost)",
      "code",
      1,
      14000,
      14000,
    ]
  );

  await sql.query(
    `INSERT INTO invoice_items (invoice_id, description, subtitle, icon, quantity, price, amount)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      invId,
      "Domain Upgrade – .com",
      "Domain Registration (.com) (Extra Charges – Not included in Project Cost)",
      "domain",
      1,
      500,
      500,
    ]
  );

  console.log("SUCCESS! Seeded default invoice with ID:", invId);
}

run().catch((e) => {
  console.error("SEED ERROR:", e);
  process.exit(1);
});
