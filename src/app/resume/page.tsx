import Link from "next/link";

const resumeBullets = [
  "Built web3 products from 0-1 and scaled to millions of users.",
  "Founder of Napoleon and Clean Design, shipping products that target behavior change.",
  "Senior product leadership experience across crypto infrastructure, growth, and monetization.",
  "Now focused on AI x human collaboration to build products with real-world impact.",
];

export default function ResumePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Resume
        </h1>
        <p className="max-w-2xl text-slate-300">
          AI Senior Product Manager with an MSc in Entrepreneurship from EDHEC
          Business School.
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
        <div className="mb-6 space-y-2 text-sm text-slate-300">
          <p>
            <span className="font-medium text-white">Contact:</span>{" "}
            nathan1hirsch@gmail.com · +1 (442) 413-0078
          </p>
          <p>
            <span className="font-medium text-white">LinkedIn:</span>{" "}
            <Link
              href="https://www.linkedin.com/in/nathanhirsch2"
              className="text-cyan-300 underline-offset-4 hover:underline"
            >
              /in/nathanhirsch2
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume.pdf"
            className="rounded-md border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Download Resume PDF
          </Link>
          <Link
            href="mailto:nathan1hirsch@gmail.com"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Contact Nathan
          </Link>
        </div>
      </article>
    </section>
  );
}
