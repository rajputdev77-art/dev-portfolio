"use client";
import { useEffect, useState } from "react";

const LOG_LINES = [
  { lvl: "ok", t: "+0.00s", msg: "trigger ▸ webhook  payload=lead.inbound", meta: "id=ld_8129" },
  { lvl: "ok", t: "+0.31s", msg: "enrich ▸ clearbit  domain=getsweep.io", meta: "200 OK · 412ms" },
  { lvl: "ai", t: "+0.64s", msg: "score ▸ claude     model=sonnet-4.5", meta: "score=82 · why=icp+intent" },
  { lvl: "ok", t: "+1.02s", msg: "route ▸ branch     score≥78 → high-intent", meta: "fork→2" },
  { lvl: "ok", t: "+1.18s", msg: "crm ▸ hubspot      action=upsert", meta: "201 · contact=c_29a4" },
  { lvl: "warn", t: "+1.31s", msg: "slack ▸ retry      attempt=2/3", meta: "rate-limit · backoff=400" },
  { lvl: "ok", t: "+1.74s", msg: "slack ▸ #sales     msg=‘🔥 hot lead’", meta: "ts=174819… · 200" },
  { lvl: "ok", t: "+1.86s", msg: "log ▸ postgres     table=audit.runs", meta: "rows=1 · duration=1.86s" },
  { lvl: "done", t: "+1.86s", msg: "FLOW COMPLETE       lead-qualifier-v3", meta: "✓ p95=1.4s" },
];

export default function TelemetryLog({ motion }: { motion: number }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (motion < 10) {
      setTick(LOG_LINES.length);
      return;
    }
    setTick(0);
    const speed = Math.max(180, 900 - motion * 7);
    const id = setInterval(() => setTick((t) => (t < LOG_LINES.length ? t + 1 : t)), speed);
    const restart = setInterval(() => setTick(0), speed * (LOG_LINES.length + 4));
    return () => {
      clearInterval(id);
      clearInterval(restart);
    };
  }, [motion]);

  return (
    <div className="oc-log">
      <div className="oc-log-head">
        <div className="oc-log-tabs">
          <span className="is-active">runs.live</span>
          <span>flows</span>
          <span>nodes</span>
        </div>
        <div className="oc-log-meta" style={{ color: "var(--accent)" }}>
          <span>
            <i style={{ background: "var(--accent)" }} /> streaming
          </span>
          <span style={{ color: "var(--ink-3)" }}>·</span>
          <span style={{ color: "var(--ink-3)" }}>
            tail -f /var/log/agents/lead-qualifier-v3.log
          </span>
        </div>
      </div>
      <div className="oc-log-body">
        {LOG_LINES.slice(0, tick).map((l, i) => (
          <div key={i} className={`oc-log-line oc-lvl-${l.lvl}`}>
            <span className="oc-log-t">{l.t}</span>
            <span className="oc-log-lvl">{l.lvl.toUpperCase().padEnd(4, " ")}</span>
            <span className="oc-log-msg">{l.msg}</span>
            <span className="oc-log-meta-r">{l.meta}</span>
          </div>
        ))}
        {tick < LOG_LINES.length && motion >= 10 && (
          <div className="oc-log-cursor" style={{ background: "var(--accent)" }} />
        )}
      </div>
    </div>
  );
}
