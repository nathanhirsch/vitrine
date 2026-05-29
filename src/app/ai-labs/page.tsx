import React from "react";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  status: "Coming Soon" | "Launched" | "Research";
  href?: string;
  skills: string[];
};

const projects: Project[] = [
  {
    title: "AI/ML Projects",
    description:
      "A repository of deep learning projects to teach me how to train models from scratch (or from pre-trained models) using PyTorch and the Fast.ai book.",
    status: "Research",
    href: "/ai-labs/fastai",
    skills: [
      "fast.ai",
      "PyTorch",
      "Transfer learning",
      "Hugging Face Spaces",
    ],
  },
  {
    title: "Customer Insight Engine",
    description:
      "Clusters customer feedback at scale, surfaces product-level themes and blind spots, and improves insight quality through evaluation loops.",
    status: "Launched",
    href: "/ai-labs/customer-insight-engine",
    skills: [
      "Embedding-based clustering",
      "Topic extraction",
      "Human feedback loop",
      "Learning memory",
    ],
  },
  {
    title: "EvalAgent",
    description:
      "Generates structured test suites for AI agents (golden path, edge case, and adversarial tests) from a system prompt or GitHub repo URL. Surfaces how an agent behaves when things go right, when assumptions break, and when it is actively pushed off course.",
    status: "Launched",
    href: "/ai-labs/eval-agent",
    skills: [
      "Agent evaluation",
      "Assumption matrix",
      "Adversarial testing",
      "Claude Haiku + Sonnet",
    ],
  },
  {
    title: "My Writing Agent",
    description:
      "Open-source agent workflow that turns essays into X posts, routes review through Google Sheets, posts approved content automatically, and learns from engagement data.",
    status: "Launched",
    href: "/ai-labs/my-writing-agent",
    skills: [
      "OpenAI generation pipeline",
      "Google Sheets review queue",
      "X posting + analytics loop",
      "Taste-profile learning updates",
    ],
  },
  {
    title: "Slack Feedback Capture Agent",
    description:
      "Captures product feedback directly from Slack reactions, prepares it for ingestion into a classification pipeline, stores it for review, and exports approved insights as structured CSV.",
    status: "Launched",
    href: "/ai-labs/slack-feedback-capture-agent",
    skills: [
      "Slack event ingestion",
      "Feedback classification",
      "Review workflow + export API",
      "PostgreSQL-backed pipeline",
    ],
  },
  {
    title: "Ops (Slack)",
    description:
      "Slack app that turns a thread into a PRD draft, thread summary, or action items using slash commands and OpenAI, with post-to-thread and regenerate flows.",
    status: "Launched",
    href: "/ai-labs/ops-slack",
    skills: [
      "Slack Bolt + Express",
      "Slash commands",
      "Thread-to-artifact generation",
      "OpenAI API",
    ],
  },
  {
    title: "LinkedIn Post Generator for Sales",
    description:
      "Multi-user SaaS that turns a sales deck PDF into 10 LinkedIn post candidates in under 90 seconds, written in your voice. Review and approve in Google Sheets, publish directly to LinkedIn. Currently in private beta.",
    status: "Launched",
    href: "/ai-labs/linkedin-post-generator",
    skills: [
      "PDF-to-post pipeline",
      "Multi-user SaaS",
      "LinkedIn OAuth publishing",
      "Per-user voice learning",
    ],
  },
  {
    title: "Automation Opportunity Assessment",
    description:
      "Multi-step inbound lead tool: visitors answer structured questions about their workflows, Claude generates a personalised automation quick take, and the full assessment lands in my inbox via Resend.",
    status: "Launched",
    href: "/ai-labs/automation-assessment",
    skills: [
      "Multi-step form",
      "Claude Sonnet analysis",
      "Resend email delivery",
      "Lead qualification",
    ],
  },
  {
    title: "Private Knowledge Engine",
    description:
      "A retrieval stack over your notes and documents that answers with citations and tightens retrieval quality as you use it.",
    status: "Coming Soon",
    skills: [
      "Retrieval-augmented generation",
      "Context construction",
      "Hallucination mitigation",
    ],
  },
  {
    title: "Sign in with MyMemory to AI apps",
    description:
      "Interactive experience for user-owned memory that stays private by design, with permission selection to grant AI apps access only to specific aspects of personal context.",
    status: "Coming Soon",
    href: "/ai-labs/sign-in-with-memory",
    skills: [
      "Permissioned memory access",
      "Wallet-style connect flow",
      "In-chat consent requests",
      "User memory controls",
    ],
  },
  {
    title: "US Visa Assistant",
    description:
      "Share your LinkedIn profile, resume, and personal history — a multi-agent system searches the current visa landscape, identifies your most plausible US visa pathways, explains why each fits your profile, and assembles an up-to-date document checklist for each option.",
    status: "Coming Soon",
    skills: [
      "Multi-agent orchestration",
      "Privacy-first design",
      "LinkedIn + resume parsing",
      "Live document retrieval",
    ],
  },
  {
    title: "CrossFit: Fix Your Weakness",
    description:
      "Tell the agent your back squat, strict handstand push-up count, snatch, and other benchmarks. It draws on 10 years of CrossFit Games and Semifinal workouts plus the CrossFit Journal to build a personalized daily program targeting your exact weak points.",
    status: "Coming Soon",
    skills: [
      "Conversational intake Q&A",
      "Movement database RAG",
      "CrossFit Journal corpus",
      "Weakness-targeted programming",
    ],
  },
];

export default function AILabsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Projects I have built
        </h1>
        <p className="max-w-2xl text-slate-300">
          This is where I showcase my AI-first projects: work that reflects
          end-to-end product thinking, curiosity and execution.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) =>
          project.href ? (
            <Link
              key={project.title}
              href={project.href}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-yellow-400/60 hover:bg-slate-900"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium text-white">{project.title}</h2>
                <span
                  className={
                    project.status === "Launched"
                      ? "shrink-0 rounded-full border border-yellow-400/55 bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-200"
                      : project.status === "Research"
                      ? "shrink-0 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                      : "shrink-0 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300"
                  }
                >
                  {project.status}
                </span>
              </div>
              <p className="line-clamp-3 text-sm text-slate-300">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-slate-700/70 bg-slate-950/40 px-2.5 py-0.5 text-[11px] leading-snug text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Link>
          ) : (
            <article
              key={project.title}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium text-white">{project.title}</h2>
                <span
                  className={
                    project.status === "Launched"
                      ? "shrink-0 rounded-full border border-yellow-400/55 bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-200"
                      : project.status === "Research"
                      ? "shrink-0 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                      : "shrink-0 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300"
                  }
                >
                  {project.status}
                </span>
              </div>
              <p className="line-clamp-3 text-sm text-slate-300">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-slate-700/70 bg-slate-950/40 px-2.5 py-0.5 text-[11px] leading-snug text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
