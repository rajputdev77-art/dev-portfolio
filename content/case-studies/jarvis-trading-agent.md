---
title: "JARVIS Trading Agent"
slug: "jarvis-trading-agent"
outcome: "Two autonomous bots, hourly LLM calls, self-healing infra. $0/mo."
role: "Self-initiated builder"
timeline: "2026 — built in 2 days"
order: 3
kind: "log"
tag: "Gemini · Crypto + US equities"
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
- **Dashboard:** Next.js 14 + Tailwind, dark glass-morphism. Polls `/combined/account`, `/positions`, `/history`, `/decisions` every 10s. Three-tab market toggle (Combined / Crypto / Stocks), color-coded long/short pills, animated live-pulse indicator.

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

## Update: Migrated to Oracle Cloud + Local Ollama — laptop now optional

May 2026 — moved both bots from my laptop to an Oracle Cloud Always Free ARM A1 VM (4 cores, 24 GB RAM, Mumbai). Provisioning the VM took **145 retry attempts** (Oracle's free ARM capacity is famously scarce) — solved by writing an OCI CLI auto-retry script that polled the launch API every 60 seconds until capacity opened up. The script logged every attempt; success came at 02:00 AM IST.

Two architectural wins from the migration:

- **Switched both bots from Gemini cloud to self-hosted Ollama.** With 24 GB RAM I can run `qwen2.5-coder:14b-instruct-q4_K_M` locally on the ARM cores — designed for structured JSON output, perfect for trading decisions. No more 429 rate-limit errors from the 20-req/day Gemini free tier. Code change was minimal: a new `OllamaDecisionMaker` class mirroring the Gemini one, plus a `make_decision_maker()` factory in `src/agent/__init__.py` that picks based on `LLM_PROVIDER` env var. Laptop still defaults to Gemini for testing; cloud uses Ollama.
- **Killed the Cloudflare tunnel + keeper-script complexity.** Direct HTTPS via DuckDNS subdomain + Let's Encrypt cert on nginx. The dashboard now points at `https://rajputdev77.duckdns.org/trading/crypto/` — a stable URL that never rotates. `tunnel-keeper.ps1` is retired, ~200 lines of PowerShell deleted.

Plus:
- **GitHub Actions auto-deploy:** every push to `feat/scanner-alpaca` SSHs into the VM, `git pull`, `pip install`, restarts `jarvis-crypto` + `jarvis-stocks` via systemd.
- **systemd everywhere:** `jarvis-crypto.service` and `jarvis-stocks.service` survive crashes, reboots, OOMs. No more Windows Task Scheduler.
- **Live data feed unchanged:** trading bots still push snapshots to the `live-data` GitHub repo via SSH deploy key. Vercel dashboard reads the same raw JSON URL it always did.

Live dashboard URL still the same: [dashboard-sigma-nine-63.vercel.app](https://dashboard-sigma-nine-63.vercel.app). Laptop can go to sleep now.

## What I Learned

- **Secret hygiene is not a one-time check.** Mid-build, an API key got committed to a public hosting doc. Caught it, made the repo private, rewrote git history with `git filter-branch`, force-pushed, rotated the key, verified the old SHA returned 404 from `raw.githubusercontent.com`, and saved a permanent "never hardcode secrets" note to memory. The lesson: complacency after a fix is when the next leak happens. Every commit needs a regex scan.
- **The LLM matters less than I thought, until quota does.** Gemini 2.5 Flash Lite was structurally correct ~99% of the time at 1-hour cycles. The actual production blocker was its 20-req/day free tier — easily hit by a stocks bot with 10 symbols. Self-hosted Qwen 2.5 Coder 14B on Oracle's ARM cores solves it permanently. Slower per call (~2-3 tok/s on ARM CPU), but the trading cycle is 4 hours — speed is irrelevant.
- **Class boundaries beat config flags for safety-critical isolation.** A flag is fragile; an import boundary is structural. The only way to send a real order is to write entirely new code that imports the live `Exchange` class — which would be obvious in any review.
- **Free infrastructure can be production-grade if you design for ephemerality.** The Vercel URL never breaks because the keeper script made the tunnel rotation invisible; now Oracle Cloud + DuckDNS makes the URL truly stable.
- **Oracle Always Free ARM is the best free-tier deal in cloud computing — once you actually get capacity.** 4 vCPU / 24 GB RAM forever for ₹0/month is unmatched anywhere. The price is the capacity lottery. Build a retry script and you have permanent infrastructure that costs nothing.
