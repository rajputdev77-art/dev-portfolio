---
title: "Job Application Agent"
slug: "job-application-agent"
outcome: "Fully automated job pipeline — 5 scrapers, local Qwen 7B scoring, Playwright auto-submit, $0/mo on a local Ollama stack"
role: "Self-initiated builder"
timeline: "2026"
order: 6
kind: "log"
tag: "n8n · Ollama · Qwen 2.5 7B · Playwright · Google Sheets"
---

## Context

Job hunting at scale is mostly logistics. Read 200 listings, filter for fit, tailor a CV, write a cover letter, fill the form, log it somewhere, follow up if no reply. Multiply by every platform — LinkedIn, Naukri, Indeed, Welcome to the Jungle, Tier-1 company career pages — and the math stops working. I wanted a pipeline that did all of it, ran every few hours, never missed a job, and cost zero.

## The Problem

Most "AI job search" tools are thin wrappers around an LLM with no actual scraping, no scoring discipline, no auto-submit, no tracking. The hard parts — surviving anti-bot defenses, scoring with intent (not just keyword match), tailoring per-job, and not getting flagged — are exactly where the value lives. I wanted to build that hard part.

## How I Approached It

Four-stage pipeline with hard floors at every gate:
1. **Scrape** — five concurrent scrapers, each tuned for its source.
2. **Score** — a local LLM evaluates fit against a strict profile with a hard `₹10 LPA` floor.
3. **Tailor** — only matches ≥ 70 get a CV variant + a 250-word cover letter.
4. **Submit** — three executor agents handle different submission patterns. Everything logged.

The architecture is deliberately offline-first: no cloud LLM bills, no API throttling, no surprise charges.

## What I Did

- **Five scrapers (every 4–6 hours):** LinkedIn, Naukri, Indeed, Welcome to the Jungle, and Tier-1 company career pages. Each runs in its own Playwright + Chromium context with its own selectors, rotation, and dedup logic.
- **Local LLM scoring with Ollama + Qwen 2.5 7B Instruct:** Every scraped job gets scored 0–100 against my profile. The prompt includes hard requirements (₹10 LPA salary floor, location constraints, exclusions). Originally used Anthropic Claude API, migrated to local Ollama for $0/month and full privacy.
- **Match gate at 70:** Anything below disappears. Anything at or above triggers the tailoring stage.
- **Two CV variants:** **A — Operations** and **B — AI**. The scoring LLM also picks which variant fits the role better.
- **250-word cover letter generator:** Each one references three concrete details from the listing — no generic templates.
- **Three executor agents:**
  - **India** — auto-submits via Playwright on standard ATS systems
  - **Abroad** — same pattern, with timezone-aware scheduling
  - **Tier-1 / FAANG-style** — stops short of submit, hands me a one-click confirmation page (these systems detect bots aggressively)
- **Google Sheets logging:** Every application — job, company, salary, score, CV variant used, cover letter, date, status, link — flows into a single sheet with timestamps.
- **Local HTML dashboard:** Counts applications by source, scoring distributions, response rates. Refreshes from the sheet via Google Sheets API.
- **11 n8n workflows orchestrating everything:** Triggers, retry queues, dedup, sheet writes, follow-up watchers. The whole flow survives crashes — n8n + service account auth survives restarts cleanly.

## The Outcome

A pipeline that runs on a local machine with zero monthly cost. Folder structure, all 11 n8n workflows, three Playwright scripts, both CV variants, the Ollama + Qwen install, and the dashboard are done and pushed to GitHub at [github.com/rajputdev77-art/job-application-agent](https://github.com/rajputdev77-art/job-application-agent). Notion mirror for documentation.

Pending: enabling autostart on the n8n service, finishing the 15-day no-reply follow-up watcher, and wiring the Google Sheet service-account credentials end-to-end.

## What I Learned

- **The migration from Claude API to local Ollama was the single biggest unlock.** Free, private, faster on most scoring tasks. The pipeline became sustainable overnight.
- **Selector brittleness is the real cost of scraping.** Half the engineering work is keeping selectors alive across UI updates. Playwright's auto-wait + retry logic absorbed most of it.
- **Three executor agents is not over-engineering.** ATS submission patterns vary enormously between regions and company tiers. A single agent would have failed at ~30% of submissions.
- **The hardest part of "AI job search" is not the AI.** It's the integrations, the rate limits, the sheet writes, the dedup, the failure recovery. The intelligence is a one-line API call. Everything else is the system.
