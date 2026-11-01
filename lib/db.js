import { neon, Pool } from "@neondatabase/serverless";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.warn("⚠️ DATABASE_URL is not set. Database queries will fail until configured.");
}

// Global cached SQL client for serverless environments (prevents connection leaks)
let cachedSql = global.neonSql;
let cachedPool = global.neonPool;

if (!cachedSql && dbUrl) {
  cachedSql = neon(dbUrl);
  global.neonSql = cachedSql;
}

if (!cachedPool && dbUrl) {
  cachedPool = new Pool({ connectionString: dbUrl });
  global.neonPool = cachedPool;
}

export const sql = cachedSql;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }
  if (!global.neonSql) {
    global.neonSql = neon(process.env.DATABASE_URL);
  }
  return global.neonSql;
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }
  if (!global.neonPool) {
    global.neonPool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return global.neonPool;
}

export default getDb;

