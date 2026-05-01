import { path } from "@/content/site";
import { renderInline } from "./utils";

export default function Path() {
  return (
    <section id="path" className="oc-path">
      <header className="oc-section-head">
        <div className="oc-act-marker">
          <span>{path.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{path.actSub}</span>
        </div>
        <h2 className="oc-h2">
          {path.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < path.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="oc-section-sub">{renderInline(path.sub)}</p>
      </header>
      <ol className="oc-path-list">
        {path.rows.map((p, i) => (
          <li key={i} className="oc-path-row">
            <div className="oc-path-year">{p.year}</div>
            <div className="oc-path-spine">
              <span
                className="oc-path-tick"
                style={{ background: "var(--accent)" }}
              />
              <span className="oc-path-line" />
            </div>
            <div className="oc-path-body">
              <span className="oc-path-tag">{p.tag}</span>
              <h3 className="oc-path-role">{p.role}</h3>
              <p className="oc-path-org">{p.org}</p>
              <p className="oc-path-note">{p.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
