import type { Metadata } from "next";
import { path, contact } from "@/content/site";
import { stackGroups } from "@/content/stack";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Dev Rajput — CV",
  description: "AI Operations & Automation. Philosophy + MBA + real-estate ops + AI.",
};

// One-source CV (AU#8): rendered from the SAME data as the homepage timeline,
// so it never drifts. Print-optimized. Does not touch the existing /resume.pdf.
export default function CvPage() {
  const skills = stackGroups.flatMap((g) => g.items.map((i) => i.name));

  return (
    <main className="cv-doc">
      <div className="cv-toolbar">
        <a className="cv-back" href="/">← back to site</a>
        <div className="cv-toolbar-r">
          <a className="cv-back" href="/resume.pdf" target="_blank" rel="noreferrer">
            formatted PDF ↗
          </a>
          <PrintButton />
        </div>
      </div>

      <header className="cv-head">
        <h1>DEV RAJPUT</h1>
        <p className="cv-role">AI Operations &amp; Automation</p>
        <p className="cv-contact">
          {contact.cards
            .filter((c) => c.label !== "DOCUMENT")
            .map((c) => c.value)
            .join("  ·  ")}
          {"  ·  India · IST"}
        </p>
      </header>

      <section className="cv-section">
        <h2>SUMMARY</h2>
        <p>
          Self-taught AI builder shipping agents, workflows, and systems from scratch.
          Philosophy → MBA → three years of real-estate operations → AI. Now building
          full-time in public: automation pipelines, local voice assistants, autonomous
          knowledge systems, and trading agents. Zero CS degree, pure systems thinking.
          Open to AI Operations / Automation roles — remote-first, Europe priority.
        </p>
      </section>

      <section className="cv-section">
        <h2>HIGHLIGHTS</h2>
        <ul className="cv-highlights">
          {path.quicks.map((q, i) => (
            <li key={i}>
              <b>{q.num}</b> {q.body.charAt(0) + q.body.slice(1).toLowerCase()}
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-section">
        <h2>EXPERIENCE</h2>
        <div className="cv-roles">
          {path.rows.map((r, i) => (
            <div className="cv-role" key={i}>
              <div className="cv-role-yr">
                {r.year}
                <span>{r.yearTag}</span>
              </div>
              <div className="cv-role-body">
                <h3 dangerouslySetInnerHTML={{ __html: r.role }} />
                <div className="cv-role-org" dangerouslySetInnerHTML={{ __html: r.org }} />
                <p>{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2>SKILLS &amp; STACK</h2>
        <p className="cv-skills">{skills.join("  ·  ")}</p>
      </section>

      <footer className="cv-foot">
        Generated from live portfolio data · dev-portfolio-dun-theta.vercel.app
      </footer>
    </main>
  );
}
