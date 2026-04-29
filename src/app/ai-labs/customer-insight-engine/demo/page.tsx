"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { AnalyzeMiniResult } from "@/lib/analyze-mini";

const PROCESS_STEPS = [
  "Extracting signals",
  "Detecting patterns",
  "Generating product insights",
];

const SAMPLE_INPUT = [
  "I keep missing critical account alerts because they are mixed with low-priority notifications.",
  "The app feels laggy when I switch between customers on mobile, so I avoid using it in the field.",
  "Setup took too long. I had to contact support twice to connect our data source correctly.",
].join("\n");

export default function CustomerInsightEngineDemoPage() {
  const [emailsText, setEmailsText] = useState("");
  const [result, setResult] = useState<AnalyzeMiniResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const parsedEmails = useMemo(
    () =>
      emailsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [emailsText]
  );

  useEffect(() => {
    const fetchDemo = async () => {
      try {
        const response = await fetch("/api/analyze-mini/demo");
        if (!response.ok) throw new Error("Could not load default demo data.");
        const data = (await response.json()) as AnalyzeMiniResult;
        setResult(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not load demo data.";
        setError(message);
      }
    };
    void fetchDemo();
  }, []);

  useEffect(() => {
    if (!loading) return;
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex((current) => (current + 1) % PROCESS_STEPS.length);
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    setError(null);

    if (parsedEmails.length === 0) {
      setError("Please paste at least 1 email.");
      return;
    }
    if (parsedEmails.length > 5) {
      setError("Please keep it to 5 emails max for this demo.");
      return;
    }

    const tooLong = parsedEmails.some((email) => email.length > 1000);
    if (tooLong) {
      setError("Each email must be 1000 characters or fewer.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze-mini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: parsedEmails }),
      });
      const data = (await response.json()) as AnalyzeMiniResult & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setEmailsText("");
    setError(null);
    setLoading(false);
    setStepIndex(0);
    const response = await fetch("/api/analyze-mini/demo");
    if (response.ok) {
      const data = (await response.json()) as AnalyzeMiniResult;
      setResult(data);
    }
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          AI Customer Insight Engine (demo)
        </h1>
        <p className="max-w-3xl text-slate-300">
          Turn messy customer emails into themes, behavioral clusters, and
          product recommendations.
        </p>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium text-white">Input</h2>
          <p className="text-xs text-slate-400">{parsedEmails.length}/5 emails</p>
        </div>
        <textarea
          value={emailsText}
          onChange={(event) => setEmailsText(event.target.value)}
          rows={6}
          placeholder="Paste up to 5 customer emails, one per line..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-100 outline-none ring-cyan-400/50 placeholder:text-slate-500 focus:ring-2"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-md border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Analyze emails
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
          <button
            onClick={() => setEmailsText(SAMPLE_INPUT)}
            disabled={loading}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Fill sample input
          </button>
        </div>
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      </article>

      {loading ? (
        <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-4 text-lg font-medium text-white">Processing</h2>
          <div className="space-y-2">
            {PROCESS_STEPS.map((step, index) => (
              <p
                key={step}
                className={
                  index === stepIndex
                    ? "text-sm text-cyan-300"
                    : "text-sm text-slate-400"
                }
              >
                {index === stepIndex ? "• " : "○ "}
                {step}
              </p>
            ))}
          </div>
        </article>
      ) : null}

      {result ? (
        <>
          <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-4 text-lg font-medium text-white">
              Structured Signals
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="px-2 py-2 font-medium">Email</th>
                    <th className="px-2 py-2 font-medium">Theme</th>
                    <th className="px-2 py-2 font-medium">Emotion</th>
                    <th className="px-2 py-2 font-medium">Intent</th>
                  </tr>
                </thead>
                <tbody>
                  {result.signals.map((signal) => (
                    <tr key={signal.email_id} className="border-b border-slate-900">
                      <td className="px-2 py-3 text-slate-300">{signal.email}</td>
                      <td className="px-2 py-3 text-slate-200">{signal.theme}</td>
                      <td className="px-2 py-3 text-slate-200">{signal.emotion}</td>
                      <td className="px-2 py-3 text-slate-200">{signal.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-4 text-lg font-medium text-white">
              Behavioral Clusters
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {result.clusters.map((cluster) => (
                <div
                  key={cluster.cluster_id}
                  className="rounded-lg border border-slate-800 bg-slate-950/50 p-4"
                >
                  <h3 className="text-base font-medium text-white">
                    {cluster.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{cluster.summary}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Email IDs: {cluster.email_ids.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-4 text-lg font-medium text-white">
              Product Recommendations
            </h2>
            <div className="space-y-3">
              {result.clusters.map((cluster) => (
                <div
                  key={`rec-${cluster.cluster_id}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/50 p-4"
                >
                  <p className="text-sm font-medium text-slate-100">
                    {cluster.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {cluster.product_recommendation}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </>
      ) : null}

      <div>
        <Link
          href="/ai-labs/customer-insight-engine"
          className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          Back to project highlights
        </Link>
      </div>
    </section>
  );
}
