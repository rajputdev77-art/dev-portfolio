---
title: "Multi-Channel Content Engine"
slug: "soul-in-motion"
outcome: "One journal in, content across 9 platforms out — 11 min end-to-end."
role: "Self-initiated builder"
timeline: "2026"
order: 5
kind: "diagram"
tag: "n8n · GPT-4 · 9+ platforms"
---

## Context

I wanted to document my life publicly — but content creation at scale is a full-time job. Writing a blog post, crafting a LinkedIn update, creating an Instagram reel, uploading to YouTube, and cross-posting to Dev.to, Hashnode, WordPress, and Blogger adds up to 3-5 hours of pure content work per day. That leaves no time for the actual living that generates the content.

## The Problem

The documenting was consuming the life being documented. I needed a system where the only human input is a Word file — timestamped with raw thoughts throughout the day — and the output is polished blog posts, LinkedIn updates, animated Instagram reels, YouTube Shorts, and cross-posted articles across five blogging platforms. All automatic. All hands-off.

## How I Approached It

I designed the system as a pipeline with clear separation between input (journal entries), processing (AI content generation + video rendering), and output (9 platform publishers). Each platform integration was built and tested independently before being wired into the orchestrator. I chose tools that were free, API-accessible, and automatable — no manual logins, no browser automation, no fragile hacks.

## What I Did

- **File Watcher:** Built a real-time monitor using Python's watchdog library that detects the instant a journal `.docx` file is saved. Watches two directories simultaneously — local and OneDrive (for remote journaling from any device). Includes debounce logic to prevent duplicate triggers.
- **Entry Parser & State Engine:** Regex-powered timestamp detection splits the Word document into discrete entries. A JSON state tracker prevents duplicate processing and maintains narrative context — each new entry gets a summary of earlier ones, so the AI writes a coherent story arc across the day.
- **AI Content Generator:** Groq API running LLaMA 3.3 70B transforms each raw entry into 5 content formats: a cinematic mini blog (150-300 words), a video script with camera directions, an Instagram package (caption + hashtags + reel hook), a LinkedIn post, and a master blog section that accumulates throughout the day.
- **Animated Video Generator:** A complete frame-by-frame rendering engine built from scratch with MoviePy, NumPy, and Pillow. 1080x1920 vertical format with animated gradient backgrounds, typewriter text reveal with blinking cursor, line-by-line slide-in with cubic ease-out easing, branded intro/outro, progress dots, and pulsing glow effects. 30 FPS, fully programmatic — no video editing software involved.
- **9-Platform Publishing:**
  - **LinkedIn** — n8n webhook (handles OAuth refresh automatically)
  - **Dev.to** — REST API direct publish
  - **Hashnode** — GraphQL mutation API
  - **WordPress.com** — REST API v1.1 with OAuth2 bearer token (pivoted from Application Passwords after discovering free plan doesn't support them)
  - **Blogger** — OAuth2 with refresh token (pivoted from API key after hitting 403 — API keys can only read, not write)
  - **Instagram** — Cloudinary as video hosting bridge + Instagram Graph API (Instagram can't accept local file uploads — their servers fetch video from a URL)
  - **YouTube Short + Video** — Data API v3 with resumable chunked uploads, same reel published as both a Short and a regular video
  - **Medium** — Manual queue with Streamlit dashboard (Medium deprecated their posting API)
- **End-of-Day System:** At 11:30 PM, all accumulated master blog sections are fed back into the AI to produce a single polished 1,500-3,000 word daily narrative. An idle day handler detects if no entries were written and generates a reflective "quiet day" post to maintain the publishing streak.
- **Health Monitoring Agent:** Runs every 30 minutes via Windows Task Scheduler. Checks 9 system components: file watcher alive, APIs responding, tokens expiring, disk space sufficient, recent error count. Auto-restarts the watcher if it crashes. Logs everything.
- **Scheduling:** Three Windows Task Scheduler tasks — watcher on login, end-of-day at 11:30 PM, health check every 30 minutes. Survives restarts, sleep, and IDE closure.

## The Outcome

First live run on April 11, 2026: a real journal entry was detected at 11:43 AM and published across all platforms by 11:54 AM — 11 minutes total, of which 10 minutes was video rendering and 67 seconds was API publishing across 8 platforms. LinkedIn, Dev.to, Hashnode, WordPress, Blogger, Instagram (animated reel), YouTube Short, and YouTube Video — all live, all automatic.

8 of 9 platforms are fully automated. Medium requires a 30-second manual copy-paste due to their deprecated API. The system integrates 13 API credentials, monitors itself every 30 minutes with auto-repair, and generates content even on days when nothing is written.

The tech stack runs at $0/month: Groq free tier for AI, Cloudinary free tier for video hosting, all platform APIs on free tiers, Windows Task Scheduler for orchestration.

## What I Learned

- The hardest part of multi-platform publishing is that every platform has different authentication architecture — OAuth2, API keys, bearer tokens, webhooks, GraphQL — and each one has non-obvious gotchas that only surface at build time
- Cloudinary as a video hosting bridge for Instagram was an architectural pattern I didn't anticipate needing — Instagram's server-side fetch requirement is not obvious from their documentation
- A system that works when you're watching it is not a system — a system that works when you're asleep is a system
- The health monitoring agent is not optional — it's what makes the difference between a project and a product
- Frame-by-frame video rendering is slow (~10 minutes) but gives you total creative control that no template tool can match
