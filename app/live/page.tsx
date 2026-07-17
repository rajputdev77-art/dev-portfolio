import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import ClocksBar from "@/components/ClocksBar";

export const revalidate = 60;

export const metadata = {
  title: "LIVE — real systems, real numbers — Dev Rajput",
  description:
    "Live status of my running automations — content engine, YouTube pipeline, trading agent — fed by the machines themselves via a git-as-database status repo.",
};

const RAW = "https://raw.githubusercontent.com/rajputdev77-art/live-data/main";

/* ── feed types (only the fields we render) ─────────────────────── */
type SimFeed = {
  updated_at: string;
  totals: { blogs: number; videos: number; reels: number; shorts: number; platforms_active: number };
  streak_days: number;
  today?: { date: string; published: { platform: string; entry_ts?: string }[] };
};
type YtFeed = {
  updated_at: string;
  channel?: { subscriber_count: number; video_count: number; view_count: number };
  last_run?: {
    pipeline: string; status: string; duration_seconds: number | null;
    video_title?: string | null; video_url?: string | null;
  };
  next_run_at?: string;
  totals?: { runs_attempted: number; runs_succeeded: number; videos_published: number };
};
type TradeFeed = {
  updated_at: string;
  mode: string;
  account?: { balance_usd: number | null; pnl_usd: number | null; pnl_pct: number | null };
  open_positions?: { asset: string; size: number | null; entry: number | null }[];
};

// Feeds are machine-written; any field can be null on a partial run.
function n(v: number | null | undefined, digits = 0, sign = false): string {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  const s = v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return sign && v >= 0 ? `+${s}` : s;
}

