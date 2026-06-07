"use client";
import { track as vercelTrack } from "@vercel/analytics";

/**
 * Custom-event tracker for the portfolio.
 *
 * Every call here ends up in two places:
 *   1. Vercel Analytics → Custom Events tab (raw event count + breakdown by property)
 *   2. POST /api/track → our own KV store (used by /admin dashboard + Telegram alerts)
 *
 * Failures are silent. We never let an analytics call break the UI.
 */
type Props = Record<string, string | number | boolean | null>;

export function track(name: string, props?: Props) {
  // Vercel Analytics — only string/number/boolean are accepted as props.
  try {
    const clean: Record<string, string | number | boolean | null> = {};
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v === undefined) continue;
        clean[k] = v;
      }
    }
    vercelTrack(name, clean);
  } catch {
    /* noop */
  }

  // Our own collector — fire-and-forget POST, queued via sendBeacon when available.
  try {
    if (typeof window === "undefined") return;
    const payload = JSON.stringify({
      name,
      props: props || {},
      ts: Date.now(),
      path: window.location.pathname + window.location.search,
      ref: document.referrer || "",
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* noop */
  }
}
