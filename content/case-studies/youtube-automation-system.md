---
title: "YouTube Automation System"
slug: "youtube-automation-system"
outcome: "Daily video uploads with zero manual touch."
role: "Self-initiated builder"
timeline: "2025-2026"
order: 7
kind: "metric"
tag: "Python · Edge TTS · FFmpeg · n8n"
metrics:
  - num: "6"
    unit: "v"
    label: "in 5 days"
  - num: "$0"
    unit: ""
    label: "cost / video"
  - num: "100"
    unit: "%"
    label: "automated"
---

## Context

I wanted to prove to myself that a content pipeline could run end-to-end without human intervention once it was designed correctly. Not as a get-rich scheme — as a systems-thinking exercise.

## The Problem

Daily content creation is almost entirely operational overhead. Research, scripting, rendering, uploading, thumbnails, metadata, scheduling. Every step is a potential failure point. Building a pipeline that handles all of them without breaking was the real challenge.

## How I Approached It

Mapped the full content lifecycle as a directed flow with clear inputs and outputs at each stage. Designed each stage to fail loudly (not silently) so I could fix problems upstream. Let the system run and watched where it broke.

## What I Did

Built a 6-stage sequential pipeline in Python (2,911 lines across 10 files) that runs end-to-end without human intervention:

- **Stage 1 — Trend Research:** Aggregates trending topics from three independent sources (Google Trends RSS, Reddit r/worldnews JSON API, NewsAPI). Cross-source scoring algorithm filters signal from noise — a topic appearing on two or more sources scores higher. Deduplication against a published log prevents repeats.
- **Stage 2 — AI Script Generation:** Two-pass system using Groq's LLaMA 3.3 70B (free tier, ~700 tokens/sec). Pass 1 generates a structured narrative (hook, context, three main points, conclusion, CTA). Pass 2 optimizes metadata for YouTube SEO — titles, descriptions, hashtags, thumbnail text.
- **Stage 3 — Media Asset Generation:** Microsoft Edge TTS produces broadcast-quality narration with synced subtitles. Pexels API sources 60 stock visuals (36 images + 24 video clips) per video. Pillow generates custom thumbnails (1280x720, Montserrat font, breaking-news design).
- **Stage 4 — Video Assembly:** FFmpeg handles the full production pipeline — Ken Burns zoom on static images, intro/outro sequences, audio mixing (narration + background music at 15%), and burned-in subtitles. Output: 1920x1080, H.264, ~4-5 minute video.
- **Stage 5 — YouTube Upload:** OAuth2 authentication with resumable chunked uploads (10MB), exponential backoff retry logic, and automatic metadata population.
- **Stage 6 — Cleanup:** Automated deletion of all temporary assets, pip cache purge, disk space management.
- **Scheduling:** 7 independent Windows Task Scheduler tasks (one per day) trigger the pipeline at optimal upload times for the News & Politics category. Survives restarts, sleep, and IDE closure.
- **Crash Recovery:** State persistence after each stage — if the pipeline fails at Stage 4, it resumes from Stage 4 on the next run, not from scratch.

## The Outcome

6 videos published in the first 5 days with zero manual intervention. Average pipeline runtime: 4 minutes 22 seconds per video. Total cost per video: $0.00 — the entire stack runs on free-tier APIs (Groq, Pexels, NewsAPI, Edge TTS, YouTube Data API v3). The system integrates 5 external APIs, handles crash recovery automatically, and has maintained 100% uptime since the scheduler was finalized. The channel ("AI News Daily") is live and accumulating a content library in the News & Politics niche.

## Update: Migrated to Oracle Cloud — no more laptop-on requirement

May 2026 — the system was running on my laptop with Windows Task Scheduler. Two problems became annoying: (a) if my laptop was off, that day's video wasn't published — breaking the streak; (b) a YouTube OAuth token expired silently in early May and the pipeline failed 5 days in a row before I noticed.

Fixed both by migrating to Oracle Cloud Always Free ARM A1:

- **`scheduler.py` now runs as a systemd service** (`youtube-pipeline.service`) on the VM. Same Python code — the scheduler library is OS-agnostic. systemd handles restart-on-failure and start-on-boot.
- **State checkpoint files survive reboots.** Already designed for this on Windows; works identically on Linux at `/home/ubuntu/projects/youtube-pipeline/data/pipeline_state.json`.
- **YouTube OAuth token monitoring:** The pipeline pushes status to a public `live-data` GitHub repo after every run (success or failure with error message). A `youtube-pipeline-dashboard` on Vercel reads from that and shows the last-run status — making token expirations visible immediately instead of after 5 days.
- **GitHub Actions auto-deploy:** push to `master` → workflow SSHs into VM → `git pull` → restart service. Code changes ship in ~20 seconds.

The OAuth token issue itself: I added a `reauth.py` script that walks through a fresh Google OAuth flow when needed. Future token expirations are now a 30-second fix, not a 5-day silent failure.

Live status: [youtube-pipeline-dashboard.vercel.app](https://youtube-pipeline-dashboard.vercel.app) · Channel: AI News Daily.

## What I Learned

- Build-and-forget systems require you to anticipate failure more, not less
- Automation exposes every weakness in a manual process that was previously hidden
- The hardest part of any automation is the human decision still hiding inside it
- Shipping a system that runs without you is the closest thing to leverage a single person can have
- **Silent failures are the worst class of automation bug.** A pipeline that fails loudly gets fixed in an hour. A pipeline that quietly fails for 5 days breaks trust in the whole system. The fix is always external observability — push status somewhere that's not the failing system itself.
