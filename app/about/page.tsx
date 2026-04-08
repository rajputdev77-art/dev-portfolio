import { Mail, ExternalLink } from "lucide-react";

export const metadata = {
  title: "About — Dev Rajput",
  description:
    "MBA graduate, client operations specialist, builder of local AI systems, performer turned operator.",
};

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-10 leading-tight">
          About Me
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-ink/80">
          <p>
            I spent the last three years inside a real estate operation learning
            how to make things work across sales, legal, finance, and technical
            teams. At County Group in Noida, I owned the post-sale lifecycle for
            300+ residential units across 3 projects and 7 towers — everything
            from client queries to possession handovers to registry
            coordination.
          </p>

          <p>
            Before that, I was directing plays, making short films, and hosting
            international events. I acted in a Zee TV serial, emceed conferences
            with 90+ attendees, and managed cross-functional teams of 7 people
            on tight budgets. That world taught me something operations later
            reinforced: every system eventually comes down to the trust people
            place in the person running it.
          </p>

          <p>
            Lately I have been building local AI agents, n8n automations, a
            YouTube content pipeline that runs itself, and a personal assistant I
            call JARVIS. I run models locally, wire them into workflows, and
            treat every break as a design lesson. The fastest way to understand
            how intelligence scales is to build it yourself.
          </p>

          <p>
            I am an MBA graduate from Ambedkar University Delhi, based in Delhi
            NCR. I am currently exploring client operations, project management,
            and customer success roles — particularly with European or globally
            distributed teams.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-ink mt-12 mb-4">
            What I Bring
          </h2>

          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Operations experience across real estate, events, and HR — with
                real numbers behind it
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Systems thinking: I design processes that prevent problems, not
                just fix them
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Technical fluency: I build AI agents, automate workflows, and
                understand the tools my teams will use
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Communication: stage training means I can present, host, and
                run a room under pressure
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <h2 className="font-serif text-2xl font-semibold mb-6">
            Get in Touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:rajputdev77@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-primary text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
            >
              <Mail size={18} />
              rajputdev77@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/devrajput07/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-teal-primary text-teal-primary rounded-lg font-medium hover:bg-teal-primary hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
