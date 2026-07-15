---
title: "VoiceForge — Self-Hosted TTS"
slug: "voiceforge"
outcome: "An ElevenLabs-style text-to-speech server running entirely on my laptop — web UI + API, no cloud, no GPU. ₹0/month."
role: "Self-initiated builder"
timeline: "2026"
order: 4.3
status: "Live"
kind: "log"
tag: "Python · Kokoro-82M · ONNX · local API"
---

## Context

Several of my automations need narration — the content engine's reels, the agent campus's demo videos. Paying per-character for cloud TTS on volume that runs every day doesn't make sense. I wanted my own text-to-speech: paste text, pick a voice, get a WAV — running entirely on this laptop, with an API my other projects can call.

The commercial constraint mattered too: whatever engine I picked had to be licensed so I could safely use its output in my own products.

## The Problem

Self-hosted TTS usually means one of two bad trades: either a huge PyTorch install that eats disk and needs a GPU to be usable, or a tiny model that sounds robotic. And a licensing landmine hides underneath — plenty of good open models forbid commercial use, which would poison any reel or product the audio lands in. I needed good-enough voice, light enough for CPU, with a license that's actually safe to ship.

## How I Approached It

I picked **Kokoro-82M via ONNX** deliberately: it's the lightest *good* TTS model available, it runs on CPU with no GPU, and it's Apache-2.0 — commercially safe for reels and products. I wrapped it in a small local server so the model loads lazily on the first request and sits at ~0% CPU when idle, keeping the same "don't slow my laptop" contract as the rest of my tooling.

## What I Did

- **Local web UI + API:** a server exposes a UI at `localhost:4600` (paste text → pick voice → play/download WAV) and a JSON API — `POST /api/tts {text, voice, speed}` returns a WAV, `GET /api/voices` lists voices — so any of my projects can generate narration with one HTTP call.
- **One-click run:** a `.bat` file installs deps and downloads the ~340MB model on first run (one time), then opens the UI. No manual environment wrangling.
- **Idle-cheap by design:** server start is instant; the model loads lazily on the first request and is CPU-bound *only while generating*. Nothing autostarts — run it when needed, close it when done.
- **Built to slot into the stack:** designed to replace Piper for the content engine's voiceovers and dialogue reels and to narrate the agent campus's demo videos — while deliberately *not* touching Eli, whose real-time conversational voice stays on ElevenLabs.
- **Honest v1 limits:** English voices are excellent; Hindi voices exist in the Kokoro pack but the ONNX phonemizer's Hindi support is weaker — flagged to test before relying on it. 5,000 chars/request (chunk longer text), WAV output only (feed to ffmpeg for mp3).
- **Voice cloning, deliberately deferred:** the v2 plan (Chatterbox — MIT, clones a voice from a ~10s sample) is documented but gated behind an on-device benchmark and my explicit approval, because it needs a ~2.5GB PyTorch install that may be slow on CPU. No torch, no bloat until it earns its place.

## The Outcome

A working self-hosted TTS server — web UI and callable API — producing commercially-safe narration on a CPU-only laptop for ₹0/month, ready to feed the content engine and the agent campus's video pipelines. Model choice and licensing were the real engineering: the lightest good model, under a license I can actually ship.

**Numbers:**
- Kokoro-82M (Apache-2.0) via ONNX — CPU-only, no GPU
- ~340MB one-time model download
- ~0% CPU at idle (lazy load on first request)
- 5,000 chars/request; WAV out
- ₹0/month, fully local

## What I Learned

- **License is a spec, not an afterthought.** For audio that ends up in my own reels and products, "commercially safe" (Apache-2.0) was a hard requirement — it ruled out several better-sounding models before quality was even on the table.
- **Pick the lightest model that clears the bar.** Kokoro-82M was chosen precisely because it's the smallest good option; on a CPU laptop, "good enough and light" beats "excellent and unusable."
- **Lazy loading is the whole trick for local services.** Instant start + load-on-first-request means a background tool you can leave available without it taxing the machine — the same pattern that makes FreeFlow cheap to keep around.
- **Defer the heavy feature until it's benchmarked.** Voice cloning is compelling, but gating a 2.5GB dependency behind an on-device test and explicit approval keeps the tool lean until the upgrade is actually justified.
