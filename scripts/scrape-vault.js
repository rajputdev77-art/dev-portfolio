#!/usr/bin/env node
/**
 * scrape-vault.js
 *
 * One-shot script that walks the Obsidian vault, applies a relevance filter,
 * and copies qualifying notes into /content/vault/ as markdown the site can render.
 *
 * Relevance filter — a note qualifies if AT LEAST ONE is true:
 *   1. Frontmatter `tags` contains `public` or `publish`
 *   2. Path is under /Publish, /Blog, /Essays, /Notes-Public, /knowledge (a subset)
 *   3. Filename or content matches the topic whitelist (AI, automation, career,
 *      philosophy, systems thinking, building, learning)
 *
 * Hard-excluded regardless of match:
 *   - /daily-logs, /inbox, /voice-notes, /sessions, /ai-conversations
 *   - /gemini-scribe, /dalle-generations, /copilot, /atlas (sync junk)
 *   - Any UUID-looking top-level folder
 *   - _index.md hub pages (they're maps, not essays)
 *   - Files under 200 chars (raw captures)
 *
 * Run:  node scripts/scrape-vault.js
 *
 * Override the vault path with VAULT=... node scripts/scrape-vault.js
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const VAULT_DEFAULT = path.resolve(
  __dirname,
  "..",
  "..",
  "second-brain",
  "obsidian-vault"
);
const VAULT = process.env.VAULT || VAULT_DEFAULT;
const OUT_DIR = path.resolve(__dirname, "..", "content", "vault");

const HARD_EXCLUDE = [
  /\/daily-logs\//i,
  /\/inbox\//i,
  /\/voice-notes\//i,
  /\/sessions\//i,
  /\/ai-conversations\//i,
  /\/gemini-scribe\//i,
  /\/dalle-generations\//i,
  /\/copilot\//i,
  /\/atlas\//i,
  /\/automation-logs\//i,
  /\/user-RGJC/i,
  /\/[0-9a-f]{8}-[0-9a-f]{4}/i, // UUID-named folders
  /\/00-home\//i,
  /\/tags\//i,
  /\/\.obsidian\//i,
  /\/AI-News-Daily-Pipeline\//i, // project sub-docs, not essays
  /\/Career\//i,
  /\/Projects\//i, // these get sub-docs already covered as case studies
];

// Filenames that look operational/index/journal — skip regardless of folder.
const FILENAME_EXCLUDE = [
  /^session-log/i,
  /^ingestion-log/i,
  /^top-of-mind/i,
  /^weekly-review/i,
  /^master[-_]portfolio/i,
  /^portfolio[-_]index/i,
  /^cv[-_]/i,
  /^resume/i,
  /^00-project-overview/i,
  /^03-repair-triggers/i,
  /^04-setup-guide/i,
  /^product-files-shipped/i,
  /^second-brain-home/i,
  /^job-hunt-/i,
  /^cloud-bug-fix-sweep/i,
  /^oracle-cloud-migration/i,
];

const PUBLISH_PATH_PATTERNS = [
  /\/publish\//i,
  /\/blog\//i,
  /\/essays\//i,
  /\/notes-public\//i,
];

const TOPIC_KEYWORDS = [
  "ai agent",
  "automation",
  "n8n",
  "claude",
  "anthropic",
  "philosophy",
  "systems thinking",
  "building in public",
  "career strategy",
  "europe relocation",
  "real estate automation",
  "prompt engineering",
  "knowledge system",
  "second brain",
  "jarvis",
  "personal brand",
  "ai ops",
  "agent architecture",
];

function isHardExcluded(absPath) {
  const rel = absPath.replace(VAULT, "").replace(/\\/g, "/");
  return HARD_EXCLUDE.some((re) => re.test(rel));
}

function isPublishPath(absPath) {
  const rel = absPath.replace(VAULT, "").replace(/\\/g, "/");
  return PUBLISH_PATH_PATTERNS.some((re) => re.test(rel));
}

function hasPublishTag(fm) {
  if (!fm) return false;
  const tags = fm.tags;
  if (!tags) return false;
  const arr = Array.isArray(tags) ? tags : [tags];
  return arr.some(
    (t) =>
      typeof t === "string" &&
      (t.toLowerCase() === "public" || t.toLowerCase() === "publish")
  );
}

function matchesTopic(text) {
  const lower = text.toLowerCase();
  return TOPIC_KEYWORDS.some((k) => lower.includes(k));
}

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (isHardExcluded(abs + "/")) continue;
      yield* walk(abs);
    } else if (entry.isFile() && abs.endsWith(".md")) {
      yield abs;
    }
  }
}

function deriveExcerpt(content, limit = 280) {
  const cleaned = content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[\[[^\]]+\]\]/g, "")
    .replace(/\[\[([^|\]]+)\|?[^\]]*\]\]/g, "$1")
    .replace(/[*_`>#-]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= limit) return cleaned;
  return cleaned.slice(0, limit).trim() + "…";
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function main() {
  if (!fs.existsSync(VAULT)) {
    console.error(`vault not found at: ${VAULT}`);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Clear previous vault content (but keep .gitkeep-style files).
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith(".md")) fs.unlinkSync(path.join(OUT_DIR, f));
  }

  let scanned = 0;
  let kept = 0;
  const seen = new Set();

  for (const file of walk(VAULT)) {
    scanned++;
    if (isHardExcluded(file)) continue;

    const base = path.basename(file);
    if (base === "_index.md" || base.startsWith("Untitled")) continue;
    if (FILENAME_EXCLUDE.some((re) => re.test(base))) continue;
    // Skip files that look like project sub-docs (start with a leading number).
    if (/^\d{1,2}[\s_-]/.test(base)) continue;
    // Skip files dated in the filename (logs, journals).
    if (/^\d{4}-\d{2}-\d{2}/.test(base)) continue;

    const raw = fs.readFileSync(file, "utf8");
    if (raw.length < 200) continue;

    let parsed;
    try {
      parsed = matter(raw);
    } catch (err) {
      continue;
    }
    const fm = parsed.data || {};
    const content = parsed.content || "";

    const qualifies =
      hasPublishTag(fm) || isPublishPath(file) || matchesTopic(content + " " + base);
    if (!qualifies) continue;

    const title =
      fm.title || base.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}\s*—?\s*/, "");
    const slugBase = slugify(fm.slug || title);
    let slug = slugBase || "note-" + kept;
    let i = 2;
    while (seen.has(slug)) slug = `${slugBase}-${i++}`;
    seen.add(slug);

    const date =
      fm.date ||
      fm.updated ||
      fm.created ||
      base.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ||
      "";
    const description = fm.description || deriveExcerpt(content);
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const read = wordCount > 0 ? `${Math.max(1, Math.round(wordCount / 220))} min` : "";

    const outFm = {
      title,
      slug,
      date,
      description,
      read,
      order: 50 + kept,
      source: "vault",
    };

    const outBody =
      "---\n" +
      Object.entries(outFm)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join("\n") +
      "\n---\n\n" +
      content.trim() +
      "\n";

    fs.writeFileSync(path.join(OUT_DIR, slug + ".md"), outBody, "utf8");
    kept++;
  }

  console.log(`scanned ${scanned} markdown files`);
  console.log(`kept ${kept} notes — written to ${OUT_DIR}`);
}

main();
