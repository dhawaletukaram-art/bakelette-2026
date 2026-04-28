// Lightweight client-side CTA click tracker.
// - Logs to console for quick debugging
// - Stores a rolling count in localStorage (view at: localStorage.getItem("bakelette_cta_counts"))
// - Posts to /api/track (fire-and-forget) so server logs capture it
// - Forwards to GA (gtag) and Meta Pixel (fbq) if present

export type CtaName =
  | "whatsapp_hero"
  | "whatsapp_order_strip"
  | "whatsapp_quickview"
  | "customise_hamper"
  | "order_now_nav"
  | "instagram_follow";

const STORAGE_KEY = "bakelette_cta_counts";

function bumpLocal(name: CtaName) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
    counts[name] = (counts[name] ?? 0) + 1;
    counts.__updated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    return counts[name];
  } catch {
    return 0;
  }
}

export function trackCta(name: CtaName, meta: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const count = bumpLocal(name);
  const payload = {
    name,
    count,
    path: window.location.pathname,
    referrer: document.referrer || null,
    ts: new Date().toISOString(),
    ...meta,
  };

  // eslint-disable-next-line no-console
  console.info("[cta]", name, payload);

  // Server log (fire-and-forget; sendBeacon survives navigation to wa.me)
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* ignore */
  }

  // Optional analytics integrations
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", "cta_click", { cta: name, ...meta });
  w.fbq?.("trackCustom", "CTAClick", { cta: name, ...meta });
}

export function getCtaCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
