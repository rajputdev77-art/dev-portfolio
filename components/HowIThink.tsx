import { getEssays } from "@/lib/markdown";
import Link from "next/link";

export default function HowIThink() {
  const essays = getEssays();

  if (essays.length === 0) {
    return (
      <section className="py-20 bg-ink/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
            How I Think
          </h2>
          <p className="text-ink/60">Essays coming soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-ink/[0.02]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-12">
          How I Think
        </h2>
        <div className="space-y-6">
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="block p-6 rounded-xl border border-ink/5 hover:border-teal-primary/30 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-1 hover:text-teal-primary transition-colors">
                {essay.title}
              </h3>
              <p className="text-sm text-ink/60">{essay.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
