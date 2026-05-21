"use client";
import { useEffect, useState } from "react";

interface NowPlaying { title: string; artist: string; album?: string; platform?: string; url?: string }
interface NowWatching { title: string; kind?: string; note?: string; url?: string }
interface Reading { title: string; author?: string; note?: string; url?: string }
interface Commit { repo: string; message: string; sha: string; url: string; when: string }

interface Props {
  extras: { nowPlaying: NowPlaying | null; nowWatching: NowWatching | null; reading: Reading | null };
  githubUser: string;
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

export default function DeckStrip({ extras, githubUser }: Props) {
  const [commit, setCommit] = useState<Commit | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `https://api.github.com/users/${githubUser}/events/public?per_page=10`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!r.ok) return;
        const events = await r.json();
        const push = events.find(
          (e: any) =>
            e.type === "PushEvent" &&
            e.payload &&
            e.payload.commits &&
            e.payload.commits.length
        );
        if (!push) return;
        const c = push.payload.commits[push.payload.commits.length - 1];
        setCommit({
          repo: push.repo.name.split("/").pop(),
          message: c.message.split("\n")[0].slice(0, 80),
          sha: c.sha.slice(0, 7),
          url: `https://github.com/${push.repo.name}/commit/${c.sha}`,
          when: timeAgo(new Date(push.created_at)),
        });
      } catch {
        // silent — deck still works without it
      }
    })();
  }, [githubUser]);

  const cards: React.ReactNode[] = [];

  if (extras.nowPlaying) {
    const e = extras.nowPlaying;
    cards.push(
      <a
        key="song"
        className="deck-card song"
        href={e.url || undefined}
        target={e.url ? "_blank" : undefined}
        rel={e.url ? "noreferrer" : undefined}
      >
        <div className="dlbl">
          <span>// NOW PLAYING</span>
          <b>{e.platform || "AUDIO"}</b>
        </div>
        <div className="dttl">{e.title}</div>
        <div className="dmeta">
          {e.artist && <b>{e.artist}</b>}
          {e.album ? " · " + e.album : ""}
        </div>
        <div className="barz">
          {[...Array(8)].map((_, i) => <span key={i} />)}
        </div>
      </a>
    );
  }
  if (extras.nowWatching) {
    const e = extras.nowWatching;
    cards.push(
      <a key="movie" className="deck-card movie" href={e.url || undefined}>
        <div className="dlbl">
          <span>// NOW WATCHING</span>
          <b>{e.kind || "FILM"}</b>
        </div>
        <div className="dttl">{e.title}</div>
        {e.note && <div className="dmeta"><b>{e.note}</b></div>}
      </a>
    );
  }
  if (extras.reading) {
    const e = extras.reading;
    cards.push(
      <a key="book" className="deck-card book" href={e.url || undefined}>
        <div className="dlbl">
          <span>// NOW READING</span>
          <b>BOOK</b>
        </div>
        <div className="dttl">{e.title}</div>
        <div className="dmeta">
          {e.author && <b>{e.author}</b>}
          {e.note ? " · " + e.note : ""}
        </div>
      </a>
    );
  }
  if (commit) {
    cards.push(
      <a
        key="commit"
        className="deck-card commit"
        href={commit.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="dlbl">
          <span>// LATEST COMMIT</span>
          <b>GIT</b>
        </div>
        <div className="dttl">{commit.message}</div>
        <div className="dmeta">
          <b>{commit.repo}</b> · {commit.sha} · {commit.when}
        </div>
      </a>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="deck-strip">
        <div className="deck-empty">
          <b>// DECK · empty</b>
          Edit the <code>extras</code> object in <code>content/site.ts</code> to surface
          NOW PLAYING / WATCHING / READING cards here. GitHub commit auto-fetches when there's recent activity.
        </div>
      </div>
    );
  }

  return <div className="deck-strip">{cards}</div>;
}
