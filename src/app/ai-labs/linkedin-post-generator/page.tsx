import { WhatSurprisedMeCard } from "@/components/ai-labs/WhatSurprisedMeCard";

const highlights = [
  "Accepts a sales deck PDF and generates 10 LinkedIn post candidates in under 90 seconds.",
  "Posts are written in the user's voice, not a generic template, and improve over time based on their edits.",
  "Multi-user SaaS with per-user data isolation: each account has its own posts, approvals, and voice profile.",
  "Review surface is Google Sheets, so users can approve or edit posts without leaving a tool they already know.",
  "Approved posts publish directly to LinkedIn via OAuth, no copy-paste required.",
  "Persistent storage and a learning loop mean the output gets more accurate the more a user engages with it.",
];

export default function LinkedInPostGeneratorPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          LinkedIn Post Generator for Sales
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Upload a sales deck PDF, get 10 LinkedIn post candidates written in
          your voice in under 90 seconds. Review and approve in Google Sheets,
          then publish directly to LinkedIn. Currently in private beta with real
          users.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://postonlinkedin.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            Live Site (Private Beta)
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

      {/* Core flow */}
      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-3 text-xl font-medium text-white">Core flow</h2>
        <ol className="list-inside list-decimal space-y-2 text-slate-300">
          <li>User signs in with Google OAuth and connects their LinkedIn account.</li>
          <li>Upload a sales deck PDF to the dashboard.</li>
          <li>Claude extracts key messages and generates 10 post candidates in the user&apos;s voice.</li>
          <li>Posts land in a personal Google Sheet for review, approval, or editing.</li>
          <li>Approved posts publish to LinkedIn automatically via the LinkedIn API.</li>
          <li>Edits feed back into the user&apos;s voice profile to improve future generations.</li>
        </ol>
      </article>

      {/* What surprised me */}
      <WhatSurprisedMeCard>
        <p>
          I was genuinely apprehensive that this would just be a Claude wrapper with no
          real value. Then salespeople I actually know started using it. That surprised me.
        </p>
        <p>
          I did not expect a single-feature tool to land that way. The bar for adoption
          is not always capability. Sometimes it is just having one clear thing and a
          frictionless path to get it. The simplicity is not a limitation. It is the feature.
        </p>
      </WhatSurprisedMeCard>

      {/* Built with */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Built with</h2>
        <div className="flex flex-wrap gap-1.5">
          {[
            "FastAPI",
            "Claude API",
            "Google OAuth",
            "LinkedIn OAuth",
            "Google Sheets",
            "Python",
          ].map((t) => (
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
