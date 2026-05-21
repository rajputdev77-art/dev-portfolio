import { getCaseStudies, getCaseStudyBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import ClocksBar from "@/components/ClocksBar";

export async function generateStaticParams() {
  const studies = getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `CS · ${study.title} — Dev Rajput`,
    description: study.outcome,
  };
}

function statusClass(s?: string) {
  if (!s) return "";
  const low = s.toLowerCase();
  if (low.includes("progress")) return "prog";
  if (low.includes("paused")) return "paused";
  if (low.includes("product")) return "prod";
  return "";
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  // Build index lookup for the CS · NN label.
  const all = getCaseStudies();
  const idx = all.findIndex((s) => s.slug === params.slug);
  const num = String(idx + 1).padStart(2, "0");

  const stLabel =
    study.type === "product"
      ? "PRODUCT"
      : (study.status || "LIVE").toUpperCase();
  const stCls = statusClass(study.status || (study.type === "product" ? "PRODUCT" : "LIVE"));

  // Split tags by " · " for the chip row.
  const tags = study.tag
    ? study.tag.split(/\s*·\s*/).filter(Boolean)
    : [];

  return (
    <>
      <Topbar />
      <Nav />
      <div className="csb-back">
        <a className="home" href="/#work">← BACK TO INDEX</a>
        <div className="crumbs">
          CS · {num} <b>{study.title.toUpperCase()}</b>
        </div>
      </div>

      <section className="cs-hero">
        <div className="cs-meta">
          <span className="id">CASE STUDY <b>{num}</b></span>
          <span className={`st ${stCls}`}>{stLabel}</span>
          {study.timeline && <span className="id">{study.timeline.toUpperCase()}</span>}
        </div>
        <h1 className="cs-title">
          {study.title.toUpperCase().split(/\s+/).map((w, i) => (
            <span className="l" key={i}>{w} </span>
          ))}
        </h1>
        <p className="cs-deck">{study.outcome}</p>
        {tags.length > 0 && (
          <div className="cs-tags">
            {tags.map((t, i) => (
              <span key={i} className={i < 2 ? "k" : ""}>{t.toUpperCase()}</span>
            ))}
          </div>
        )}
      </section>

      {study.metrics && study.metrics.length > 0 && (
        <div className="cs-slabs">
          {study.metrics.slice(0, 4).map((m, i) => (
            <div key={i} className="cs-slab">
              <div className="l">{m.label}</div>
              <div className="v">{m.num}{m.unit && <em>{m.unit}</em>}</div>
            </div>
          ))}
        </div>
      )}

      <div className="sline">
        <div className="lhs">
          <span className="n">01</span>
          <span className="t">THE BUILD</span>
        </div>
        <span className="r">// CONTEXT + STACK + WHAT BROKE</span>
      </div>

      <main className="sbody" dangerouslySetInnerHTML={{ __html: study.content }} />

      <div className="csb-back">
        <a className="home" href="/#work">← BACK TO INDEX</a>
        <a className="home" href="/#connect" style={{ background: "var(--red)", color: "var(--paper)", borderColor: "var(--red)" }}>CONNECT ↗</a>
      </div>

      <ClocksBar />
    </>
  );
}
