"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ANALYTICS_ENDPOINT =
  "https://tacxegmlppngnuvldojy.supabase.co/functions/v1/gencouv-web-analytics";
const SESSION_KEY = "gencouv_analytics_session";
const LANDING_KEY = "gencouv_analytics_landing";
const ATTRIBUTION_KEY = "gencouv_analytics_attribution";

type Attribution = {
  campaign?: string;
  cohort?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function getSessionId() {
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(SESSION_KEY, id);
  return id;
}

function getAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {
    campaign: params.get("campaign") || undefined,
    cohort: params.get("cohort") || undefined,
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };

  const hasIncoming = Object.values(incoming).some(Boolean);
  if (hasIncoming) {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(incoming));
    return incoming;
  }

  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}

function getLandingPage() {
  const existing = window.sessionStorage.getItem(LANDING_KEY);
  if (existing) return existing;
  const landing = `${window.location.pathname}${window.location.search}`;
  window.sessionStorage.setItem(LANDING_KEY, landing);
  return landing;
}

function getDevice() {
  if (window.matchMedia("(max-width: 700px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

function sendEvent(eventName: "page_view" | "telegram_cta_click" | "email_campaign_landing", extras: Record<string, string | undefined> = {}) {
  const attribution = getAttribution();
  const body = {
    event_name: eventName,
    session_id: getSessionId(),
    page: `${window.location.pathname}${window.location.search}`,
    landing_page: getLandingPage(),
    referrer: document.referrer || undefined,
    device: getDevice(),
    ...attribution,
    ...extras,
  };

  void fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    mode: "cors",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

export default function GencouvAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const attribution = getAttribution();
    sendEvent("page_view");

    if (Object.values(attribution).some(Boolean) && !window.sessionStorage.getItem("gencouv_campaign_landing_recorded")) {
      window.sessionStorage.setItem("gencouv_campaign_landing_recorded", "1");
      sendEvent("email_campaign_landing");
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor?.href) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        const isGencouvTelegram = url.hostname.toLowerCase() === "t.me" && url.pathname.replace(/\/+$/, "").toLowerCase() === "/gencouv";
        if (!isGencouvTelegram) return;

        const ctaName =
          anchor.dataset.analyticsCta ||
          anchor.getAttribute("aria-label") ||
          anchor.textContent?.replace(/\s+/g, " ").trim() ||
          "Telegram CTA";

        sendEvent("telegram_cta_click", { cta_name: ctaName.slice(0, 160) });
      } catch {
        // Ignore malformed links without affecting the user's navigation.
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
