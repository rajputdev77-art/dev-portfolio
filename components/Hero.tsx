export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-ink leading-tight mb-6">
          Dev Rajput
        </h1>
        <p className="text-xl md:text-2xl text-ink/80 max-w-2xl leading-relaxed mb-4">
          I design AI systems and automated workflows that solve real business
          problems — lead qualification, content pipelines, and intelligent
          agents that run without you.
        </p>
        <p className="text-base md:text-lg text-ink/60 max-w-xl mb-10">
          AI automation builder. n8n workflow engineer. Operations background.
          MBA.
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
