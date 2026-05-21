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
        <li><a href="#story">Story</a></li>
        <li><a href="#work">Building</a></li>
        <li><a href="#vault">Vault</a></li>
        <li><a href="#now">Now</a></li>
        <li><a href="#path">Background</a></li>
      </ul>
      <a href="#connect" className="oc-nav-cta">
        <span>{nav.ctaLabel}</span>
        <span className="oc-arrow">↗</span>
      </a>
    </nav>
  );
}
