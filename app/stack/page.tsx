import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import ClocksBar from "@/components/ClocksBar";
import GitHubActivity from "@/components/GitHubActivity";
import { stackMeta, stackGroups } from "@/content/stack";
import { githubUser } from "@/content/site";

export const metadata: Metadata = {
  title: "The Stack — Dev Rajput",
  description:
    "Every tool, AI model, and workflow Dev Rajput actually uses — Python, n8n, Claude, Ollama, Next.js, and more.",
};

export default function StackPage() {
  return (
    <>
      <Topbar />
      <div className="csb-back">
        <a className="home" href="/">← BACK TO SITE</a>
        <div className="crumbs">
          // <b>THE · STACK</b>
        </div>
      </div>

      <section className="cs-hero">
        <div className="cs-meta">
          <span className="id">INVENTORY</span>
          <span className="st">LIVE</span>
        </div>
        <h1 className="cs-title">
          <span className="l">THE</span>
          <span className="l">STACK.</span>
        </h1>
        <p className="cs-deck">{stackMeta.deck}</p>
      </section>

      <div className="sline">
        <div className="lhs">
          <span className="n">01</span>
          <span className="t">THE TOOLBOX</span>
        </div>
        <span className="r">{stackMeta.note}</span>
      </div>

      <main className="stack-wrap">
        <div className="stack-grid">
          {stackGroups.map((g) => (
            <section key={g.label} className={`stack-group tone-${g.tone || "paper"}`}>
              <h2 className="stack-group-h">{g.label}</h2>
              <ul className="stack-items">
                {g.items.map((it) => (
                  <li key={it.name} className="stack-item">
                    <span className="stack-name">{it.name}</span>
                    <span className="stack-note">{it.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <div className="sline">
        <div className="lhs">
          <span className="n">02</span>
          <span className="t">ACTIVELY BUILDING</span>
        </div>
        <span className="r">// LIVE FROM GITHUB</span>
      </div>
      <div className="stack-wrap">
        <GitHubActivity user={githubUser} />
      </div>

      <div className="csb-back">
        <a className="home" href="/">← BACK TO SITE</a>
        <a
          className="home"
          href="/#connect"
          style={{ background: "var(--red)", color: "var(--paper)", borderColor: "var(--red)" }}
        >
          CONNECT ↗
        </a>
      </div>

      <ClocksBar />
    </>
  );
}
