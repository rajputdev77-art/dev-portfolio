---
title: "Jarvis — LLM-in-the-Loop Paper-Trading Agent"
slug: "jarvis-trading-agent"
outcome: "Two autonomous trading bots (crypto + US equities) calling Gemini every hour with self-healing infra — $0/month, zero manual intervention, public live dashboard"
role: "Self-initiated builder"
timeline: "2026 — built in 2 days"
order: 2
---

## Context

I wanted to test whether a frontier-model LLM could make economically rational trading decisions when given clean market data — without falling for hallucinations, schema drift, or the usual demo-grade fragility. I didn't want to risk real money, and I didn't want to babysit the system. The constraint was: paper-only by construction, two markets on one engine, zero-touch operation, and a public dashboard readable from any phone.

**Live dashboard:** [dashboard-sigma-nine-63.vercel.app](https://dashboard-sigma-nine-63.vercel.app)
**Repos:** [hyperliquid-agent-jarvis](https://github.com/rajputdev77-art/hyperliquid-agent-jarvis) · [jarvis-dashboard](https://github.com/rajputdev77-art/jarvis-dashboard)

## The Problem

LLMs as trading agents are mostly demos. The hard parts aren't model intelligence — they're risk isolation, schema reliability, cross-process state, and 24/7 uptime on free infrastructure. I wanted a system where: paper-mode is guaranteed by class boundary (not config flag), one codebase serves two asset classes, and the dashboard URL never breaks even when the underlying tunnel rotates every restart.

## How I Approached It

I designed the system as two trading processes (crypto + stocks) with a shared `PaperBroker` core, fronted by a Vercel dashboard connected through a Cloudflare quick tunnel that's auto-rotated by a PowerShell keeper script. Every hour, each bot funnels candidate symbols through a deterministic scoring filter, calls Gemini 2.5 Flash Lite with a strict JSON schema, validates the response through a risk manager, and routes orders to a SQLite-backed paper broker. The whole stack runs on my laptop. Total infrastructure cost: $0.

## What I Did

- **Trading loop (per cycle):** Mark open positions to market → run Stage-1 funnel (rank ~200 Hyperliquid perps by `|24h return| × log10(volume) × funding × leverage cap`, take top 15) → compute EMA20/50, MACD, RSI7/14, ATR14 on 5m and 4h candles → serialize context to JSON → call Gemini for per-asset `{action, allocation_usd, tp_price, sl_price, rationale, exit_plan}` → validate against risk limits → route through PaperBroker with slippage simulation → log full reasoning for replay.
- **Paper isolation by class boundary, not config flag:** `PaperBroker` never imports the live Hyperliquid `Exchange` class. The module ends with `assert "Exchange" not in globals()`. Only the read-only `Info` client is reachable. There is no code path that can send a real order, even if every config flag is wrong.
- **Two-stage LLM funnel:** Stage 1 is deterministic scoring (cheap, exhaustive). Stage 2 is the LLM on the top 15 (expensive, selective). Cuts Gemini token cost ~13× while still letting the bot discover opportunities outside the static BTC/ETH/SOL list. Open positions are pinned to the top so live trades are never dropped mid-cycle.
- **One PaperBroker, two providers:** Instead of a separate `StockBroker`, the existing `PaperBroker` takes a `provider` argument — `HyperliquidAPI` for crypto, `AlpacaAPI` for stocks. Both expose the same interface (`get_current_price`, `get_candles`, `get_funding_rate`, `get_open_interest`, `get_meta_and_ctxs`). Fill simulator, risk manager, SQLite schema, FastAPI surface — all reused. ~200 lines of new code instead of a duplicated thousand.
- **Cross-process state via read-only SQLite:** The crypto API process serves stocks data on the dashboard by opening the stocks DB in `mode=ro` URI mode. No IPC, no message bus, no second tunnel. SQLite handles concurrent reader/writer natively. Endpoints: `/stocks/account`, `/stocks/positions`, `/combined/account`. One tunnel, one dashboard, both markets.
- **Self-healing tunnel layer (`tunnel-keeper.ps1`):** Cloudflare quick tunnels are free but rotate the URL on every restart. The keeper spawns `cloudflared`, greps the new `*.trycloudflare.com` URL from its log, calls `vercel env rm` + `vercel env add` + `vercel --prod` to update `NEXT_PUBLIC_API_URL`, and redeploys the dashboard. Health-checks every 60s; restarts on origin DNS errors. End-to-end recovery time: ~38 seconds. The user-facing Vercel URL never changes.
- **Watchdog (60s loop):** Pure PowerShell. No NSSM, no Windows services, no admin rights. Restarts dead bots, monitors processes by port. Paired with Windows Startup folder + 4 `.lnk` shortcuts so everything launches on login automatically.
- **OS-level power management:** `powercfg` to disable sleep, hibernate, and monitor timeout on AC. Unhid the lid-close action (Windows hides it in some power schemes) and set it to "do nothing." Closing the laptop while plugged in keeps the entire system running.
- **Dashboard:** Next.js 14 + Tailwind. Polls `/combined/account`, `/positions`, `/history`, `/decisions` every 10s. Three-tab market toggle (Combined / Crypto / Stocks), color-coded long/short pills, animated live-pulse indicator.
- **Dashboard redesign (Jarvis Design System):** Replaced the gradient-rainbow glass UI with a dark Bloomberg-by-way-of-Linear surface. Inter for chrome, JetBrains Mono with `tnum` enabled for every number. Hero card promotes account value to a 56 px mono number with a signed delta + percent pill. 4-up mini-KPI grid: open P&L, realized 7d with win rate, exposure with headroom against the 50% limit, drawdown vs. session peak. Inline-SVG equity chart with gradient area-fill, dashed initial-balance baseline, crosshair tooltip, 1H/1D/1W/ALL range tabs. Equity series is built from a `localStorage`-backed rolling buffer of poll snapshots so it survives reloads and accumulates real history. Positions table now includes a TP↔SL ladder visualizer per row. All decorative emoji KPIs removed; color is reserved for green/red P&L and amber risk.
- **Click-to-fix API connection:** Old failure mode — any reload after a tunnel rotation left the dashboard stuck on `failed to fetch` until I re-deployed. New resolver picks the base URL in priority order: `localStorage` override > `NEXT_PUBLIC_API_URL` > tunnel default (`jarvis-trading.loca.lt`) when on a Vercel-style dashboard-only host > same-origin > `localhost:8000`. Error banner now ships with **retry** and **fix it** buttons; the dialog probes `/health` on candidate URLs, saves the first one that responds, and the choice persists across reloads. Footer URL is also a clickable shortcut to the same dialog. Every fetch carries a `bypass-tunnel-reminder` header so the loca.lt interstitial never appears, and an `AbortController` is wired into every poll so route changes can't double-fire requests.

## The Outcome

A live, autonomous, two-market paper-trading system running on a home laptop with a publicly accessible dashboard at [dashboard-sigma-nine-63.vercel.app](https://dashboard-sigma-nine-63.vercel.app). The system survives sleep, lid-close, reboots, and tunnel rotations without manual intervention. Built in 2 days end-to-end.

**Numbers:**
- ~200 Hyperliquid perps scored every cycle, top 15 sent to Gemini
- 10 default stock symbols (large-cap blue chips, IEX feed via Alpaca free tier)
- $2,000 total paper capital ($1k crypto + $1k stocks)
- 3,600s trading cycle interval, 10s dashboard refresh, 60s watchdog poll
- ~38s tunnel-rotation recovery time
- $0/month infrastructure cost
- 0 manual interventions per week (target, verified over multi-day uptime)

## What I Learned

- **Secret hygiene is not a one-time check.** Mid-build, an API key got committed to a public hosting doc. Caught it, made the repo private, rewrote git history with `git filter-branch`, force-pushed, rotated the key, verified the old SHA returned 404 from `raw.githubusercontent.com`, and saved a permanent "never hardcode secrets" note to memory. The lesson: complacency after a fix is when the next leak happens. Every commit needs a regex scan.
- **Hosting is overrated for personal projects.** I tried Oracle Cloud (double-charged, VM errored), Render and Railway (require credit cards), Fly.io (finicky deploy). The cheapest path that actually worked: laptop + Cloudflare quick tunnel + Vercel for the static dashboard. $0 cost, $0 maintenance.
- **The LLM matters less than I thought.** Gemini 2.5 Flash Lite is the free-tier weak model. It still produces structurally valid JSON 99% of the time, follows the schema, and writes coherent rationales. For a paper system at 1-hour cycles, the difference between Flash Lite and Claude Sonnet 4.5 is mostly cosmetic. The bottleneck is risk management and execution, not model intelligence.
- **Class boundaries beat config flags for safety-critical isolation.** A flag is fragile; an import boundary is structural. The only way to send a real order is to write entirely new code that imports the live `Exchange` class — which would be obvious in any review.
- **Free infrastructure can be production-grade if you design for ephemerality.** The Vercel URL never breaks because the keeper script makes the tunnel rotation invisible. Self-healing infra is worth more than expensive infra that doesn't.
- **If a class of failure keeps coming back, fix the recovery loop, not the failure.** The `failed to fetch` error after a reload kept showing up because each fix was upstream — re-deploy, restart the tunnel, re-set the env var. The actual fix was making recovery a UI affordance: an in-page button that auto-detects the working URL and saves it to `localStorage`, so the same problem can never escalate to a "come fix this" task again. Frequent operator interrupts are a signal that the system is missing a self-service action, not that the underlying bug needs another patch.
