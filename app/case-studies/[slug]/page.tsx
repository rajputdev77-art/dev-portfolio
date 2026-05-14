import { getCaseStudies, getCaseStudyBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import LiveStats from "@/components/LiveStats";

// Map case-study slugs → live-data source + public dashboard URL.
// Listed slugs render a live status panel under the outcome line.
const LIVE_SOURCES: Record<string, { source: "soul-in-motion" | "youtube-pipeline" | "trading"; dashboardUrl?: string }> = {
  "soul-in-motion":           { source: "soul-in-motion",   dashboardUrl: "https://soul-in-motion-dashboard.vercel.app" },
  "youtube-automation-system":{ source: "youtube-pipeline", dashboardUrl: "https://youtube-pipeline-dashboard.vercel.app" },
  "jarvis-trading-agent":     { source: "trading",          dashboardUrl: "https://dashboard-sigma-nine-63.vercel.app" },
};

export async function generateStaticParams() {
  const studies = getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.title} — Dev Rajput`,
    description: study.outcome,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  return (
    <>
      <Topbar />
      <Nav />
      <main className="oc-detail">
        <Link href="/#work" className="oc-detail-back">
          ← Back to systems shipped
        </Link>

        <div className="oc-detail-eyebrow">CASE STUDY</div>
        <h1>{study.title}</h1>
        <p className="oc-detail-outcome">{study.outcome}</p>
        <div className="oc-detail-meta">
          <span>{study.role}</span>
          <span>·</span>
          <span>{study.timeline}</span>
          {study.tag && (
            <>
              <span>·</span>
              <span>{study.tag}</span>
            </>
          )}
        </div>

        {LIVE_SOURCES[params.slug] && (
          <LiveStats
            source={LIVE_SOURCES[params.slug].source}
            dashboardUrl={LIVE_SOURCES[params.slug].dashboardUrl}
          />
        )}

        <div
          className="oc-detail-body"
          dangerouslySetInnerHTML={{ __html: study.content }}
        />
      </main>
    </>
  );
}
