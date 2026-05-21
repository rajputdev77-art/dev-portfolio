import { getEssays, getEssayBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import ClocksBar from "@/components/ClocksBar";

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
      <div className="csb-back">
        <a className="home" href="/#vault">← BACK TO THE VAULT</a>
        <div className="crumbs">
          {essay.source === "vault" ? "VAULT" : "ESSAY"} ·{" "}
          <b>{(essay.title || "").toUpperCase()}</b>
        </div>
      </div>

      <section className="cs-hero">
        <div className="cs-meta">
          <span className="id">
            {essay.source === "vault" ? "FROM THE VAULT" : "ESSAY"}
          </span>
          {essay.date && <span className="id">{essay.date.toUpperCase()}</span>}
          {essay.read && <span className="id">{essay.read.toUpperCase()}</span>}
        </div>
        <h1 className="cs-title">
          {(essay.title || "").toUpperCase().split(/\s+/).map((w, i) => (
            <span className="l" key={i}>{w} </span>
          ))}
        </h1>
        {essay.description && <p className="cs-deck">{essay.description}</p>}
      </section>

      <div className="sline">
        <div className="lhs">
          <span className="n">01</span>
          <span className="t">{essay.source === "vault" ? "THE NOTE" : "THE ESSAY"}</span>
        </div>
        <span className="r">// HAND-WRITTEN · UNEDITED</span>
      </div>

      <main className="sbody" dangerouslySetInnerHTML={{ __html: essay.content }} />

      <div className="csb-back">
        <a className="home" href="/#vault">← BACK TO THE VAULT</a>
        <a className="home" href="/#connect" style={{ background: "var(--red)", color: "var(--paper)", borderColor: "var(--red)" }}>CONNECT ↗</a>
      </div>

      <ClocksBar />
    </>
  );
}
