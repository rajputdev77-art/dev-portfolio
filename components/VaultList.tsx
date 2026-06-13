"use client";
import { useState } from "react";
import TrackedLink from "./TrackedLink";

export interface VaultSlot {
  n: string;
  title: string;
  desc: string;
  read: string;
  dateLabel: string;
  href?: string;
  pinned?: boolean;
  badge?: string;
}

const DEFAULT_VISIBLE = 4;

export default function VaultList({ slots }: { slots: VaultSlot[] }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="vault-list">
        {slots.map((e, i) => {
          if (i >= DEFAULT_VISIBLE && !showAll) return null;
          const inner = (
            <>
              <div className="num">{e.n}</div>
              <div>
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
              </div>
              <div className="meta">
                <b>{e.badge}</b>
                {e.dateLabel}
                {e.read ? (
                  <>
                    <br />
                    {e.read.toUpperCase()}
                  </>
                ) : null}
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

      {slots.length > DEFAULT_VISIBLE && (
        <div className="show-more-row">
          <button className="show-more" onClick={() => setShowAll((v) => !v)}>
            {showAll ? (
              <>
                Show less <span className="arr">↑</span>
              </>
            ) : (
              <>
                Read all <span className="c">{slots.length}</span> notes{" "}
                <span className="arr">↓</span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
