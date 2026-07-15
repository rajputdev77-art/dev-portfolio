---
title: "FreeFlow — Voice Typing Everywhere"
slug: "freeflow"
outcome: "Hold F10, speak, release — text appears in whatever app has focus. A local Wispr Flow clone that stays at ~0% CPU when idle. ₹0/month."
role: "Self-initiated builder"
timeline: "2026"
order: 4.2
status: "Live"
kind: "log"
tag: "Python · Groq Whisper · faster-whisper fallback"
---

## Context

I wanted Wispr Flow's core magic — dictate into any app, anywhere, with one key — without a subscription and without something heavy running on my laptop all day. Speak into a Word doc, a browser field, a terminal, a chat box; release the key; the text is just *there*.

The contract I set: **don't slow my laptop.** Idle cost had to be effectively zero.

## The Problem

"Dictate anywhere" tools usually keep a mic open and a speech model resident in memory, so your machine pays a tax even when you're not talking. And typing into "whatever app has focus" runs straight into Windows' security model around synthetic input. I wanted the convenience without the idle cost, and I wanted it to fail honestly when Windows won't allow a paste.

## How I Approached It

I built the whole thing around a single global keyboard hook, so when I'm not dictating there's no mic and no model — just one hook waiting for a key. Transcription runs on Groq's servers (free tier) so nothing heavy runs locally, with an *optional, lazy* offline fallback that's never loaded unless the cloud is unreachable. Nothing autostarts with Windows; I start it when I want it.

## What I Did

- **Two modes on one key:** **hold F10** → speak → release → text appears in the focused app. **Triple-tap F10** → hands-free mode: it keeps listening and types every time I pause, until I tap F10 once to stop.
- **Audio state you can hear:** distinct beeps signal listening / processing / hands-free-on / hands-free-off, so I never have to look at a window to know what it's doing.
- **Idle cost ≈ zero:** at rest it's one keyboard hook — no mic, no models, ~0% CPU. The mic only opens while a key is held or hands-free is active.
- **Cloud-first, offline-optional transcription:** Whisper via Groq's free tier does the work by default; the offline `faster-whisper` fallback is not installed by default and is loaded lazily, only if Groq is unreachable — so there's no local model bloat unless I explicitly want no-internet dictation.
- **Pause-based utterance detection for hands-free:** tunable `SILENCE_RMS` and `SILENCE_CHUNK_SEC` thresholds decide when a pause ends an utterance (0.9s default), so it types in natural chunks instead of one endless block — with the knobs exposed at the top of the file.
- **Language-agnostic:** Whisper auto-detects Hindi / English / Hinglish and the mixed-script output follows what I actually said.
- **Honest about the edges:** elevated/admin windows can reject synthetic paste (a Windows security boundary), so it's documented rather than hidden — click into a normal app. Very long unbroken speech types in one burst at the end of the pause.

## The Outcome

A working v1 that turns one key into system-wide dictation across any app, in English, Hindi, or Hinglish, for ₹0/month — and honours the "don't slow my laptop" contract: one idle keyboard hook, no resident model, nothing on autostart. The v2 backlog (an LLM cleanup pass for filler/tone, a personal dictionary, a command mode) is deliberately deferred until the core loop earns it.

**Numbers:**
- 1 hotkey, 2 modes (push-to-talk + hands-free)
- ~0% CPU at idle (single keyboard hook, no mic, no model)
- 3 languages handled via Whisper auto-detect (EN / HI / Hinglish)
- ₹0/month (Groq free tier; optional offline fallback)

## What I Learned

- **The idle path is the product.** For an always-available tool, the design that matters most is what it costs when you're *not* using it. One keyboard hook and lazy everything-else is what makes it something you'll actually leave installed.
- **Lazy fallbacks keep tools honest.** The offline model is real but never loaded unless needed — you get resilience without paying the memory tax up front.
- **Document the security boundary, don't fight it.** Windows blocking synthetic paste into admin windows isn't a bug to hack around; it's a limit to state plainly so the tool stays trustworthy.
