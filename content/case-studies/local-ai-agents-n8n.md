---
title: "AI Lead Qualification Pipeline — n8n + Claude"
slug: "local-ai-agents-n8n"
outcome: "Automated lead scoring pipeline — form to AI qualification to sales alert in under 30 seconds"
role: "Self-initiated builder"
timeline: "2025-2026"
order: 1
---

## Context

Real estate agencies and sales teams lose leads because manual follow-up is too slow, lead quality assessment is inconsistent, and personalized outreach at scale is impossible without automation. A 5-minute delay in lead response drops conversion rates by 80%. I wanted to build a system that eliminates all three problems — and package it as a repeatable service.

## The Problem

The sales funnel for real estate was entirely manual: leads came in, agents responded when they could, quality assessment was gut feeling, and follow-up was inconsistent. High-intent buyers slipped through uncontacted while teams wasted hours chasing low-quality leads. WhatsApp outreach — the dominant communication channel for real estate in India — was done one message at a time.

## How I Approached It

Designed the system as three independent n8n workflows that share a single Google Sheet as the source of truth. Each workflow handles one stage of the funnel: outreach, qualification, and alerting. Built and tested each workflow independently before connecting them. Chose n8n (self-hosted) over Zapier or Make because it is free, open-source, and gives full control over data flow.

## What I Did

- **Infrastructure:** Set up n8n locally with ngrok providing a permanent public URL for lead forms. Used Google Service Account credentials (not OAuth) to prevent token expiry from breaking unattended workflows.
- **Workflow 1 — WhatsApp Bulk Outreach:** Schedule Trigger reads the Google Sheet, filters uncontacted leads, sends personalized WhatsApp messages via Twilio with a direct link to the qualification form, and updates the sheet with "Contacted" status and timestamp.
- **Workflow 2 — AI Lead Qualification:** When a lead submits the form (name, phone, budget, timeline, location, property type), Groq's LLaMA 3.3 70B scores them as HOT, WARM, or COLD with a written reason and recommended action. The score and reason are written back to the Google Sheet automatically.
- **Workflow 3 — HOT Lead Alerts:** An IF node checks the AI score. If HOT, a Gmail node sends an immediate email alert to the sales team with full lead details. HOT leads get contacted within minutes, not hours.
- **Portfolio & Pricing:** Built a client-facing portfolio site with a live demo, three pricing tiers (INR 25K / 50K / 80K), and a working contact form — designed to sell the system as a freelance service to real estate agencies, insurance companies, and education businesses.

## The Outcome

A functional end-to-end pipeline: leads submit a form, AI scores them in real time, results are written to Google Sheets, and HOT leads trigger instant email alerts to the sales team. The system integrates 6 services (n8n, Groq AI, Twilio WhatsApp, Google Sheets, Gmail, ngrok) with zero recurring cost. The architecture is modular enough to deploy for a new client with minimal customization — designed as a repeatable service at INR 25,000–80,000 per deployment.

## What I Learned

- Local AI teaches you the architecture that cloud AI hides from you
- n8n rewards people who think in flows, not scripts — visual workflow design forces you to think about data shape at every handoff
- Never use OAuth for unattended automation — Service Accounts exist for exactly this reason
- A working system is worth ten tutorials
- "Automation" is really just "disciplined process design with code instead of people"
