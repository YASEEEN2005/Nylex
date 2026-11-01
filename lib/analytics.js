// lib/analytics.js
// Production Analytics Attribution, User-Agent Parsing, and Privacy Geolocation Utilities

/**
 * Cleanly extracts the hostname/domain from a referrer URL.
 * Returns empty string for direct navigation or internal referrers.
 */
export function extractReferrerDomain(referrer, host = "") {
  if (!referrer || typeof referrer !== "string") return "";
  try {
    const url = new URL(referrer);
    const domain = url.hostname.replace(/^www\./, "").toLowerCase();
    const cleanHost = host.replace(/^www\./, "").split(":")[0].toLowerCase();

    // Internal domains (including production custom domain nylex.online and preview hosts)
    const INTERNAL_DOMAINS = [
      "nylex.online",
      "www.nylex.online",
      "localhost",
      "127.0.0.1",
    ];

    // Check if referrer is internal domain
    if (
      (cleanHost && (domain === cleanHost || domain.endsWith(`.${cleanHost}`))) ||
      INTERNAL_DOMAINS.includes(domain) ||
      domain.endsWith(".vercel.app")
    ) {
      return "";
    }
    return domain;
  } catch {
    return "";
  }
}

/**
 * Classifies traffic source based on referrer domain and UTM parameters.
 * Categories: Direct, Organic Search, Referral, Social, Paid Campaign, Email Campaign
 */
export function classifyTrafficSource(referrer, utmSource = "", utmMedium = "", host = "") {
  const medium = (utmMedium || "").toLowerCase().trim();
  const source = (utmSource || "").toLowerCase().trim();

  // 1. Paid Campaign detection
  const paidMediums = ["cpc", "ppc", "paid", "paidsearch", "paidsocial", "display", "banner", "cpm", "retargeting"];
  if (paidMediums.includes(medium) || source.includes("adwords") || source.includes("googleads")) {
    return "Paid Campaign";
  }

  // 2. Email Campaign detection
  const emailMediums = ["email", "newsletter", "mail"];
  if (emailMediums.includes(medium) || emailMediums.includes(source)) {
    return "Email Campaign";
  }

  // 3. Referrer domain analysis
  const domain = extractReferrerDomain(referrer, host);
  if (!domain) {
    // If UTM source exists without referrer, attribute by UTM
    if (source) {
      if (["google", "bing", "yahoo", "duckduckgo"].includes(source)) return "Organic Search";
      if (["instagram", "facebook", "linkedin", "twitter", "x", "reddit", "youtube"].includes(source)) return "Social";
      return "Referral";
    }
    return "Direct";
  }

  // Organic Search Engine Domains
  const searchPatterns = [
    "google.", "bing.", "yahoo.", "duckduckgo.", "ecosia.",
    "baidu.", "yandex.", "ask.com", "qwant.", "brave.com",
    "search.seznam", "naver.com"
  ];
  if (searchPatterns.some((pattern) => domain.includes(pattern))) {
    return "Organic Search";
  }

  // Social Media Networks
  const socialDomains = [
    "facebook.com", "fb.com", "m.facebook.com", "l.facebook.com",
    "instagram.com", "l.instagram.com",
    "linkedin.com", "lnkd.in",
    "twitter.com", "x.com", "t.co",
    "reddit.com", "redd.it",
    "youtube.com", "youtu.be",
    "tiktok.com", "pinterest.com", "pin.it",
    "threads.net", "whatsapp.com", "web.whatsapp.com",
    "telegram.org", "t.me", "quora.com", "discord.com"
  ];
  if (socialDomains.some((s) => domain === s || domain.endsWith(`.${s}`))) {
    return "Social";
  }

  return "Referral";
}

/**
 * Parses user-agent header to extract device type, browser name, and operating system.
 * Avoids heavy external dependencies.
 */
export function parseUserAgent(uaString = "") {
  if (!uaString || typeof uaString !== "string") {
    return { device: "desktop", browser: "Unknown", os: "Unknown" };
  }

  const ua = uaString.toLowerCase();

  // 1. Device Type
  let device = "desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = "tablet";
  } else if (
    /mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop|windows phone/i.test(ua)
  ) {
    device = "mobile";
  }

  // 2. Operating System
  let os = "Other";
  if (ua.includes("windows nt 10.0") || ua.includes("windows nt 11.0")) os = "Windows 11/10";
  else if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac os x") && !ua.includes("iphone") && !ua.includes("ipad")) os = "macOS";
  else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) os = "iOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("cros")) os = "Chrome OS";
  else if (ua.includes("linux")) os = "Linux";

  // 3. Browser
  let browser = "Other";
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("opr/") || ua.includes("opera")) browser = "Opera";
  else if (ua.includes("samsungbrowser")) browser = "Samsung Internet";
  else if (ua.includes("chrome") && !ua.includes("edg/")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("duckduckgo")) browser = "DuckDuckGo";

  return { device, browser, os };
}

/**
 * Extracts approximate visitor country and city using trusted deployment headers.
 * NEVER stores raw IP addresses. Raw IP is discarded immediately.
 */
export function extractGeoLocation(headers) {
  // 1. Check trusted Vercel Geolocation headers
  const countryCode =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    "";

  const cityRaw = headers.get("x-vercel-ip-city") || "";
  let city = "";
  if (cityRaw) {
    try {
      city = decodeURIComponent(cityRaw);
    } catch {
      city = cityRaw;
    }
  }

  let country = "";
  if (countryCode && countryCode !== "XX") {
    try {
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      country = regionNames.of(countryCode.toUpperCase()) || countryCode.toUpperCase();
    } catch {
      country = countryCode.toUpperCase();
    }
  }

  return {
    country: country || (process.env.NODE_ENV === "development" ? "Local / India" : "Unknown"),
    country_code: countryCode.toUpperCase() || "IN",
    city: city || (process.env.NODE_ENV === "development" ? "Kozhikode" : ""),
  };
}

