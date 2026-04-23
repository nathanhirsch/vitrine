const projects = [
  {
    title: "Job Copilot",
    description:
      "An AI assistant that tailors application materials for each role and tracks opportunities.",
    status: "In Development",
  },
  {
    title: "Interview Practice Coach",
    description:
      "A voice + text mock interview tool that gives feedback on clarity, confidence, and relevance.",
    status: "Prototype",
  },
  {
    title: "AI Portfolio Analyzer",
    description:
      "Analyzes project repos and auto-generates concise proof-of-impact narratives.",
    status: "Shipped",
  },
];

export default function AILabsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          AI Labs
        </h1>
        <p className="max-w-2xl text-slate-300">
          This is where you showcase AI-first projects that demonstrate
          end-to-end product thinking, engineering execution, and business
          relevance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-medium text-white">{project.title}</h2>
              <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-slate-300">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
