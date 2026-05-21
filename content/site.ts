// ─────────────────────────────────────────────────────────────────────────────
//  EDIT THIS FILE TO CHANGE COPY ON THE SITE.
//
//  Everything here is rendered into the homepage. Edit a string, save,
//  push to GitHub, and Vercel auto-deploys in ~30 seconds.
//
//  See EDITING.md in the project root for a full guide.
// ─────────────────────────────────────────────────────────────────────────────

// Topbar — the strip across the very top of the page
export const topbar = {
  status: "BUILDING IN PUBLIC",
  node: "NODE ▸ dev-rajput.build",
  // Italic quote shown center
  quote: "Philosophy trained the mind. AI gave me the tools. Now I build.",
  location: "INDIA · IST · GLOBAL",
};

// Nav — the row right below the topbar
export const nav = {
  // The italic glyph in the small box
  glyph: "D/R",
  name: "DEV RAJPUT",
  tagline: "AI OPS · AUTOMATION · BUILDER",
  // Right-side button
  ctaLabel: "Let's connect",
};

// Hero — the first big section
export const hero = {
  // Top eyebrow
  act: "01",
  actSub: "The pivot, in motion",
  // The five lines of the H1. Lines wrapped in { italic: true } become italic+gradient.
  // Lines wrapped in { muted: true } become muted gray.
  headline: [
    { text: "Philosophy trained" },
    { text: "my mind." },
    { text: "AI gave me", muted: true },
    { text: "the tools.", muted: true },
    { text: "Now I build.", italic: true },
  ],
  // The lede paragraph. Use **bold** and _italic_ markers (we render them).
  lede: "**AI Operations & Automation** — building agents, workflows, and systems from scratch. _Self-taught. Building in public. Available globally._",
  // Buttons
  primaryCta: "See what I'm building",
  primaryHref: "#work",
  ghostCta: "Let's connect",
  ghostHref: "#connect",
  // Bottom 4-stat strip — builder stats, not ops stats
  stats: [
    { label: "Projects shipped", value: "12", suffix: "+" },
    { label: "Years operating", value: "3", suffix: "+" },
    { label: "Days building", value: "Daily", suffix: "" },
    // The final stat is special: rendered as plain mono text instead of a big number
    { label: "Stack", stack: "Python · n8n · Claude" },
  ],
  scrollHint: "Scroll",
};

// Story — Act II — the narrative of how he got here
export const story = {
  act: "02",
  actSub: "The story",
  // Pull quote, headlined on the left side
  quote: {
    text: "I don't have a CS degree. I have a philosophy degree, an MBA, and a refusal to stay _average_.",
    attribution: "Dev Rajput",
    work: "The throughline",
  },
  // 3 short paragraphs of prose — first person
  paragraphs: [
    "I came up the long way. A BA in Philosophy. Then an MBA in Innovation & Entrepreneurship. Then three years running real-estate operations — 300+ residential units, 7 towers, the kind of work where a missed email costs someone their home. The frameworks were sharp. The thinking was there. But for a long time, none of it felt like the right arena.",
    "AI changed the equation. Not as a buzzword — as a genuine leverage multiplier. I stopped using other people's tools and started building my own. n8n workflows. WhatsApp automations. AI lead scoring. A local voice assistant. An autonomous knowledge system. Trading agents. A content engine. Zero CS background. Pure systems thinking and a refusal to be average.",
    "Right now, I'm pivoting full-time into AI Operations & Automation — building daily, shipping in public, and writing about every step. This site is the proof of that pivot. Each project here is one I built, one I broke, and one I'd build again.",
  ],
  // Image placeholder — replace with /public/me.jpg
  photo: {
    src: "",
    alt: "Dev Rajput",
    caption: "Add a photo to /public/me.jpg — referenced from content/site.ts",
  },
};

// What I'm Building — Act III — case studies
export const cases = {
  act: "03",
  actSub: "What I'm building",
  headline: ["Things I've actually built —", "every one of them, no resume gloss."],
};

// From the Vault — Act IV — surfaced notes + essays
export const vault = {
  act: "04",
  actSub: "From the vault",
  headline: ["Notes from the build —", "what I'm thinking about as I work."],
  // Placeholder slots shown only when there are fewer than 3 published notes.
  placeholders: [
    { n: "01", title: "Why I left the 'thinker only' lane", desc: "Coming soon — notes on the moment the build started.", read: "—", date: "Soon" },
    { n: "02", title: "The middle layer is the product", desc: "Coming soon — on orchestration, schemas, and the boring parts that matter.", read: "—", date: "Soon" },
    { n: "03", title: "Building in public is a forcing function", desc: "Coming soon — on showing the work before it's polished.", read: "—", date: "Soon" },
  ],
  more: "More notes get published as they're written. The vault is alive.",
};

// Right Now — Act V — live, file-driven status board.
// The actual content is in /content/now.md (manually editable).
export const now = {
  act: "05",
  actSub: "Right now",
  headline: ["What I'm working on,", "this week, this month."],
  sub: "A live dashboard, not a blog post. Updated by hand — when it changes, this changes.",
};

