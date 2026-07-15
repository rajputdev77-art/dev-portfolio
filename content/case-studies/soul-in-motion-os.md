---
title: "Soul in Motion OS — Build Agent for My Machine"
slug: "soul-in-motion-os"
outcome: "A read-first build agent that inventoried my whole machine, then shipped four working tools — a company knowledge base, a finance leak-hunter, local voice typing, and local TTS."
role: "Self-initiated builder"
timeline: "2026"
order: 4.1
status: "In Progress"
kind: "log"
tag: "Python stdlib · local-first · agent build plan"
---

## Context

I had roughly twenty projects scattered across my C: drive — some in git, some not — plus an Obsidian vault, live `.env` files, and years of half-finished ideas. I wanted a single build agent that could look at *all of it* safely, understand what I actually run, and then build the connective tissue and personal tooling I kept meaning to make. Not another product for other people — an operating layer for *my* setup.

The governing rule from the first minute: **read-only discovery, nothing modified, created, or deleted without sign-off, and never open a secret.**

## The Problem

Letting an agent loose on your whole machine is exactly where things go wrong: it reads a credentials file, it "helpfully" reorganizes a repo, it invents facts about projects it half-understood. I wanted the opposite — a disciplined, phase-gated build with a permanent audit trail, where discovery is separated from action and every unknown is marked `[PLACEHOLDER]` rather than guessed.

## How I Approached It

I ran it as an explicit phased plan (Phase 0 discovery → later build phases), governed by non-negotiable rules and a running `BUILD_LOG.md` that records every action, finding, and skipped step. Phase 0 was strictly read-only: locate git repos and the Obsidian vault, verify connections (GitHub CLI, Notion, vault path), inventory every project, and — critically — **flag** risks without touching them. Only after that sign-off did anything get built.

## What I Did

- **Phase 0 — Discovery (read-only):** scanned the top level of C:, my home directory, Desktop and Documents, and every project root; found git repos via `.git` search and the Obsidian vault via `.obsidian`; verified GitHub CLI auth, a live Notion read, and the vault path. Produced a full inventory of ~20 code projects (git and no-git), blog candidates, and media/doc folders — and a **findings** list that flagged plaintext credentials on disk and live `.env` files for exclusion from any future push, **without touching them**. Every unknown was surfaced as an explicit question rather than an assumption.
- **Company OS:** one folder that answers "what do we sell, to whom, how does work get done, and what should an agent read before acting." Populated *only* from real files already on the machine (pricing from the Eli docs, the Group's demo guide, the automations' READMEs); anything unknown marked `[PLACEHOLDER]`, never invented. It's the shared context layer the other agents read from.
- **Money OS:** two independent financial sections (personal + business) sharing one leak-hunting engine, running on the Python standard library — nothing to install. It catches dead subscriptions (annualized), duplicate charges, fees/penalties, recurring inventory, and category spikes. Verified on planted test data (it correctly flagged a ₹18,000/yr unused gym, a ₹6,000/yr unused Canva, a duplicate charge, both planted late-fees, and a food-category spike). Hard privacy rule: the `personal/` section is never included in any repo push and holds no account numbers — CSV exports only.
- **Two standalone local tools** spun out of the same build — **FreeFlow** (voice typing everywhere) and **VoiceForge** (self-hosted text-to-speech) — each written up as its own case study.
- **The audit trail:** `BUILD_LOG.md` is the single source of truth — newest entries at the bottom, every phase's actions, connection statuses, findings, and the exact questions left open for me. It even records *where* it couldn't do something (writing to `C:\` root is admin-blocked, so the log lives on the Desktop) rather than silently working around it.

## The Outcome

A discovery-first build agent that mapped ~20 projects across my machine and shipped four working pieces — Company OS, Money OS, FreeFlow, and VoiceForge — every one populated from real data or standard-library code, with a complete audit trail and a strict privacy boundary around personal finance and secrets. It runs on Python's standard library, costs ₹0, and never touched a credential.

**Numbers:**
- ~20 code projects inventoried (git + no-git) in a read-only Phase 0
- 4 tools shipped from one build plan (Company OS, Money OS, FreeFlow, VoiceForge)
- 5 leak types detected by Money OS, verified against planted test data
- 0 secrets opened, 0 files modified during discovery

## What I Learned

- **Separate discovery from action, hard.** A read-only phase that only produces an inventory and a findings list — and asks questions instead of assuming — is what makes it safe to point an agent at your entire machine.
- **`[PLACEHOLDER]` beats a confident guess.** For anything an agent isn't sure about, an explicit unknown is far more valuable than invented detail that reads as fact.
- **An audit log is the trust layer.** Being able to read exactly what was scanned, what was flagged, and what was skipped is what turns "an agent ran on my computer" from alarming into useful.
- **Flag secrets, never touch them.** The most valuable output of Phase 0 wasn't the tools — it was a list of exactly where plaintext credentials were sitting on disk, produced without opening a single one.
