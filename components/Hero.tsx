export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-ink leading-tight mb-6">
          AI Operations Specialist
        </h1>
        <p className="text-xl md:text-2xl text-ink/80 max-w-2xl leading-relaxed mb-6">
          I build, deploy, and scale AI workflows that make businesses run
          faster, leaner, and smarter.
        </p>
        <p className="text-base md:text-lg text-ink/60 max-w-2xl mb-10 leading-relaxed">
          Currently architecting agentic automation systems in n8n, Claude, and
          Python — turning manual operational chaos into self-running
          infrastructure. Previously led operations for a ₹300 Cr+ real estate
          portfolio, where I first learned that the real product is the system,
          not the output.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-block px-6 py-3 bg-teal-primary text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="inline-block px-6 py-3 border border-teal-primary text-teal-primary rounded-lg font-medium hover:bg-teal-primary hover:text-white transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
