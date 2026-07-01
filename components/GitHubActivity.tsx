"use client";
import { useEffect, useState } from "react";

// Recent public GitHub activity — no token, same public events API as the
// homepage commit card. Additive: lives on /stack, shows "actively building".
interface Activity {
  repo: string;
  type: string;
  detail: string;
  when: string;
  url: string;
}

function timeAgo(d: Date) {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return s + "s ago";
  const m = Math.floor(s / 60);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  const dd = Math.floor(h / 24);
  return dd + "d ago";
}

export default function GitHubActivity({ user }: { user: string }) {
  const [items, setItems] = useState<Activity[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `https://api.github.com/users/${user}/events/public?per_page=30`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!r.ok) throw new Error(String(r.status));
        const events = await r.json();
        const out: Activity[] = [];
        for (const e of events) {
          if (out.length >= 6) break;
          const repo = e.repo?.name?.split("/").pop() || "repo";
          const url = `https://github.com/${e.repo?.name || user}`;
          const when = timeAgo(new Date(e.created_at));
          if (e.type === "PushEvent" && e.payload?.commits?.length) {
            const c = e.payload.commits[e.payload.commits.length - 1];
            out.push({ repo, type: "PUSH", detail: c.message.split("\n")[0].slice(0, 72), when, url });
          } else if (e.type === "CreateEvent") {
            out.push({ repo, type: "CREATE", detail: `new ${e.payload?.ref_type || "ref"}`, when, url });
          } else if (e.type === "PullRequestEvent") {
            out.push({ repo, type: "PR", detail: `${e.payload?.action} PR`, when, url });
          } else if (e.type === "WatchEvent") {
            out.push({ repo, type: "STAR", detail: "starred", when, url });
          }
        }
        if (out.length === 0) throw new Error("no-activity");
        setItems(out);
      } catch {
        setFailed(true);
      }
    })();
  }, [user]);

  if (failed) return null; // silent — additive, never breaks the page
  if (!items) {
    return <div className="gh-activity-empty">Loading recent activity…</div>;
  }

  return (
    <ul className="gh-activity">
      {items.map((a, i) => (
        <li key={i}>
          <a href={a.url} target="_blank" rel="noreferrer">
            <span className="gh-type">{a.type}</span>
            <span className="gh-repo">{a.repo}</span>
            <span className="gh-detail">{a.detail}</span>
            <span className="gh-when">{a.when}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
