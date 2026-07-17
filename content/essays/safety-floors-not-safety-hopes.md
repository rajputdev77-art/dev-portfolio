---
title: "Safety Floors, Not Safety Hopes."
slug: "safety-floors-not-safety-hopes"
date: "July 2026"
description: "What building an emotional-AI product taught me about where safety belongs: in deterministic code that works when the model is slow, wrong, or down — never in the model itself."
order: 2
read: "7 min"
---

## Safety Floors, Not Safety Hopes

I spent the last two months building an AI product where a wrong answer isn't a bug report — it's a person in distress reading the wrong thing at the worst possible moment. I can't talk about the product yet. I can talk about the engineering, because the lesson generalizes to anything you build on top of a language model.

The lesson is one sentence: **a model can make your product good, but it must never be what makes your product safe.**

## The seduction of the capable model

Modern LLMs are genuinely good at sensitive conversation. Give a frontier model a well-written system prompt and it will handle a distressed user with more care than most rule-based systems ever could. That competence is exactly what makes it dangerous, because it tempts you into letting the model own the safety-critical path.

Here's what that looks like in practice, and why each one fails:

**"The model will detect a crisis."** Usually, yes. But detection has to work when the model is rate-limited, when the API is down, when the response gets truncated, when a reasoning model spends its whole token budget thinking and returns nothing. All of those happened to me in one build. A safety mechanism with those failure modes is not a safety mechanism — it's a safety hope.

**"The model will give the right helpline number."** Until it hallucinates one digit. A wrong crisis number handed to someone in crisis is the single worst output your product can produce, and no amount of prompt engineering takes the probability to zero. The only way to make it zero is to make it structurally impossible.

**"The provider's content filter will protect users."** The opposite, in my case. A generic filter saw distress-talk as dangerous content and blocked the reply entirely — so the app went silent at exactly the moment someone opened up. Generic guardrails are tuned for the average product. If you build in a sensitive domain, their instincts are frequently backwards for yours.

## What a floor looks like

The architecture that came out of those failures has a shape worth stealing. Every guarantee that matters runs in deterministic code, and the model sits on top of it:

- **Detection is regex-first.** A deterministic detector — including romanized-Hindi patterns, because real users don't type in one clean language — runs on every message. It cannot be rate-limited, cannot time out, cannot be wrong in a new way tomorrow. An LLM classifier runs on top of it, with one hard rule: **it can escalate the floor's verdict, never downgrade it.** If the model is down, the floor is the behaviour. Safety never gets weaker because a model had a bad day.
- **The model is forbidden from writing the numbers.** Verified helpline numbers are appended by the application, deterministically, whenever the floor triggers. The model literally cannot type a phone number in my system. What it can't write, it can't get wrong.
- **Privacy that survives a breach, not one that asks for trust.** "We don't read your conversations" is a promise; app-side AES-256-GCM encryption before anything touches the database is a property. Safety telemetry stores signal and severity — never transcript text — so you can measure whether the floor works without anyone reading a soul's worst night.
- **Every failure fails toward the floor.** Truncated reply? The floor's verdict stands. Classifier errored? Deterministic result only. Voice pipeline aborted mid-turn? Stay silent rather than speak an error in the wrong language. The system degrades toward its most conservative behaviour, never away from it.

None of this is clever. That's the point. The safety layer is the most boring code in the product — small, readable, testable with the model switched off entirely. I can hand it to a reviewer and they can verify every guarantee without running a single inference.

## The test that matters

Here's the question I now ask of any AI system I build, and the one I'd ask of yours:

**Unplug the model. What still works?**

If the answer is "nothing, but the model is very reliable," you have a demo. In a product where the cost of a wrong output is a person — money moved, a dose miscalculated, a crisis mishandled — the answer has to be: *everything that matters.* The warmth, the intelligence, the magic — that's the model's job, and it does it beautifully. The guarantees are yours.

Models propose. Floors dispose.
