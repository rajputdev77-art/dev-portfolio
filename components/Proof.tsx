import { proof } from "@/content/site";

export default function Proof() {
  return (
    <section id="proof" className="oc-proof">
      <header className="oc-section-head">
        <div className="oc-act-marker">
          <span>{proof.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{proof.actSub}</span>
        </div>
        <h2 className="oc-h2">
          {proof.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < proof.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </header>

      <div
        className="oc-proof-grid"
        style={{ maxWidth: 1380, margin: "0 auto", padding: "0 48px" }}
      >
        {proof.links.map((p) => (
          <a
            key={p.label}
            className="oc-proof-card"
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span className="oc-proof-k">{p.label}</span>
            <span className="oc-proof-v">{p.value}</span>
            <span className="oc-proof-note">{p.note}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
