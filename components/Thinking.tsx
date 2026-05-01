import Link from "next/link";
import { getEssays } from "@/lib/markdown";
import { thinking } from "@/content/site";

export default function Thinking() {
  const realEssays = getEssays();

  // Real essays first; fill remaining slots with placeholders.
  const slots: Array<{
    n: string;
    title: string;
    desc: string;
    read: string;
    date: string;
    href?: string;
  }> = [];

  realEssays.forEach((e, i) => {
    slots.push({
      n: String(i + 1).padStart(2, "0"),
      title: e.title,
      desc: e.description || "",
      read: e.read || "",
      date: e.date || "",
      href: `/essays/${e.slug}`,
    });
  });

  thinking.placeholderEssays.forEach((p) => {
    if (slots.length < 3) slots.push({ ...p });
  });

  return (
    <section id="thinking" className="oc-thinking">
      <header className="oc-section-head">
        <div className="oc-act-marker">
          <span>{thinking.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{thinking.actSub}</span>
        </div>
        <h2 className="oc-h2">
          {thinking.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < thinking.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </header>
      <div className="oc-essays">
        {slots.map((e) => {
          const inner = (
            <>
              <span className="oc-essay-n" style={{ color: "var(--accent)" }}>
                {e.n}
              </span>
              <h3 className="oc-essay-title">{e.title}</h3>
              <p className="oc-essay-desc">{e.desc}</p>
              <span className="oc-essay-meta">
                <span>
                  {e.date}
                  {e.read ? ` · ${e.read}` : ""}
                </span>
                <span className="oc-essay-arrow">→</span>
              </span>
            </>
          );
          return e.href ? (
            <Link key={e.n} href={e.href} className="oc-essay">
              {inner}
            </Link>
          ) : (
            <article key={e.n} className="oc-essay">
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}
