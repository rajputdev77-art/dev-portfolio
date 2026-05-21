---
title: "job-application-agent"
slug: "job-application-agent"
date: "2026-05-05T00:00:00.000Z"
description: "Fully automated job application pipeline running on n8n + local Ollama (Qwen 2.5 7B) + Playwright. While I sleep, robots search 5 job sites every 4–6 hours, score each job against my profile using AI, generate a tailored CV + cover letter for matches scoring 70+, and submit appli…"
read: "6 min"
order: 52
source: "vault"
---

# Job Application Agent — Project Index

## TL;DR

Fully automated job application pipeline running on **n8n + local Ollama (Qwen 2.5 7B) + Playwright**. While I sleep, robots search 5 job sites every 4–6 hours, score each job against my profile using AI, generate a tailored CV + cover letter for matches scoring 70+, and submit applications automatically.

**Cost:** ₹0/month. **Daily effort:** zero (except clicking submit on Tier 1 manual reviews).

---

## What it does (the 5 robots)

### 1. Scrapers — "The Spies"
Every 4-6 hours, 5 scrapers wake up:
- **LinkedIn** — Customer Success / Project Coordinator / Operations / BDM (India + EU)
- **Naukri** — Same roles for Delhi NCR
- **Indeed** — India + EU
- **Welcome to the Jungle** — European tech roles
- **Tier 1 career pages** — Capgemini, Accenture, JLL, CBRE, EY

Dedupes against memory so it doesn't re-process old jobs.

### 2. Fit Scorer — "The Judge"
Qwen 2.5 7B Instruct on local Ollama (`localhost:11434`) scores each job 0-100:

| Criterion | Points |
|---|---|
| Role title match | 25 |
| Skills match | 25 |
| Experience match (3 yrs) | 15 |
| Salary 10+ LPA | 15 |
| AI/tech relevance | 10 |
| Growth / EU path | 10 |

**HARD FLOOR: 10 LPA.** Below = instant REJECT.
**Threshold: 70+** to apply.

### 3. CV Builder — "The Tailor"
- Uses CV variant A (operations) or B (AI/automation) based on role type
- Rewrites Professional Summary to mirror JD language
- Reorders bullet points to surface relevant experience first
- **Never invents experience** — only rewrites what's already in the base CV
- Generates 250-word cover letter in my voice (direct, not desperate)

### 4. Executor Agents — "The Submitters"
- **India Agent** → Naukri, Indeed India, LinkedIn India (full auto)
- **Abroad Agent** → LinkedIn EU, WTTJ, Indeed EU (full auto with cover letter)
- **Tier 1 Agent** → Capgemini/Accenture/JLL/CBRE/EY: fills form + screenshot + STOPS for my manual submit

### 5. App Logger — "The Notebook"
Writes every action to Google Sheet: timestamp, company, title, platform, score, CV variant, status, URL, notes.

---

## Architecture

```
Scrapers (every 4-6h)
    ↓
Fit Scorer (Qwen 2.5, score 0-100)
    ↓ (70+ only)
CV Builder (tailor CV + write cover letter)
    ↓
Router (India / Abroad / Tier1)
    ↓
Executor Agents (Playwright auto-apply)
    ↓
App Logger (Google Sheets)
    ↓
Local HTML Dashboard (auto-refresh 60s)
```

---

## My Profile Used by the AI

- **Name:** Debu Rajput (Dev)
- **Education:** MBA from Ambedkar University Delhi (2021–2023)
- **Experience:** 3+ years operations & client management
- **Background:** NON-TECHNICAL (operations, stakeholder management, project coordination)
- **AI projects (hobbyist):** JARVIS (Ollama+Python+LangChain), n8n workflows, LangGraph experiments
- **Goal:** Europe relocation (Netherlands, Germany, UK preferred)
- **Min salary:** 10 LPA hard floor

### Target roles (priority order)
1. AI Operations / AI Customer Success / AI Project Coordinator (NON-CODING AI)
2. AI Implementation Specialist / AI Solutions Coordinator
3. Customer Success Manager (AI/SaaS products)
4. Project Coordinator at AI/tech companies
5. Operations Manager at AI/tech firms
6. BDM / Business Analyst at consulting/tech

