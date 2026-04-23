import React from "react";
const experiences = [
  {
    role: "Founder",
    company: "Napoleon",
    period: "Mar 2025 - Sep 2025 · Paris, France",
    impact:
      "Built a behavioral product to reduce scrolling addiction with usage-based pricing on attention. Launched an MVP and acquired 200+ users generating early revenue, while building in public to reach 100k people.",
    stack: ["Product Strategy", "Mobile MVP", "Behavior Design", "Growth"],
  },
  {
    role: "Senior Product Manager",
    company: "Arianee",
    period: "Aug 2022 - Mar 2025 · Paris, France",
    impact:
      "Scaled NFT infrastructure to support 2M+ NFTs for global brands, led EVM standards integration with eBay, and launched privacy-first minting and Salesforce-integrated web3 insights products.",
    stack: [
      "Entreprise SaaS",
      "EVM Protocol",
      "Privacy",
      "Interoperability",
    ],
  },
  {
    role: "Founder",
    company: "Clean Design",
    period: "Aug 2021 - Jul 2022 · Paris, France",
    impact:
      "Built and launched a browser-based mobile testing environment for product teams, acquired 100+ active users, integrated with core design workflows, and pitched top-tier VCs including YC.",
    stack: ["0-1 Product", "Fundraising", "Tooling"],
  },
  {
    role: "Senior Product Manager",
    company: "Luno",
    period: "Apr 2019 - Aug 2021 · Cape Town, South Africa",
    impact:
      "Led a 60-person wallet division, drove $1.1B+ in trading volume and $20M+ in revenue from listings, launched Earn products, and improved engagement, NPS, and paid upgrades through product redesign.",
    stack: ["Growth", "Trading Products", "Crypto", "Team Leadership"],
  },
  {
    role: "Product Manager",
    company: "Wala",
    period: "Mar 2018 - Apr 2019 · Cape Town, South Africa",
    impact:
      "Helped grow the product from 0 to 100K+ users as an early team member, ran 200+ user interviews, built analytics foundations, and launched an ambassador program at scale.",
    stack: ["PMF", "Customer research", "Analytics", "Community"],
  },
  {
    role: "Venture Launcher",
    company: "FCB.ai",
    period: "May 2017 - Nov 2017 · Paris, France",
    impact:
      "Opened European operations, secured a partnership with a top-tier reinsurer, pitched to 300+ fintech stakeholders, and designed onboarding for the chatbot product.",
    stack: ["Go-to-Market", "Partnerships", "Fintech", "Onboarding"],
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
