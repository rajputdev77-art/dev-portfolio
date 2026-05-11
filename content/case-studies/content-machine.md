---
title: "Content Machine — 30-Day Launch System"
slug: "content-machine"
outcome: "Complete launch kit — 30 days of pre-written Instagram + LinkedIn content with automation layer for hands-off publishing"
role: "Founder · Product builder"
timeline: "2026"
order: 12
kind: "metric"
tag: "Product · Markdown kit · n8n · Gumroad"
type: "product"
metrics:
  - num: "30"
    unit: "d"
    label: "of content"
  - num: "2"
    unit: "ch"
    label: "platforms"
  - num: "10"
    unit: ""
    label: "DM templates"
---

## Context

Most creators don't fail at content because they can't write. They fail because they can't sustain. Coming up with a hook, a caption, a hashtag set, a reel script — every day, for 30 days, across two platforms — is the unsustainable part. I built Content Machine as a product to solve exactly that.

## The Problem

Existing "content calendar" products give you a spreadsheet. That's not the problem. The problem is the blank page that opens at 9pm on day 4 when you're tired and out of ideas. Buyers don't need another spreadsheet. They need 30 days of pre-written, ready-to-post content, in their voice, with a clear week-by-week framework.

## How I Approached It

Two layers — the kit (what buyers consume) and the automation (what makes it run itself):
1. **The kit** — 30 days of pre-written captions, hooks, hashtags, reel scripts, Story scripts, LinkedIn long-form versions, and DM templates.
2. **The automation layer** — 4 importable n8n workflows + Python orchestrator fallback, so buyers can wire it into their own posting pipeline if they want hands-off operation.

The kit ships even if the automation isn't activated. The automation is the upsell.

## What I Did

- **30 days of pre-written content across Instagram + LinkedIn**, with each day grouped under a clear framework theme: **Show · Teach · Behind-the-scenes · Soft-sell**.
- **Hooks, captions, hashtag sets, reel scripts, Story scripts** — all pre-written and post-ready.
- **LinkedIn long-form versions** for each Instagram post — so the buyer gets one input that produces two outputs across two platforms.
- **10 DM templates** for follow-up conversations — opener, value-led, qualifier, soft-sell, hard-sell, objection-handler, payment link, follow-up, breakup, reactivation.
- **Week-by-week action plans** — Show / Teach / Behind-the-scenes / Soft-sell — with daily checklists.
- **4 importable n8n workflows** — schedule, format, post, log. Drop them into any n8n instance.
- **Python orchestrator fallback** — for buyers who don't run n8n.
- **Gumroad-ready product setup** — descriptions, pricing, asset bundle.
- **Posting log CSV** — track every post, every reach, every engagement number, every conversion.
- **MASTER_AUTOMATION_RUNBOOK.md** — the entry point that ties the manual kit to the automation layer.

## The Outcome

A buyer-facing product launching on Gumroad. The content is complete and ready to ship today; the automation layer is documented and the workflow JSONs + orchestrator are in the repo. The next milestone is the first paying customer.

## What I Learned

- **Productizing your own system is the cheapest market test you can run.** Building Content Machine forced me to articulate the exact framework I'd been using informally for myself.
- **Buyers pay for the *finished* output, not the recipe.** A spreadsheet template would have been worse than zero — pre-written content is the actual product.
- **The kit has to ship without the automation.** If a buyer has to set up n8n before they can use the product, the product is broken.
- **A 30-day kit is the right size.** Less feels thin. More feels overwhelming. 30 is a month — a unit buyers can imagine completing.
