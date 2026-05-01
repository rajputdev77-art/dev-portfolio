"use client";
import { hero } from "@/content/site";
import { renderInline } from "./utils";
import WorkflowDiagram from "./WorkflowDiagram";
import TelemetryLog from "./TelemetryLog";
import { useTweaks } from "./TweaksPanel";

export default function Hero() {
  const { t } = useTweaks();
  const { motion, heroVariant } = t;

  return (
    <header id="top" className="oc-hero">
      <aside className="oc-hero-l">
        <div className="oc-eyebrow">
          <span>{hero.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{hero.actSub}</span>
        </div>

        <h1 className="oc-h1">
          {hero.headline.map((line, i) => (
            <span
              key={i}
              className={`oc-h1-line${line.muted ? " oc-h1-muted" : ""}`}
            >
              {line.italic ? <em>{line.text}</em> : line.text}
            </span>
          ))}
        </h1>

        <p className="oc-lede">{renderInline(hero.lede)}</p>

        <div className="oc-cta-row">
          <a
            href={hero.primaryHref}
            className="oc-cta oc-cta-primary"
            style={{ background: "var(--accent)" }}
          >
            <span>{hero.primaryCta}</span>
            <span className="oc-cta-arrow">→</span>
          </a>
          <a href={hero.ghostHref} className="oc-cta oc-cta-ghost">
            <span>{hero.ghostCta}</span>
          </a>
        </div>

        <dl className="oc-hero-stats">
          {hero.stats.map((s, i) => (
            <div key={i}>
              <dt>{s.label}</dt>
              {"stack" in s && s.stack ? (
                <dd className="oc-hero-stack">{s.stack}</dd>
              ) : (
                <dd>
                  {s.value}
                  <span>{s.suffix}</span>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </aside>

      <section className="oc-hero-r">
        {heroVariant === "log" ? (
          <TelemetryLog motion={motion} />
        ) : (
          <WorkflowDiagram motion={motion} />
        )}
        <div className="oc-hero-caption">
          <span className="oc-caption-num">Fig. 01</span>
          <span>
            {heroVariant === "log"
              ? "live trace of an agentic lead-qualifier in production"
              : "a typical agentic workflow — Webhook → Enrich → Score → Route → Sync → Log"}
          </span>
        </div>
      </section>
    </header>
  );
}
