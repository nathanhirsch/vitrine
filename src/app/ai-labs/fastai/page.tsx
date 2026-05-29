import Link from "next/link";
import { WhatSurprisedMeCard } from "@/components/ai-labs/WhatSurprisedMeCard";
import { DemoTabs } from "./DemoTabs";

const notebooks = [
  {
    title: "Is it a dog or a panda?",
    description:
      "Binary image classifier trained on a dataset of dogs and pandas using ResNet-34 with transfer learning.",
    tags: ["ResNet-34", "Transfer learning", "Binary classification"],
    active: true,
  },
  {
    title: "3 vs. 7 Digit Classifier",
    description:
      "Binary classifier built from scratch using pure PyTorch on the MNIST dataset — no high-level abstractions, every layer and training loop implemented manually. Temperature scaling is applied to the sigmoid output to soften confidence scores, which surfaces a 'not sure' result more frequently when the model is genuinely uncertain.",
    tags: ["Built from scratch", "Pure PyTorch", "MNIST", "Temperature scaling"],
    active: true,
  },
];

export default function FastAIPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Fast.ai
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Computer vision models trained from scratch using the fast.ai library. Each notebook covers a full training run: data prep, architecture choice, fine-tuning, and deployment to Hugging Face Spaces.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://huggingface.co/spaces/NathanHirsch/nhdemo/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-900"
          >
            Hugging Face Space
          </a>
        </div>
      </div>

      {/* Trained models */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Trained models</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {notebooks.map((nb) => (
            <div
              key={nb.title}
              className="rounded-xl border border-slate-700/70 bg-slate-900/40 p-5 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium text-white">{nb.title}</h3>
                {nb.active && (
                  <span className="shrink-0 rounded-full border border-yellow-400/55 bg-yellow-500/10 px-2.5 py-0.5 text-[11px] font-medium text-yellow-200">
                    Live
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{nb.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {nb.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700/70 bg-slate-950/40 px-2.5 py-0.5 text-[11px] leading-snug text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live demo */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Live demo</h2>
        <DemoTabs />
      </div>

      {/* What surprised me */}
      <WhatSurprisedMeCard>
        <p>
          The hardest part is to get the dataset.
        </p>
      </WhatSurprisedMeCard>

      {/* Built with */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Built with</h2>
        <div className="flex flex-wrap gap-1.5">
          {["fast.ai", "PyTorch", "ResNet-34", "FastAPI", "Hugging Face Spaces", "Next.js"].map((t) => (
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