async function feed<T>(path: string): Promise<T | null> {
  try {
    const r = await fetch(`${RAW}/${path}/latest.json`, { next: { revalidate: 60 } });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

function ago(iso?: string): string {
  if (!iso) return "—";
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.round(mins / 60);
  if (h < 48) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

function Offline({ name }: { name: string }) {
  return (
    <div className="live-panel offline">
      <div className="live-title">{name}</div>
      <p className="live-off">FEED OFFLINE — the machine hasn&apos;t pushed a status recently, or GitHub is unreachable. That&apos;s the honest answer, not a cached fake.</p>
    </div>
  );
}

export default async function LivePage() {
  const [sim, yt, trade] = await Promise.all([
    feed<SimFeed>("soul-in-motion"),
    feed<YtFeed>("youtube-pipeline"),
    feed<TradeFeed>("trading"),
  ]);

  return (
    <>
      <Topbar />
      <Nav />

      <section className="cs-hero">
        <div className="cs-meta">
          <span className="id">LIVE STATUS</span>
          <span className="st">AUTO-REFRESH 60s</span>
          <span className="id">GIT-AS-DATABASE</span>
        </div>
        <h1 className="cs-title"><span className="l">THE </span><span className="l">MACHINES, </span><span className="l">LIVE</span></h1>
        <p className="cs-deck">
          These numbers are pushed by the running systems themselves — each automation commits a status JSON
          to a public repo after every run, and this page reads it. No backend, no database, no manual updates.
          If a feed goes quiet, you&apos;ll see that too.
        </p>
      </section>

      <div className="live-grid">
        {/* ── Content engine ── */}
        {sim ? (
          <div className="live-panel">
            <div className="live-title">CONTENT ENGINE <span className="upd">updated {ago(sim.updated_at)}</span></div>
            <div className="live-stats">
              <div className="stat"><div className="l">BLOGS</div><div className="v">{sim.totals.blogs}</div></div>
              <div className="stat"><div className="l">VIDEOS</div><div className="v">{sim.totals.videos}</div></div>
              <div className="stat"><div className="l">REELS</div><div className="v">{sim.totals.reels}</div></div>
              <div className="stat"><div className="l">SHORTS</div><div className="v">{sim.totals.shorts}</div></div>
              <div className="stat"><div className="l">STREAK</div><div className="v">{sim.streak_days}d</div></div>
            </div>
            {sim.today && sim.today.published.length > 0 && (
              <div className="live-feedlist">
                <div className="fl-title">PUBLISHED TODAY ({sim.today.date})</div>
                {sim.today.published.slice(0, 10).map((p, i) => (
                  <div key={i} className="fl-ln">✓ {p.platform}{p.entry_ts ? ` · entry ${p.entry_ts}` : ""}</div>
                ))}
              </div>
            )}
            <a className="live-link" href="/case-studies/soul-in-motion">READ THE BUILD →</a>
          </div>
        ) : (
          <Offline name="CONTENT ENGINE" />
        )}

        {/* ── YouTube pipeline ── */}
        {yt ? (
          <div className="live-panel">
            <div className="live-title">YOUTUBE PIPELINE <span className="upd">updated {ago(yt.updated_at)}</span></div>
            <div className="live-stats">
              <div className="stat"><div className="l">VIDEOS</div><div className="v">{yt.totals?.videos_published ?? yt.channel?.video_count ?? "—"}</div></div>
              <div className="stat"><div className="l">RUNS OK</div><div className="v">{yt.totals ? `${yt.totals.runs_succeeded}/${yt.totals.runs_attempted}` : "—"}</div></div>
              <div className="stat"><div className="l">VIEWS</div><div className="v">{yt.channel?.view_count ?? "—"}</div></div>
              <div className="stat"><div className="l">LAST RUN</div><div className="v small">{yt.last_run?.status?.toUpperCase() ?? "—"}</div></div>
            </div>
            {yt.last_run && (
              <div className="live-feedlist">
                <div className="fl-title">LAST RUN · {yt.last_run.pipeline} · {n(yt.last_run.duration_seconds)}s</div>
                <div className="fl-ln">
                  {yt.last_run.status === "success" ? "✓" : "✗"}{" "}
                  {yt.last_run.video_title || "(no title recorded)"}
                </div>
                {yt.next_run_at && <div className="fl-ln dim">next run {ago(yt.next_run_at).includes("ago") ? "due" : ""} {new Date(yt.next_run_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })} IST</div>}
              </div>
            )}
            <a className="live-link" href="/case-studies/youtube-automation-system">READ THE BUILD →</a>
          </div>
        ) : (
          <Offline name="YOUTUBE PIPELINE" />
        )}

        {/* ── Trading agent ── */}
        {trade ? (
          <div className="live-panel">
            <div className="live-title">
              TRADING AGENT <span className="mode">{trade.mode?.toUpperCase()} — NO REAL MONEY</span>
              <span className="upd">updated {ago(trade.updated_at)}</span>
            </div>
            <div className="live-stats">
              <div className="stat"><div className="l">PAPER BAL</div><div className="v">${n(trade.account?.balance_usd)}</div></div>
              <div className="stat"><div className="l">P&L</div><div className="v">{trade.account?.pnl_pct != null ? `${n(trade.account.pnl_pct, 2, true)}%` : "—"}</div></div>
              <div className="stat"><div className="l">OPEN POS</div><div className="v">{trade.open_positions?.length ?? 0}</div></div>
            </div>
            {trade.open_positions && trade.open_positions.length > 0 && (
              <div className="live-feedlist">
                <div className="fl-title">OPEN POSITIONS</div>
                {trade.open_positions.slice(0, 8).map((p, i) => (
                  <div key={i} className="fl-ln">
                    {(p.size ?? 0) >= 0 ? "▲ LONG" : "▼ SHORT"} {p.asset} @ {n(p.entry, 2)}
                  </div>
                ))}
              </div>
            )}
            <a className="live-link" href="/case-studies/jarvis-trading-agent">READ THE BUILD →</a>
          </div>
        ) : (
          <Offline name="TRADING AGENT" />
        )}
      </div>

      <div className="live-foot">
        HOW THIS WORKS: each system runs <b>publish_status.py</b> after every cycle → commits latest.json to the
        public <b>live-data</b> repo → this page fetches it raw and re-renders every 60s. Git as a database:
        no servers, no cloud DB, ₹0/month.
      </div>

      <div className="csb-back">
        <a className="home" href="/#work">← BACK TO THE WORK</a>
      </div>

      <ClocksBar />
    </>
  );
}
