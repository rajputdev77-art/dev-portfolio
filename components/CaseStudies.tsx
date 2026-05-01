import { getCaseStudies } from "@/lib/markdown";
import { cases } from "@/content/site";
import CaseDiagram from "./CaseDiagram";
import CaseLog from "./CaseLog";
import CaseMetric from "./CaseMetric";

export default function CaseStudies() {
  const studies = getCaseStudies();

  return (
    <section id="work" className="oc-cases">
      <header className="oc-section-head">
        <div className="oc-act-marker">
          <span>{cases.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{cases.actSub}</span>
        </div>
        <h2 className="oc-h2">
          {cases.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < cases.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </header>

      <div className="oc-cases-grid">
        {studies.map((c, i) => {
          const n = `CS · ${String(i + 1).padStart(2, "0")}`;
          const props = {
            n,
            title: c.title,
            tag: c.tag || c.role || "",
            outcome: c.outcome,
            href: `/case-studies/${c.slug}`,
          };
          if (c.kind === "log") return <CaseLog key={c.slug} {...props} />;
          if (c.kind === "metric")
            return (
              <CaseMetric
                key={c.slug}
                {...props}
                metrics={c.metrics}
              />
            );
          return <CaseDiagram key={c.slug} {...props} />;
        })}
      </div>
    </section>
  );
}
