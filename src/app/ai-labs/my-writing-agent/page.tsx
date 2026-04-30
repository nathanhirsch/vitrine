const highlights = [
  "Built an end-to-end content agent: generation, human approval, publishing, and learning.",
  "Uses practical tooling that teams already understand: Python scripts, Google Sheets, and API integrations.",
  "Anyone can plug in their own writing sources and generate X posts quickly.",
];

const quickStart = [
  "git clone https://github.com/nathanhirsch/mywritingagent.git",
  "cd mywritingagent",
  "pip3 install -r requirements.txt",
  "cp .env.example .env",
  "python3 generate.py",
];

export default function MyWritingAgentPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          My Writing Agent
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          An autonomous content system that converts long-form writing into
          high-quality X posts, runs human approval through Sheets, publishes
          approved posts, and continuously improves through post-performance
          feedback.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/nathanhirsch/mywritingagent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            View Repository
          </a>
          <a
            href="https://github.com/nathanhirsch/mywritingagent/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-900"
          >
            Read Setup Guide
          </a>
        </div>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">Why it matters</h2>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-3 text-xl font-medium text-white">Core flow</h2>
        <ol className="list-inside list-decimal space-y-2 text-slate-300">
          <li>Generate post candidates from source essays.</li>
          <li>Approve, reject, or edit drafts in Google Sheets.</li>
          <li>Post approved rows to X automatically.</li>
          <li>Fetch engagement metrics and score outcomes.</li>
          <li>Update taste profile to improve future generations.</li>
        </ol>
      </article>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-3 text-xl font-medium text-white">
          Get started
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-slate-300">
          Clone the project, connect API credentials in <code>.env</code>, add
          text files in <code>sources/</code>, and run generation.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-4">
          <pre className="text-sm text-slate-200">
            <code>{quickStart.join("\n")}</code>
          </pre>
        </div>
      </article>
    </section>
  );
}
