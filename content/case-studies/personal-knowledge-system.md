---
title: "Second Brain — Personal Knowledge System"
slug: "personal-knowledge-system"
outcome: "A 3-layer compounding knowledge system across CLAUDE.md, Obsidian, and 8 n8n workflows — eliminating context amnesia across AI sessions"
role: "Self-initiated builder"
timeline: "2026"
order: 8
kind: "diagram"
tag: "Obsidian · Claude Code · n8n · Telegram · Whisper"
---

## Context

Every new Claude or ChatGPT session starts cold. I'd explain who I am, what I'm working on, my preferences, my projects — and then close the tab. The next session, same explanation. The cost wasn't just time; it was lost compounding. Every conversation died with its tab.

## The Problem

I wanted my own knowledge layer that survived between sessions and tools — one that captured ideas, decisions, learnings, and project context as they happened, made them searchable across any AI tool, and synthesized them back into structured notes. Not Notion. Not another database. Something that lived where I already worked.

## How I Approached It

Three layers, each handling a different timescale:
- **L1 — Instant context (auto-memory):** Every Claude Code session reads a CLAUDE.md that defines who I am, my projects, my preferences, my work style.
- **L2 — Persistent thinking (Obsidian vault):** A `prose-as-title` claim-note structure with smart-connections MCP for semantic search across thousands of notes.
- **L3 — Ingestion pipeline:** Captures from Telegram, Chrome bookmarks, voice notes, YouTube videos, and AI conversation exports — all flowing into the vault as structured notes.

The three layers compound: today's idea becomes tomorrow's note becomes next month's search result becomes next year's CLAUDE.md context.

## What I Did

- **CLAUDE.md + auto-memory:** Single source of truth for identity and project state. Updated automatically as projects ship.
- **Obsidian vault with smart-connections MCP:** Semantic search across the entire knowledge base. Every note is connected to its neighbors by meaning, not just folder structure.
- **Telegram bot (@Devbrain17bot):** Custom slash commands — `/idea`, `/learn`, `/decide`, `/thought`, `/video`, `/published` — each routes the message into the right vault folder with proper frontmatter and tags.
- **YouTube ingestor:** Drop a YouTube URL into Telegram; the system pulls the transcript via `youtube-transcript-api` + `yt-dlp`, runs it through an LLM for key-claims extraction, and saves a structured note linking back to the video.
- **Voice processor:** Voice messages to the Telegram bot get transcribed with Whisper, then routed by the same claim-extraction pipeline. The vault grows while I'm walking.
- **Chrome bookmark watcher:** New bookmarks auto-flow into a "to read" queue with metadata pre-extracted.
- **Daily digest at 10 PM:** A scheduled n8n workflow scans the day's captures, summarizes them, and posts the digest to Telegram.
- **Sunday weekly auto-review:** End-of-week synthesis — what was learned, what was decided, what's still open. Generated automatically, edited manually if needed.
- **Live dashboard:** Flask backend + HTML/vanilla JS frontend showing capture counts, vault size, recent notes, and a Q&A mode that hits the vault via Claude API + MCP.
- **AI conversation ingestor:** Export ChatGPT, Gemini, or Claude.ai conversations → parse them → save the load-bearing claims as vault notes. The conversations no longer die with the tab.

## The Outcome

Eight n8n workflows running in production: Telegram capture bot, YouTube ingestor, Whisper voice processor, Chrome bookmark watcher, content tracker, daily digest, Sunday weekly review, AI conversation export ingestor.

A vault that has crossed the threshold where it's faster to ask my own notes than to search the web. Every new Claude Code session inherits the full context automatically via CLAUDE.md. The cost of starting a fresh AI session is zero — the context comes with me.

## What I Learned

- **The bottleneck on AI tools isn't intelligence — it's context.** Once context becomes portable, every AI tool becomes 10x more useful overnight.
- **The best capture interface is the one you already have open.** Telegram works because it's already on my phone. A custom app would have failed.
- **A vault is a relationship, not a database.** It only becomes valuable after months of consistent capture. The compounding is the product.
- **Semantic search beats folder structure.** When the vault crossed ~500 notes, folders stopped helping. Smart-connections started feeling like a co-author.
