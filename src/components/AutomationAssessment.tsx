"use client";

import { useState } from "react";
import type { AssessmentPayload } from "@/app/api/assessment/route";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_STEPS = 5; // steps 1–5 shown in progress (gate is step 0)

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-8 flex gap-1.5">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors ${
            i < current ? "bg-yellow-400" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

function StepLabel({ label }: { label: string }) {
  return (
    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-yellow-400/80">
      {label}
    </p>
  );
}

function Question({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Rough notes are fine…"}
        rows={3}
        className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:border-yellow-400/60 focus:outline-none focus:ring-1 focus:ring-yellow-400/30"
      />
    </div>
  );
}

function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
        {required && <span className="ml-1 text-yellow-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:border-yellow-400/60 focus:outline-none focus:ring-1 focus:ring-yellow-400/30"
      />
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continue →",
  disabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-slate-400 transition hover:text-white"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="rounded-lg border border-yellow-400/55 bg-yellow-500/10 px-5 py-2.5 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {nextLabel}
      </button>
    </div>
  );
}

export function AutomationAssessment() {
  const [step, setStep] = useState<Step>(0);
  const [error, setError] = useState("");
  const [quickTake, setQuickTake] = useState("");

  const [gate, setGate] = useState({ name: "", email: "", company: "", role: "" });
  const [s1, setS1] = useState({ prep: "", writeup: "", followUp: "", leads: "", proposal: "", manual: "" });
  const [s2, setS2] = useState({ crm: "", reports: "", leadRouting: "", fallthrough: "" });
  const [s3, setS3] = useState({ admin: "", copyPaste: "", bottlenecks: "", searching: "", scheduledUpdates: "" });
  const [s4, setS4] = useState({
    problems: [
      { what: "", who: "", ideal: "" },
      { what: "", who: "", ideal: "" },
      { what: "", who: "", ideal: "" },
    ],
  });

  const updateProblem = (i: number, key: "what" | "who" | "ideal", v: string) => {
    setS4((prev) => {
      const updated = [...prev.problems];
      updated[i] = { ...updated[i], [key]: v };
      return { problems: updated };
    });
  };

  const canStartAssessment =
    gate.name.trim() && gate.email.trim() && gate.company.trim() && gate.role.trim();

  const submit = async () => {
    setStep(5);
    setError("");

    const payload: AssessmentPayload = {
      gate,
      step1: s1,
      step2: s2,
      step3: s3,
      step4: s4,
    };

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setQuickTake(data.quickTake);
      setStep(6);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(4);
    }
  };

  const printResults = () => window.print();

  // Step 0 — Gate
  if (step === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <StepLabel label="Before we begin" />
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Automation Opportunity Assessment
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-slate-400">
          Answer a few questions about how your team works. In under 10 minutes,
          you&apos;ll get an AI-generated analysis of your top automation opportunity.
          I&apos;ll follow up personally within 48 hours.
        </p>

        <div className="space-y-4">
          <TextInput label="Full name" value={gate.name} onChange={(v) => setGate((p) => ({ ...p, name: v }))} placeholder="Nathan Hirsch" required />
          <TextInput label="Work email" type="email" value={gate.email} onChange={(v) => setGate((p) => ({ ...p, email: v }))} placeholder="you@company.com" required />
          <TextInput label="Company name" value={gate.company} onChange={(v) => setGate((p) => ({ ...p, company: v }))} placeholder="Acme Corp" required />
          <TextInput label="Your role" value={gate.role} onChange={(v) => setGate((p) => ({ ...p, role: v }))} placeholder="Head of Sales" required />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!canStartAssessment}
            className="rounded-lg border border-yellow-400/55 bg-yellow-500/10 px-6 py-2.5 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start the assessment →
          </button>
        </div>
      </div>
    );
  }

  // Step 1 — Sales workflow
  if (step === 1) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <ProgressBar current={1} />
        <StepLabel label="Step 1 of 4" />
        <h2 className="mb-1 text-xl font-semibold text-white">Your sales workflow</h2>
        <p className="mb-7 text-sm text-slate-400">
          Think about your week. Answer what you can — rough notes are fine.
        </p>

        <div className="space-y-5">
          <Question label="What do you do to prepare before a sales call or meeting? How long does it take?" value={s1.prep} onChange={(v) => setS1((p) => ({ ...p, prep: v }))} />
          <Question label="After a call, what do you write up or update, and where?" value={s1.writeup} onChange={(v) => setS1((p) => ({ ...p, writeup: v }))} />
          <Question label="How do you follow up with prospects — what does a typical sequence look like?" value={s1.followUp} onChange={(v) => setS1((p) => ({ ...p, followUp: v }))} />
          <Question label="Where do leads come from, and what happens between first contact and a booked call?" value={s1.leads} onChange={(v) => setS1((p) => ({ ...p, leads: v }))} />
          <Question label="What information do you pull together to build a proposal or quote?" value={s1.proposal} onChange={(v) => setS1((p) => ({ ...p, proposal: v }))} />
          <Question label="Is there anything you do manually that you've thought &quot;this should just happen automatically&quot;?" value={s1.manual} onChange={(v) => setS1((p) => ({ ...p, manual: v }))} />
        </div>

        <NavButtons onBack={() => setStep(0)} onNext={() => setStep(2)} />
      </div>
    );
  }

  // Step 2 — Team & pipeline
  if (step === 2) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <ProgressBar current={2} />
        <StepLabel label="Step 2 of 4" />
        <h2 className="mb-1 text-xl font-semibold text-white">Team &amp; pipeline</h2>
        <p className="mb-7 text-sm text-slate-400">
          How your team manages deals and information.
        </p>

        <div className="space-y-5">
          <Question label="How does your team track deals — what CRM or tool, and how up-to-date is it?" value={s2.crm} onChange={(v) => setS2((p) => ({ ...p, crm: v }))} />
          <Question label="Are there reports or summaries someone builds by hand (weekly numbers, pipeline reviews)?" value={s2.reports} onChange={(v) => setS2((p) => ({ ...p, reports: v }))} />
          <Question label="How are leads distributed, qualified, or prioritized?" value={s2.leadRouting} onChange={(v) => setS2((p) => ({ ...p, leadRouting: v }))} />
          <Question label="Does anything fall through the cracks — leads that go cold, follow-ups that don't happen?" value={s2.fallthrough} onChange={(v) => setS2((p) => ({ ...p, fallthrough: v }))} />
        </div>

        <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} />
      </div>
    );
  }

  // Step 3 — Operations & communication
  if (step === 3) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <ProgressBar current={3} />
        <StepLabel label="Step 3 of 4" />
        <h2 className="mb-1 text-xl font-semibold text-white">Operations &amp; communication</h2>
        <p className="mb-7 text-sm text-slate-400">
          The recurring friction that costs time across the team.
        </p>

        <div className="space-y-5">
          <Question label="What recurring admin tasks take up the most collective time in a week?" value={s3.admin} onChange={(v) => setS3((p) => ({ ...p, admin: v }))} />
          <Question label="Are there things people copy-paste between systems (spreadsheet → CRM, email → Slack)?" value={s3.copyPaste} onChange={(v) => setS3((p) => ({ ...p, copyPaste: v }))} />
          <Question label="Is there a process that always creates bottlenecks or waiting time?" value={s3.bottlenecks} onChange={(v) => setS3((p) => ({ ...p, bottlenecks: v }))} />
          <Question label="What do people spend time searching for or asking each other that could be answered instantly?" value={s3.searching} onChange={(v) => setS3((p) => ({ ...p, searching: v }))} />
          <Question label="Are there updates or reports that get sent manually on a schedule?" value={s3.scheduledUpdates} onChange={(v) => setS3((p) => ({ ...p, scheduledUpdates: v }))} />
        </div>

        <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} />
      </div>
    );
  }

  // Step 4 — Top 3 problems
  if (step === 4) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <ProgressBar current={4} />
        <StepLabel label="Step 4 of 4" />
        <h2 className="mb-1 text-xl font-semibold text-white">Your top 3 problems</h2>
        <p className="mb-7 text-sm text-slate-400">
          Pick the three things that hurt the most. Be as specific as you can.
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {s4.problems.map((p, i) => (
            <div key={i} className="rounded-lg border border-slate-700/60 bg-slate-950/40 p-4">
              <p className="mb-4 text-sm font-semibold text-slate-200">
                Problem {i + 1}
              </p>
              <div className="space-y-4">
                <Question
                  label="What it is"
                  value={p.what}
                  onChange={(v) => updateProblem(i, "what", v)}
                  placeholder="Describe the problem…"
                />
                <Question
                  label="Who it affects and how often"
                  value={p.who}
                  onChange={(v) => updateProblem(i, "who", v)}
                  placeholder="e.g. Every SDR, every morning…"
                />
                <Question
                  label="What good would look like"
                  value={p.ideal}
                  onChange={(v) => updateProblem(i, "ideal", v)}
                  placeholder="What does solved feel like?"
                />
              </div>
            </div>
          ))}
        </div>

        <NavButtons
          onBack={() => setStep(3)}
          onNext={submit}
          nextLabel="Generate my analysis →"
        />
      </div>
    );
  }

  // Step 5 — Loading
  if (step === 5) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <ProgressBar current={5} />
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-500/10">
            <svg
              className="h-6 w-6 animate-spin text-yellow-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-white">
            Generating your analysis
          </h2>
          <p className="max-w-sm text-sm text-slate-400">
            Reviewing your answers and identifying the highest-impact opportunity.
            This takes about 15 seconds.
          </p>
        </div>
      </div>
    );
  }

  // Step 6 — Results
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 print:border-0 print:bg-white print:p-0">
      <StepLabel label="Your results" />
      <h2 className="mb-6 text-2xl font-semibold text-white print:text-slate-900">
        Here&apos;s your automation quick take
      </h2>

      <div className="mb-8 space-y-4 rounded-xl border border-yellow-400/20 bg-yellow-500/5 p-5">
        {quickTake.split("\n\n").filter(Boolean).map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-slate-200 print:text-slate-800">
            {para}
          </p>
        ))}
      </div>

      <p className="mb-8 rounded-lg border border-slate-700/60 bg-slate-950/40 px-4 py-3 text-sm text-slate-400">
        I&apos;ll review your answers and follow up within 48 hours with specific
        questions and a proposed first build.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={printResults}
          className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-900"
        >
          Download as PDF
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setQuickTake("");
            setGate({ name: "", email: "", company: "", role: "" });
            setS1({ prep: "", writeup: "", followUp: "", leads: "", proposal: "", manual: "" });
            setS2({ crm: "", reports: "", leadRouting: "", fallthrough: "" });
            setS3({ admin: "", copyPaste: "", bottlenecks: "", searching: "", scheduledUpdates: "" });
            setS4({ problems: [{ what: "", who: "", ideal: "" }, { what: "", who: "", ideal: "" }, { what: "", who: "", ideal: "" }] });
          }}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-300"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
