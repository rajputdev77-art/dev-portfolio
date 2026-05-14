// Live status panel for case studies. Pulls JSON from the public live-data repo.
// Server component → no client-side state, cached for 60s.

const LIVE_DATA_BASE = "https://raw.githubusercontent.com/rajputdev77-art/live-data/main";

type Source = "soul-in-motion" | "youtube-pipeline" | "trading";

function fmtTimeAgo(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return `${Math.round(diff)}s ago`;
    if (diff < 3600) return `${Math.round(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)} h ago`;
    return `${Math.round(diff / 86400)} d ago`;
  } catch { return iso; }
}

async function fetchJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${LIVE_DATA_BASE}/${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch { return null; }
}

type AnyObj = Record<string, unknown>;
function obj(v: unknown): AnyObj { return (v && typeof v === "object" ? (v as AnyObj) : {}); }
function num(v: unknown): number | null { return typeof v === "number" ? v : null; }
function str(v: unknown): string | null { return typeof v === "string" ? v : null; }

export default async function LiveStats({
  source,
  dashboardUrl,
}: {
  source: Source;
  dashboardUrl?: string;
}) {
  const data = await fetchJson(`${source}/latest.json`);
  if (!data) return null;
  const isSeed = data._seed === true;
  const updatedAt = str(data.updated_at);

  let cells: { label: string; value: string }[] = [];
  let title = "Live status";

  if (source === "soul-in-motion") {
    title = "Soul in Motion — live counters";
    const t = obj(data.totals);
    cells = [
      { label: "blogs", value: String(num(t.blogs) ?? 0) },
      { label: "videos", value: String(num(t.videos) ?? 0) },
      { label: "reels", value: String(num(t.reels) ?? 0) },
      { label: "shorts", value: String(num(t.shorts) ?? 0) },
    ];
  } else if (source === "youtube-pipeline") {
    title = "AI News Daily — live status";
    const t = obj(data.totals);
    const ch = obj(data.channel);
    const attempted = num(t.runs_attempted) ?? 0;
    const succeeded = num(t.runs_succeeded) ?? 0;
    const successRate = attempted > 0 ? `${Math.round((succeeded / attempted) * 100)}%` : "—";
    const views = num(ch.view_count);
    cells = [
      { label: "videos published", value: String(num(t.videos_published) ?? 0) },
      { label: "success rate", value: successRate },
      { label: "runs", value: String(attempted) },
      { label: "channel views", value: views !== null ? String(views) : "—" },
    ];
  } else if (source === "trading") {
    title = "Hyperliquid Jarvis — live snapshot";
    const acc = obj(data.account);
    const pnlPct = num(acc.pnl_pct);
    const pnlStr = pnlPct === null ? "—" : `${pnlPct > 0 ? "+" : ""}${pnlPct.toFixed(2)}%`;
    const totalValue = num(acc.total_value_usd);
    const positions = Array.isArray(data.open_positions) ? data.open_positions : [];
    cells = [
      { label: "account", value: totalValue !== null ? `$${totalValue.toFixed(2)}` : "—" },
      { label: "PnL", value: pnlStr },
      { label: "open positions", value: String(positions.length) },
      { label: "mode", value: str(data.mode) ?? "paper" },
    ];
  }

  return (
    <aside style={{
      margin: "32px 0",
      padding: "20px 24px",
      border: "1px solid var(--oc-line, rgba(0,0,0,0.1))",
      borderRadius: "8px",
      background: "var(--oc-card-bg, rgba(0,0,0,0.02))",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--oc-muted, #737373)" }}>
          {title}
        </div>
        <div style={{ fontSize: 11, color: "var(--oc-muted, #737373)", fontVariantNumeric: "tabular-nums" }}>
          {isSeed ? "awaiting first run" : `updated ${fmtTimeAgo(updatedAt)}`}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16 }}>
        {cells.map((c) => (
          <div key={c.label}>
            <div style={{ fontSize: 24, fontWeight: 600, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>
              {c.value}
            </div>
            <div style={{ fontSize: 11, color: "var(--oc-muted, #737373)", marginTop: 4, textTransform: "lowercase", letterSpacing: "0.02em" }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>
      {dashboardUrl && (
        <div style={{ marginTop: 14, fontSize: 12 }}>
          <a href={dashboardUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
            Open the live dashboard →
          </a>
        </div>
      )}
    </aside>
  );
}
