import { now } from "@/content/site";
import { getNowData, type NowEntry } from "@/lib/markdown";

function Column({
  label,
  items,
}: {
  label: string;
  items: NowEntry[];
}) {
  return (
    <article className="oc-now-card">
      <header className="oc-now-h">
        <i />
        <span>{label}</span>
      </header>
      <ul className="oc-now-list">
        {items.map((item, i) => (
          <li key={i}>
            {item.title}
            <span>{item.note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Now() {
  const data = getNowData();

  return (
    <section id="now" className="oc-now">
      <header className="oc-section-head">
        <div className="oc-act-marker">
          <span>{now.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{now.actSub}</span>
        </div>
        <h2 className="oc-h2">
          {now.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < now.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="oc-section-sub">{now.sub}</p>
      </header>

      <div className="oc-now-grid" style={{ maxWidth: 1380, margin: "0 auto", padding: "0 48px" }}>
        <Column label="Currently building" items={data.building} />
        <Column label="Currently learning" items={data.learning} />
        <Column label="Thinking about" items={data.thinking} />
      </div>

      {data.updated && (
        <p
          className="oc-now-updated"
          style={{ maxWidth: 1380, margin: "32px auto 0", padding: "0 48px" }}
        >
          Last updated · <em>{data.updated}</em>
        </p>
      )}
    </section>
  );
}
