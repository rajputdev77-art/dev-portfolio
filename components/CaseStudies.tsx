"use client";
import { useState } from "react";
import Link from "next/link";
import { cases } from "@/content/site";
import { track } from "@/lib/track";
import type { CaseStudy } from "@/lib/markdown";

// 12 case studies — first 2 are featured, next 4 are standard, last 6 are mini.
const SIZE_MAP: ("feat" | "std" | "mini")[] = [
  "feat", "feat",
  "std", "std", "std", "std",
  "mini", "mini", "mini", "mini", "mini", "mini",
];

// Feature stat extraction — from outcome string or metrics array.
function pickFeatStats(c: CaseStudy): { num: string; label: string }[] {
  if (c.metrics && c.metrics.length) {
    return c.metrics.slice(0, 3).map((m) => ({
      num: `${m.num}${m.unit || ""}`,
      label: m.label,
    }));
  }
  // Fallbacks per slug — pulled from the brutalist mock.
  const slugFallbacks: Record<string, { num: string; label: string }[]> = {
    "local-ai-agents-n8n": [
      { num: "30s", label: "form → alert" },
      { num: "12K", label: "runs / mo" },
      { num: "1.4s", label: "p95 latency" },
    ],
    "possession-handover-audit": [
      { num: "−35%", label: "resolution" },
      { num: "+20%", label: "CSAT" },
      { num: "0", label: "rejections" },
    ],
  };
  return slugFallbacks[c.slug] || [];
}

function statusClass(s?: string) {
  if (!s) return "";
  const low = s.toLowerCase();
  if (low.includes("progress")) return "prog";
  if (low.includes("paused")) return "paused";
  if (low.includes("product")) return "prod";
  return ""; // LIVE / default red
}

export default function CaseStudiesView({ studies }: { studies: CaseStudy[] }) {
  const [scheme, setScheme] = useState<"original" | "rainbow" | "bold" | "stamps">("original");

  return (
    <section className="b" id="work">
      <div className="secline">
        <div className="lhs">
          <span className="n">{cases.act}</span>
          <span className="ttl">{cases.actSub}</span>
        </div>
        <span className="rhs">{cases.rhs}</span>
      </div>

      <div className="secbody" data-n={cases.act}>
        <h2 className="work-headline" dangerouslySetInnerHTML={{ __html: cases.headline }} />
        <p className="work-deck">{cases.deck}</p>

        <div className="work-scheme-bar">
          <span className="lbl">// COLOR //</span>
          {(["original", "rainbow", "bold", "stamps"] as const).map((s) => (
            <button
              key={s}
              className={scheme === s ? "on" : ""}
              onClick={() => {
                setScheme(s);
                track("work_scheme_changed", { scheme: s });
              }}
            >
              {s === "bold" ? "BOLD BLOCKS" : s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="work-grid" data-scheme={scheme}>
          {studies.map((c, i) => {
            const size = SIZE_MAP[i] || "mini";
            const idx = `CS · ${String(i + 1).padStart(2, "0")}`;
            const stClass = statusClass(c.status || (c.type === "product" ? "PRODUCT" : "LIVE"));
            const stLabel =
              c.type === "product"
                ? "PRODUCT"
                : (c.status || "LIVE").toUpperCase();
            // First featured = dark (yellow on black per brutalist)
            const dark = size === "feat" && i === 0 ? " dark" : "";
            const featStats = size === "feat" ? pickFeatStats(c) : [];

            return (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className={`ws ${size}${dark}`}
                onClick={() =>
                  track("case_study_opened", {
                    slug: c.slug,
                    position: i + 1,
                    scheme,
                    size,
                  })
                }
              >
                <div className="ws-tag">
                  <span className="ws-id">{idx}</span>
                  <span className={`ws-st ${stClass}`}>{stLabel}</span>
                </div>
                <h3 className="ws-title">{c.title}</h3>
                {c.tag && <div className="ws-stack">{c.tag.toUpperCase()}</div>}
                {featStats.length > 0 && (
                  <div className="ws-stats">
                    {featStats.map((s, k) => (
                      <div key={k} className="ws-stat">
                        <b>{s.num}</b>
                        {s.label}
                      </div>
                    ))}
                  </div>
                )}
                <p className="ws-desc">{c.outcome}</p>
                <div className="ws-cta">
                  {size === "mini" ? "READ" : c.type === "product" ? "SEE PRODUCT" : "READ THE BUILD"}
                  <span className="arr">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
