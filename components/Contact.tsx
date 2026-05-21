import { contact, footer } from "@/content/site";

export default function Contact() {
  return (
    <>
      <section id="connect" className="connect">
        <div className="connect-inner">
          <h2 className="connect-h">
            {contact.headline}
            <br />
            <span className="alt">{contact.headlineAlt}</span>{" "}
            <em>{contact.headlineEm}</em>
          </h2>
          <p
            className="connect-deck"
            dangerouslySetInnerHTML={{ __html: contact.deck }}
          />
          <div className="connect-grid">
            {contact.cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") || c.href.startsWith("/resume") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>
                  <b>{c.label}</b>
                  {c.value}
                </span>
                <span className="arr">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <span>{footer.left}</span>
        <em>{footer.middle}</em>
        <span>{footer.right}</span>
      </footer>
    </>
  );
}
