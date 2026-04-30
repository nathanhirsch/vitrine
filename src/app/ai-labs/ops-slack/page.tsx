const highlights = [
  "Turns Slack threads into structured PM outputs: PRD, summary, or action items.",
  "Thread-only slash commands with ephemeral previews and post-to-thread actions.",
  "Built with TypeScript, Slack Bolt, and OpenAI for reliable team workflows.",
];

export default function OpsSlackPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Ops (Slack)
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Ops is a Slack app for product and engineering: run /prd, /summarize, or
          /actions inside a thread and get AI-generated artifacts you can post back
          to the same thread.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/nathanhirsch/ops-slack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/nathanhirsch/ops-slack/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-900"
          >
            Read setup guide
          </a>
        </div>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">Why it is useful</h2>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-3 text-xl font-medium text-white">Commands</h2>
        <ul className="list-inside list-decimal space-y-2 text-slate-300">
          <li>
            <code className="text-slate-200">/prd</code> — PRD draft from the thread
          </li>
          <li>
            <code className="text-slate-200">/summarize</code> — Thread summary
          </li>
          <li>
            <code className="text-slate-200">/actions</code> — Action items
          </li>
        </ul>
      </article>
    </section>
  );
}
