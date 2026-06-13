import { getEssays } from "@/lib/markdown";
import { vault } from "@/content/site";
import VaultList, { type VaultSlot } from "./VaultList";

export default function Vault() {
  const realEssays = getEssays();

  const slots: VaultSlot[] = [];

  realEssays.forEach((e, i) => {
    const pinned = vault.pinned.includes(e.slug);
    let dateLabel = e.date || "";
    if (e.date && /^\d{4}-\d{2}/.test(e.date)) {
      const d = new Date(e.date);
      if (!isNaN(d.getTime())) {
        dateLabel = d
          .toLocaleDateString("en-US", { month: "short", year: "numeric" })
          .toUpperCase();
      }
    }
    slots.push({
      n: String(i + 1).padStart(2, "0"),
      title: e.title,
      desc: e.description || "",
      read: e.read || "",
      dateLabel,
      href: `/essays/${e.slug}`,
      pinned,
      badge: pinned ? "PINNED" : e.source === "vault" ? "VAULT" : "ESSAY",
    });
  });

  vault.placeholders.forEach((p) => {
    if (slots.length < 3)
      slots.push({
        n: p.n,
        title: p.title,
        desc: p.desc,
        read: p.read,
        dateLabel: p.date,
        badge: "SOON",
      });
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
        <VaultList slots={slots} />
      </div>
    </section>
  );
}
