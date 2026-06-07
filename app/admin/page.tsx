import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface AdminEvent {
  name: string;
  props: Record<string, unknown>;
  ts: number;
  path: string;
  ref: string;
  country?: string;
  city?: string;
  region?: string;
  sessionId?: string;
  ua?: string;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  return new Date(Date.now() - 86400000).toISOString().slice(0, 10);
}

async function safeKv() {
  if (!process.env.KV_REST_API_URL && !process.env.KV_URL && !process.env.REDIS_URL) {
    return null;
  }
  return kv;
}

async function loadData() {
  const k = await safeKv();
  if (!k) return null;
  try {
    const today = todayKey();
    const yest = yesterdayKey();
    const [
      todayEvents,
      yestEvents,
      todaySessions,
      yestSessions,
      alerts,
    ] = await Promise.all([
      k.lrange<string>(`events:${today}`, 0, 199),
      k.lrange<string>(`events:${yest}`, 0, 199),
      k.scard(`sessions:${today}`),
      k.scard(`sessions:${yest}`),
      k.lrange<string>("alerts", 0, 19),
    ]);

    const parse = (arr: string[]): AdminEvent[] =>
      arr
        .map((s) => {
          try {
            return JSON.parse(s) as AdminEvent;
          } catch {
            return null;
          }
        })
        .filter(Boolean) as AdminEvent[];

    return {
      today: parse(todayEvents),
      yesterday: parse(yestEvents),
      todaySessions: Number(todaySessions || 0),
      yestSessions: Number(yestSessions || 0),
      alerts: parse(alerts),
    };
  } catch (err) {
    console.error("admin loadData err", err);
    return null;
  }
}

function bucket<T>(items: T[], key: (t: T) => string) {
  const out = new Map<string, number>();
  for (const it of items) {
    const k = key(it);
    if (!k) continue;
    out.set(k, (out.get(k) || 0) + 1);
  }
  return Array.from(out.entries()).sort((a, b) => b[1] - a[1]);
}

function fmtAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return s + "s ago";
  const m = Math.floor(s / 60);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
}

