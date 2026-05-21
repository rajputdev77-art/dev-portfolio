"use client";
import { useEffect, useState } from "react";
import { clocks } from "@/content/site";

function fmt(tz: string) {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value || "00";
    return { h: get("hour"), m: get("minute"), s: get("second") };
  } catch {
    return { h: "--", m: "--", s: "--" };
  }
}

export default function ClocksBar() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clocks">
      {clocks.map((c) => {
        const t = fmt(c.tz);
        return (
          <div key={c.city} className={`ck${c.active ? " act" : ""}`}>
            <span className="city">
              <b>{c.tag}</b>
              {c.city}
            </span>
            <span className="t">
              {t.h}:{t.m}
              <span className="sec">:{t.s}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
