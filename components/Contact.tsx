import { Mail, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
          Let&apos;s Talk
        </h2>
        <p className="text-lg text-ink/80 max-w-2xl mb-10">
          I&apos;m looking for AI automation, workflow engineering, and applied
          AI roles — particularly with European or globally distributed teams.
          Full-time or contract. If you need someone who can design an AI
          pipeline and also make sure it actually runs in production, reach out.
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
    </section>
  );
}
