---
title: "job-agent-architecture"
slug: "job-agent-architecture"
date: "2026-05-05T00:00:00.000Z"
description: "Architecturefocused notes for the ../careerstrategy/jobapplicationagent. The other note has the project overview; this one is the technical pattern reference. Five independent scrapers run on schedule (46h) and produce job postings. Decoupled — adding a new scraper doesn't change…"
read: "3 min"
order: 50
source: "vault"
---

# Job Agent — Multi-Agent Architecture Notes

> Architecture-focused notes for the [[../career-strategy/job-application-agent|Job Application Agent project]]. The other note has the project overview; this one is the technical pattern reference.

## Pattern: 5-Robot Multi-Agent System

### Layer 1: Producers (Scrapers)
Five independent scrapers run on schedule (4-6h) and produce job postings. Decoupled — adding a new scraper doesn't change the rest of the pipeline.

### Layer 2: Filter (Fit Scorer)
Single AI gatekeeper. Receives all jobs, applies hard rules (salary floor) + soft scoring (skills/role/growth). Below threshold → drop. Above → forward.

**Key insight:** Filter BEFORE expensive operations (CV tailoring, browser automation). Don't waste 60s of Qwen inference on a job that's clearly below salary floor.

### Layer 3: Generators (CV Builder)
Two AI calls per accepted job:
1. CV tailor (~30s, 2000 tokens output)
2. Cover letter (~15s, 800 tokens output)

Files persisted to disk so executors can upload them.

### Layer 4: Routers (Platform-specific Executors)
Three executor agents — one per platform tier:
- **India Agent** — auto-submit OK
- **Abroad Agent** — auto-submit OK, always include cover letter
- **Tier 1 Agent** — fill but DO NOT submit (high-stakes companies, manual review)

The router pattern lets us add new platforms without touching existing executors.

### Layer 5: Sink (App Logger)
Single endpoint that writes structured rows to Google Sheets. Decoupled — every other component just POSTs to `/log-application` regardless of what happened.

## Key Architectural Decisions

### Why local Ollama instead of cloud API
- **Cost:** ₹0 vs ~₹500/month at Anthropic prices for ~50 jobs/day
- **Privacy:** CV data never leaves the laptop
- **Speed:** ~15s per scoring call is acceptable for an async pipeline
- **Quality:** Qwen 2.5 7B reliably outputs structured JSON with `format: "json"` mode

### Why Playwright instead of Selenium
- Built-in waits (no flaky `time.sleep()`)
- Modern auth state persistence (cookies survive between runs)
- Better screenshot API (full-page support)
- Bundles Chromium (no driver version mismatch)

### Why webhooks instead of direct function calls
- Each robot is independent (can be debugged/disabled in isolation)
- n8n's execution log preserves the full trace per job
- Future: can move any robot to a different machine without touching others

### Why JSON mode (not free text)
- Qwen with `format: "json"` returns valid JSON ~99% of the time
- Saves a parsing-error retry loop
- Trade-off: slightly higher token count, marginally slower

## Bottlenecks Observed

| Bottleneck | Mitigation |
|---|---|
| Ollama cold start ~30s | Keep-alive ping every 4 minutes |
| LinkedIn anti-bot detection | Saved auth cookies in `linkedin_auth.json` |
| Tier 1 ATS form variation | Comprehensive selector list (10+ aliases per field) |
| n8n single point of failure | Soul in Motion auto-starts via scheduled task |

## Patterns to Apply Elsewhere

This same 5-layer pattern can power:
- **Content automation** — scrape ideas → score → write → publish → log
- **Lead qualification** — scrape leads → score → enrich → outreach → log
- **Investment screener** — scrape filings → score → research → alert → log
- **News digest** — scrape sources → score → summarize → email → log

The shape stays. The prompts and executors change.

## Related

- [[../career-strategy/job-application-agent]] — project overview
- [[_index]] — broader AI agent learning notes
