import CaseShell from "./CaseShell";

const DEFAULT_METRICS = [
  { num: "−35", unit: "%", label: "resolution time" },
  { num: "+20", unit: "%", label: "CSAT" },
  { num: "300", unit: "u", label: "portfolio" },
];

export default function CaseMetric(props: {
  n: string;
  title: string;
  tag: string;
  outcome: string;
  href: string;
  metrics?: { num: string; unit: string; label: string }[];
}) {
  const metrics = props.metrics?.length ? props.metrics : DEFAULT_METRICS;
  return (
    <CaseShell {...props}>
      <div className="oc-case-metric">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="oc-case-metric-row">
              <span
                className="oc-case-metric-num"
                style={i === 0 ? { color: "var(--accent)" } : undefined}
              >
                {m.num}
                <i>{m.unit}</i>
              </span>
              <span className="oc-case-metric-l">{m.label}</span>
            </div>
            {i < metrics.length - 1 && <div className="oc-case-metric-rule" />}
          </div>
        ))}
      </div>
    </CaseShell>
  );
}
