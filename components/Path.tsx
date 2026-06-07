"use client";
import { useRef } from "react";
import { path } from "@/content/site";
import { track } from "@/lib/track";

export default function Path() {
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const msgRef = useRef<HTMLDivElement | null>(null);

  function fireCurtain(idx: number) {
    const c = curtainRef.current;
    const m = msgRef.current;
    if (!c || !m) return;
    m.innerHTML =
      path.curtainMessages[idx] || path.curtainMessages[path.curtainMessages.length - 1];
    c.classList.add("in");
    window.setTimeout(() => c.classList.remove("in"), 950);
    track("cv_arrow_clicked", { arrow_index: idx });
  }

  // Split the headline: "PHILOSOPHY <arr/> MBA <arr/> <em>OPS → AI.</em>"
  // We'll render the pieces between <arr/> as React, and arrows as buttons.
  const segments = path.headline.split(/<arr\/?>/);

  return (
    <section className="b" id="path">
      <div className="secline">
        <div className="lhs">
          <span className="n">{path.act}</span>
          <span className="ttl">{path.actSub}</span>
        </div>
        <span className="rhs">{path.rhs}</span>
      </div>

      <div className="secbody" data-n={path.act}>
        <h2 className="tl-headline">
          {segments.map((seg, i) => (
            <span key={i}>
              <span dangerouslySetInnerHTML={{ __html: seg }} />
              {i < segments.length - 1 && (
                <span
                  className="arr"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    const t = e.currentTarget;
                    t.classList.add("spin");
                    setTimeout(() => t.classList.remove("spin"), 600);
                    fireCurtain(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      const t = e.currentTarget;
                      t.classList.add("spin");
                      setTimeout(() => t.classList.remove("spin"), 600);
                      fireCurtain(i);
                    }
                  }}
                >
                  →
                </span>
              )}
            </span>
          ))}
        </h2>

        <div className="quicks">
          {path.quicks.map((q, i) => (
            <div key={i}>
              <em>{q.num}</em>
              {q.body}
            </div>
          ))}
        </div>

        <div className="roles">
          {path.rows.map((r, i) => {
            const cls = `role${r.current ? " current" : ""}${r.origin ? " origin" : ""}`;
            return (
              <div key={i} className={cls}>
                <div className="yr">
                  {r.year}
                  <small>{r.yearTag}</small>
                </div>
                <div>
                  <h4 dangerouslySetInnerHTML={{ __html: r.role }} />
                  <div className="org" dangerouslySetInnerHTML={{ __html: r.org }} />
                  <p>{r.note}</p>
                </div>
                {r.gradPolo && (
                  <div className="grad-polo">
                    <span className="tape">{r.gradPolo.tape}</span>
                    <img src={r.gradPolo.src} alt="Graduation" />
                    <div className="cap">
                      <b dangerouslySetInnerHTML={{ __html: r.gradPolo.title }} />
                      {r.gradPolo.caption}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="cv-cta-row">
          <a
            className="btn"
            href={path.cv.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cv_downloaded", { location: "path_section" })}
          >
            {path.cv.label} <span className="arr">↓</span>
          </a>
        </div>
      </div>

      {/* Stage curtain easter egg — fixed overlay */}
      <div className="curtain" ref={curtainRef}>
        <div className="pl" />
        <div className="pr" />
        <div className="msg" ref={msgRef}>
          SCENE<br />CHANGE.
        </div>
      </div>
    </section>
  );
}
