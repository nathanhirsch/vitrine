import Link from "next/link";
import { WhatSurprisedMeCard } from "@/components/ai-labs/WhatSurprisedMeCard";

const highlights = [
  "Infers what an agent does from its system prompt or GitHub repo — purpose, tools, golden path, and implicit assumptions.",
  "Generates 5 golden path tests that verify the agent under ideal conditions, establishing a performance baseline.",
  "Produces an assumption matrix: every assumption the agent makes mapped to an edge case input and expected graceful failure.",
  "Generates 5 adversarial tests covering prompt injection, tool confusion, overconfidence traps, loop induction, and scope creep.",
  "Optional live runner sends each test directly from the browser to your agent API — your key never touches the server.",
];

export default function EvalAgentPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          EvalAgent
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Generate golden path, edge case, and adversarial tests for any AI agent — from a system prompt or GitHub repo URL.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ai-labs/eval-agent/demo"
            className="inline-flex rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            Try the Demo
          </Link>
          <a
            href="https://github.com/nathanhirsch/eval-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-900"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* What it does */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">What it does</h2>
        <ul className="space-y-2">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-slate-300">
              <span className="mt-1 shrink-0 text-yellow-400/60">—</span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Test categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Test categories</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              label: "Golden Path",
              color: "border-yellow-400/30 bg-yellow-500/5",
              badge: "border-yellow-400/55 bg-yellow-500/10 text-yellow-300",
              body: "5 tests under ideal conditions — all assumptions met, inputs well-formed. Establishes the performance baseline.",
            },
            {
              label: "Edge Cases",
              color: "border-amber-400/30 bg-amber-500/5",
              badge: "border-amber-400/55 bg-amber-500/10 text-amber-300",
              body: "5 tests that each violate one assumption. Verifies the agent degrades gracefully rather than hallucinating a resolution.",
            },
            {
              label: "Adversarial",
              color: "border-red-500/30 bg-red-500/5",
              badge: "border-red-500/55 bg-red-500/10 text-red-300",
              body: "5 tests covering prompt injection, tool confusion, overconfidence traps, loop induction, and scope creep.",
            },
          ].map((cat) => (
            <div key={cat.label} className={`rounded-xl border p-4 ${cat.color}`}>
              <span className={`mb-2 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat.badge}`}>
                {cat.label}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{cat.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What surprised me */}
      <WhatSurprisedMeCard>
        <p>
          Building this made one thing immediately obvious: the agentic framework makes speed and convenience unprecedented. What used to take hours of manual test design — mapping assumptions, writing adversarial inputs, covering edge cases — now takes seconds.
        </p>
        <p>
          But two things surprised me about the limits of what gets generated.
        </p>
        <p>
          The first is that the tests are perishable. The framework — golden path, edge cases, adversarial — is evergreen. The actual test inputs inside it aren&apos;t. Every time the agent improves, the adversarial cases that used to challenge it become trivial. Every time the product scope shifts, the golden path tests silently become wrong. You&apos;re not building a test suite once. You&apos;re committing to regenerating it continuously.
        </p>
        <p>
          The second is the measurement problem. The tool produces fifteen tests and pass criteria that read as authoritative. But fifteen is just fifteen sampled points in an infinite input space. And &ldquo;pass criteria&rdquo; written by a model has its own blind spots — you&apos;re often measuring a ruler with another ruler. Coverage feels real before you look closely at it.
        </p>
        <p>
          That convenience is exactly where the risk lives. The faster output arrives, the easier it is to skim, approve, and move on. Reading every test, questioning whether the adversarial inputs are actually adversarial enough, asking what the framework isn&apos;t measuring — that still requires the same focused effort it always did. That part AI will never do for you.
        </p>
      </WhatSurprisedMeCard>

      {/* Built with */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Built with</h2>
        <div className="flex flex-wrap gap-1.5">
          {["Claude Haiku 4.5", "Claude Sonnet 4.6", "Next.js", "TypeScript", "Tailwind CSS"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-700/70 bg-slate-950/40 px-2.5 py-0.5 text-[11px] leading-snug text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
