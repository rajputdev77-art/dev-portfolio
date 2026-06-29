// ─────────────────────────────────────────────────────────────────────────────
//  THE STACK — every tool, model, and workflow.
//  Drafted from your case studies. Edit freely: add, remove, reorder.
//  Each group renders as a brutalist block; each item is tag + one-line note.
// ─────────────────────────────────────────────────────────────────────────────

export const stackMeta = {
  title: "THE STACK",
  deck: "Every tool, model, and workflow I actually use — not a buzzword list.",
  note: "// LIVE INVENTORY · UPDATED AS IT CHANGES",
};

export interface StackItem {
  name: string;
  note: string;
}
export interface StackGroup {
  label: string;
  tone?: "yellow" | "paper" | "red" | "blue" | "black";
  items: StackItem[];
}

export const stackGroups: StackGroup[] = [
  {
    label: "LANGUAGES",
    tone: "yellow",
    items: [
      { name: "Python", note: "Agents, scrapers, async pipelines, FastAPI" },
      { name: "TypeScript", note: "Next.js apps, typed tooling" },
      { name: "Bash", note: "Glue, cron, server ops" },
    ],
  },
  {
    label: "AI · MODELS",
    tone: "black",
    items: [
      { name: "Claude (Anthropic)", note: "Primary reasoning + agent brain" },
      { name: "GPT-4", note: "Content generation where it fits" },
      { name: "Gemini 2.5 Flash", note: "Cheap, fast, vision tasks" },
      { name: "Groq · LLaMA 3.3 70B", note: "Sub-second inference, free tier" },
      { name: "Ollama · Qwen 2.5 7B", note: "Local, private, $0/mo scoring" },
      { name: "Whisper", note: "Speech-to-text, on-machine" },
    ],
  },
  {
    label: "AUTOMATION",
    tone: "red",
    items: [
      { name: "n8n", note: "Workflow orchestration — the backbone" },
      { name: "Playwright", note: "Browser automation, auto-submit" },
      { name: "Edge TTS", note: "Neural voice output" },
      { name: "FFmpeg", note: "Video render + assembly" },
    ],
  },
  {
    label: "BUILD · WEB",
    tone: "paper",
    items: [
      { name: "Next.js 14", note: "App Router, SSR/SSG" },
      { name: "React", note: "Component UI" },
      { name: "Vite", note: "Fast SPA builds" },
      { name: "Vercel", note: "Deploy + analytics + edge" },
    ],
  },
  {
    label: "INFRA · DATA",
    tone: "blue",
    items: [
      { name: "Oracle Cloud", note: "Always-on box for runners + cron" },
      { name: "Upstash Redis", note: "Serverless KV — events, rate limits" },
      { name: "Postgres", note: "Relational store where needed" },
      { name: "GitHub", note: "Source + CI trigger" },
    ],
  },
  {
    label: "KNOWLEDGE · DEV",
    tone: "yellow",
    items: [
      { name: "Obsidian", note: "Second brain — notes as a graph" },
      { name: "Claude Code", note: "Agentic dev — hooks, MCP, skills" },
      { name: "Git", note: "Version control, everything" },
    ],
  },
  {
    label: "INTEGRATIONS",
    tone: "black",
    items: [
      { name: "WhatsApp / Gmail", note: "Outreach + inbox automation" },
      { name: "Telegram", note: "Alerts + bot control" },
      { name: "Google Sheets / Drive", note: "Lightweight data + storage" },
      { name: "HubSpot", note: "CRM sync for lead pipelines" },
      { name: "Instagram Graph API", note: "Content publishing + analytics" },
    ],
  },
];
