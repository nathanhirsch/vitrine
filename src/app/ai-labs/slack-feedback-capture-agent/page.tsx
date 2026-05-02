import { WhatSurprisedMeCard } from "@/components/ai-labs/WhatSurprisedMeCard";

const usefulness = [
  "Turns ad-hoc product feedback in Slack into a reliable, reviewable pipeline.",
  "Reduces manual copy/paste from threads and keeps feedback capture consistent.",
  "Creates clean, approved CSV exports that can feed analysis and roadmap workflows.",
];

const workflow = [
  "Listens for a chosen Slack emoji reaction on messages.",
  "Pulls message context, author, channel, permalink, and thread details.",
  "Classifies the feedback and stores raw + structured data in PostgreSQL.",
  "Supports review status updates through API endpoints.",
  "Exports approved and non-exported feedback rows as CSV.",
];

export default function SlackFeedbackCaptureAgentPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Slack Feedback Capture Agent
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          A lightweight service that captures product feedback from Slack,
          structures it, and makes it ready for review and downstream insight
          workflows.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/nathanhirsch/slack-feedback-capture-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">Why it is useful</h2>
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          {usefulness.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <WhatSurprisedMeCard>
        <p>
          Slack threads are what keep the context window tight—and that assumes
          people actually use one topic per thread. Next up: channel-wide context
          for search-style agents when we need it.
        </p>
      </WhatSurprisedMeCard>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">How it works</h2>
        <ol className="list-inside list-decimal space-y-2 text-slate-300">
          {workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>
    </section>
  );
}
