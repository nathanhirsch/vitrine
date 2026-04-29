import React from "react";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  status: "In Progress" | "Launched";
  href?: string;
  skills: string[];
};

const projects: Project[] = [
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
    title: "Autonomous Content Operator",
    description:
      "An agent that reads long-form source material, generates platform-native posts and threads, and refines what ships using feedback and performance signals.",
    status: "In Progress",
    skills: [
      "Agent orchestration",
      "Tool integration",
      "Autonomous iteration",
    ],
  },
  {
    title: "Private Knowledge Engine",
    description:
      "A retrieval stack over your notes and documents that answers with citations and tightens retrieval quality as you use it.",
    status: "In Progress",
    skills: [
      "Retrieval-augmented generation",
      "Context construction",
      "Hallucination mitigation",
    ],
  },
];

export default function AILabsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          My AI Playground
        </h1>
        <p className="max-w-2xl text-slate-300">
          This is where I showcase my AI-first projects—work that reflects
          end-to-end product thinking and execution, with a clear line to
          business relevance.
        </p>
      </div>

      <div className="columns-1 gap-4 md:columns-2">
        {projects.map((project) =>
          project.href ? (
            <Link
              key={project.title}
              href={project.href}
              className="mb-4 block break-inside-avoid rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-cyan-400/60 hover:bg-slate-900"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium text-white">{project.title}</h2>
                <span
                  className={
                    project.status === "Launched"
                      ? "shrink-0 rounded-full border border-cyan-500/35 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300"
                      : "shrink-0 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                  }
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-300">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
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
              className="mb-4 break-inside-avoid rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium text-white">{project.title}</h2>
                <span
                  className={
                    project.status === "Launched"
                      ? "shrink-0 rounded-full border border-cyan-500/35 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300"
                      : "shrink-0 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                  }
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-300">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
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
