import { AutomationAssessment } from "@/components/AutomationAssessment";
import { WhatSurprisedMeCard } from "@/components/ai-labs/WhatSurprisedMeCard";

const highlights = [
  "Multi-step assessment collects workflow context across sales, pipeline, and operations.",
  "Claude generates a 3-paragraph quick take pinpointing the highest-impact automation opportunity.",
  "Full form data and AI analysis land in my inbox automatically via Resend.",
  "Designed as an inbound lead tool: structured questions replace vague discovery calls.",
];

export default function AutomationAssessmentPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Automation Opportunity Assessment
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Answer a structured set of questions about your workflows. Claude
          identifies your top automation opportunity and I follow up with a
          proposed first build.
        </p>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">How it works</h2>
        <ul className="space-y-2">
          {highlights.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-slate-300">
              <span className="mt-1 shrink-0 text-yellow-400/60">—</span>
              {point}
            </li>
          ))}
        </ul>
      </article>

      <WhatSurprisedMeCard>
        <p>
          The most useful signal came from step 4, the shortlist. When people
          articulate their top 3 in their own words, the real problem surfaces
          fast. The earlier questions are context; this one is signal.
        </p>
      </WhatSurprisedMeCard>

      <AutomationAssessment />
    </section>
  );
}
