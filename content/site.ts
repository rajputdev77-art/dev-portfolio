// ─────────────────────────────────────────────────────────────────────────────
//  EDIT THIS FILE TO CHANGE COPY ON THE SITE.
//
//  Everything here is rendered into the homepage. Edit a string, save,
//  push to GitHub, and Vercel auto-deploys in ~30 seconds.
// ─────────────────────────────────────────────────────────────────────────────

// Marquee ticker at the very top
export const ticker = {
  items: [
    "// BUILDING IN PUBLIC //",
    "12+ PROJECTS SHIPPED",
    "● LIVE · DEPLOY ALL GREEN",
    "PHILOSOPHY → MBA → OPS → AI",
    "DAILY · NO MISSES",
    "300+ UNITS · 7 TOWERS · 3 YEARS",
    "OPEN TO ROLES · EUROPE PRIORITY",
    "PYTHON · N8N · CLAUDE · OLLAMA",
    "REFUSAL TO STAY AVERAGE",
  ],
  // Indices of items rendered in red.
  redIndices: [2, 6],
};

// Nav row
export const nav = {
  brand: "DEV / RAJPUT",
  links: [
    { label: "01 STORY", href: "#story" },
    { label: "02 WORK", href: "#work" },
    { label: "03 VAULT", href: "#vault" },
    { label: "04 NOW", href: "#now" },
    { label: "05 CV", href: "#path" },
  ],
  cta: { label: "CONNECT ↗", href: "#connect" },
};

// Hero — Act I
export const hero = {
  metaNode: "DEV-RAJPUT.BUILD",
  metaLocation: "IST · INDIA · GLOBAL",
  metaBadge: "ON AIR",
  metaVolume: "VOL. III · NO. 042",
  // 5 alternate headline rotations (3 lines each).
  headlines: [
    ["PHILOSOPHY", "+&nbsp;AI&nbsp;=", "NOW I BUILD."],
    ["PHILOSOPHY", "TRAINED MY MIND.", "NOW I BUILD."],
    ["NO CS DEGREE.", "NO PERMISSION.", "JUST BUILDS."],
    ["SHIP DAILY.", "BUILD LOUD.", "SLEEP LATER."],
    ["STAGE · OPS", "· AI · NOW.", "BUILDING OUT LOUD."],
  ],
  deck: {
    // <b> wraps a black/yellow chip; <em> wraps red text.
    html: '<b>AI Operations &amp; Automation.</b> Building agents, workflows, and systems <em>from scratch.</em><br/>Self-taught. <b>Building in public.</b> Available globally.',
  },
  primaryCta: { label: "SEE THE WORK", href: "#work" },
  ghostCta: { label: "LET'S TALK", href: "#connect" },
};

// Stats slabs (5)
export const slabs = [
  { label: "Projects shipped", value: "12", suffix: "+", note: "case studies · live" },
  { label: "Years operating", value: "3", suffix: "+", note: "300 units · 7 towers" },
  { label: "Days since pivot", value: "—", suffix: "", note: "to AI ops · counting", kind: "pivot" }, // value filled live
  { label: "Cadence", value: "DAILY", suffix: "", note: "no misses · no excuses", small: true },
  { label: "Stack", value: "PYTHON\nN8N · CLAUDE", suffix: "", note: "+ ollama · gemini · groq", small: true, multi: true },
];

// Pivot anchor date — used for "Days since pivot" live counter.
export const pivotDate = "2025-05-01T00:00:00Z";

