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
  title: "Nathan Product Management",
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
          <header className="mb-12 border-b border-slate-800/80">
            {/* Mobile: nav links + CTA on one row, no avatar */}
            <div className="md:hidden">
              <div className="flex items-center justify-between py-3">
                <nav className="flex items-center gap-5" aria-label="Primary">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Link
                  href="https://www.linkedin.com/in/nathanhirsch2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-white/20 transition hover:bg-slate-100"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Desktop: single row with absolute avatar and CTA */}
            <div className="relative hidden min-h-[3rem] items-center justify-center py-3.5 md:flex">
              <div className="pointer-events-none absolute left-0 top-0 z-10">
                <Link href="/" aria-label="Home" className="pointer-events-auto block leading-none">
                  <img
                    src="/nathan-pixel.png"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain object-bottom mix-blend-lighten"
                  />
                </Link>
              </div>
              <nav
                className="mx-auto flex items-center justify-center gap-x-10 px-32"
                aria-label="Primary"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                <Link
                  href="https://www.linkedin.com/in/nathanhirsch2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-white/20 transition hover:bg-slate-100"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
            <p>Nathan Hirsch 2026</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
