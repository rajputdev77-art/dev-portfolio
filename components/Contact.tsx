import { contact } from "@/content/site";

export default function Contact() {
  // Render headline with the italic word getting the gradient treatment
  function renderHeadline() {
    const out: React.ReactNode[] = [];
    contact.headline.forEach((line, i) => {
      const idx = line.indexOf(contact.italicWord);
      if (idx >= 0) {
        out.push(
          <span key={`pre-${i}`}>{line.slice(0, idx)}</span>,
          <em key={`em-${i}`}>{contact.italicWord}</em>
        );
      } else {
        out.push(<span key={i}>{line}</span>);
      }
      if (i < contact.headline.length - 1) out.push(<br key={`br-${i}`} />);
    });
    return out;
  }

  return (
    <section id="contact" className="oc-contact">
      <div className="oc-act-marker">
        <span>{contact.act}</span>
        <span className="oc-eyebrow-rule" />
        <span>{contact.actSub}</span>
      </div>
      <h2 className="oc-contact-h">{renderHeadline()}</h2>
      <p className="oc-contact-sub">{contact.sub}</p>
      <div className="oc-contact-grid">
        {contact.cards.map((c) => (
          <a
            key={c.label}
            className={`oc-contact-card${c.primary ? " oc-contact-primary" : ""}`}
            href={c.href}
            style={c.primary ? { background: "var(--accent)" } : undefined}
            target={c.href.startsWith("http") || c.href.startsWith("/resume") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span className="oc-contact-k">{c.label}</span>
            <span className="oc-contact-v">{c.value}</span>
            <span className="oc-contact-arrow">↗</span>
          </a>
        ))}
      </div>
      <footer className="oc-foot">
        <span>{contact.footer.left}</span>
        <span className="oc-foot-mid">&ldquo;{contact.footer.middle}&rdquo;</span>
        <span>{contact.footer.right}</span>
      </footer>
    </section>
  );
}
