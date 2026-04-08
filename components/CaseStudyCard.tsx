import Link from "next/link";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  outcome: string;
}

export default function CaseStudyCard({
  slug,
  title,
  outcome,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group block rounded-xl overflow-hidden border border-ink/5 hover:border-teal-primary/30 transition-colors"
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-teal-primary to-teal-light opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-teal-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-ink/60 mb-4">{outcome}</p>
        <span className="text-sm font-medium text-teal-primary">
          Read Case Study →
        </span>
      </div>
    </Link>
  );
}
