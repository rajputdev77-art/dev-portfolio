import { nav } from "@/content/site";

export default function Nav() {
  return (
    <nav className="oc-nav">
      <a href="#top" className="oc-mark">
        <span className="oc-mark-glyph">{nav.glyph}</span>
        <span className="oc-mark-meta">
          <span>{nav.name}</span>
          <span>{nav.tagline}</span>
        </span>
      </a>
      <ul className="oc-nav-links">
        <li><a href="#manifest">Manifest</a></li>
        <li><a href="#work">Systems shipped</a></li>
        <li><a href="#thinking">Thinking</a></li>
        <li><a href="#path">Path</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="#contact" className="oc-nav-cta">
        <span>{nav.ctaLabel}</span>
        <span className="oc-arrow">↗</span>
      </a>
    </nav>
  );
}
