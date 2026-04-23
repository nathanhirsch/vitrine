import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-300">
          Portfolio in Progress
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Hi, I&apos;m Nathan. I build practical products with AI.
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          This website showcases my professional experience, resume, and an AI
          Labs section where I publish projects that demonstrate real-world,
          job-ready AI development skills.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/experience"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-cyan-400/60 hover:bg-slate-900"
        >
          <h2 className="mb-2 text-xl font-semibold text-white">Experience</h2>
          <p className="text-sm text-slate-300">
            Timeline of roles, impact, and technologies.
          </p>
        </Link>
        <Link
          href="/resume"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-cyan-400/60 hover:bg-slate-900"
        >
          <h2 className="mb-2 text-xl font-semibold text-white">Resume</h2>
          <p className="text-sm text-slate-300">
            Recruiter-friendly highlights and downloadable CV.
          </p>
        </Link>
        <Link
          href="/ai-labs"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-cyan-400/60 hover:bg-slate-900"
        >
          <h2 className="mb-2 text-xl font-semibold text-white">AI Labs</h2>
          <p className="text-sm text-slate-300">
            Experimental and production-focused AI projects.
          </p>
        </Link>
      </div>
    </section>
  );
}