// Story — Act II
export const story = {
  act: "01",
  actSub: "THE STORY",
  rhs: "// THE PIVOT, IN MOTION",
  photo: {
    tape: "DEV / RAJPUT · ON STAGE · 2023",
    stamp: "// LIVE",
    captionTitle: "The throughline.",
    caption: "BA Philosophy · MBA · stage · ops · AI. Same person.",
    treatments: [
      { id: "duotone", label: "DUOTONE", src: "/photos/dev-portrait-duotone.jpg", blend: "multiply", bg: "var(--yellow)" },
      { id: "halftone", label: "HALFTONE", src: "/photos/dev-portrait-halftone.png", blend: "normal", bg: "var(--paper)" },
      { id: "bw", label: "B&W", src: "/photos/dev-portrait-bw.jpg", blend: "normal", bg: "var(--paper)" },
    ],
  },
  quote: {
    // The quote uses inline highlights. Each line gets rendered separately.
    lines: [
      "I DON'T HAVE A CS DEGREE.",
      'I HAVE A <r>PHILOSOPHY</r> DEGREE,',
      'AN <r>MBA</r>, AND A',
      'REFUSAL TO STAY <s>AVERAGE</s>.',
    ],
    by: "DEV RAJPUT // THE THROUGHLINE",
  },
  paragraphs: [
    'I came up the long way. A <b>BA in Philosophy</b>. Then an <b>MBA in Innovation &amp; Entrepreneurship</b>. Then three years running real-estate operations — <strong>300+ residential units, 7 towers</strong>, the kind of work where a missed email costs someone their home.',
    "AI changed the equation. Not as a buzzword — as a <strong>genuine leverage multiplier</strong>. I stopped using other people's tools and started building my own. n8n workflows. WhatsApp automations. AI lead scoring. A local voice assistant. An autonomous knowledge system. Trading agents. A content engine. <b>Zero CS background.</b> Pure systems thinking.",
    "Right now, I'm pivoting full-time into <strong>AI Operations &amp; Automation</strong> — building daily, shipping in public, and writing about every step. Each project here is one I built, one I broke, and one I'd build again.",
  ],
  athleteLabel: "OFF THE <em>CLOCK</em>.",
  athleteCaption: "// Same operating system. Stage, then court, then field. Systems thinking shows up everywhere.",
  polaroids: [
    { src: "/photos/photo-basketball.jpg", tape: "BASKETBALL · NO. 15", stamp: "// GOLD", title: "Hoops.", caption: "Tournament medal · campus court · post-game." },
    { src: "/photos/photo-football-1.jpg", tape: "AFL '23 · MIDFIELD", stamp: "// CUP", title: "Ambedkar FL.", caption: "Winner · 2023 season · trophy + medal." },
    { src: "/photos/photo-football-2.jpg", tape: "SKY BLUE KIT", stamp: "// MVP", title: "League run.", caption: "Second leg · same trophy · sharper shot." },
  ],
};

// Work — Act III
export const cases = {
  act: "02",
  actSub: "THE WORK",
  rhs: "// 12 CASE STUDIES // NO RESUME GLOSS",
  headline: 'THINGS I <em>ACTUALLY</em> BUILT.',
  deck: "EVERY ONE OF THEM. STACK NOTES, REAL NUMBERS, AND WHERE THINGS BROKE.",
};

// Vault — Act IV
export const vault = {
  act: "03",
  actSub: "THE VAULT",
  rhs: "// NOTES FROM THE BUILD // ★ = PINNED",
  // Slugs that should be visually pinned (★).
  pinned: [
    "hybrid-retrieval-outperforms-pure-semantic-search",
    "memory-graphs-beat-giant-memory-files",
    "the-persist-step-is-where-value-compounds",
  ],
  placeholders: [
    { n: "01", title: "Why I left the 'thinker only' lane", desc: "Coming soon — notes on the moment the build started.", read: "—", date: "Soon" },
    { n: "02", title: "The middle layer is the product", desc: "Coming soon — on orchestration, schemas, and the boring parts that matter.", read: "—", date: "Soon" },
    { n: "03", title: "Building in public is a forcing function", desc: "Coming soon — on showing the work before it's polished.", read: "—", date: "Soon" },
  ],
};

// Now — Act V (content driven by /content/now.md)
export const now = {
  act: "04",
  actSub: "RIGHT NOW",
  rhs: "// LIVE LEDGER · HAND-KEPT",
  // 3 columns, each with title + sup letter
  cols: [
    { id: "building", sup: "A.", title: "BUILDING", colorClass: "" },
    { id: "learning", sup: "B.", title: "LEARNING", colorClass: "b" },
    { id: "thinking", sup: "C.", title: "THINKING", colorClass: "c" },
  ],
  footLeft: "LAST UPDATED · ",
  footMid: "NO CMS · NO FLUFF · HAND-KEPT LEDGER",
  footRight: "SESSION 042 · ACTIVE",
};

// EXTRAS — deck cards that only render if data is present.
// Set any of these to null to hide that card.
export const extras = {
  nowPlaying: null as null | { title: string; artist: string; album?: string; platform?: string; url?: string },
  nowWatching: null as null | { title: string; kind?: string; note?: string; url?: string },
  reading: null as null | { title: string; author?: string; note?: string; url?: string },
};
export const githubUser = "rajputdev77-art";

