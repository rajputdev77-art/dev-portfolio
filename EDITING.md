# Editing Your Portfolio

Everything on this site is editable from a few text files. No code knowledge needed for content edits — just open a file, change words, save, and `git push`. Vercel auto-deploys in ~30 seconds.

## The 4 Files You'll Touch

| What you want to change | File |
|---|---|
| Hero copy, tagline, stats, manifest rows, timeline, contact, footer | `content/site.ts` |
| Add a new case study | `content/case-studies/<your-slug>.md` (new file) |
| Edit a case study's title or summary card on the homepage | The frontmatter at the top of that case study's `.md` file |
| Add a new essay | `content/essays/<your-slug>.md` (new file) |
| The actual case study or essay article body | The markdown body of that `.md` file |

That's it. Almost everything text-related lives in one of these places.

---

## Editing the Homepage Copy

Open **`content/site.ts`**. It's organized by section:

```ts
export const hero = {
  headline: [
    { text: "I architect the" },
    { text: "middle layer", italic: true },   // ← italic + green gradient
    { text: "of the AI stack —" },
    { text: "where models", muted: true },    // ← muted gray
    { text: "meet payroll.", muted: true },
  ],
  ...
};
```

- `italic: true` → that line becomes the green italic gradient
- `muted: true` → that line becomes the muted gray
- Plain string → normal white text

Inside the lede paragraph (`hero.lede`), `quote` blocks, the path `sub`, and speaking paragraphs:
- `**bold text**` → renders bold
- `_italic text_` → renders italic with the accent color

**Hero stats** — change numbers, labels, or suffixes:
```ts
stats: [
  { label: "Units operated", value: "300", suffix: "+" },
  ...
]
```

**The 4th stat is special** — it's text-only (the stack):
```ts
{ label: "Stack", stack: "n8n · Claude · Py" }
```

---

## Adding a New Case Study

1. Create a new file: `content/case-studies/my-new-project.md`
2. Use this template:

```markdown
---
title: "My New Project"
slug: "my-new-project"
outcome: "One-line headline result that goes on the card."
role: "Self-initiated builder"
timeline: "2026"
order: 9                  # higher = further down. Re-order existing files to move things around.
kind: "diagram"           # one of: "diagram" | "log" | "metric"
tag: "n8n · Claude · whatever"
---

## Context
What was happening before, why this mattered.

## The Problem
Specific obstacle.

## How I Approached It
The shape of the solution.

## What I Did
The actual build — bullets are great here.

## The Outcome
What worked. Numbers if you have them.

## What I Learned
The lessons.
```

3. Save, commit, push. The card appears on the homepage and a full page renders at `/case-studies/my-new-project`.

### Choosing the `kind`

Each card on the homepage uses one of three visual treatments:

- **`diagram`** — animated mini workflow graph. Good for: pipelines, flows, multi-step systems.
- **`log`** — terminal-style log lines. Good for: anything streaming, automation, AI calls.
- **`metric`** — three big numbers. Requires the `metrics:` field below.

For `kind: "metric"`, add this to the frontmatter:

```yaml
metrics:
  - num: "97"
    unit: "%"
    label: "satisfaction"
  - num: "300"
    unit: "u"
    label: "portfolio"
  - num: "−35"
    unit: "%"
    label: "resolution time"
```

Three rows, each with a number, unit (small text after), and label.

### Visual rhythm

Try not to put two cards of the same kind next to each other in the grid. Current order alternates `diagram → metric → log → metric → diagram → log → metric → diagram` so adjacent cards always look different.

---

## Adding a New Essay

1. Create `content/essays/my-essay.md`:

```markdown
---
title: "My Essay Title"
slug: "my-essay"
date: "April 2026"
description: "One-line description for the card on the homepage."
order: 2
read: "8 min"
---

Your essay content here in markdown.

## A heading

Body text. **Bold** works. _Italic_ works.

> Pull quotes work too.
```

2. The first 3 essays (sorted by `order`) appear on the homepage. Add as many as you want.

3. **Removing placeholders:** `content/site.ts` has two placeholder essay cards (`thinking.placeholderEssays`). They auto-disappear as you publish real essays. To remove them entirely, set that array to `[]`.

---

## The Tweaks Panel (Bottom-Right)

The floating gear icon at the bottom-right of the page lets visitors:
- Toggle between dark and light theme
- Pick a different accent color
- Adjust motion intensity (animations)
- Switch the hero centerpiece between the workflow diagram and the live log

Their preference saves to their browser. You can hide the panel entirely by deleting `<TweaksPanel ... />` from `components/Shell.tsx`.

---

## Common Tasks

**Update the topbar quote** → `content/site.ts` → `topbar.quote`

**Change "Open a thread" CTA in the nav** → `content/site.ts` → `nav.ctaLabel`

**Update the Aristotle quote** → `content/site.ts` → `manifest.quote`

**Add a job to the timeline** → `content/site.ts` → `path.rows` (insert a new object in the array)

**Change the email / LinkedIn / resume links** → `content/site.ts` → `contact.cards`

**Drop in a resume PDF** → save it as `public/resume.pdf` and the existing button works

**Update the footer** → `content/site.ts` → `contact.footer`

---

## Deployment

Every push to the `master` branch on GitHub auto-deploys to Vercel. There's nothing to configure. Live URL: https://dev-portfolio-dun-theta.vercel.app

```bash
git add .
git commit -m "update: hero copy"
git push
# Done. Live in ~30s.
```

## Local preview

To see edits before pushing:

```bash
npm run dev
# open http://localhost:3000
```
