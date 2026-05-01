import { getEssays, getEssayBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";

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
    <>
      <Topbar />
      <Nav />
      <main className="oc-detail">
        <Link href="/#thinking" className="oc-detail-back">
          ← Back to thinking
        </Link>

        <div className="oc-detail-eyebrow">ESSAY</div>
        <h1>{essay.title}</h1>
        {essay.date && (
          <div className="oc-detail-meta">
            <span>{essay.date}</span>
            {essay.read && (
              <>
                <span>·</span>
                <span>{essay.read}</span>
              </>
            )}
          </div>
        )}

        <div
          className="oc-detail-body"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />
      </main>
    </>
  );
}