// CV / Path — Act VI
export const path = {
  act: "05",
  actSub: "THE CV",
  rhs: "// PHILOSOPHY → MBA → OPS → AI",
  headline: 'PHILOSOPHY <arr/> MBA <arr/> <em>OPS → AI.</em>',
  quicks: [
    { num: "300+", body: "RESIDENTIAL UNITS OPERATED ACROSS 7 TOWERS · 3 YEARS" },
    { num: "−35%", body: "CLIENT QUERY RESOLUTION · ZERO HANDOVER REJECTIONS" },
    { num: "12+", body: "AI / AUTOMATION PROJECTS SHIPPED IN 12 MONTHS · ZERO CS DEGREE" },
  ],
  rows: [
    {
      year: "2026",
      yearTag: "CURRENT",
      role: "AI Operations &amp; Automation — Building Independently",
      org: "Self-directed · Building in public · Open globally",
      note: "Shipping JARVIS, Second Brain, content systems, lead-qual pipelines, and trading agents. Writing about every step. Targeting AI Ops / Automation Engineer roles, remote-first, Europe-priority.",
      current: true,
    },
    {
      year: "2026",
      yearTag: "DAY JOB",
      role: "Assistant Manager — CRM",
      org: "Paras Buildtech · Gurgaon, Haryana",
      note: "Managing the day-to-day CRM team across the post-sale client lifecycle — workload allocation, resolution KPIs, cross-functional coordination between sales, finance, legal, and technical teams.",
    },
    {
      year: "23–26",
      yearTag: "OPERATIONS",
      role: "Client Operations &amp; Coordination",
      org: "County Group · Noida",
      note: "Owned post-sale lifecycle for 300+ residential units. Redesigned client query SOPs. −35% resolution time. +20% CSAT. Jul 2023 – Apr 2026.",
    },
    {
      year: "22–23",
      yearTag: "STAGECRAFT",
      role: "Special Event Manager · Emcee",
      org: "Freelance · Delhi",
      note: "Led full lifecycle of an international panel event. 90+ attendees · 97% satisfaction. Hosted live, under pressure.",
    },
    {
      year: "19–20",
      yearTag: "FOUNDATIONS",
      role: "HR Intern",
      org: "Conscient Infrastructure · Gurugram",
      note: "Onboarding ops + ERP-based data management. Streamlined comms — 20% reduction in internal escalations.",
    },
    {
      year: "★",
      yearTag: "ORIGIN",
      role: "MBA · BA Philosophy · Theatre · Television",
      org: "Innovation &amp; Entrepreneurship · Stage director · Zee TV role",
      note: "Three years on stage, a philosophy degree, and an MBA in entrepreneurship. The CV is hybrid because the work is hybrid.",
      origin: true,
      gradPolo: {
        tape: "CONVOCATION · 2024",
        src: "/photos/photo-graduation.jpg",
        title: "MBA · I&amp;E.",
        caption: "Dr. B.R. Ambedkar University, Delhi",
      },
    },
  ],
  cv: { label: "DOWNLOAD FULL CV", href: "/resume.pdf" },
  // Curtain easter-egg messages tied to each clickable ▸ arrow in the headline.
  curtainMessages: ["PHILOSOPHY<br/>→ MBA.", "MBA<br/>→ OPS.", "OPS<br/>→ AI.", "SCENE<br/>CHANGE."],
};

// Connect — Finale
export const contact = {
  headline: "BUILDING IN PUBLIC.",
  headlineAlt: "OPEN TO",
  headlineEm: "THE RIGHT ROOM.",
  deck: "OPEN TO AI OPERATIONS &amp; AUTOMATION ROLES — FULL-TIME, CONTRACT, OR FOUNDING-TEAM. REMOTE-FIRST. EUROPE PRIORITY. ALSO OPEN TO COLLABORATIONS AND GOOD CONVERSATIONS.",
  cards: [
    { label: "EMAIL", value: "rajputdev77@gmail.com", href: "mailto:rajputdev77@gmail.com" },
    { label: "LINKEDIN", value: "/in/devrajput07", href: "https://www.linkedin.com/in/devrajput07/" },
    { label: "GITHUB", value: "github.com/rajputdev77-art", href: "https://github.com/rajputdev77-art" },
    { label: "DOCUMENT", value: "DOWNLOAD CV", href: "/resume.pdf" },
  ],
};

// Footer
export const footer = {
  left: "© 2026 DEV RAJPUT · INDIA · IST",
  middle: '"BUILD THE SYSTEM. MIND THE HUMANS INSIDE IT."',
  right: "● DEPLOY · ALL GREEN",
};

// Clocks bar (fixed bottom)
export const clocks = [
  { city: "IST · DEL", tag: "HOME", tz: "Asia/Kolkata", active: true },
  { city: "BERLIN", tag: "★", tz: "Europe/Berlin" },
  { city: "AMS", tag: "★", tz: "Europe/Amsterdam" },
  { city: "LISBON", tag: "★", tz: "Europe/Lisbon" },
];
