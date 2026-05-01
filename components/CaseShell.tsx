import Link from "next/link";

export default function CaseShell({
  n,
  title,
  tag,
  outcome,
  href,
  children,
}: {
  n: string;
  title: string;
  tag: string;
  outcome: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="oc-case-link">
      <article className="oc-case">
        <div className="oc-case-art">{children}</div>
        <div className="oc-case-meta">
          <span className="oc-case-n">{n}</span>
          <h3 className="oc-case-title">{title}</h3>
          <p className="oc-case-tag">{tag}</p>
          <p className="oc-case-outcome">{outcome}</p>
          <span className="oc-case-cta">Read the build →</span>
        </div>
      </article>
    </Link>
  );
}
