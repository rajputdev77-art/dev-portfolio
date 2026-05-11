---
title: "Instagram Growth System"
slug: "instagram-growth-system"
outcome: "12-dimension content analyzer + 7-day content calendar generator with hook → tension → payoff scoring"
role: "Self-initiated builder"
timeline: "2026"
order: 11
kind: "diagram"
tag: "Python · Instagram Graph API · Playwright · Google Drive API"
---

## Context

I wanted to grow @rajputdev77 on Instagram deliberately — not by posting more, but by understanding what was actually working and what wasn't. The native Instagram analytics tell you what got views. They don't tell you why, what to make next, or whether your hooks land.

## The Problem

Instagram content advice is everywhere. Almost none of it is grounded in your own data. I wanted a system that looked at *my* posts, *my* engagement patterns, *my* hook structure — and gave back a concrete plan for the next 7 days, with reel scripts already written. No generic advice. No "post at 7pm."

## How I Approached It

Three layers, in order:
1. **Connect to the data** — Graph API first, Playwright scraper as fallback, cached data as a third option, demo mode as a fourth so the tool always opens with something useful.
2. **Analyze across 12 dimensions** — not one big AI summary, but 12 focused scorings that can each be improved independently.
3. **Generate concrete next steps** — not "post more reels," but five reel structures with beat-by-beat scripts, captions, hashtag sets, and a 7-day calendar.

## What I Did

- **Connection priority cascade:** Instagram Graph API → Playwright scraper (Chromium, runs headless) → cached data → demo. The tool always opens, even if the API rotates or a session expires.
- **12-dimension content analysis:**
  1. Profile health (bio, link-in-bio, highlights, post cadence)
  2. Content mix (reels vs. carousels vs. images vs. stories)
  3. Engagement quality (likes-to-saves ratio, comment depth)
  4. Hook structure (first 3 seconds of every reel)
  5. Hashtag effectiveness (per-tag reach analysis)
  6. Timing patterns (when your audience actually shows up)
  7. Video performance (watch time, drop-off curves)
  8. Storytelling structure — **hook → tension → payoff** scoring on each reel
  9. Strengths (what to do more of)
  10. Weaknesses (what to stop doing)
  11. Prioritized actions for the next 7 days
  12. Audience signal patterns (which content makes accounts follow you)
- **Reel structure generator** — Five distinct reel structures, each with a beat-by-beat script, caption, hashtag set, and recommended posting time. Output is paste-ready.
- **7-day content calendar** — Generated from the analysis. Tells you exactly what to post each day for the next week, in priority order.
- **Google Drive integration** — Pulls existing media from a designated folder for analysis. Useful if you've been creating without a single source of truth.
- **HTML dashboard** — Single-page report renderer. Drop the analysis JSON in, get a styled report out.
- **Module layout:** `api/` (Graph API client), `scraper/` (Playwright fallback), `connector.py` (priority cascade), `analyzer/` (the 12 dimensions), `generator/` (reels + calendar), `strategy_engine/` (the synthesis layer), `reports/` (HTML builder), `gdrive/` (media integration), `main.py` (CLI menu).

## The Outcome

A working analyzer that takes my account as input and gives back a complete weekly content plan, grounded in 12 dimensions of my own data. Runs locally as a CLI tool. Free to run — Instagram Graph API on the free tier, Google Drive API on the free tier, Playwright is open source.

## What I Learned

- **Hook → tension → payoff is a generalizable framework.** It applies to reels, LinkedIn posts, even cold emails. Once I started scoring my own content on it, the structural weaknesses became obvious.
- **The Graph API will rotate sessions on you.** A Playwright fallback isn't optional for any long-running analyzer.
- **"Analyze my content" is not the product. "What should I post this week" is.** Every dimension of analysis exists to feed the calendar — not the other way around.
- **The dashboard you build for yourself is usually the right MVP.** No need for a SaaS until someone else asks for it.
