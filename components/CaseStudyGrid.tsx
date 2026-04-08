import { getCaseStudies } from "@/lib/markdown";
import CaseStudyCard from "./CaseStudyCard";

export default function CaseStudyGrid() {
  const studies = getCaseStudies();

  return (
    <section id="work" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-12">
          Selected Work
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <CaseStudyCard
              key={study.slug}
              slug={study.slug}
              title={study.title}
              outcome={study.outcome}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
