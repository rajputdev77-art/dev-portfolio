---
title: "JARVIS — Voice-First Personal AI Assistant"
slug: "jarvis-local-assistant"
outcome: "A 24/7 voice assistant that wakes on command, holds long-term memory, and runs WhatsApp, Gmail, and system control end-to-end — $0/month, fully on my own machine"
role: "Self-initiated builder"
timeline: "2025-2026"
order: 4
---

## Context

I wanted my own assistant — not a subscription to someone else's. Something that runs on my machine, respects my data, holds memory across sessions, and actually does real work: plays music, sends WhatsApp messages, reads my Gmail, controls system volume, schedules tasks, and holds intelligent conversations with a personality I'd actually enjoy.

Modeled after the Iron Man AI. Built from scratch in Python 3.11 on Windows 11. Around 1,356 lines of code. 100% free tier — Groq for inference, everything else local.

## The Problem

Every assistant on the market is a black box. You send your data to their servers, you get a canned response, you hope it's useful. And most "AI assistant" tutorials are toy demos: a single intent, no memory, no real actions. The gap between a hello-world voice loop and an assistant that runs 24/7, recovers from crashes, and actually executes tasks across multiple apps is enormous. I wanted to close that gap myself.

## How I Approached It

I broke the system into independent layers and got each one working before connecting them: wake-word detection, intent classification, action execution, voice output, persistent memory, browser automation, system control, and scheduling. Each layer had to fail loudly, recover cleanly, and run without supervision. The hardest design constraint wasn't intelligence — it was reliability. An assistant that works when I'm watching it isn't an assistant. An assistant that works on its own at 3 AM is.

## What I Did

- **Wake word detection:** Passive always-on microphone listener using Google Speech Recognition. Triggers only on "Jarvis" — ignores everything else. Plays an 800Hz chime on activation. After responding, enters a 6-second follow-up window so I can chain commands without re-saying the wake word.
- **AI intent classification (no keyword matching):** Every command goes through Groq's LLaMA 3.3 70B for zero-shot intent classification. Returns structured `INTENT: X / QUERY: Y`. Handles 18 intent types including `play_music`, `whatsapp_message`, `read_email`, `schedule`, `system_control`, `briefing`, and `conversation`. "Stan by Eminem", "play some Eminem", and "put on Stan" all classify identically.
- **Voice output:** Microsoft Edge TTS with `en-GB-RyanNeural` (Paul Bettany-style British voice). Async pipeline — generates MP3 to a temp file, pygame streams it, cleanup runs after. Non-blocking, so generation and playback overlap.
- **Music playback:** Scrapes YouTube search HTML for video IDs via regex, opens the direct `youtube.com/watch?v=` URL — not the search page. Works for any song, artist, genre, or album.
- **Browser automation (Playwright):** A dedicated asyncio event loop runs in a daemon thread, completely separate from the TTS event loop. Persistent Chromium context at `browser_data/` preserves cookies and login sessions across restarts — scan WhatsApp QR once, never again.
  - **WhatsApp:** Uses the native `Ctrl+K` shortcut for contact search (more stable than DOM clicks), types and sends.
  - **Gmail read:** Scrapes inbox rows, extracts sender + subject, speaks the top 5 aloud.
  - **Gmail send:** Opens compose, fills To/Subject/Body, clicks Send.
  - **General web tasks:** Groq generates a JSON action plan (URL + click/type/press steps), Playwright executes it.
- **System control via Win32 API:** Direct `ctypes` calls — no subprocess overhead. Volume up/down/mute (`0xAD–0xAF`), media play/pause/next/previous (`0xB0–0xB3`), `user32.LockWorkStation`, screenshot via `ms-screenclip:` URI, shutdown/restart/sleep with a 10-second grace period.
- **Task scheduler:** Parses both "5:30 PM" and "5:30 p.m." (Google Speech transcribes with dots). "In 20 minutes remind me to stretch" handles relative time. A background thread polls every 30 seconds and re-enters scheduled commands through the full intent pipeline.
- **Long-term memory (Mem0 + local Qdrant):** Every conversation is embedded with `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions) and stored in a local Qdrant vector DB. On each new conversation, JARVIS searches for relevant past memories and injects them into the system prompt. Permanent seed memories cover location, goals, projects, and work style. No cloud, no cost.
- **Personality:** Custom system prompt enforces Iron Man movie accuracy — British dry wit, formal but not stiff, addresses me as "Mr. Stark" or "sir." Proactive care: late-night reminders between 2-5 AM, low-battery alerts at ≤15%, time-of-day greetings with live weather and battery status on boot.
- **Auto-start on boot:** `JARVIS.cmd` in the Windows Startup folder activates the venv and launches with a 10-second delay so Windows fully loads first.

## Engineering Challenges I Solved

- **Wake-word speed:** faster-whisper took 3-5 seconds per cycle on CPU — too slow. Reverted to Google Speech Recognition for both wake word and commands. Heavy models (Mem0, sentence-transformers) load in a background thread while JARVIS greets immediately.
- **Event loop conflicts:** `edge-tts` uses `asyncio.run()` which creates a new loop per call; Playwright needs a persistent loop. Solved by giving Playwright its own daemon-thread event loop and submitting tasks via `asyncio.run_coroutine_threadsafe()`. TTS keeps its ephemeral loops.
- **Schedule parser for speech transcription:** Google transcribes "5:30 PM" as "5:30 p.m." with dots. Updated regex to `(a\.?m\.?|p\.?m\.?)` and strip dots before comparison.
- **Qdrant lock files on crash:** A `_clear_qdrant_locks()` function runs at startup — glob-scans `memory_db/`, removes any `.lock` files. JARVIS now recovers from hard kills automatically.
- **AI hallucinating action confirmations:** Groq would say "Lose Yourself is playing now" even when it couldn't actually play anything. Fixed by separating concerns: action responses come from the executor, not the AI brain. The system prompt explicitly forbids the model from claiming to perform actions.
- **Windows auto-start:** `.vbs` files are silently blocked by Windows 11 security. Switched to `.cmd` (native batch, not blocked).

## The Outcome

A working voice-first assistant running 24/7 on my own machine. Wake word triggers in under a second. Boot-to-greeting in ~3 seconds (memory warm-up happens in the background). Holds 18 intent types. Persists memory across sessions and crashes. Auto-starts on login. Survives sleep, lid-close, and reboot. Total monthly cost: $0.

**Stack:** Python 3.11, Groq (LLaMA 3.3 70B), Edge TTS, pygame, SpeechRecognition, Mem0, Qdrant, sentence-transformers, Playwright, ctypes (Win32 API), pyaudio.

## What I Learned

- **Local-first AI is harder than cloud AI and teaches you ten times more.** Cloud AI hides architecture. Building this taught me wake-word loops, persistent vector memory, intent classification, async event loop management, and OS-level system programming.
- **The hardest part of voice UX isn't the voice — it's the silence between commands.** Chimes, follow-up windows, proactive alerts, and a consistent personality are what make a voice interface feel natural. Without those, even perfect transcription feels robotic.
- **Async architecture is a real engineering discipline.** Two event loops in the same process is where bugs live. The fix isn't more clever code — it's clearer thread and loop ownership.
- **Hallucination prevention is prompt architecture, not just prompt wording.** Stop asking the model to do things it can't do. Let the executor confirm; let the model converse.
- **Most "AI products" are orchestration, not intelligence.** The intelligence is a one-line API call. Everything else — memory, action routing, error recovery, system integration — is the actual product.
