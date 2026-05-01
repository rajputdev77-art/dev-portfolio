import { getCaseStudies, getCaseStudyBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";

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

        <div
          className="oc-detail-body"
          dangerouslySetInnerHTML={{ __html: study.content }}
        />
      </main>
    </>
  );
}