### Reject roles
- Pure software engineer / data scientist / ML engineer (I'm non-technical)
- Real estate sales, cold calling, telesales, data entry
- Anything below 10 LPA

### Key metrics in every CV (never remove)
- 35% faster query resolution
- 20% CSAT improvement
- 97% event satisfaction (90+ attendees)
- Zero possession handover rejections
- 20% HR escalation reduction (Conscient)
- 300+ residential units managed

---

## Tech Stack

| Component | Tool | Cost |
|---|---|---|
| Workflow engine | n8n (local, port 5678) | Free |
| AI model | Qwen 2.5 7B Instruct via Ollama (port 11434) | Free |
| Browser automation | Playwright + Chromium | Free |
| Application log | Google Sheets | Free |
| Dashboard | Local HTML reading Google Sheet CSV | Free |

**Originally built on Anthropic Claude API → migrated to local Ollama** for zero cost + privacy.

---

## File Reference

```
job-agent/
├── HOW_IT_WORKS.md                  # Plain English explanation of all 5 robots
├── SETUP_GUIDE.md                   # Step-by-step walkthrough
├── README.md                        # Technical setup
├── .env                             # Local config (OLLAMA_MODEL, MIN_SALARY_LPA, etc.)
├── cv/
│   ├── cv_variant_a.md              # Operations-heavy CV (default)
│   ├── cv_variant_b.md              # AI/Automation-heavy CV
│   └── master_profile.md            # Full profile for AI context (don't modify)
├── prompts/
│   ├── fit_scorer.md                # AI Judge criteria + hard 10 LPA filter
│   ├── cv_tailor.md                 # CV tailoring rules
│   └── cover_letter.md              # My voice for cover letters
├── core/
│   ├── fit_scorer.json              # n8n: webhook /score-job
│   ├── cv_builder.json              # n8n: webhook /build-cv
│   └── app_logger.json              # n8n: webhook /log-application
├── agents/
│   ├── india_agent.json             # n8n: webhook /apply-india
│   ├── abroad_agent.json            # n8n: webhook /apply-abroad
│   └── tier1_agent.json             # n8n: webhook /apply-tier1 (manual review)
├── scrapers/
│   ├── linkedin_rss.json            # every 4h
│   ├── naukri_scraper.json          # every 4h
│   ├── indeed_scraper.json          # every 4h
│   ├── wttj_scraper.json            # every 6h
│   └── tier1_scraper.json           # every 6h
├── playwright/
│   ├── linkedin_apply.js            # LinkedIn Easy Apply
│   ├── naukri_apply.js              # Naukri apply form
│   └── tier1_form_fill.js           # Tier 1 ATS (no auto-submit)
├── dashboard/
│   └── index.html                   # Live dashboard reading Google Sheet
├── setup/
│   ├── install.sh                   # Full install
│   ├── test_scorer.js               # Verify AI scorer end-to-end
│   ├── FIX_AUTOSTART_ONCE.bat       # One-time admin fix for SoulInMotion-n8n RunLevel
│   └── KILL_AND_RESTART_N8N.bat     # Manual restart helper
└── output/                          # Generated CVs, cover letters, screenshots
```

---

## Critical Operational Notes

### Soul in Motion + Job Agent share the same n8n
- Soul in Motion's `SoulInMotion-n8n` scheduled task auto-starts n8n at boot
- Both projects' workflows live in the same n8n SQLite DB
- Restarting n8n briefly pauses Soul in Motion (~10s) but no data is lost
- Original task ran with elevated privileges (locked port 5678 from non-admin sessions)
- Fixed by `setup/FIX_AUTOSTART_ONCE.bat` (downgrades RunLevel from Highest → Limited)
- After running once, future n8n bounces work without admin

### What I have to do daily
**Nothing.** Except:
- Click "Submit" on Tier 1 forms (Capgemini/Accenture/JLL/CBRE/EY) after reviewing screenshot
- Open dashboard to see what was applied to overnight

### What I edit when I want to tune behavior
- `cv/cv_variant_a.md` / `cv_variant_b.md` — my CVs
- `prompts/fit_scorer.md` — what the Judge looks for
- `prompts/cover_letter.md` — my voice
- `.env` — `MIN_SALARY_LPA` and `FIT_THRESHOLD`

---

## Setup Status (as of 2026-05-05)

| Step | Status |
|---|---|
| Folder structure created | ✅ Done |
| All 11 n8n workflows built | ✅ Done |
| All 3 Playwright scripts built | ✅ Done |
| 2 CV variants written | ✅ Done |
| Ollama + Qwen 2.5 7B installed | ✅ Done |
| Workflows imported to n8n via CLI | ✅ Done |
| Workflows activated in n8n DB | ✅ Done |
| Pushed to GitHub | ✅ Done |
| Dashboard built | ✅ Done |
| **n8n auto-start fixed (run FIX_AUTOSTART_ONCE.bat)** | ⏳ Pending |
| **Google Sheet created + headers** | ⏳ Pending |
| **Dashboard linked to Sheet ID** | ⏳ Pending |
| **Google Sheets service account credentials** | ⏳ Future |
| **15-day no-reply follow-up watcher** | ⏳ Future |

---

## Future Iterations

1. **Google Sheets service account credentials** — so n8n can WRITE (not just dashboard READ)
2. **15-day no-reply follow-up watcher** — auto-nudge after 15 days no reply
3. **WhatsApp/Email notification** — ping when Tier 1 form is ready for manual submit
4. **Glassdoor scraper** — additional pipeline source

---

## Related Knowledge

- [[ai-agents-learning/_index]] — broader AI agent architecture notes
- [[europe-relocation/_index]] — Europe relocation strategy and target companies
- [[real-estate-automation/_index]] — current job context (will be replaced when relocated)
- [[../personal-brand/_index]] — LinkedIn presence (Soul in Motion)

## Links

- **GitHub:** https://github.com/rajputdev77-art/job-application-agent
- **Notion mirror:** https://www.notion.so/357041fd6d2281e4ab9fc3fbf799f1fb
- **Local:** `C:\Users\Dev\Desktop\Job Agents\job-agent\`
- **n8n UI:** http://localhost:5678
- **Ollama:** http://localhost:11434

---

## Build Log

**2026-05-05** — Initial build (all 26 files, ~2,500 lines)
**2026-05-05** — Migrated Anthropic API → local Ollama (Qwen 2.5 7B)
**2026-05-05** — Tightened filters: 10 LPA min, 70+ threshold, AI non-coding focus
**2026-05-05** — Added live HTML dashboard
**2026-05-05** — Added FIX_AUTOSTART_ONCE.bat (Soul in Motion task RunLevel fix)
**2026-05-05** — Added HOW_IT_WORKS.md + SETUP_GUIDE.md
