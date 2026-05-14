import React from "react";
const experiences = [
  {
    role: "Founder",
    company: "Napoleon",
    period: "Mar 2025 - Present · Paris / San Diego, CA",
    impact:
      "Launched iOS app to 100s of users, achieved paid validation within weeks, and was banned by Apple. Built in public to reach 100K people on LinkedIn and X, and secured non-profit partnerships via Time Left Association.",
    stack: ["Mobile App", "AI", "Build in Public"],
  },
  {
    role: "Senior Product Manager",
    company: "Arianee",
    period: "Aug 2022 - Mar 2025 · Paris, France",
    impact:
      "Scaled NFT infrastructure to 2M+ assets for Breitling, Panerai, and Fnac Darty. Enabled a $10M opportunity via new EVM standards, launched the first web3 CRM on Salesforce, and delivered bank-grade security with MPC wallets.",
    stack: ["Enterprise SaaS", "EVM Protocol", "Interoperability"],
  },
  {
    role: "Founder",
    company: "Clean Design",
    period: "Aug 2021 - Jul 2022 · Paris, France",
    impact:
      "Launched web platform for mobile testing to 100+ active users across PMs and designers, automated workflows across Miro, Figma, and Google Suite, and pitched top-tier VCs including Y Combinator (YC W22).",
    stack: ["0-1 Product", "Fundraising", "Tooling"],
  },
  {
    role: "Senior Product Manager",
    company: "Luno",
    period: "Apr 2019 - Aug 2021 · Cape Town, South Africa",
    impact:
      "Led crypto Wallet product from 6 to 10M+ active customers as fleet leader of a 60-person division. Generated $1.1B+ trading volume and $20M+ revenue from listings, $500K+ from Earn products, increased NPS by +24 pts, and drove +50% QoQ paid upgrades.",
    stack: ["Growth", "Monetization", "Team Leadership"],
  },
  {
    role: "Product Manager",
    company: "Wala",
    period: "Mar 2018 - Apr 2019 · Cape Town, South Africa",
    impact:
      "Grew product from 0 to 100K+ users as early team member (#6) and conducted 200+ user interviews to find product-market fit.",
    stack: ["PMF", "Customer research", "Analytics"],
  },
  {
    role: "Venture Launcher",
    company: "FCB.ai",
    period: "May 2017 - Nov 2017 · Paris, France",
    impact:
      "Opened European operations, secured a partnership with a top-tier reinsurer, pitched to 300+ fintech stakeholders, and designed onboarding for the chatbot product.",
    stack: ["Go-to-Market", "Partnerships", "Fintech"],
  },
];

export default function ExperiencePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Work Experience
        </h1>
        <p className="max-w-2xl text-slate-300">
          Product leadership across AI and web3, from 0-1 founder builds to
          scaled global platforms.
        </p>
      </div>

      <div className="space-y-4">
        {experiences.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-medium text-white">
                {item.role} · {item.company}
              </h2>
              <p className="text-sm text-slate-400">{item.period}</p>
            </div>
            <p className="mb-4 text-slate-300">{item.impact}</p>
            <div className="flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
