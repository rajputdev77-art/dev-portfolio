"use client";
import { useEffect, useState } from "react";
import CaseShell from "./CaseShell";

export default function CaseDiagram(props: {
  n: string;
  title: string;
  tag: string;
  outcome: string;
  href: string;
}) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 5), 900);
    return () => clearInterval(id);
  }, []);

  const stops = [
    { x: 26, y: 60, label: "in" },
    { x: 110, y: 30, label: "ai" },
    { x: 110, y: 90, label: "rule" },
    { x: 195, y: 60, label: "crm" },
    { x: 280, y: 60, label: "log" },
  ];

  // Use a unique pattern id per instance to avoid SVG defs collisions
  const patternId = `oc-cgrid-${props.n.replace(/\W/g, "")}`;

  return (
    <CaseShell {...props}>
      <svg viewBox="0 0 320 130" className="oc-case-svg">
        <defs>
          <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse">
            <path
              d="M 12 0 L 0 0 0 12"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.07"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="320" height="130" fill={`url(#${patternId})`} />
        <path d="M 38 60 C 70 60, 80 30, 110 30" className="oc-edge" />
        <path d="M 38 60 C 70 60, 80 90, 110 90" className="oc-edge" />
        <path d="M 122 30 C 150 30, 175 60, 195 60" className="oc-edge" />
        <path d="M 122 90 C 150 90, 175 60, 195 60" className="oc-edge" />
        <path d="M 207 60 L 270 60" className="oc-edge" />
        {stops.map((s, i) => {
          const active = i <= pulse;
          return (
            <g key={i} transform={`translate(${s.x}, ${s.y})`}>
              <circle r="11" className="oc-case-node" />
              <circle
                r="11"
                className="oc-case-node-ring"
                style={{
                  stroke: active ? "var(--accent)" : undefined,
                  opacity: active ? 1 : 0,
                }}
              />
              <text textAnchor="middle" dy="3.5" className="oc-case-node-l">
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </CaseShell>
  );
}
