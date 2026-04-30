import Link from "next/link";

const highlights = [
  "Turns messy customer emails into structured insights, behavioral clusters, and product decisions.",
  "Built end-to-end with LLM classification, semantic clustering, and insight generation.",
  "Identifies real user pain patterns, not just keywords or sentiment.",
  "Outputs actionable product recommendations, not summaries.",
  "Human-in-the-loop: lightweight classification, cluster and product insight feedback sharpens insights and continuously improves classification, clustering, and recommendations.",
];

export default function CustomerInsightEnginePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Customer Insight Engine (AI)
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          From unstructured customer feedback to decision-ready recommendation.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ai-labs/customer-insight-engine/demo"
            className="inline-flex rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            Analyze Your Emails
          </Link>
          <a
            href="https://github.com/nathanhirsch/customer-insight-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-900"
          >
            View Public Repo
          </a>
        </div>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">Key Highlights</h2>
        <ul className="mb-6 list-inside list-disc space-y-2 text-slate-300">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
          <iframe
            src="https://www.loom.com/embed/e39d4ef94d5d423e8dce49e477e6fd94"
            title="Customer Insight Engine Loom demo"
            className="h-[360px] w-full md:h-[420px]"
            allowFullScreen
          />
        </div>
        <div className="mt-4">
          <Link
            href="https://www.loom.com/share/e39d4ef94d5d423e8dce49e477e6fd94"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-yellow-300 transition hover:text-yellow-200"
          >
            Open Loom in a new tab
          </Link>
        </div>
      </article>
    </section>
  );
}
