import { getCaseStudies, getCaseStudyBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <main className="pt-28 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1 text-sm text-teal-primary mb-8 hover:underline"
        >
          <ArrowLeft size={14} />
          Back to all work
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            {study.title}
          </h1>
          <p className="text-xl text-teal-primary font-medium mb-4">
            {study.outcome}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-ink/60">
            <span>{study.role}</span>
            <span>·</span>
            <span>{study.timeline}</span>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/80 prose-li:text-ink/80 prose-a:text-teal-primary"
          dangerouslySetInnerHTML={{ __html: study.content }}
        />
      </article>
    </main>
  );
}
