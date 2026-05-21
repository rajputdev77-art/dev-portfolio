import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export interface CaseStudy {
  slug: string;
  title: string;
  outcome: string;
  role: string;
  timeline: string;
  order: number;
  content: string;
  // New fields
  kind?: "diagram" | "log" | "metric";
  tag?: string;
  metrics?: { num: string; unit: string; label: string }[];
  type?: "product";
  status?: "Live" | "In Progress" | "Paused" | string;
  link?: string;
}

export interface Essay {
  slug: string;
  title: string;
  date: string;
  description: string;
  order: number;
  content: string;
  read?: string;
  source?: "essay" | "vault";
}

export interface NowEntry {
  title: string;
  note: string;
}

export interface NowData {
  updated: string;
  building: NowEntry[];
  learning: NowEntry[];
  thinking: NowEntry[];
}

export function getCaseStudies(): CaseStudy[] {
  const dir = path.join(contentDirectory, "case-studies");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const studies = filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || filename.replace(".md", ""),
      title: data.title,
      outcome: data.outcome,
      role: data.role,
      timeline: data.timeline,
      order: data.order || 99,
      kind: data.kind,
      tag: data.tag,
      metrics: data.metrics,
      type: data.type,
      status: data.status,
      link: data.link,
      content,
    };
  });

  return studies.sort((a, b) => a.order - b.order);
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const studies = getCaseStudies();
  const study = studies.find((s) => s.slug === slug);
  if (!study) return null;

  const processedContent = await remark().use(html).process(study.content);

  return {
    ...study,
    content: processedContent.toString(),
  };
}

function readEssaysFromDir(dir: string, source: "essay" | "vault"): Essay[] {
  if (!fs.existsSync(dir)) return [];
  const filenames = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  return filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || filename.replace(".md", ""),
      title: data.title || filename.replace(".md", ""),
      date: data.date || "",
      description: data.description || "",
      order: data.order || 99,
      read: data.read,
      source,
      content,
    };
  });
}

export function getEssays(): Essay[] {
  // Combined: explicit essays + vault notes.
  // Essays come first in the sort, then vault notes by date desc.
  const essaysDir = path.join(contentDirectory, "essays");
  const vaultDir = path.join(contentDirectory, "vault");

  const essays = readEssaysFromDir(essaysDir, "essay");
  const vault = readEssaysFromDir(vaultDir, "vault");

  return [...essays, ...vault].sort((a, b) => {
    // Sort by `order` if present, else by date desc.
    if (a.order !== b.order) return a.order - b.order;
    return (b.date || "").localeCompare(a.date || "");
  });
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  const essays = getEssays();
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) return null;

  const processedContent = await remark().use(html).process(essay.content);

  return {
    ...essay,
    content: processedContent.toString(),
  };
}

export function getNowData(): NowData {
  const filePath = path.join(contentDirectory, "now.md");
  if (!fs.existsSync(filePath)) {
    return { updated: "", building: [], learning: [], thinking: [] };
  }
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return {
    updated: data.updated || "",
    building: data.building || [],
    learning: data.learning || [],
    thinking: data.thinking || [],
  };
}
