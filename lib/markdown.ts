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
}

export interface Essay {
  slug: string;
  title: string;
  date: string;
  description: string;
  order: number;
  content: string;
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

export function getEssays(): Essay[] {
  const dir = path.join(contentDirectory, "essays");
  const filenames = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  const essays = filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      description: data.description,
      order: data.order || 99,
      content,
    };
  });

  return essays.sort((a, b) => a.order - b.order);
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
