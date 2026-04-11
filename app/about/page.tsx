import { Mail, ExternalLink } from "lucide-react";

export const metadata = {
  title: "About — Dev Rajput",
  description:
    "AI automation builder with an operations background. I design pipelines that qualify leads, produce content, and run agents — all end-to-end.",
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
            I build AI automation systems that do real work. My most recent
            projects include an AI-powered lead qualification pipeline using n8n
            and Groq&apos;s LLaMA 3.3, a fully autonomous YouTube content system
            that publishes daily videos with zero human intervention, and a
            local voice-first assistant I call JARVIS. I work with n8n, Python,
            Groq, local LLMs, Edge TTS, FFmpeg, and whatever else gets a
            pipeline from idea to production fastest.
          </p>

          <p>
            Before AI, I spent three years running client operations at County
            Group in Noida — managing the post-sale lifecycle for 300+
            residential units across 3 projects and 7 towers. I coordinated
            across sales, legal, finance, and technical teams daily. I
            redesigned client query SOPs that cut resolution time by 35% and
            built an audit process that achieved zero handover rejections across
            300+ units.
          </p>

          <p>
            That operations background is why my AI systems actually work. I
            think in failure modes, not happy paths. I design for crash
            recovery, not just first-run success. And I know that the hardest
            part of any automation is the human decision still hiding inside it.
          </p>

          <p>
            Before operations, I lived on stage — directing plays, acting in a
            Zee TV serial, making short films, and emceeing international events
            with 90+ attendees. Performance taught me how to read a room, run a
            team under pressure, and communicate clearly when it matters most.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-ink mt-12 mb-4">
            What I Bring
          </h2>

          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                AI automation: I design and ship end-to-end pipelines — lead
                qualification, content generation, voice assistants, workflow
                orchestration
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Operations rigor: 3 years of cross-functional coordination,
                SOP design, and process optimization — with real metrics
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Systems thinking: I design for failure modes, crash recovery,
                and production reliability — not just demos
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-primary mt-1 shrink-0">•</span>
              <span>
                Communication: stage training means I can present, document,
                and align stakeholders under pressure
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <h2 className="font-serif text-2xl font-semibold mb-6">
            Get in Touch
          </h2>
          <p className="text-ink/70 mb-6">
            Looking for AI automation, workflow engineering, and applied AI
            roles — European or globally distributed teams, full-time or
            contract.
          </p>
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
