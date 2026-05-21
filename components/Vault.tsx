import Link from "next/link";
import { getEssays } from "@/lib/markdown";
import { vault } from "@/content/site";

export default function Vault() {
  const realEssays = getEssays();

  const slots: Array<{
    n: string;
    title: string;
    desc: string;
    read: string;
    date: string;
    href?: string;
    tag?: string;
  }> = [];

  realEssays.forEach((e, i) => {
    slots.push({
      n: String(i + 1).padStart(2, "0"),
      title: e.title,
      desc: e.description || "",
      read: e.read || "",
      date: e.date || "",
      href: `/essays/${e.slug}`,
      tag: e.source === "vault" ? "From the vault" : "Essay",
    });
  });

  // Pad to at least 3 with placeholders.
  vault.placeholders.forEach((p) => {
    if (slots.length < 3) slots.push({ ...p });
  });

  return (
    <section id="vault" className="oc-thinking">
      <header className="oc-section-head">
        <div className="oc-act-marker">
          <span>{vault.act}</span>
          <span className="oc-eyebrow-rule" />
          <span>{vault.actSub}</span>
        </div>
        <h2 className="oc-h2">
          {vault.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < vault.headline.length - 1 && <br />}
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
                  {e.tag ? ` · ${e.tag}` : ""}
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
      {vault.more && <p className="oc-essays-more">{vault.more}</p>}
    </section>
  );
}
