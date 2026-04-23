import Link from "next/link";

const resumeBullets = [
  "X+ years building and shipping software products.",
  "Led cross-functional initiatives from idea to deployment.",
  "Strong focus on measurable outcomes and user impact.",
];

export default function ResumePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Resume
        </h1>
        <p className="max-w-2xl text-slate-300">
          Keep this page concise for recruiters and hiring managers. You can
          also host a PDF in the `public` folder and link it below.
        </p>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium text-white">
          Professional Highlights
        </h2>
        <ul className="mb-6 list-inside list-disc space-y-2 text-slate-300">
          {resumeBullets.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume.pdf"
            className="rounded-md border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Download Resume PDF
          </Link>
          <Link
            href="/experience"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            View Full Experience
          </Link>
        </div>
      </article>
    </section>
  );
}
