import React from "react";
import Link from "next/link";

type ProjectLink = {
  label: string;
  url: string;
};

type Interest = {
  title: string;
  image: string;
  url?: string;
  objectPosition?: string;
};

const experiences = [
  {
    role: "Founder",
    company: "Napoleon",
    period: "Mar 2025 - Sep 2025 · Paris, France",
    highlight:
      "Built a behavioral product to reduce social media addiction, launched an MVP, and acquired 200+ users with early paid validation.",
    themes: ["Mobile App", "AI", "Build in Public"],
    links: [
      { label: "Napoleon App", url: "https://www.napoleonapp.com/en" },
      { label: "Time Left Association", url: "https://www.timeleft.ong/" },
      {
        label: "Customer testimony",
        url: "https://www.linkedin.com/posts/nathanhirsch2_today-something-truly-special-happened-activity-7340660735288467456-tQoS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABhbRQwBC46hhXT9jjObVyFGHWJ5npJc_b4",
      },
      {
        label: "Customer Interview",
        url: "https://www.linkedin.com/posts/nathanhirsch2_i-read-i-write-now-i-bought-my-first-activity-7343888302053158914-3R64?utm_source=share&utm_medium=member_desktop&rcm=ACoAABhbRQwBC46hhXT9jjObVyFGHWJ5npJc_b4",
      },
    ] as ProjectLink[],
  },
  {
    role: "Senior Product Manager",
    company: "Arianee",
    period: "Aug 2022 - Mar 2025 · Paris, France",
    highlight:
      "Scaled NFT infrastructure to 2M+ NFTs and shipped privacy-first and interoperability products with global brand partners.",
    themes: ["Enterprise SaaS", "EVM Protocol", "Interoperability"],
    links: [
      { label: "Arianee Protocol", url: "https://www.arianee.org/" },
      {
        label: "Arianee ZK Privacy Article",
        url: "https://www.arianee.com/post/how-are-we-using-zero-knowledge-proofs-to-create-on-chain-privacy-for-brands-digital-product-passport",
      },
      {
        label: "Arianee Transfer Permit",
        url: "https://www.arianee.com/post/arianees-transfer-permit-the-gateway-to-involving-third-parties",
      },
      {
        label: "Arianee On-Chain Data Management",
        url: "https://www.arianee.com/post/on-chain-data-management-a-new-paradigm-that-does-not-required-a-new-crm",
      },
    ] as ProjectLink[],
  },
  {
    role: "Founder",
    company: "Clean Design",
    period: "Aug 2021 - Jul 2022 · Paris, France",
    highlight:
      "Built and launched a browser-based mobile testing environment, reached 100+ active users, and integrated with core design workflows.",
    themes: ["0-1 Product", "Fundraising", "Tooling"],
    links: [
      {
        label: "Clean Design Demo Video",
        url: "https://www.youtube.com/watch?v=Ev0NF10R6GI",
      },
    ] as ProjectLink[],
  },
  {
    role: "Senior Product Manager",
    company: "Luno",
    period: "Apr 2019 - Aug 2021 · Cape Town, South Africa",
    highlight:
      "Led wallet division strategy and delivered products that drove $1.1B+ trading volume and $20M+ revenue from listings.",
    themes: ["Growth", "Monetization", "Team Leadership"],
    links: [{ label: "Luno", url: "https://www.luno.com/" }] as ProjectLink[],
  },
  {
    role: "Product Manager",
    company: "Wala",
    period: "Mar 2018 - Apr 2019 · Cape Town, South Africa",
    highlight:
      "Helped scale the product from 0 to 100K+ users, built analytics foundations, and ran deep user research for PMF.",
    themes: ["PMF", "Customer research", "Analytics"],
    links: [
      {
        label: "CoinDesk Feature",
        url: "https://www.coindesk.com/markets/2018/06/11/crypto-startup-wala-is-reaching-africans-with-ethereum-micropayments",
      },
      {
        label: "TechCrunch Feature",
        url: "https://techcrunch.com/2018/10/01/how-a-ugandan-prince-and-an-crypto-startup-are-planning-an-african-revolution/",
      },
    ] as ProjectLink[],
  },
  {
    role: "Venture Launcher",
    company: "FCB.ai",
    period: "May 2017 - Nov 2017 · Paris, France",
    highlight:
      "Opened European operations, secured an enterprise partnership, and pitched product to 300+ fintech stakeholders.",
    themes: ["Go-to-Market", "Partnerships", "Fintech"],
    links: [{ label: "FCB.ai", url: "https://fcb.ai/" }] as ProjectLink[],
  },
];

