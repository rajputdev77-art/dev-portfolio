// Virtual simulations — one per case study.
// Each sim is a small, honest, client-side replay of what the real system does.
// Nothing here talks to the live systems; it's a browser-only reenactment.

export type PipelineStage = { name: string; log: string; out?: string };
export type TermLine = { text: string; kind?: "ok" | "warn" | "act" | "dim" };
export type ChatChip = {
  label: string;
  user: string;
  reply: string;
  footer?: string; // deterministic app-appended block (e.g. Eli's helplines)
};
export type FeedLine = { text: string; kind?: "ok" | "warn" | "act" };
export type StatDef = {
  label: string;
  base: number;
  jitter: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export type SimDef =
  | { engine: "pipeline"; intro: string; stages: PipelineStage[]; finale: string }
  | { engine: "terminal"; intro: string; lines: TermLine[]; finale: string }
  | { engine: "chat"; intro: string; persona: string; greeting: string; done: string; chips: ChatChip[] }
  | {
      engine: "agents";
      intro: string;
      floors: { name: string; agents: string[] }[];
      bubbles: string[];
      artifacts: string[];
      finale: string;
    }
  | { engine: "dashboard"; intro: string; stats: StatDef[]; feed: FeedLine[]; finale: string }
  | { engine: "dictation"; intro: string; phrases: string[] }
  | { engine: "tts"; intro: string; sample: string; voices: string[] };

export const sims: Record<string, SimDef> = {
  /* ── 01 · AI Lead Qualification Pipeline ─────────────────────────── */
  "local-ai-agents-n8n": {
    engine: "pipeline",
    intro: "A lead submits the form. Watch it travel to a sales alert in under 30 seconds.",
    stages: [
      { name: "FORM SUBMIT", log: "Lead: \"We need automation for our clinic, budget approved, start ASAP\"", out: "payload → n8n webhook" },
      { name: "n8n WEBHOOK", log: "Workflow triggered · dedup check passed · enriching fields…", out: "enriched lead object" },
      { name: "AI QUALIFICATION", log: "Claude scores intent, budget signal, urgency → 87/100 · HOT", out: "verdict: HOT (87)" },
      { name: "ROUTING", log: "Score ≥ 70 → priority lane · CRM row written", out: "CRM + sheet logged" },
      { name: "SALES ALERT", log: "WhatsApp alert fired to sales with verdict + next move", out: "alert delivered · 22s elapsed" },
    ],
    finale: "Form → qualified → alerted in ~22 simulated seconds. The real pipeline does this ~12K times a month.",
  },

  /* ── 02 · Real-Estate Operations Leadership ──────────────────────── */
  "possession-handover-audit": {
    engine: "pipeline",
    intro: "One unit's journey through the possession-handover audit system I ran across 300+ units.",
    stages: [
      { name: "PRE-AUDIT", log: "Unit T4-1203 · full snag inspection against the 140-point checklist", out: "snag list: 9 items" },
      { name: "CONTRACTOR FIX", log: "Snags routed to contractors with photo evidence + deadline", out: "9/9 resolved" },
      { name: "RE-AUDIT", log: "Second pass · zero-tolerance verification of every snag", out: "0 open items" },
      { name: "CUSTOMER WALKTHROUGH", log: "Owner walkthrough scheduled · issues addressed live", out: "sign-off obtained" },
      { name: "HANDOVER", log: "Keys + documentation handed over · CSAT survey sent", out: "handover ✓ · 0 rejections" },
    ],
    finale: "Zero handover rejections across 300+ units, 7 towers, 3 projects. −35% resolution time, +20% CSAT.",
  },

  /* ── 03 · Eli ────────────────────────────────────────────────────── */
  "eli-companion": {
    engine: "chat",
    intro: "A scripted taste of Eli's voice — warm, Hinglish, and safety-floored. Canned replies; the real Eli runs on Claude with encrypted memory.",
    persona: "ELI",
    greeting: "Hi, main Eli. Jo bhi chal raha hai, hum yahin baith ke baat kar sakte hain. Kya haal hai aaj?",
    done: "That's the simulated slice. The real Eli adds cross-session memory, voice with natural turn-taking, and AES-256 encrypted transcripts.",
    chips: [
      {
        label: "\"work stress yaar\"",
        user: "kaam ka bohot stress hai yaar, har din same cycle",
        reply: "Hmm. \"Har din same cycle\" — that sounds heavy, and tired. Ek cheez batao: aaj ke din ka sabse draining moment kaunsa tha? Chhota sa bhi chalega. We can start there instead of the whole mountain.",
      },
      {
        label: "\"I'm fine, anyway—\"",
        user: "I'm fine. anyway, what else",
        reply: "You said \"fine\" pretty fast there. 🙂 Main push nahi karungi — but I noticed it. If there's something under the \"anyway\", it's welcome here. If not, we can genuinely move on. Aapki call.",
      },
      {
        label: "test the crisis layer",
        user: "kabhi kabhi lagta hai sab khatam kar doon",
        reply: "Main sun rahi hoon, aur I'm really glad you told me. Yeh feeling akele carry karne ke liye nahi hai. Abhi, is waqt, ek trained person se baat karna sabse strong move hai — neeche verified helplines hain, 24x7.",
        footer: "APP-APPENDED (deterministic — Eli never types numbers):\nTele-MANAS 14416 / 1800-891-4416 · KIRAN 1800-599-0019 · Emergency 112",
      },
    ],
  },

  /* ── 04 · Soul in Motion Group ───────────────────────────────────── */
  "soul-in-motion-group": {
    engine: "agents",
    intro: "One 15-minute work tick on the campus, compressed to seconds. Every glow maps to a real artifact type the engine files.",
    floors: [
      { name: "FLOOR 1 · LEAD GRADER CO.", agents: ["MKT", "SALES", "PROD", "SUPPORT", "HR", "IT", "SEC"] },
      { name: "FLOOR 2 · AI FRONT DESK CO.", agents: ["MKT", "SALES", "PROD", "SUPPORT", "HR", "IT", "SEC"] },
      { name: "FLOOR 3 · MEMORY KEEPER CO.", agents: ["MKT", "SALES", "PROD", "SUPPORT", "HR", "IT", "SEC"] },
    ],
    bubbles: [
      "drafting today's post…",
      "review: approved ✓",
      "pulling real salons from OpenStreetMap…",
      "writing email + DM draft…",
      "QA: does the desk answer in Hindi? ✓",
      "npm audit — 0 high vulns",
      "scanning git for leaked keys… clean",
      "shooting demo video (playwright + tts)…",
      "weaving today's memoir chapter…",
      "watchdog: campus healthy",
      "grading a pasted lead → HOT",
      "filing daily report…",
    ],
    artifacts: [
      "post published → /updates blog",
      "outreach drafted → Send Center (human clicks send)",
      "demo video → outbox/videos/frontdesk.mp4",
      "security risk report filed",
      "QA report: 3/3 products passing",
      "memoir chapter woven → /memory",
    ],
    finale: "Tick complete. 39 agents · 3 companies · ₹0/month. Nothing ever sends without a human click in the Send Center.",
  },

  /* ── 05 · JARVIS Trading Agent ───────────────────────────────────── */
  "jarvis-trading-agent": {
    engine: "dashboard",
    intro: "One trading cycle replayed: funnel → LLM decision → risk gate → paper fill. Prices wiggle like the real feed; no real money exists anywhere in this system.",
    stats: [
      { label: "BTC", base: 67240, jitter: 90, prefix: "$" },
      { label: "ETH", base: 3512, jitter: 7, prefix: "$" },
      { label: "SOL", base: 142.6, jitter: 1.1, decimals: 1, prefix: "$" },
      { label: "PAPER P&L", base: 3.2, jitter: 0.35, decimals: 2, suffix: "%" },
    ],
    feed: [
      { text: "cycle start · marking 2 open positions to market", kind: "act" },
      { text: "stage-1 funnel: 203 perps scored → top 15 → LLM", kind: "ok" },
      { text: "gemini decision: BUY SOL $180 · TP 149.8 · SL 138.2", kind: "act" },
      { text: "rationale: \"4h MACD cross + funding flip, ADX rising\"" },
      { text: "risk manager: size ✓ exposure ✓ SL present ✓ → APPROVED", kind: "ok" },
      { text: "paper fill @ mid + 0.05% slippage → SQLite row #4,812", kind: "ok" },
      { text: "risk manager: HOLD on BTC (would breach exposure cap)", kind: "warn" },
      { text: "cycle complete · next in 3600s · full reasoning logged for replay", kind: "ok" },
    ],
    finale: "Paper-only by class boundary: the live Exchange class is never imported. The LLM proposes; deterministic risk code disposes.",
  },

  /* ── 06 · International Panel Event ──────────────────────────────── */
  "international-panel-event": {
    engine: "pipeline",
    intro: "The event ops flow I owned end-to-end, compressed from weeks to seconds.",
    stages: [
      { name: "SPEAKER OUTREACH", log: "International panelists confirmed across time zones", out: "panel locked" },
      { name: "LOGISTICS", log: "Venue, AV, run-of-show, 7-person team briefed with owned lanes", out: "run-of-show v3" },
      { name: "REHEARSAL", log: "Full technical rehearsal · mic/AV failure drills · timing pass", out: "contingencies mapped" },
      { name: "LIVE PANEL", log: "90+ attendees · moderated Q&A · zero technical stalls", out: "event delivered" },
      { name: "FOLLOW-THROUGH", log: "Feedback survey + thank-you loop closed within 48h", out: "97% satisfaction" },
    ],
    finale: "97% attendee satisfaction, 90+ attendees, one owner for every lane. Stagecraft is an ops problem.",
  },

  /* ── 07 · Soul in Motion OS ──────────────────────────────────────── */
  "soul-in-motion-os": {
    engine: "terminal",
    intro: "Phase 0 discovery, replayed: a read-only scan of the whole machine that flags — and never opens — secrets.",
    lines: [
      { text: "$ build-agent --phase 0 --read-only", kind: "act" },
      { text: "scanning C:\\ top level · home · Desktop · Documents…" },
      { text: "located 16 git repos (.git search, depth 3)", kind: "ok" },
      { text: "located 6 non-git projects + Obsidian vault (.obsidian)", kind: "ok" },
      { text: "gh auth status → logged in ✓ · Notion MCP live read ✓", kind: "ok" },
      { text: "FLAG: plaintext credentials found on disk — NOT opened, NOT touched", kind: "warn" },
      { text: "FLAG: live .env in 6 projects → excluded from any future push", kind: "warn" },
      { text: "unknowns → marked [PLACEHOLDER], questions filed to owner", kind: "dim" },
      { text: "BUILD_LOG.md appended · awaiting sign-off before Phase 1", kind: "ok" },
      { text: "── after sign-off ──", kind: "dim" },
      { text: "phase 2 → company-os/ built from real files (pricing, offers, clients)", kind: "ok" },
      { text: "phase 3 → money-os/ leak engine · caught ₹18,000/yr dead gym sub", kind: "ok" },
      { text: "phase 4-5 → freeflow (voice typing) + voiceforge (local TTS) shipped", kind: "ok" },
    ],
    finale: "~20 projects inventoried, 0 secrets opened, 4 tools shipped, every action in the audit log.",
  },

  /* ── 08 · FreeFlow ───────────────────────────────────────────────── */
  freeflow: {
    engine: "dictation",
    intro: "This is the actual interaction: hold the key, speak, release — text lands in whatever has focus. The button below stands in for F10.",
    phrases: [
      "remind me to call the CA tomorrow at eleven",
      "draft a linkedin post about shipping voiceforge in one evening",
      "hinglish bhi chalta hai — whisper auto-detects and follows the script you spoke",
      "the idle path is the product: one keyboard hook, zero percent cpu",
    ],
  },

  /* ── 09 · VoiceForge ─────────────────────────────────────────────── */
  voiceforge: {
    engine: "tts",
    intro: "The real VoiceForge UI in miniature. Here your browser's built-in local voice stands in for Kokoro-82M — the point is the same: speech with no cloud.",
    sample: "VoiceForge runs entirely on this laptop. No cloud, no GPU, no monthly bill.",
    voices: ["af_heart", "af_bella", "am_michael", "hf_alpha"],
  },

  /* ── 10 · Multi-Channel Content Engine ───────────────────────────── */
  "soul-in-motion": {
    engine: "pipeline",
    intro: "One journal save, replayed end-to-end. The real run took 11 minutes; this takes seconds.",
    stages: [
      { name: "FILE WATCHER", log: "journal.docx saved 11:43 AM → watchdog fires (debounced)", out: "new entry detected" },
      { name: "PARSE + STATE", log: "timestamp regex splits entries · narrative context loaded", out: "entry #3 of today" },
      { name: "AI EXPANSION", log: "LLM writes 5 formats: blog · script · IG pack · LinkedIn · master section", out: "5 artifacts" },
      { name: "REEL RENDER", log: "frame-by-frame 1080x1920 · hook card intro · branded outro", out: "reel.mp4 (10 min IRL)" },
      { name: "PUBLISH ×9", log: "LinkedIn ✓ Dev.to ✓ Hashnode ✓ WordPress ✓ Blogger ✓ IG ✓ YT Short ✓ YT ✓ Medium→queue", out: "8 auto + 1 queued · 67s" },
    ],
    finale: "One Word file in, nine platforms out. Health agent re-checks the whole chain every 30 minutes.",
  },

  /* ── 11 · Job Application Agent ──────────────────────────────────── */
  "job-application-agent": {
    engine: "pipeline",
    intro: "One scrape cycle through the four gates. Junk dies early; only 70+ scores earn a tailored CV.",
    stages: [
      { name: "SCRAPE ×5", log: "LinkedIn · Naukri · Indeed · WTTJ · Tier-1 pages → 214 jobs", out: "214 raw listings" },
      { name: "PRE-FILTER", log: "junk gate: HR/sales/manufacturing dropped · Naukri <₹10 LPA dropped", out: "61 survive" },
      { name: "LLM SCORING", log: "local Qwen 2.5 7B scores each vs profile · hard floors enforced", out: "9 score ≥ 70" },
      { name: "TAILOR", log: "CV variant picked (Ops vs AI) + 250-word letter citing 3 listing details", out: "9 tailored packs" },
      { name: "SUBMIT + LOG", log: "Playwright auto-submits standard ATS · Tier-1 held for 1-click review", out: "sheet: 9 rows logged" },
    ],
    finale: "214 in → 9 quality applications out, ₹0 in API costs. The intelligence is one call; everything else is the system.",
  },

  /* ── 12 · YouTube Automation System ──────────────────────────────── */
  "youtube-automation-system": {
    engine: "pipeline",
    intro: "One daily run of the pipeline, stage by stage — the same spine that now powers the CalmSpark kids channel.",
    stages: [
      { name: "RESEARCH", log: "3 sources cross-scored · dedup vs published log", out: "topic locked" },
      { name: "SCRIPT", log: "two-pass LLM: narrative → SEO metadata (title/desc/tags/thumb)", out: "script + metadata" },
      { name: "MEDIA", log: "Edge TTS narration + synced subs · Pexels visuals · Pillow thumbnail", out: "assets ready" },
      { name: "ASSEMBLE", log: "FFmpeg: Ken Burns · music bed 15% · burned subs · 1080p H.264", out: "video.mp4" },
      { name: "UPLOAD", log: "YouTube resumable chunks + backoff · status pushed → live-data repo", out: "live · dashboard green" },
    ],
    finale: "~4m22s per video IRL, $0.00 per video, checkpointed so a crash resumes mid-pipeline — never from scratch.",
  },

  /* ── 13 · Second Brain ───────────────────────────────────────────── */
  "personal-knowledge-system": {
    engine: "terminal",
    intro: "A thought's round trip through the second brain: capture → distill → retrieve, replayed.",
    lines: [
      { text: "[telegram] voice note received (34s)", kind: "act" },
      { text: "whisper → transcript: \"idea — prose-as-title makes retrieval way better…\"" },
      { text: "claude → distilled note + wiki-links [[retrieval]] [[naming]]", kind: "ok" },
      { text: "obsidian ← note written: prose-as-title-makes-retrieval-10x.md", kind: "ok" },
      { text: "graph updated · 2 new edges · daily note backlinked", kind: "dim" },
      { text: "── three weeks later ──", kind: "dim" },
      { text: "$ ask \"what did I decide about note titles?\"", kind: "act" },
      { text: "hybrid retrieval: keyword + semantic over vault…" },
      { text: "→ \"prose-as-title makes retrieval 10x more effective\" (+2 linked notes)", kind: "ok" },
      { text: "context injected into session · zero amnesia", kind: "ok" },
    ],
    finale: "3 layers (CLAUDE.md · Obsidian · 8 n8n workflows) so no AI session ever starts cold.",
  },

  /* ── 14 · JARVIS Voice Assistant ─────────────────────────────────── */
  "jarvis-local-assistant": {
    engine: "chat",
    intro: "Scripted commands against a canned JARVIS. The real one runs a local LLM with long-term memory, on-machine, $0/mo.",
    persona: "JARVIS",
    greeting: "Online. Mic hot, memory loaded. What do you need?",
    done: "End of scripted demo. The real JARVIS does this by voice, 24/7, entirely on-machine.",
    chips: [
      {
        label: "\"any new emails?\"",
        user: "any new emails?",
        reply: "Three unread. One matters: the CA replied about the company-name options — he needs your pick by Friday. The other two are newsletters; archived.",
      },
      {
        label: "\"whatsapp mom I'll call at 8\"",
        user: "whatsapp mom that I'll call her at 8",
        reply: "Drafted: \"Maa, 8 baje call karta hoon ✓\". Sent via WhatsApp bridge. Also — you said the same thing on Tuesday and called at 9:40. Setting a 7:50 nudge.",
      },
      {
        label: "\"what did I say about the gym?\"",
        user: "what did i tell you about the gym last month?",
        reply: "June 14: you said the ₹1,500/mo gym is \"basically a donation at this point\" and to remind you before renewal. Renewal is in 6 days. Cancel or keep?",
      },
    ],
  },

  /* ── 15 · Instagram Growth System ────────────────────────────────── */
  "instagram-growth-system": {
    engine: "dashboard",
    intro: "The 12-dimension analyzer scoring one reel, replayed. Watch the verdict assemble.",
    stats: [
      { label: "HOOK", base: 82, jitter: 2, suffix: "/100" },
      { label: "TENSION", base: 74, jitter: 2, suffix: "/100" },
      { label: "PAYOFF", base: 88, jitter: 2, suffix: "/100" },
      { label: "PREDICTED ER", base: 6.4, jitter: 0.3, decimals: 1, suffix: "%" },
    ],
    feed: [
      { text: "reel ingested · transcript + frames extracted", kind: "act" },
      { text: "scoring 12 dimensions: hook, tension, payoff, pacing, caption…" },
      { text: "hook lands in first 1.2s ✓ — strongest dimension", kind: "ok" },
      { text: "tension dips at 0:14 — cut 2s of setup", kind: "warn" },
      { text: "caption CTA weak — question form suggested", kind: "warn" },
      { text: "verdict: POST · best slot Thu 19:30 IST", kind: "ok" },
      { text: "7-day calendar regenerated around this reel's theme", kind: "ok" },
    ],
    finale: "Every reel gets scored before it's posted — hook → tension → payoff, not vibes.",
  },

  /* ── 16 · Content Machine ────────────────────────────────────────── */
  "content-machine": {
    engine: "pipeline",
    intro: "What a buyer does with the kit, day one — replayed.",
    stages: [
      { name: "UNPACK", log: "30 days of IG + LinkedIn content, pre-written, organized by day", out: "kit opened" },
      { name: "BRAND PASS", log: "find-and-replace voice variables · pick 3 pillars", out: "content yours" },
      { name: "LOAD n8n", log: "import the included automation layer · connect accounts", out: "publisher armed" },
      { name: "SCHEDULE", log: "30 days queued across both platforms in one sitting", out: "calendar full" },
      { name: "HANDS OFF", log: "auto-publish daily · you only answer comments", out: "day 1 of 30 live" },
    ],
    finale: "A launch month of content, installed in an afternoon. Product, not project.",
  },
};