// See the Work — Act VI — Proof: live deployments + GitHub
export const proof = {
  act: "06",
  actSub: "See the work",
  headline: ["Repos. Demos.", "Things you can actually click."],
  links: [
    {
      label: "GitHub",
      value: "github.com/rajputdev77-art",
      href: "https://github.com/rajputdev77-art",
      note: "Source code · daily commits",
    },
    {
      label: "JARVIS",
      value: "Voice assistant · local",
      href: "https://github.com/rajputdev77-art",
      note: "Python · Whisper · Anthropic API",
    },
    {
      label: "Second Brain",
      value: "Obsidian + Claude + n8n",
      href: "https://github.com/rajputdev77-art",
      note: "Autonomous knowledge system",
    },
    {
      label: "This site",
      value: "dev-portfolio repo",
      href: "https://github.com/rajputdev77-art/dev-portfolio",
      note: "Next.js · TypeScript · deployed on Vercel",
    },
  ],
};

// Experience & Background — Act VII — career timeline + CV
export const path = {
  act: "07",
  actSub: "Experience & background",
  headline: ["Philosophy → MBA →", "ops → AI."],
  sub: "The sequence looks unusual. The throughline is the same: _build the system, mind the humans inside it._",
  // Top highlights row — short, scannable
  highlights: {
    current: "AI Operations & Automation — building agents and workflows full-time",
    education: "MBA, Innovation & Entrepreneurship · BA, Philosophy",
    skills: "AI Ops · n8n · Python · Claude / OpenAI APIs · CRM · Prompt engineering · Voice/agent pipelines",
    wins: [
      "300+ residential units operated across 7 towers · 3 years",
      "−35% client query resolution time · zero handover rejections",
      "12+ AI/automation projects shipped in 12 months, zero CS degree",
    ],
  },
  cv: {
    label: "Download full CV",
    href: "/resume.pdf",
  },
  rows: [
    {
      year: "2026 →",
      role: "AI Operations & Automation — building independently",
      org: "Self-directed · Building in public · Open to global roles",
      note: "Shipping JARVIS, Second Brain, content systems, lead-qual pipelines, and trading agents. Writing about every step. Targeting AI Ops / Automation Engineer roles, remote-first, Europe-priority.",
      tag: "Current",
    },
    {
      year: "2026 →",
      role: "Assistant Manager — CRM",
      org: "Paras Buildtech · Gurgaon, Haryana",
      note: "Managing the day-to-day CRM team across the post-sale client lifecycle — workload allocation, resolution KPIs, cross-functional coordination between sales, finance, legal, and technical teams.",
      tag: "Day job",
    },
    {
      year: "2023–26",
      role: "Client Operations & Coordination",
      org: "County Group · Noida",
      note: "Owned post-sale lifecycle for 300+ residential units. Redesigned client query SOPs. −35% resolution time. +20% CSAT. Jul 2023 – Apr 2026.",
      tag: "Operations",
    },
    {
      year: "2022–23",
      role: "Special Event Manager · Emcee",
      org: "Freelance · Delhi",
      note: "Led full lifecycle of an international panel event. 90+ attendees · 97% satisfaction. Hosted live, under pressure.",
      tag: "Stagecraft",
    },
    {
      year: "2019–20",
      role: "HR Intern",
      org: "Conscient Infrastructure · Gurugram",
      note: "Onboarding ops + ERP-based data management. Streamlined comms — 20% reduction in internal escalations.",
      tag: "Foundations",
    },
    {
      year: "Earlier",
      role: "MBA · BA Philosophy · Theatre · Television",
      org: "MBA in Innovation & Entrepreneurship · BA Philosophy · Stage director · Zee TV role",
      note: "Three years on stage, a philosophy degree, and an MBA in entrepreneurship. The CV is hybrid because the work is hybrid.",
      tag: "Origin",
    },
  ],
};

// Connect / Finale
export const contact = {
  act: "08",
  actSub: "Connect",
  headline: ["Building in public.", "Open to the right room."],
  // The word that gets the italic gradient treatment
  italicWord: "the right room.",
  sub: "Open to AI Operations & Automation roles — full-time, contract, or founding-team. Remote-first, Europe priority. Also open to collaborations and good conversations.",
  cards: [
    {
      label: "Email",
      value: "rajputdev77@gmail.com",
      href: "mailto:rajputdev77@gmail.com",
      primary: true,
    },
    {
      label: "LinkedIn",
      value: "/in/devrajput07",
      href: "https://www.linkedin.com/in/devrajput07/",
    },
    {
      label: "GitHub",
      value: "github.com/rajputdev77-art",
      href: "https://github.com/rajputdev77-art",
    },
    {
      label: "Document",
      value: "Download CV",
      href: "/resume.pdf",
    },
  ],
  footer: {
    left: "© 2026 Dev Rajput · India · IST",
    middle: "Build the system. Mind the humans inside it.",
    right: "Last deploy · all green",
  },
};

