---
title: "Eli — AI Emotional-Support Companion"
slug: "eli-companion"
outcome: "A shipped, paid product: a warm Hinglish companion with voice, cross-session memory, and a deterministic crisis-safety floor. Live on Vercel."
role: "Self-initiated builder"
timeline: "2026"
order: 2.1
status: "Live"
kind: "diagram"
tag: "Next.js 15 · Supabase · Claude · ElevenLabs · Razorpay"
---

## Context

Most of my builds are agents that do work. Eli is different — it's a product a stranger can pay for and talk to. The brief I set myself: a warm, confidential emotional-support companion (explicitly **not** therapy) that speaks Hinglish like a trusted older sister, remembers you across sessions, and has a safety layer strong enough that no human ever has to read a transcript for it to work. Text and voice. Real payments. Shipped to production, not a demo.

The hard line running through the whole project: **it must be genuinely helpful without ever pretending to be clinical care, and it must be safe even when the model is slow, wrong, or down.**

## The Problem

An emotional-support product is where "move fast and break things" goes to die. Every easy shortcut is a landmine:

- A model can hallucinate a wrong crisis helpline number — unacceptable when someone in distress is reading it.
- A generic content filter blocks talk of distress, so the app goes silent exactly when a user needs it most.
- "We don't read your sessions" is worthless if raw database access can read them.
- Voice that stutters, talks over you, or dies mid-sentence feels worse than no voice at all.
- And the legal/ethical framing — not therapy, no diagnosis, no medical claims — has to hold in every single reply, not just the disclaimer page.

I wanted to solve all of these structurally, not with hope.

## How I Approached It

I built it in phases behind a model-agnostic provider layer, so I could validate the entire app for ₹0 on Gemini's free tier, then swap to Claude for production by changing one environment variable. Safety was designed as a **deterministic floor first, model second** — the guarantees never depend on the LLM being right. Every autonomous decision I made got logged in a running `DECISIONS.md` so the human owner (me) always knew what shipped and why.

## What I Did

- **The stack:** Next.js 15 (App Router, TypeScript) + Tailwind v4, Supabase (Postgres/Auth/Storage), Razorpay for INR payments, deployed on Vercel. A single `constants.ts` is the source of truth for brand + session config.
- **Eli's brain:** a hand-authored system prompt encoding persona, voice, and boundaries. She's a warm "badi behen" — Hinglish, feminine verb forms, empathy with honest gentle pushback. Clinical methods (CBT/DBT/ACT/MI/person-centred) are used *invisibly* and never named to the user, which keeps it human and protects the not-therapy line.
- **Deterministic crisis detection:** a regex layer over English **and** romanized Hindi runs on every message as the guaranteed safety floor. An LLM classifier layers on top but **can only escalate, never downgrade** — and is skipped entirely when the regex already says crisis. Safety can never get *weaker* because a model was slow or wrong.
- **Verified helplines, never typed by the model:** Eli is forbidden from ever typing a phone number. On any crisis/elevated signal, the *app* deterministically appends verified India helplines (Tele-MANAS 14416, KIRAN, Vandrevala, AASRA, iCall, emergency 112). A model can't hallucinate a wrong number if it's never allowed to write one.
- **Privacy that survives a DB breach:** transcripts, summaries, notes, and key-facts are encrypted app-side with AES-256-GCM before they're ever written to Postgres. Even raw database access can't read a conversation. Row-Level Security isolates every user — guests included, via Supabase anonymous auth so each one gets a real `auth.uid()` and the same RLS. `safety_events` store signal + level only, never transcript text, so I can monitor safety efficacy without anyone reading sessions.
- **Cross-session memory:** at session end, Eli extracts not just facts but emotional throughlines and recurring themes, encrypts them, and reads them back into the next session's prompt — so she can gently name a pattern ("third time the late-night thing has come up…") instead of starting cold every time.
- **Voice, rebuilt the right way:** after a first attempt with tap-to-talk (rejected — it felt mechanical), I moved the voice engine to **ElevenLabs Conversational AI** running *our* Claude/Gemini brain via custom-LLM, so it keeps the same safety + memory. Real-time, no tap, built-in turn-taking and interruption handling, Hinglish-tuned, with a female voice per language (English + हिंदी, each its own agent). The voice path uses deterministic-only crisis detection and parallel memory/KB loads to cut first-token latency, and still speaks the verified helpline on crisis.
- **RAG without infra:** knowledge retrieval is keyword/tag scoring over six original, openly-usable markdown files (grounding, reframing, journaling, distress-tolerance, acceptance, crisis protocol) — zero embedding infra, transparent, swappable for pgvector later behind the same interface.
- **Payments & tiers:** first session free, then ₹499 text / ₹699 voice, stored in paise because Razorpay works in the smallest currency unit. An owner admin control room shows live cost (including real ElevenLabs spend), with prompt caching and a cost breaker to keep unit economics sane.
- **Ops hardening:** uncrashable brain endpoint, health endpoint, incident-response plan, rate limiting, backups, and analytics — all in before launch.

## The Outcome

Eli is **live in production on Vercel** — landing → consent → session flow works end-to-end, in text and voice, in two languages, with the crisis layer and cross-session memory active and verified in prod. It's a real product with real pricing and real payment rails, not a prototype.

**Numbers:**
- 2 languages (English + हिंदी), each with its own tuned female voice agent
- 2-layer safety in text, deterministic-floor in voice — verified live across normal, elevated, and crisis turns
- AES-256-GCM encryption on every stored conversation artifact
- ₹499 text / ₹699 voice, first session free
- 1 environment variable to switch the entire brain between Gemini (free testing) and Claude (production)

Still ahead of a full public launch: sign-off from a lawyer (Terms/Privacy, DPDP) and a licensed clinician on the safety/scope language — both slots are drafted and clearly flagged in the code. That gating is deliberate: for this product, "not yet" is the responsible answer.

## What I Learned

- **Safety-critical behaviour belongs in deterministic code, not the model.** Every guarantee that matters — crisis detection, the helpline footer, user isolation — works with the LLM switched off. The model makes Eli warm; it is never what makes her safe.
- **Generic guardrails fight a support product.** Gemini's `DANGEROUS_CONTENT` filter blocked distress talk and returned empty replies — reading to the user as "she stopped listening." I had to turn the provider's filters off *because* Eli has her own, stronger, deterministic crisis layer.
- **Free tiers hide sharp edges.** `gemini-2.5-flash` is a reasoning model: with a small reply cap it spent its whole budget "thinking" and returned nothing, and its ~20-requests/day free limit died inside a single voice session. Both were the real root cause of "the voice stops after one sentence" — fixed by disabling thinking and moving to `flash-lite`, with Claude as the production answer.
- **Voice quality is a product decision, not a vendor default.** I benchmarked ElevenLabs against Hume and others; empathy specialists lost on Hinglish tuning and voice quality. No-tap turn-taking with room for pauses and crying is what makes it feel like a person.
- **A decision log is a feature.** Writing down every autonomous choice and its reason is what let me move fast on a product where a wrong call has real human cost.
