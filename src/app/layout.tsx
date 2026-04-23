import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nathan | Portfolio",
  description:
    "Personal portfolio website featuring experience, resume, and AI Labs projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/resume", label: "Resume" },
    { href: "/ai-labs", label: "AI Labs" },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-10">
          <header className="mb-12 flex flex-col gap-6 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Nathan Portfolio
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm md:justify-end">
              <nav className="flex flex-wrap gap-2 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="https://www.linkedin.com/in/nathanhirsch2/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 font-medium text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Get in touch
              </Link>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-400">
            <p>Built with Next.js. Hosted on Vercel.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
