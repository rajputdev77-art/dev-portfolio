import Link from "next/link";
import { getEssays } from "@/lib/markdown";
import { vault } from "@/content/site";
import TrackedLink from "./TrackedLink";

export default function Vault() {
  const realEssays = getEssays();

  const slots: Array<{
    n: string;
    title: string;
    desc: string;
    read: string;
    date: string;
    href?: string;
    pinned?: boolean;
    badge?: string;
  }> = [];

  realEssays.forEach((e, i) => {
    const pinned = vault.pinned.includes(e.slug);
    slots.push({
      n: String(i + 1).padStart(2, "0"),
      title: e.title,
      desc: e.description || "",
      read: e.read || "",
      date: e.date || "",
      href: `/essays/${e.slug}`,
      pinned,
      badge: pinned ? "PINNED" : e.source === "vault" ? "VAULT" : "ESSAY",
    });
  });

  vault.placeholders.forEach((p) => {
    if (slots.length < 3) slots.push({ ...p, badge: "SOON" });
  });

  return (
    <section className="b" id="vault">
      <div className="secline">
        <div className="lhs">
          <span className="n">{vault.act}</span>
          <span className="ttl">{vault.actSub}</span>
        </div>
        <span className="rhs">{vault.rhs}</span>
      </div>

      <div className="secbody" data-n={vault.act}>
        <div className="vault-list">
          {slots.map((e) => {
            // Try to format date as "MMM YYYY".
            let dateLabel = e.date;
            if (e.date && /^\d{4}-\d{2}/.test(e.date)) {
              const d = new Date(e.date);
              if (!isNaN(d.getTime())) {
                dateLabel = d.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
              }
            }
            const inner = (
              <>
                <div className="num">{e.n}</div>
                <div>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
                <div className="meta">
                  <b>{e.badge}</b>
                  {dateLabel}
                  {e.read ? <><br />{e.read.toUpperCase()}</> : null}
                </div>
              </>
            );
            const cls = `vc${e.pinned ? " pin" : ""}`;
            return e.href ? (
              <TrackedLink
                key={e.n}
                href={e.href}
                className={cls}
                event="vault_note_opened"
                props={{ slug: e.href.split("/").pop() || "", position: parseInt(e.n, 10), pinned: !!e.pinned }}
              >
                {inner}
              </TrackedLink>
            ) : (
              <article key={e.n} className={cls}>
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
