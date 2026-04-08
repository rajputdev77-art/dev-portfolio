import { getEssays, getEssayBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const essays = getEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const essay = await getEssayBySlug(params.slug);
  if (!essay) return { title: "Not Found" };
  return {
    title: `${essay.title} — Dev Rajput`,
    description: essay.description,
  };
}

export default async function EssayPage({
  params,
}: {
  params: { slug: string };
}) {
  const essay = await getEssayBySlug(params.slug);
  if (!essay) notFound();

  return (
    <main className="pt-28 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-teal-primary mb-8 hover:underline"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            {essay.title}
          </h1>
          {essay.date && (
            <p className="text-sm text-ink/50">{essay.date}</p>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/80 prose-li:text-ink/80 prose-a:text-teal-primary"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />
      </article>
    </main>
  );
}
