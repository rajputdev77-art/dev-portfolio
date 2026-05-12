---
title: "Aura — Eternal Planet Guardian"
slug: "aura-eternal-planet-guardian"
outcome: "Stateful AI climate coach with weighted impact scoring and habit memory — deployed on Vercel. Built for DEV Weekend Challenge, Earth Day 2026."
role: "Self-initiated builder"
timeline: "April 2026 — one weekend"
order: 10
kind: "metric"
tag: "React · Vite · Gemini 2.5 Flash · Backboard SDK · Vercel"
metrics:
  - num: "1"
    unit: "wk"
    label: "build time"
  - num: "0"
    unit: "$"
    label: "infra cost"
  - num: "3"
    unit: "col"
    label: "chat UI"
---

## Context

The DEV Weekend Challenge for Earth Day 2026 asked for projects that use AI to help the planet. Target prize: Backboard. The constraint: weekend-only, client-only, no backend.

## The Problem

Most "AI climate" projects do one of two things: (a) lecture you about your carbon footprint, or (b) tell you to feel guilty about a flight you already took. Neither changes behavior. I wanted to build an AI coach that remembered what you actually did this week, scored it honestly, and shaped its tone around the gap between intention and reality.

## How I Approached It

Three principles for the build:
1. **Stateful by design** — Aura remembers your habits, streaks, and honest moments. No remember-me-next-time amnesia.
2. **Score honestly, not flatteringly** — a weighted, log-scaled `impactScore` that doesn't reward easy wins disproportionately.
3. **Client-only, no auth** — runs entirely in the browser via Vercel. LocalStorage holds state. Zero backend, zero cost, zero friction to try.

## What I Did

- **Three-column chat UI** — left: Aura's persona and current state, middle: the conversation, right: scoring + streaks + impact graph.
- **Persona engine** — Aura adapts tone based on streak status, recent honesty, and the kind of moment you're sharing (win, slip, ask for help).
- **Pure `impactScore` function** — weighted, log-scaled, evaluated client-side. The exact same inputs always produce the exact same score (audit-friendly).
- **Gemini 2.5 Flash for conversation** — chosen for free tier + low latency. The system prompt enforces "coach, not lecturer."
- **Backboard SDK integration (reserved):** `BackboardClient` interface is async-shaped over localStorage today, designed to swap to the real SDK the moment it ships. Documented as a known gap in `BLOCKER.md`.
- **Vercel deployment** — `.vercel/` folder in repo, `dist/` from a successful build, deploy-ready.

## The Outcome

Submitted to the DEV Weekend Challenge. A working stateful AI climate coach with honest scoring, weekend-built, deployed to Vercel at zero cost. The interaction loop survives a full week of use without losing state — which was the actual product goal.

## What I Learned

- **"Client-only" is a feature, not a limitation.** No accounts, no signups, no friction. A user can try Aura in 30 seconds.
- **Honest scoring is hard to design and easy to feel.** A scoring function that flattered users would have been faster to build and instantly worse.
- **The Backboard SDK shape was the right abstraction even before the SDK existed.** Building against the future interface meant the swap will be one file change, not a refactor.
- **A weekend deadline forces ruthless scoping.** Half the things I wanted to build (habit streaks UI, social mode, weekly digest) got cut. The half that shipped is the half that mattered.
