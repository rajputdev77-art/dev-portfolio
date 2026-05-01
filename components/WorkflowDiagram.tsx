"use client";
import { useEffect, useMemo, useState } from "react";

const NODES = [
  { id: "trigger", label: "Webhook", sub: "lead.inbound", x: 60, y: 130, kind: "in" },
  { id: "enrich", label: "Enrich", sub: "Clearbit · Apollo", x: 230, y: 70, kind: "step" },
  { id: "score", label: "Score", sub: "Claude · rules", x: 230, y: 200, kind: "ai" },
  { id: "branch", label: "Route", sub: "if score ≥ 78", x: 410, y: 130, kind: "logic" },
  { id: "crm", label: "CRM sync", sub: "HubSpot · upsert", x: 590, y: 70, kind: "step" },
  { id: "slack", label: "Notify", sub: "Slack · #sales", x: 590, y: 200, kind: "out" },
  { id: "log", label: "Log", sub: "Postgres · audit", x: 760, y: 130, kind: "step" },
];

const EDGES: [string, string][] = [
  ["trigger", "enrich"],
  ["trigger", "score"],
  ["enrich", "branch"],
  ["score", "branch"],
  ["branch", "crm"],
  ["branch", "slack"],
  ["crm", "log"],
  ["slack", "log"],
];

export default function WorkflowDiagram({ motion }: { motion: number }) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (motion < 10) return;
    const interval = Math.max(420, 1200 - motion * 7);
    const id = setInterval(() => setPulse((p) => (p + 1) % EDGES.length), interval);
    return () => clearInterval(id);
  }, [motion]);

  const nodeById = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    []
  );

  function edgePath(a: string, b: string) {
    const A = nodeById[a],
      B = nodeById[b];
    const dx = (B.x - A.x) * 0.5;
    return `M ${A.x + 80} ${A.y + 22} C ${A.x + 80 + dx} ${A.y + 22}, ${B.x - dx} ${
      B.y + 22
    }, ${B.x} ${B.y + 22}`;
  }

  return (
    <div className="oc-diagram">
      <div className="oc-diagram-meta">
        <span className="oc-diagram-tag">FLOW · 014</span>
        <span>lead-qualifier-v3.json</span>
        <span
          className="oc-diagram-stat"
          style={{ color: "var(--accent)" }}
        >
          <i style={{ background: "var(--accent)" }} /> live · 12,431 runs · p95 1.4s
        </span>
      </div>
      <svg
        viewBox="0 0 880 280"
        className="oc-diagram-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="oc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.06"
              strokeWidth="0.5"
            />
          </pattern>
          <filter id="oc-glow">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <rect width="880" height="280" fill="url(#oc-grid)" />

        {EDGES.map(([a, b], i) => {
          const path = edgePath(a, b);
          const isPulse = i === pulse;
          return (
            <g key={`${a}-${b}`}>
              <path d={path} className="oc-edge" />
              {motion >= 10 && (
                <path
                  d={path}
                  className={`oc-edge-pulse ${isPulse ? "is-firing" : ""}`}
                  style={{ stroke: "var(--accent)" }}
                />
              )}
              {isPulse && motion >= 10 && (
                <circle r="3" fill="var(--accent)" className="oc-edge-bead">
                  <animateMotion dur="0.9s" repeatCount="1" path={path} />
                </circle>
              )}
            </g>
          );
        })}

        {NODES.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x}, ${n.y})`}
            className={`oc-node oc-node-${n.kind}`}
          >
            <rect width="80" height="44" rx="3" />
            <text x="8" y="17" className="oc-node-label">
              {n.label}
            </text>
            <text x="8" y="32" className="oc-node-sub">
              {n.sub}
            </text>
            <circle cx="80" cy="22" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="0" cy="22" r="2.5" fill="currentColor" opacity="0.4" />
          </g>
        ))}
      </svg>
    </div>
  );
}
