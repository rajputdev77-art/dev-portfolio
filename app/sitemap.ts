import type { MetadataRoute } from "next";
import { getCaseStudies, getEssays } from "@/lib/markdown";

const BASE = "https://dev-portfolio-dun-theta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/stack`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const caseStudies: MetadataRoute.Sitemap = getCaseStudies().map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const essays: MetadataRoute.Sitemap = getEssays().map((e) => ({
    url: `${BASE}/essays/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudies, ...essays];
}
