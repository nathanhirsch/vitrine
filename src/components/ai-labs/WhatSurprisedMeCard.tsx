import type { ReactNode } from "react";

export function WhatSurprisedMeCard({ children }: { children: ReactNode }) {
  return (
    <article className="rounded-xl border border-slate-700/80 border-l-[3px] border-l-yellow-400/45 bg-slate-900/40 p-6">
      <h2 className="mb-3 text-lg font-medium text-white">What surprised me</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-300">
        {children}
      </div>
    </article>
  );
}
