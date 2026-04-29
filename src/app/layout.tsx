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
          <header className="relative mb-12 border-b border-slate-800/80">
            <div className="relative flex min-h-[3rem] items-center justify-center py-3.5">
              <div className="pointer-events-none absolute left-0 top-0 z-10">
                <Link
                  href="/"
                  aria-label="Home"
                  className="pointer-events-auto block leading-none"
                >
                  <img
                    src="/nathan-pixel.png"
                    alt=""
                    width={40}
                    height={40}
                    className="h-9 w-9 object-contain object-bottom mix-blend-lighten md:h-10 md:w-10"
                  />
                </Link>
              </div>
              <nav
                className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 pl-[3.25rem] pr-14 sm:gap-x-10 sm:pl-[3.5rem] sm:pr-28 md:px-32"
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
