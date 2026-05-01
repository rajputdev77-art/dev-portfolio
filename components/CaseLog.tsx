"use client";
import CaseShell from "./CaseShell";

export default function CaseLog(props: {
  n: string;
  title: string;
  tag: string;
  outcome: string;
  href: string;
}) {
  const lines = [
    "[ok]   ingest ▸ google-doc       1 input",
    "[ai]   transform ▸ gpt-4         → blog · linkedin · x · reel",
    "[ok]   render ▸ descript         video.mp4",
    "[ok]   distribute ▸ buffer       14 destinations · queued",
    "[done] cycle ▸ 6m 24s            cost=$0.18",
  ];

  return (
    <CaseShell {...props}>
      <div className="oc-case-log">
        <div className="oc-case-log-bar">
          <span />
          <span />
          <span />
          <em>distribution-engine.log</em>
        </div>
        {lines.map((l, i) => (
          <div key={i} className="oc-case-log-line">
            <span style={{ color: l.includes("[done]") ? "var(--accent)" : undefined }}>
              {l}
            </span>
          </div>
        ))}
        <span
          className="oc-case-log-cursor"
          style={{ background: "var(--accent)" }}
        />
      </div>
    </CaseShell>
  );
}
