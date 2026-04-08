const experiences = [
  {
    role: "Client Operations & Coordination Executive",
    company: "County Group",
    location: "Noida, India",
    dates: "Jul 2023 – Present",
    bullets: [
      "Owned post-sale lifecycle for 300+ residential units across 3 projects and 7 towers",
      "Redesigned client query SOPs, achieving 35% reduction in resolution time",
      "Drove 20% improvement in client satisfaction scores through structured service interventions",
    ],
  },
  {
    role: "Special Event Manager & Emcee",
    company: "Freelance",
    location: "Delhi, India",
    dates: "Oct 2022 – Apr 2023",
    bullets: [
      "Led full lifecycle of international panel event with 90+ attendees and 97% satisfaction",
      "Directed 7-person cross-functional team under significant resource constraints",
      "Served as emcee for international conference, hosting live under pressure",
    ],
  },
  {
    role: "Human Resources Intern",
    company: "Conscient Infrastructure Pvt. Ltd.",
    location: "Gurugram, India",
    dates: "Oct 2019 – Apr 2020",
    bullets: [
      "Supported onboarding operations and ERP-based data management",
      "Streamlined internal communication workflows, contributing to a 20% reduction in internal escalations",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-12">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-ink/5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{exp.role}</h3>
                  <p className="text-teal-primary font-medium text-sm">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <p className="text-sm text-ink/50 mt-1 md:mt-0 md:text-right whitespace-nowrap">
                  {exp.dates}
                </p>
              </div>
              <ul className="space-y-2 mt-4">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm text-ink/70 flex gap-2">
                    <span className="text-teal-primary mt-1 shrink-0">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
