import { manifest } from "@/content/site";
import { renderInline } from "./utils";

export default function Manifest() {
  return (
    <section id="manifest" className="oc-manifest">
      <div className="oc-act-marker">
        <span>{manifest.act}</span>
        <span className="oc-eyebrow-rule" />
        <span>{manifest.actSub}</span>
      </div>
      <blockquote className="oc-quote">
        <p>&ldquo;{renderInline(manifest.quote.text)}&rdquo;</p>
        <footer>
          — {manifest.quote.attribution}, <span>{manifest.quote.work}</span>
        </footer>
      </blockquote>
      <div className="oc-manifest-grid">
        {manifest.rows.map((row, i) => (
          <article key={row.n} className="oc-manifest-row">
            <div
              className="oc-manifest-n"
              style={i === manifest.rows.length - 1 ? { color: "var(--accent)" } : undefined}
            >
              {row.n}
            </div>
            <h3 className="oc-manifest-title">{row.title}</h3>
            <p className="oc-manifest-body">{row.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