const education = [
  {
    degree: "Master of Science in Entrepreneurship (MSc)",
    school: "EDHEC Business School",
    detail: "Graduated in 2017",
    url: "https://www.edhec.edu/en",
  },
  {
    degree: "Prep. Class for French Business Schools",
    school: "Intégrale",
    detail: "Class of 2013",
    url: "https://www.integrale-prepa.com/",
  },
];

const interests: Interest[] = [
  {
    title: "Crossfit - Competitive level",
    image: "/crossfit.png",
    objectPosition: "50% 35%",
  },
  {
    title: "Free diving - 30m deep",
    image: "/freediving.png",
    objectPosition: "50% 42%",
  },
  {
    title: "Essays",
    image: "/writing.png",
    url: "https://nathanhirsch.posthaven.com/",
    objectPosition: "50% 8%",
  },
  {
    title: "Acting - Joined #1 acting school in France (2023)",
    image: "/acting.png",
    objectPosition: "50% 40%",
  },
  {
    title:
      "The Conversation - 2sided platform connecting native speakers to students",
    image: "/conversation.png",
    url: "https://sites.google.com/view/theconversationexperience",
    objectPosition: "50% 45%",
  },
  {
    title: "Football (Soccer) - Elite, almost pro (1997-2010)",
    image: "/soccer.png",
    objectPosition: "50% 45%",
  },
];

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="flex min-h-[64vh] flex-col justify-center space-y-6 md:min-h-[72vh]">
        <div className="max-w-xl space-y-4 text-left md:max-w-2xl lg:max-w-3xl">
          <p className="inline-flex rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
            AI Labs Active
          </p>
          <h1 className="max-w-full text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            Hi, I&apos;m Nathan. I build products with AI.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Building products that change behavior. Founder. Built in web3 and
            AI. Exploring how far AI and humans can go together to create real
            impact. Recently moved to California.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/resume"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-white transition hover:border-cyan-400/60 hover:bg-slate-900"
            >
              Go to Resume
            </Link>
            <Link
              href="/ai-labs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-white transition hover:border-cyan-400/60 hover:bg-slate-900"
            >
              Go to AI Labs
            </Link>
          </div>
        </div>
      </div>

      <div id="experience-timeline" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Experience Timeline
        </h2>
        <div className="relative mt-1">
          {/* One vertical rail; x = center of fixed 2rem gutter */}
          <div
            className="pointer-events-none absolute bottom-0 left-4 top-3 w-px -translate-x-1/2 bg-yellow-400/50"
            aria-hidden
          />
          {experiences.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-x-4 pb-10 last:pb-0"
            >
              <div className="flex w-8 shrink-0 justify-center pt-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-yellow-200 shadow-[0_0_18px_-3px_rgba(250,204,21,0.4)] ring-1 ring-yellow-400/55"
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-medium leading-snug text-white">
                  {item.role} · {item.company}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{item.period}</p>
                <p className="mt-2 max-w-3xl text-slate-300">{item.highlight}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-200"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {item.links.map((project) => (
                    <a
                      key={project.url}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-2 transition hover:border-cyan-400/60 hover:bg-slate-900"
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(
                          project.url
                        )}`}
                        alt={`${project.label} thumbnail`}
                        className="h-12 w-12 rounded-md border border-slate-700 bg-slate-950 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-100">
                          {project.label}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {new URL(project.url).hostname.replace("www.", "")}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Education
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {education.map((item) => (
            <a
              key={`${item.degree}-${item.school}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-cyan-400/60 hover:bg-slate-900"
            >
              <h3 className="text-base font-medium text-white">{item.degree}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.school}</p>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Interests
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest) =>
            interest.url ? (
              <a
                key={interest.title}
                href={interest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 transition hover:border-cyan-400/60 hover:bg-slate-900"
              >
                <img
                  src={interest.image}
                  alt={interest.title}
                  className="h-44 w-full object-cover"
                  style={
                    interest.objectPosition
                      ? { objectPosition: interest.objectPosition }
                      : undefined
                  }
                />
                <p className="p-4 text-sm text-slate-200">{interest.title}</p>
              </a>
            ) : (
              <article
                key={interest.title}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60"
              >
                <img
                  src={interest.image}
                  alt={interest.title}
                  className="h-44 w-full object-cover"
                  style={
                    interest.objectPosition
                      ? { objectPosition: interest.objectPosition }
                      : undefined
                  }
                />
                <p className="p-4 text-sm text-slate-200">{interest.title}</p>
              </article>
            )
          )}
        </div>
      </section>
    </section>
  );
}
