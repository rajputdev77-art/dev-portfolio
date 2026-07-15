---
title: "Soul in Motion Group — 3 AI-Run Companies"
slug: "soul-in-motion-group"
outcome: "A local-first campus where 39 named AI agents across 3 companies run marketing, sales, product, IT, and security on a 15-minute tick. ₹0/month."
role: "Self-initiated builder"
timeline: "2026"
order: 2.2
status: "In Progress"
kind: "diagram"
tag: "Node · SQLite · Gemini → Ollama · Playwright · Express"
---

## Context

I wanted to find out how far one person could push the "company run by agents" idea if it had to be *real* — real outputs, real outreach, real self-monitoring — and cost nothing to run. Not a chatbot demo. A building you can walk into, with floors and staff, where clicking a worker shows you the actual work they filed in the last 15 minutes.

So I built **Soul in Motion Group**: three AI-run companies sharing one local-first campus, each with a free product designed to become paid revenue.

- **Lead Grader Co.** — paste any customer message, get HOT / WARM / COLD + why + the next move. Free tool → the ₹25K "put this on my site" install.
- **AI Front Desk Co.** — a 24/7 multilingual receptionist for a shop; answers only from that business's real profile, captures bookings. ₹25K–₹80K one-time setup per business.
- **Memory Keeper Co.** — one gentle question a day, answered by voice, woven into a living first-person memoir with the person's real voice clips. A consumer gift subscription.

## The Problem

"Agents running a company" almost always means a script that calls an LLM in a loop and prints text. The hard, honest version has to answer questions that demo never does:

- What *is* an agent when the laptop is asleep? (It can't be a process sitting there thinking.)
- How does the whole thing keep working when my free LLM quota runs out?
- How do you show 39 agents working without it being theatre — real artifacts, not fake status lines?
- How does a system with sales agents reach real businesses without spamming or auto-sending anything?

## How I Approached It

I modelled the company as **data, not daemons.** An agent is a row in a SQLite database with a name, a personality, and a job. A single engine script — poked every 15 minutes by Windows Task Scheduler — wakes up, reads what's due, and advances each piece of work through stages (`queued → drafting → review → done`), calling the brain for each stage and letting a "boss" agent review on the next. The office you see at `localhost:4400` is just a dashboard animating each agent's `status` column. Real work, shown as an office.

The rule I designed the whole thing around: **my limits can never stop the agents, because the agents don't run on me at all** — they run on the user's machine and the user's own LLM key.

## What I Did

- **The campus:** one Node/Express server opens the office building at `localhost:4400` — 3 floors, one company each. 39 workers across 3 companies × 7 departments (Marketing, Sales, Product, Support, HR, IT, Security). Click a floor, walk in, watch agents "work" (a glowing walking dot with a thought-bubble); click one, a card slides in with who they are and the real artifacts they filed.
- **The never-die brain (`shared/llm.js`):** tries **Gemini first** (capped at 150 calls/day so it stays free) → falls back to **Ollama** on the local machine (free, offline) → if both are down, the work item simply waits and retries next tick. Nothing is ever lost; the campus can't be killed by a rate limit.
- **Marketing that really publishes:** an ideator drafts a post, the department head reviews, and it's *actually* published — to a hosted `/updates` blog (always), to a Telegram channel (when a bot token is added), with a one-click copy queued for LinkedIn/X/Instagram. A video producer **shoots real demo videos**: a Playwright-driven browser clicks through the live product, an AI voice narrates, and ffmpeg stitches the `.mp4`.
- **Sales that reaches real businesses, safely:** a scout pulls **real businesses from OpenStreetMap's Overpass API** (real listings with phone/website where available), a writer drafts an email *and* a DM for each, the head reviews, and they land in a **Send Center** at `/send`. Outreach is **one-click, never auto-sent** — each item opens Gmail or WhatsApp pre-filled with recipient, subject, and body; the human reads it and hits send. Nothing leaves the machine on its own.
- **The AI Front Desk product:** the customer chats on a per-business page; the router loads *only that business's profile* (hours, prices, FAQs) and sends it to the brain with strict rules — answer only from this profile, reply in the customer's language, and when the profile is thin, take a name + phone instead of guessing. Bookings write into the owner's inbox. Onboarding a client is a 2-minute form that instantly issues a chat link, a one-line website widget, and an inbox.
- **Real IT and Security teams:** IT agents run real `npm audit`, endpoint-latency checks, disk and error-log scans, and auto-apply only *safe* fixes (clearing stuck jobs, trimming logs) — any actual code change goes to a human approval queue with its reasoning, never applied silently. Security agents scan for `.env` accidentally in git, committed API keys, high/critical dependency vulns, and public-API secret leaks, filing a risk report and routing high-risk findings to the outbox.
- **Self-healing:** an HR watchdog restarts the campus if it dies and re-kicks the engine if it stalls, logging every rescue. A `TURN-ON-AUTO.bat` registers the campus, engine, watchdog, and nightly report as Windows tasks with one double-click.
- **Everything in one file:** `data/campus.db` holds every worker, job, artifact, and event. Back that up and you've backed up the whole company.
- **A security audit, applied:** the most recent work was an audit-fixes pass merged via PR — private inboxes, per-IP rate limits, bounded retries, and crash guards across the campus.

## The Outcome

A running, local-first "campus" of **39 AI agents across 3 companies**, each producing real artifacts every 15 minutes — published posts, AI-narrated demo videos, researched real-business leads with drafted outreach, daily QA and security reports — for **₹0/month** (Gemini free tier → Ollama fallback, SQLite, vanilla-JS dashboards, no build step). The only human step is ~10 minutes a day in the Send Center, where nothing sends without a click.

**Numbers:**
- 3 companies · 7 departments · 39 named agents
- 15-minute work tick, driven by one engine script + Task Scheduler
- 3 free products (Lead Grader, AI Front Desk, Memory Keeper) each with a defined paid tier (₹25K–₹80K installs; ₹2,999/yr memoirs)
- 1 SQLite file = the entire company's state
- ₹0/month running cost

Public deployment to an Oracle free VM (behind a Cloudflare tunnel, so the agents auto-write a real demo URL into every email) is the documented next step — kept behind a manual capacity check rather than assumed.

## What I Learned

- **Model a company as data, not processes.** Making an "agent" a database row advanced by one scheduled tick — instead of 39 long-running processes — is what makes the whole thing cheap, crash-safe, and inspectable. The office UI is just a view over that data.
- **A fallback chain is the product.** Gemini → Ollama → wait-and-retry is the difference between a system that dies the first time a free quota trips and one that genuinely runs 24/7. Designing so my limits can't reach the agents was the key architectural constraint.
- **"Real, but human-gated" beats "fully autonomous."** The sales agents research real businesses and draft real messages, but a person clicks send. That one boundary keeps it useful and keeps it from becoming a spam machine.
- **Showing the work honestly is a design problem.** The glowing office is only convincing because every dot maps to a real artifact you can open. The moment the animation outruns the actual output, it's theatre — so I wired the UI straight to the artifacts table.
