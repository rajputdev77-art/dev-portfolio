"use client";
import { useEffect, useState } from "react";
import { nightShift } from "@/content/site";

export default function NightShift() {
  const [nights, setNights] = useState<string>("—");

  useEffect(() => {
    const anchor = new Date(nightShift.anchor).getTime();
    const n = Math.floor((Date.now() - anchor) / 86400000);
    setNights(n > 0 ? String(n) : "0");
  }, []);

  return (
    <section className="nightshift" aria-label="The night shift">
      <div className="nightshift-inner">
        <div className="nightshift-l">
          <span className="nightshift-tag">{nightShift.tag}</span>
          <p
            className="nightshift-statement"
            dangerouslySetInnerHTML={{ __html: nightShift.statement }}
          />
          <span className="nightshift-sub">{nightShift.sub}</span>
        </div>
        <div className="nightshift-r">
          <span className="nightshift-moon">🌙</span>
          <span className="nightshift-num">{nights}</span>
          <span className="nightshift-num-label">{nightShift.counterLabel}</span>
        </div>
      </div>
    </section>
  );
}
