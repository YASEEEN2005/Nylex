"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Generate a random UUID safely across all modern browsers
function getOrCreateId(storage, key) {
  if (typeof window === "undefined") return "";
  try {
    let id = storage.getItem(key);
    if (!id) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = "nx_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      }
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return "nx_anonymous";
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Deduplication ref against React Strict Mode and rapid re-renders
  const lastTrackedRef = useRef({ url: "", time: 0 });
  const pageStartTimeRef = useRef(Date.now());
  const currentPathRef = useRef("");

  useEffect(() => {
    // 1. Exclude admin panel internal operations
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const currentUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    const now = Date.now();

    // Prevent duplicate events within 1.5s for identical URL
    if (
      lastTrackedRef.current.url === currentUrl &&
      now - lastTrackedRef.current.time < 1500
    ) {
      return;
    }

    lastTrackedRef.current = { url: currentUrl, time: now };
    currentPathRef.current = pathname;
    pageStartTimeRef.current = now;

    // 2. Resolve pseudonymous visitor ID and session ID
    let isNewVisitor = false;
    let visitorId = "";
    try {
      const existingVid = localStorage.getItem("nylex_vid");
      if (!existingVid) {
        isNewVisitor = true;
      }
      visitorId = getOrCreateId(localStorage, "nylex_vid");
    } catch {
      visitorId = "anon_" + Math.random().toString(36).substring(2, 10);
    }

    const sessionId = getOrCreateId(sessionStorage, "nylex_sid");

    // 3. Extract marketing campaign UTM parameters if present
    const utmSource = searchParams?.get("utm_source") || "";
    const utmMedium = searchParams?.get("utm_medium") || "";
    const utmCampaign = searchParams?.get("utm_campaign") || "";

    const payload = {
      path: pathname,
      page_title: typeof document !== "undefined" ? document.title : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      visitor_id: visitorId,
      session_id: sessionId,
      is_new_visitor: isNewVisitor,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      event_type: "pageview",
    };

    // 4. Fire-and-forget analytics beacon
    try {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Fail silently
      });
    } catch {
      // Fail silently
    }
  }, [pathname, searchParams]);

  // 5. Measure and record approximate page duration upon exit / tab switch
  useEffect(() => {
    const handleDurationBeacon = () => {
      const timeSpent = Math.round((Date.now() - pageStartTimeRef.current) / 1000);
      if (timeSpent < 3 || timeSpent > 3600) return;

      const sessionId = sessionStorage.getItem("nylex_sid");
      if (!sessionId || !currentPathRef.current) return;

      const durationPayload = JSON.stringify({
        path: currentPathRef.current,
        session_id: sessionId,
        duration_seconds: timeSpent,
        event_type: "duration_ping",
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([durationPayload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics", blob);
      } else {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: durationPayload,
          keepalive: true,
        }).catch(() => { });
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleDurationBeacon();
      }
    };

    window.addEventListener("beforeunload", handleDurationBeacon);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleDurationBeacon);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}

