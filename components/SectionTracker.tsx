"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";

const SECTIONS = ["top", "story", "work", "vault", "now", "path", "connect"];

/**
 * Watches each main section's intersection. When a section becomes >50% visible,
 * fires `section_viewed`. When the user leaves, fires `section_dwell` with how
 * long they spent (in seconds, rounded). Also fires `scroll_depth` checkpoints.
 *
 * Page-leave events use the visibilitychange + beforeunload combo so they survive
 * tab close and navigation.
 */
export default function SectionTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const entered: Record<string, number> = {};
    const seen: Record<string, boolean> = {};
    const pageStart = Date.now();
    let maxScroll = 0;
    const depthMarks = new Set<number>();

    function leave(id: string) {
      const t = entered[id];
      if (!t) return;
      const dwell = Math.round((Date.now() - t) / 1000);
      delete entered[id];
      if (dwell >= 1) {
        track("section_dwell", { section: id, seconds: dwell });
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (!id) continue;
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            if (!entered[id]) {
              entered[id] = Date.now();
              if (!seen[id]) {
                seen[id] = true;
                track("section_viewed", { section: id });
              }
            }
          } else {
            leave(id);
          }
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    function onScroll() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / docH) * 100));
      if (pct > maxScroll) maxScroll = pct;
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !depthMarks.has(mark)) {
          depthMarks.add(mark);
          track("scroll_depth", { percent: mark });
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function flush() {
      // close any still-open section windows
      Object.keys(entered).forEach(leave);
      const totalSeconds = Math.round((Date.now() - pageStart) / 1000);
      if (totalSeconds >= 2) {
        track("session_ended", {
          seconds: totalSeconds,
          max_scroll_pct: maxScroll,
        });
      }
    }

    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  return null;
}
