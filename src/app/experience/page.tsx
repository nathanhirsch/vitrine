const experiences = [
  {
    role: "Senior Product Engineer",
    company: "Your Company",
    period: "2023 - Present",
    impact:
      "Led product delivery for customer-facing features, improving adoption and retention.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    role: "Software Engineer",
    company: "Previous Company",
    period: "2021 - 2023",
    impact:
      "Built internal tooling that reduced manual workflow time and improved team throughput.",
    stack: ["React", "Python", "AWS"],
  },
];

export default function ExperiencePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Work Experience
        </h1>
        <p className="max-w-2xl text-slate-300">
          Replace these placeholders with your real accomplishments and
          measurable outcomes.
        </p>
      </div>

      <div className="space-y-4">
        {experiences.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-medium text-white">
                {item.role} · {item.company}
              </h2>
              <p className="text-sm text-slate-400">{item.period}</p>
            </div>
            <p className="mb-4 text-slate-300">{item.impact}</p>
            <div className="flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
