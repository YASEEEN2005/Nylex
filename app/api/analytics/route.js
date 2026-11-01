import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import {
  classifyTrafficSource,
  extractReferrerDomain,
  parseUserAgent,
  extractGeoLocation,
} from "@/lib/analytics";

export async function GET(req) {
  try {
    // 1. Enforce admin authorization
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30d";
    const customStart = searchParams.get("startDate");
    const customEnd = searchParams.get("endDate");

    const sql = getDb();

    // 2. Overview studio KPIs (Backward-compatible with existing admin overview dashboard)
    const [projectCount] = await sql`SELECT COUNT(*)::int as count FROM projects;`;
    const [clientCount] = await sql`SELECT COUNT(*)::int as count FROM clients;`;
    const [enquiryStats] = await sql`
      SELECT
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE is_read = false)::int as unread
      FROM enquiries;
    `;
    const [invoiceStats] = await sql`
      SELECT
        COUNT(*)::int as total_count,
        COALESCE(SUM(total), 0)::numeric(12, 2) as total_billed,
        COALESCE(SUM(paid_amount), 0)::numeric(12, 2) as total_collected,
        COALESCE(SUM(total - paid_amount), 0)::numeric(12, 2) as total_pending
      FROM invoices;
    `;
    const [testimonialStats] = await sql`SELECT COUNT(*)::int as count FROM testimonials;`;

    // 3. Date filtering for Analytics queries
    let dateFilterClause;
    if (range === "today") {
      dateFilterClause = sql`created_at >= CURRENT_DATE`;
    } else if (range === "yesterday") {
      dateFilterClause = sql`created_at >= CURRENT_DATE - INTERVAL '1 day' AND created_at < CURRENT_DATE`;
    } else if (range === "7d") {
      dateFilterClause = sql`created_at >= CURRENT_DATE - INTERVAL '7 days'`;
    } else if (range === "90d") {
      dateFilterClause = sql`created_at >= CURRENT_DATE - INTERVAL '90 days'`;
    } else if (range === "custom" && customStart && customEnd) {
      dateFilterClause = sql`created_at >= ${customStart}::timestamp AND created_at <= (${customEnd}::timestamp + INTERVAL '1 day')`;
    } else {
      // Default: Last 30 days
      dateFilterClause = sql`created_at >= CURRENT_DATE - INTERVAL '30 days'`;
    }

    // 4. Analytics Summary KPIs
    const [analyticsKpis] = await sql`
      SELECT
        COUNT(*)::int as total_views,
        COUNT(DISTINCT visitor_id)::int as unique_visitors,
        COUNT(DISTINCT session_id)::int as total_sessions,
        COUNT(*) FILTER (WHERE is_new_visitor = true)::int as new_visitors,
        COUNT(*) FILTER (WHERE is_new_visitor = false)::int as returning_visitors,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::int as today_views,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '1 day' AND created_at < CURRENT_DATE)::int as yesterday_views,
        ROUND(COALESCE(AVG(duration_seconds) FILTER (WHERE duration_seconds > 0), 0))::int as avg_duration
      FROM website_analytics
      WHERE ${dateFilterClause};
    `;

    // 5. Daily Traffic Timeline (Views & Unique Visitors)
    const trafficTimeline = await sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM-DD') as date,
        COUNT(*)::int as views,
        COUNT(DISTINCT visitor_id)::int as visitors
      FROM website_analytics
      WHERE ${dateFilterClause}
      GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
      ORDER BY date ASC;
    `;

    // 6. Top Visited Pages
    const topPages = await sql`
      SELECT
        path,
        COALESCE(NULLIF(page_title, ''), path) as title,
        COUNT(*)::int as views,
        COUNT(DISTINCT visitor_id)::int as visitors,
        ROUND(COALESCE(AVG(duration_seconds) FILTER (WHERE duration_seconds > 0), 0))::int as avg_duration
      FROM website_analytics
      WHERE ${dateFilterClause}
      GROUP BY path, page_title
      ORDER BY views DESC
      LIMIT 10;
    `;

    // 7. Landing Pages (First page viewed in each session)
    const landingPages = await sql`
      WITH session_starts AS (
        SELECT DISTINCT ON (session_id)
          path,
          created_at
        FROM website_analytics
        WHERE ${dateFilterClause} AND session_id != ''
        ORDER BY session_id, created_at ASC
      )
      SELECT
        path,
        COUNT(*)::int as count
      FROM session_starts
      GROUP BY path
      ORDER BY count DESC
      LIMIT 6;
    `;

    // 8. Exit Pages (Last page viewed in each session)
    const exitPages = await sql`
      WITH session_ends AS (
        SELECT DISTINCT ON (session_id)
          path,
          created_at
        FROM website_analytics
        WHERE ${dateFilterClause} AND session_id != ''
        ORDER BY session_id, created_at DESC
      )
      SELECT
        path,
        COUNT(*)::int as count
      FROM session_ends
      GROUP BY path
      ORDER BY count DESC
      LIMIT 6;
    `;

    // 9. Traffic Sources Breakdown
    const trafficSources = await sql`
      SELECT
        COALESCE(NULLIF(traffic_source, ''), 'Direct') as source,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause}
      GROUP BY traffic_source
      ORDER BY count DESC;
    `;

    // 10. Top External Referrers
    const referrers = await sql`
      SELECT
        referrer_domain as domain,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause} AND referrer_domain != ''
      GROUP BY referrer_domain
      ORDER BY count DESC
      LIMIT 8;
    `;

    // 11. Devices, Browsers & Operating Systems
    const devices = await sql`
      SELECT
        COALESCE(NULLIF(device_type, ''), 'desktop') as device,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause}
      GROUP BY device_type
      ORDER BY count DESC;
    `;

    const browsers = await sql`
      SELECT
        browser,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause} AND browser != '' AND browser != 'Other'
      GROUP BY browser
      ORDER BY count DESC
      LIMIT 6;
    `;

    const operatingSystems = await sql`
      SELECT
        os,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause} AND os != '' AND os != 'Other'
      GROUP BY os
      ORDER BY count DESC
      LIMIT 6;
    `;

    // 12. Geographic Breakdown (Country and Cities)
    const countries = await sql`
      SELECT
        country,
        country_code,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause} AND country != ''
      GROUP BY country, country_code
      ORDER BY count DESC
      LIMIT 8;
    `;

    const cities = await sql`
      SELECT
        city,
        country,
        COUNT(*)::int as count
      FROM website_analytics
      WHERE ${dateFilterClause} AND city != ''
      GROUP BY city, country
      ORDER BY count DESC
      LIMIT 8;
    `;

    // 13. Recent Live Events Stream
    const recentEvents = await sql`
      SELECT
        id,
        path,
        page_title,
        traffic_source,
        referrer_domain,
        device_type,
        browser,
        os,
        country,
        city,
        duration_seconds,
        is_new_visitor,
        created_at
      FROM website_analytics
      ORDER BY id DESC
      LIMIT 20;
    `;

    // 14. Grouped Anonymous Visitor Sessions & Journeys (with sequence of pages & timestamps)
    const visitorSessions = await sql`
      WITH session_agg AS (
        SELECT
          visitor_id,
          session_id,
          MIN(created_at) as first_seen,
          MAX(created_at) as last_seen,
          COUNT(*)::int as page_views,
          ARRAY_AGG(path ORDER BY created_at ASC) as pages_sequence,
          ARRAY_AGG(TO_CHAR(created_at, 'HH24:MI:SS') ORDER BY created_at ASC) as times_sequence,
          ARRAY_AGG(COALESCE(NULLIF(page_title, ''), path) ORDER BY created_at ASC) as titles_sequence,
          COALESCE(MAX(duration_seconds), 0)::int as duration_seconds,
          MAX(traffic_source) as traffic_source,
          MAX(referrer_domain) as referrer_domain,
          MAX(device_type) as device_type,
          MAX(browser) as browser,
          MAX(os) as os,
          MAX(country) as country,
          MAX(country_code) as country_code,
          MAX(city) as city,
          BOOL_OR(is_new_visitor) as is_new_visitor
        FROM website_analytics
        WHERE ${dateFilterClause} AND visitor_id != ''
        GROUP BY visitor_id, session_id
        ORDER BY last_seen DESC
        LIMIT 50
      )
      SELECT * FROM session_agg;
    `;

    return NextResponse.json({
      success: true,
      // Backward-compatible studio stats
      stats: {
        projects: projectCount?.count || 0,
        clients: clientCount?.count || 0,
        enquiries: enquiryStats?.total || 0,
        unreadEnquiries: enquiryStats?.unread || 0,
        invoicesCount: invoiceStats?.total_count || 0,
        totalBilled: Number(invoiceStats?.total_billed || 0),
        totalCollected: Number(invoiceStats?.total_collected || 0),
        totalPending: Number(invoiceStats?.total_pending || 0),
        testimonials: testimonialStats?.count || 0,
        totalViews: analyticsKpis?.total_views || 0,
      },
      // Comprehensive Website Analytics Data
      analytics: {
        range,
        summary: {
          totalViews: analyticsKpis?.total_views || 0,
          uniqueVisitors: analyticsKpis?.unique_visitors || 0,
          totalSessions: analyticsKpis?.total_sessions || 0,
          newVisitors: analyticsKpis?.new_visitors || 0,
          returningVisitors: analyticsKpis?.returning_visitors || 0,
          todayViews: analyticsKpis?.today_views || 0,
          yesterdayViews: analyticsKpis?.yesterday_views || 0,
          avgDurationSeconds: analyticsKpis?.avg_duration || 0,
        },
        trafficTimeline,
        topPages,
        landingPages,
        exitPages,
        trafficSources,
        referrers,
        devices,
        browsers,
        operatingSystems,
        countries,
        cities,
        recentEvents,
        visitorSessions,
      },
    });
  } catch (err) {
    console.error("Analytics GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "";
  const allowedOrigins = [
    "https://nylex.online",
    "https://www.nylex.online",
    "http://localhost:3000",
  ];

  const isAllowed =
    !origin ||
    allowedOrigins.includes(origin) ||
    origin.endsWith(".vercel.app") ||
    origin.includes("nylex.online");

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": isAllowed && origin ? origin : "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function POST(req) {
  try {
    // 1. Abuse & Payload Size Protection
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return NextResponse.json(
        { success: false, error: "Payload too large." },
        { status: 413 }
      );
    }

    // Resilient body parsing: handles application/json, text/plain (sendBeacon), or raw stream
    let body = {};
    try {
      const rawText = await req.text();
      if (rawText && rawText.trim()) {
        body = JSON.parse(rawText);
      }
    } catch {
      body = {};
    }

    const {
      path = "/",
      page_title = "",
      referrer = "",
      visitor_id = "",
      session_id = "",
      utm_source = "",
      utm_medium = "",
      utm_campaign = "",
      duration_seconds = 0,
      is_new_visitor = true,
      event_type = "pageview",
    } = body;

    // 2. Never track admin internal navigation as public analytics
    const cleanPath = String(path || "/").trim().slice(0, 255);
    if (cleanPath.startsWith("/admin") || cleanPath.startsWith("/api")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // 3. User-Agent & Geolocation parsing (Server-side, privacy-preserving)
    const userAgent = (req.headers.get("user-agent") || "").slice(0, 500);
    const host = req.headers.get("host") || "";
    const cleanReferrer = String(referrer || "").trim().slice(0, 500);

    const { device, browser, os } = parseUserAgent(userAgent);
    const traffic_source = classifyTrafficSource(cleanReferrer, utm_source, utm_medium, host);
    const referrer_domain = extractReferrerDomain(cleanReferrer, host).slice(0, 255);
    const { country, country_code, city } = extractGeoLocation(req.headers);

    const cleanVisitorId = String(visitor_id || "").slice(0, 64);
    const cleanSessionId = String(session_id || "").slice(0, 64);
    const cleanTitle = String(page_title || "").trim().slice(0, 255);
    const cleanUtmSource = String(utm_source || "").slice(0, 100);
    const cleanUtmMedium = String(utm_medium || "").slice(0, 100);
    const cleanUtmCampaign = String(utm_campaign || "").slice(0, 100);
    const duration = Math.min(Math.max(0, parseInt(duration_seconds, 10) || 0), 86400);

    const sql = getDb();

    // 4. Update session duration if duration ping, otherwise insert new pageview event
    if (duration > 0 && cleanSessionId && event_type === "duration_ping") {
      await sql`
        UPDATE website_analytics
        SET duration_seconds = duration_seconds + ${duration}
        WHERE session_id = ${cleanSessionId}
          AND path = ${cleanPath}
          AND created_at >= NOW() - INTERVAL '1 hour';
      `;
    } else {
      await sql`
        INSERT INTO website_analytics (
          path, page_title, referrer, referrer_domain, traffic_source,
          utm_source, utm_medium, utm_campaign,
          visitor_id, session_id, is_new_visitor,
          device_type, browser, os,
          country, country_code, city,
          duration_seconds, user_agent, event_type
        ) VALUES (
          ${cleanPath}, ${cleanTitle}, ${cleanReferrer}, ${referrer_domain}, ${traffic_source},
          ${cleanUtmSource}, ${cleanUtmMedium}, ${cleanUtmCampaign},
          ${cleanVisitorId}, ${cleanSessionId}, ${Boolean(is_new_visitor)},
          ${device}, ${browser}, ${os},
          ${country}, ${country_code}, ${city},
          ${duration}, ${userAgent}, ${event_type}
        );
      `;
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  } catch (err) {
    // Visitor tracking failures must never disrupt public browsing
    console.error("Analytics POST logging error:", err);
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  }
}
