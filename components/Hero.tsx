"use client";
import { useState, useEffect } from "react";
import { hero, slabs, pivotDate } from "@/content/site";
import { track } from "@/lib/track";

export default function Hero() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [days, setDays] = useState<string>("—");

  useEffect(() => {
    const anchor = new Date(pivotDate).getTime();
    const d = Math.floor((Date.now() - anchor) / 86400000);
    setDays(d > 0 ? String(d) : "0");
  }, []);

  const h = hero.headlines[headlineIdx];

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-meta">
            <span><b>NODE</b> ▸ {hero.metaNode}</span>
            <span>{hero.metaLocation}</span>
            <span className="blink">{hero.metaBadge}</span>
            <span><b>VOL.</b> III · NO. 042</span>
          </div>

          <div className="hero-shuffle" title="Cycle headline">
            {hero.headlines.map((_, i) => (
              <button
                key={i}
                className={i === headlineIdx ? "on" : ""}
                onClick={() => {
                  setHeadlineIdx(i);
                  track("headline_shuffled", { variant: i + 1 });
                }}
                title={`Variant ${i + 1}`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <h1 className="hero-headline">
            <span className="l1" dangerouslySetInnerHTML={{ __html: h[0] }} />
            <span className="l2" dangerouslySetInnerHTML={{ __html: h[1] }} />
            <span className="l3" dangerouslySetInnerHTML={{ __html: h[2] }} />
          </h1>

          <p className="hero-deck" dangerouslySetInnerHTML={{ __html: hero.deck.html }} />

          <div className="hero-actions">
            <a
              className="btn"
              href={hero.primaryCta.href}
              onClick={() => track("cta_clicked", { cta: "see_the_work", location: "hero" })}
            >
              {hero.primaryCta.label} <span className="arr">→</span>
            </a>
            <a
              className="btn alt"
              href={hero.ghostCta.href}
              onClick={() => track("cta_clicked", { cta: "lets_talk", location: "hero" })}
            >
              {hero.ghostCta.label} ↗
            </a>
          </div>
        </div>
      </section>

      <div className="slabs">
        {slabs.map((s, i) => {
          const isPivot = s.kind === "pivot";
          const value = isPivot ? days : s.value;
          const suffix = isPivot ? "d" : s.suffix;
          return (
            <div key={i} className={`slab${isPivot ? " pivot" : ""}`}>
              <div className="l">{s.label}</div>
              {s.multi ? (
                <div
                  className="v"
                  style={{ fontSize: "30px", lineHeight: 1.1 }}
                  dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br/>") }}
                />
              ) : s.small ? (
                <div className="v" style={{ fontSize: "54px" }}>{value}</div>
              ) : (
                <div className="v">
                  {value}
                  {suffix && <em>{suffix}</em>}
                </div>
              )}
              <div className="s">{s.note}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
