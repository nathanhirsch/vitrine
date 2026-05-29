import React from "react";
import Link from "next/link";

const resumeBullets = [
  "Fluent in AI: from prototyping with models to shipping product workflows teams actually use.",
  "2x founder (Napoleon, Clean Design) — 0→1 builds, GTM, and hands-on product execution.",
  "Web3: scaled NFT infrastructure for global brands and crypto exchange to $1B+ impact ",
];

export default function ResumePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          I am a{" "}
          <span className="rounded-md bg-yellow-400/25 px-2 py-0.5 font-semibold text-yellow-200 shadow-[0_0_24px_-4px_rgba(250,204,21,0.45)] ring-1 ring-yellow-400/60">
            senior product manager
          </span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          +8 years of experience, fluent in AI, 2x founder. Built in consumers, SaaS and Web3.
        </p>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">About me</h2>
        <p className="mb-6 text-slate-300 leading-relaxed">
          I&apos;ve spent 8+ years building product, as PM lead at Luno Exchange, where I owned the wallet product from 6 to 10M users leading a 50-person fleet, then 3 years at Arianee building an EVM protocol and developer infrastructure used by 50+ enterprise customers. I also built two companies from scratch: one was banned by Apple and the other got me a YC interview. Recently moved to the U.S., looking for a team building something important.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume.pdf"
            className="rounded-md border border-yellow-400/55 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20"
          >
            Download Resume PDF
          </Link>
          <Link
            href="https://www.linkedin.com/in/nathanhirsch2/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400 hover:text-yellow-300"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </section>
  );
}
