export default function About() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
          About
        </h2>
        <div className="max-w-3xl text-lg leading-relaxed text-ink/80 space-y-5">
          <p>
            I&apos;m an AI Operations Specialist focused on the unsexy but
            critical middle layer of the AI stack: the part where models meet
            real business processes and actually have to work.
          </p>
          <p>
            My path here is unusual. I trained in philosophy, earned an MBA in
            Entrepreneurship, and spent three years running client operations
            for a major Indian real estate firm — managing a 300-unit portfolio
            across seven towers, coordinating sales, finance, legal, and
            technical teams, and navigating the kind of stakeholder conflicts
            that don&apos;t appear in case studies.
          </p>
          <p>
            That operational scar tissue is why I build the way I do. I
            don&apos;t chase novelty. I chase reliability. A workflow that runs
            once in a demo is a toy. A workflow that runs every day, handles
            edge cases, logs its failures, and survives contact with real users
            — that&apos;s a system. That&apos;s what I ship.
          </p>

          <p className="font-semibold text-ink pt-2">What I build today:</p>
          <ul className="space-y-2 pl-1">
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Agentic workflows in n8n orchestrating Claude, OpenAI, and
                custom Python scripts
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Lead qualification pipelines that score, route, and enrich
                inbound inquiries automatically
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Multi-channel content distribution engines (one input → blogs,
                social posts, short-form video) running at near-zero marginal
                cost
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                A local voice assistant (JARVIS) built on open-source LLMs,
                because understanding the full stack matters
              </span>
            </li>
          </ul>

          <p className="font-semibold text-ink pt-2">What I&apos;m looking for:</p>
          <p>
            Remote-first AI Operations, Solutions Engineering, or Automation
            roles at global companies that value hybrid profiles — people who
            can architect the system and navigate the humans who have to use
            it. Open to full-time, contract, and consulting arrangements.
          </p>
          <p>
            If you&apos;re hiring for someone who can own an AI workflow
            end-to-end — from business requirement to deployed system to
            post-launch iteration — let&apos;s talk.
          </p>
        </div>
      </div>
    </section>
  );
}