export default async function AdminPage() {
  const data = await loadData();

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <header className="ticker">
        <div className="marquee">
          <span className="x r">// ADMIN //</span>
          <span className="x">DEV RAJPUT · CONTROL ROOM</span>
          <span className="x r">● LIVE FEED</span>
          <span className="x">{new Date().toLocaleString()}</span>
          <span className="x r">// ADMIN //</span>
          <span className="x">DEV RAJPUT · CONTROL ROOM</span>
        </div>
      </header>

      <div className="csb-back">
        <a className="home" href="/">← BACK TO SITE</a>
        <div className="crumbs">
          // <b>CONTROL · ROOM · ADMIN</b>
        </div>
      </div>

      <section className="cs-hero">
        <div className="cs-meta">
          <span className="id">SESSION <b>{todayKey()}</b></span>
          <span className="st">LIVE</span>
        </div>
        <h1 className="cs-title">
          <span className="l">CONTROL</span>
          <span className="l">ROOM.</span>
        </h1>
        <p className="cs-deck">
          EVERYTHING THAT HAPPENED ON THE SITE — <em>HAND-LOGGED</em>, NO COOKIES, NO SHADY ADS.
        </p>
      </section>

      {!data && (
        <div className="sbody">
          <h2>SET UP THE EVENT STORE</h2>
          <p>
            Your custom event log isn&apos;t connected yet. Two endpoints already work
            without it (Vercel Analytics + Microsoft Clarity), but the live ticker, recent
            sessions, and Telegram alerts need a tiny key-value store.
          </p>
          <p>
            <strong>One-click setup:</strong> open the Vercel dashboard →{" "}
            <a href="https://vercel.com/devs-projects-64df4cc7/dev-portfolio/stores" target="_blank" rel="noreferrer">
              Storage tab
            </a>{" "}
            → <b>Create Database</b> → pick <b>KV (Redis)</b> → name it{" "}
            <code>portfolio-events</code> → connect to <code>dev-portfolio</code>. Vercel
            wires the env vars for you, redeploy, and this page lights up.
          </p>
          <p>
            In the meantime, you can use the live dashboards on{" "}
            <a href="https://vercel.com/devs-projects-64df4cc7/dev-portfolio/analytics" target="_blank" rel="noreferrer">
              Vercel Analytics
            </a>{" "}
            and{" "}
            <a href="https://clarity.microsoft.com/projects/view/x39avisgnr/dashboard" target="_blank" rel="noreferrer">
              Microsoft Clarity
            </a>
            .
          </p>
        </div>
      )}

      {data && (
        <>
          <div className="cs-slabs">
            <div className="cs-slab">
              <div className="l">Visitors today</div>
              <div className="v">{data.todaySessions}</div>
              <div className="s">unique sessions</div>
            </div>
            <div className="cs-slab">
              <div className="l">Visitors yesterday</div>
              <div className="v">{data.yestSessions}</div>
              <div className="s">unique sessions</div>
            </div>
            <div className="cs-slab">
              <div className="l">Events today</div>
              <div className="v">{data.today.length}</div>
              <div className="s">tracked actions</div>
            </div>
            <div className="cs-slab">
              <div className="l">Alerts</div>
              <div className="v">{data.alerts.length}</div>
              <div className="s">connect hits + cv dl</div>
            </div>
          </div>

          {/* Top sections viewed */}
          <div className="sline">
            <div className="lhs">
              <span className="n">01</span>
              <span className="t">TOP SECTIONS</span>
            </div>
            <span className="r">// SECTION_VIEWED</span>
          </div>
          <div className="sbody">
            <div className="quicks">
              {bucket(
                data.today.filter((e) => e.name === "section_viewed"),
                (e) => String((e.props as any)?.section || "")
              )
                .slice(0, 6)
                .map(([sec, count]) => (
                  <div key={sec}>
                    <em>{count}</em>
                    {sec.toUpperCase()}
                  </div>
                ))}
            </div>
          </div>

          {/* Top countries */}
          <div className="sline">
            <div className="lhs">
              <span className="n">02</span>
              <span className="t">WHERE FROM</span>
            </div>
            <span className="r">// COUNTRY · CITY</span>
          </div>
          <div className="sbody">
            <div className="quicks">
              {bucket(data.today, (e) =>
                [e.city, e.country].filter(Boolean).join(", ")
              )
                .slice(0, 6)
                .map(([loc, count]) => (
                  <div key={loc}>
                    <em>{count}</em>
                    {loc || "UNKNOWN"}
                  </div>
                ))}
            </div>
          </div>

          {/* High-signal alerts */}
          <div className="sline">
            <div className="lhs">
              <span className="n">03</span>
              <span className="t">RECENT ALERTS</span>
            </div>
            <span className="r">// CONNECT · CV · INQUIRY</span>
          </div>
          <div className="sbody">
            {data.alerts.length === 0 && (
              <p>
                No one has hit the Connect section or downloaded the CV yet today. When
                they do, it shows up here (and pings Telegram if configured).
              </p>
            )}
            <div className="vault-list">
              {data.alerts.slice(0, 10).map((e, i) => (
                <article key={i} className="vc pin">
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h4>
                      {e.name === "cv_downloaded"
                        ? "CV DOWNLOADED"
                        : e.name === "connect_card_clicked"
                        ? `CONNECT · ${String((e.props as any)?.label || "").toUpperCase()}`
                        : "REACHED CONNECT SECTION"}
                    </h4>
                    <p>
                      {[e.city, e.region, e.country].filter(Boolean).join(", ") ||
                        "Unknown location"}{" "}
                      · {e.ref || "direct"}
                    </p>
                  </div>
                  <div className="meta">
                    <b>{fmtAgo(e.ts)}</b>
                    {e.sessionId}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Last 50 raw events */}
          <div className="sline">
            <div className="lhs">
              <span className="n">04</span>
              <span className="t">LIVE FEED</span>
            </div>
            <span className="r">// LAST 50 EVENTS</span>
          </div>
          <div className="sbody">
            <div
              style={{
                background: "#000",
                color: "#f5d000",
                padding: "16px 20px",
                fontFamily: "var(--f-mono)",
                fontSize: 12,
                lineHeight: 1.65,
                border: "4px solid #000",
                maxHeight: 480,
                overflow: "auto",
              }}
            >
              {data.today.slice(0, 50).map((e, i) => (
                <div key={i}>
                  <span style={{ color: "#ff2e2e" }}>[{fmtAgo(e.ts)}]</span>{" "}
                  <span style={{ color: "#fffef5" }}>{e.name}</span>{" "}
                  <span style={{ opacity: 0.7 }}>
                    {JSON.stringify(e.props || {})}
                  </span>{" "}
                  <span style={{ opacity: 0.5 }}>
                    {[e.city, e.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              ))}
              {data.today.length === 0 && (
                <div style={{ opacity: 0.6 }}>
                  No events today yet. They&apos;ll stream in here as visitors interact
                  with the site.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Deep links */}
      <div className="sline">
        <div className="lhs">
          <span className="n">05</span>
          <span className="t">DEEP LINKS</span>
        </div>
        <span className="r">// THE OTHER DASHBOARDS</span>
      </div>
      <div className="sbody">
        <div className="connect-grid" style={{ maxWidth: 1100 }}>
          <a
            href="https://vercel.com/devs-projects-64df4cc7/dev-portfolio/analytics"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <b>VERCEL ANALYTICS</b>PAGE VIEWS · REFERRERS · GEO
            </span>
            <span className="arr">↗</span>
          </a>
          <a
            href="https://vercel.com/devs-projects-64df4cc7/dev-portfolio/speed-insights"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <b>SPEED INSIGHTS</b>WEB VITALS · LCP · CLS
            </span>
            <span className="arr">↗</span>
          </a>
          <a
            href="https://clarity.microsoft.com/projects/view/x39avisgnr/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <b>CLARITY DASHBOARD</b>SESSION REPLAYS · HEATMAPS
            </span>
            <span className="arr">↗</span>
          </a>
          <a
            href="https://clarity.microsoft.com/projects/view/x39avisgnr/recordings"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <b>CLARITY RECORDINGS</b>WATCH EVERY VISIT
            </span>
            <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
