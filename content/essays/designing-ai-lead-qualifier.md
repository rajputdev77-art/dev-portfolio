---
title: "Why I Built an AI Lead Qualifier Instead of Using One"
slug: "designing-ai-lead-qualifier"
date: "2026-04-11"
description: "The design decisions, tradeoffs, and lessons from building an AI-powered lead qualification pipeline from scratch."
order: 1
---

## Why I Built an AI Lead Qualifier Instead of Using One

There are dozens of lead qualification tools on the market. Most of them cost $50-200/month, run on someone else's servers, and give you a score you can't explain to a client. I wanted to understand what was actually happening inside the box — so I built my own.

The system is simple to describe: a lead fills out a form, an LLM scores them as HOT, WARM, or COLD with a written reason, the score gets written to a Google Sheet, and if they're HOT, the sales team gets an email within seconds. The whole thing runs on n8n, Groq's free tier, and a Google Service Account. Total monthly cost: zero.

But the interesting part isn't what it does. It's the decisions I had to make to get it there.

## The Tradeoffs

**Groq over OpenAI.** GPT-4 would have been marginally better at nuanced scoring. But Groq gives me LLaMA 3.3 70B at 700 tokens/sec on a free tier with no credit card. For structured lead scoring — not poetry, not code generation — the quality difference is negligible. The cost difference is infinite.

**Google Sheets over a real database.** Every instinct says "use Postgres." But the client is a real estate agency. They live in spreadsheets. If I hand them a database dashboard, they won't use it. If I hand them a Google Sheet that updates in real time, they'll check it ten times a day. The right database is the one your user actually opens.

**Service Account over OAuth.** This one bit me early. I built the first version with OAuth, and the tokens expired after an hour. The workflow died silently overnight. Leads weren't getting scored. I only found out when I checked the next morning. Service Accounts use a static key file — no expiry, no manual re-auth, no silent failures. For any unattended automation, OAuth is the wrong choice.

**Regex parsing over structured output.** The LLM returns free text. I extract the score and reason with regex. Is this fragile? A little. Would JSON mode be cleaner? Yes. But regex ships today, works 98% of the time, and I can upgrade to structured output when it matters. Premature robustness is just another form of not shipping.

## What I Learned

The biggest lesson was that the automation itself is the easy part. The hard part is designing the system so it survives contact with reality — tokens that expire, UIs that lie about saved values, leads that submit forms at 3 AM when no one is watching.

Operations taught me this: a process that works when you're watching it is not a process. A process that works when you're asleep is a process. Every design decision I made on this project was aimed at one thing — making sure the pipeline runs when I'm not there to babysit it.

That's the difference between a demo and a system. Demos impress. Systems run.
