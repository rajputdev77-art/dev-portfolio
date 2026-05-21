"use client";
import { useState } from "react";
import { story } from "@/content/site";

function renderQuoteLine(line: string) {
  // <r>...</r> → red span, <s>...</s> → struck-through (red)
  const parts: React.ReactNode[] = [];
  const regex = /(<r>[^<]+<\/r>|<s>[^<]+<\/s>)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("<r>")) {
      parts.push(<span key={key++} style={{ color: "var(--red)" }}>{token.slice(3, -4)}</span>);
    } else {
      parts.push(<em key={key++} className="strike">{token.slice(3, -4)}</em>);
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts;
}

export default function Story() {
  const [treatment, setTreatment] = useState(story.photo.treatments[0]);

  return (
    <section className="b" id="story">
      <div className="secline">
        <div className="lhs">
          <span className="n">{story.act}</span>
          <span className="ttl">{story.actSub}</span>
        </div>
        <span className="rhs">{story.rhs}</span>
      </div>

      <div className="secbody" data-n={story.act}>
        <div className="story-grid">
          <div className="story-photo">
            <div className="frame" style={{ background: treatment.bg }}>
              <span className="tape">{story.photo.tape}</span>
              <img
                id="portraitImg"
                src={treatment.src}
                alt="Dev Rajput portrait"
                style={{ mixBlendMode: treatment.blend as any }}
              />
              <span className="stamp">{story.photo.stamp}</span>
            </div>
            <div className="caption">
              <b>{story.photo.captionTitle}</b>
              {story.photo.caption}
            </div>
            <div className="switch">
              {story.photo.treatments.map((t) => (
                <button
                  key={t.id}
                  className={treatment.id === t.id ? "on" : ""}
                  onClick={() => setTreatment(t)}
                  dangerouslySetInnerHTML={{ __html: t.label }}
                />
              ))}
            </div>
          </div>

          <div className="quote">
            {story.quote.lines.map((line, i) => (
              <span key={i}>
                {renderQuoteLine(line)}
                {i < story.quote.lines.length - 1 && <br />}
              </span>
            ))}
            <span className="by">— {story.quote.by}</span>
          </div>

          <div className="story-body">
            {story.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>

        <div className="athlete-strip">
          <div className="lbl">
            <span dangerouslySetInnerHTML={{ __html: story.athleteLabel }} />
            <small>{story.athleteCaption}</small>
          </div>
          <div className="polos">
            {story.polaroids.map((p, i) => (
              <div key={i} className="polo">
                <div className="pf">
                  <span className="tape">{p.tape}</span>
                  <img src={p.src} alt={p.title} />
                  <span className="stamp">{p.stamp}</span>
                </div>
                <div className="cap">
                  <b>{p.title}</b>
                  {p.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
