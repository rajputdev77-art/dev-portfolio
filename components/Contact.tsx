import { Mail, ExternalLink, FileDown } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
          Let&apos;s build something that runs itself.
        </h2>
        <p className="text-lg text-ink/80 max-w-2xl mb-10">
          I&apos;m currently available for remote-first AI Operations,
          Solutions Engineering, and Automation roles at global companies. Also
          open to consulting engagements and founding-team positions at
          early-stage AI startups.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
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
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-teal-primary text-teal-primary rounded-lg font-medium hover:bg-teal-primary hover:text-white transition-colors"
          >
            <FileDown size={18} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
