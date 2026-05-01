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
  status: "SYSTEM ONLINE",
  node: "NODE ▸ dev-rajput.ops",
  // Italic quote shown center
  quote: "The real product is the system, not the output.",
  location: "NOIDA · IST",
};

// Nav — the row right below the topbar
export const nav = {
  // The italic glyph in the small box
  glyph: "D/R",
  name: "DEV RAJPUT",
  tagline: "OPERATIONS · AI · SYSTEMS",
  // Right-side button
  ctaLabel: "Open a thread",
};

// Hero — the first big section
export const hero = {
  // Top "ACT I — The Operator" eyebrow
  act: "ACT I",
  actSub: "The Operator",
  // The five lines of the H1. Lines wrapped in { italic: true } become italic+gradient.
  // Lines wrapped in { muted: true } become muted gray.
  headline: [
    { text: "I architect the" },
    { text: "middle layer", italic: true },
    { text: "of the AI stack —" },
    { text: "where models", muted: true },
    { text: "meet payroll.", muted: true },
  ],
  // The lede paragraph. Use **bold** and _italic_ markers (we render them).
  lede: "Three years running client operations for **300+ residential units across 7 towers** taught me one thing: a workflow that runs once in a demo is a toy. A workflow that survives Tuesday morning is a system. _I ship systems._",
  // Buttons
  primaryCta: "See systems shipped",
  primaryHref: "#work",
  ghostCta: "Hire the operator",
  ghostHref: "#contact",
  // Bottom 4-stat strip
  stats: [
    { label: "Units operated", value: "300", suffix: "+" },
    { label: "Resolution time", value: "−35", suffix: "%" },
    { label: "CSAT lift", value: "+20", suffix: "%" },
    // The final stat is special: rendered as plain mono text instead of a big number
    { label: "Stack", stack: "n8n · Claude · Py" },
  ],
};

// Manifest — Act II — the four philosophy rows
export const manifest = {
  act: "ACT II",
  actSub: "The Method",
  // The big italic epigraph on the left
  quote: {
    text: "We are what we _repeatedly_ do. Excellence, then, is not an act, but a habit.",
    attribution: "Aristotle",
    work: "Nicomachean Ethics",
  },
  rows: [
    {
      n: "01",
      title: "Reliability over novelty.",
      body: "A workflow that runs once is a demo. A workflow that runs every Tuesday at 9:14 a.m., handles three malformed payloads and a flaky API, logs each failure with context, and escalates only when humans actually need to look — that is a system. I think in failure modes, not happy paths.",
    },
    {
      n: "02",
      title: "The middle layer is the product.",
      body: "Models are commodity. Prompts are commodity. The thing that survives is the orchestration, the retries, the schemas, the audit log, the human-in-the-loop checkpoints. I design for crash recovery — not just first-run success.",
    },
    {
      n: "03",
      title: "Operations rigor — with real metrics.",
      body: "Three years coordinating 300+ residential units across 7 towers, daily, between sales, legal, finance, and technical teams. SOPs that cut resolution time 35%. An audit process with zero handover rejections. The hardest part of any automation is the human decision still hiding inside it.",
    },
    {
      n: "04",
      title: "Stagecraft applies.",
      body: "I directed plays before I shipped flows. Stage taught me to read a room, run a team under pressure, and communicate clearly when it matters most. Every system is a trust exercise — and trust is built in the tiny moments when something could have gone wrong and didn't.",
    },
  ],
};

// Case studies section header (Act III)
export const cases = {
  act: "ACT III",
  actSub: "Systems shipped",
  headline: ["Eight things I built that", "kept running after I left the room."],
};

// Thinking — Act IV — essay section header
export const thinking = {
  act: "ACT IV",
  actSub: "How I think",
  headline: ["Notes from the", "operations underground."],
  // Essays #2 and #3 here are placeholders — when you're ready to publish them,
  // create real files in /content/essays/ and they'll replace these.
  placeholderEssays: [
    {
      n: "02",
      title: "The unsexy middle layer.",
      desc: "Why the part of the AI stack nobody posts about — orchestration, retries, schemas, the audit log — is the only part with a moat.",
      read: "9 min",
      date: "Coming soon",
    },
    {
      n: "03",
      title: "Stagecraft for systems.",
      desc: "What directing plays taught me about designing workflows: blocking, beats, the dramatic value of a held silence in a Slack thread.",
      read: "6 min",
      date: "Coming soon",
    },
  ],
};

// Path — Act V — experience timeline
export const path = {
  act: "ACT V",
  actSub: "The Path",
  headline: ["Philosophy → theatre →", "operations → AI."],
  sub: "An unusual sequence. The throughline is the same: _build the system, mind the humans inside it._",
  rows: [
    {
      year: "2023 →",
      role: "Client Operations & Coordination",
      org: "County Group · Noida",
      note: "Owned post-sale lifecycle for 300+ residential units. Redesigned client query SOPs. −35% resolution time. +20% CSAT.",
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
      role: "Director · Actor · Philosopher in training",
      org: "Theatre · Zee TV · MBA (Entrepreneurship)",
      note: "Three years on stage and a degree in entrepreneurship. The CV is hybrid because the work is hybrid.",
      tag: "Origin",
    },
  ],
};

// Speaking interlude
export const speaking = {
  act: "INTERMISSION",
  headline: ["Before operations,", "I lived on stage."],
  paragraphs: [
    "I directed plays. Acted in a Zee TV serial. Made short films. Emceed international events.",
    "Public performance taught me what operations later reinforced: _every system is a trust exercise_, and trust is built in the tiny moments when something could have gone wrong and didn't.",
  ],
  signature: "— still posting on Instagram, regularly.",
};

// Contact / Finale
export const contact = {
  act: "FINALE",
  actSub: "The Ask",
  headline: ["Let's build something", "that runs itself."],
  // The word "runs itself" gets the italic gradient treatment
  italicWord: "runs itself.",
  sub: "Looking for AI automation, workflow engineering, and applied AI roles — European or globally distributed teams, full-time or contract. Also open to consulting and founding-team positions at early-stage AI startups.",
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
      label: "Document",
      value: "Resume.pdf",
      href: "/resume.pdf",
    },
  ],
  footer: {
    left: "© 2026 Dev Rajput · Noida · IST",
    middle: "Build the system. Mind the humans inside it.",
    right: "Last deploy · v3.2.1 · all green",
  },
};
