---
title: "job-agent-control-panel"
slug: "job-agent-control-panel"
date: ""
description: "Mirror of C:\\Users\\Dev\\Desktop\\Job Agents\\jobagent\\CONTROLPANEL.md 1. Open dashboard each morning: doubleclick dashboard\\OPENDASHBOARD.bat 2. Click submit on Tier 1 forms (Capgemini/Accenture/JLL/CBRE/EY) when screenshots appear in output\\ 3. Rerun LOGINONCE.bat if applications s…"
read: "1 min"
order: 51
source: "vault"
---

# Job Agent — Control Panel (Quick Reference)

Mirror of `C:\Users\Dev\Desktop\Job Agents\job-agent\CONTROL_PANEL.md`

## TL;DR daily routine

1. Open dashboard each morning: double-click `dashboard\OPEN_DASHBOARD.bat`
2. Click submit on Tier 1 forms (Capgemini/Accenture/JLL/CBRE/EY) when screenshots appear in `output\`
3. Re-run `LOGIN_ONCE.bat` if applications start failing (~monthly)

That's all I do. Agent runs the rest.

## Auth saved 2026-05-07

- `playwright\linkedin_auth.json` (23 KB)
- `playwright\naukri_auth.json` (20 KB)

Re-run `LOGIN_ONCE.bat` when these expire (~monthly).

## The 3 agents

| Agent | Platforms | Behavior |
|---|---|---|
| India | Naukri + LinkedIn India + Indeed India | Auto-applies |
| Abroad | LinkedIn EU + WTTJ + Indeed EU | Auto-applies + cover letter |
| Tier 1 | Capgemini + Accenture + JLL + CBRE + EY | Fills + screenshots, manual submit |

## Filtering

- Llama scores 0-100
- Hard 10 LPA floor (instant reject below)
- Threshold 70+ to apply
- Reject coding roles (SE, DS, ML eng) — Dev is non-technical
- Bonus for AI-adjacent ops roles + Europe paths

## Schedule

- LinkedIn / Naukri / Indeed: every 4h (6x/day)
- WTTJ / Tier 1: every 6h (4x/day)
- Daily cap: 30 per platform → max ~150/day total

## Edit points

- Score criteria: `prompts\fit_scorer.md`
- Salary floor: `prompts\fit_scorer.md` + `.env` MIN_SALARY_LPA
- CV: `cv\cv_variant_a.md` (ops) or `cv\cv_variant_b.md` (AI)
- Cover letter voice: `prompts\cover_letter.md`
- Search keywords: n8n UI → Workflows → respective Scraper → Build Search URLs node
- Tier 1 companies: n8n UI → Tier 1 Career Pages → Build Tier1 Targets node
- Daily rate: `playwright\application_log.js` DAILY_LIMIT

After editing prompts, re-sync via:
```
python "C:\Users\Dev\Desktop\Job Agents\job-agent\setup\activate_workflows.py"
```

## See applied jobs

- Dashboard: `dashboard\OPEN_DASHBOARD.bat`
- CLI: `node playwright\application_log.js stats|list`
- Raw: `setup\applied_jobs.json`
- Generated docs: `output\` folder

## GitHub

https://github.com/rajputdev77-art/job-application-agent
