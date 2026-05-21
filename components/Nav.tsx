import { nav } from "@/content/site";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-row">
        <a href="#top" className="brand">{nav.brand}</a>
        <div className="nav-links">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <a href={nav.cta.href} className="nav-cta">{nav.cta.label}</a>
      </div>
    </nav>
  );
}
