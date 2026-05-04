"use client";

import { useMemo, useState } from "react";

type FlowStep = "signin" | "verify" | "permissions" | "active";
type VerifyMethod = "passkey" | "hardware" | "wallet";
type MemoryKey =
  | "writingStyle"
  | "currentProjects"
  | "pastConversations"
  | "personalBackground"
  | "privateNotes"
  | "pastInvestorUpdates";
type AccessScope = "off" | "active" | "session" | "app";
type ChatMessage = {
  id: string;
  role: "system" | "assistant" | "user";
  text: string;
};
type MemoryCategory = {
  id: string;
  label: string;
  enabled: boolean;
  items: string[];
};

const MEMORY_CATEGORIES: MemoryCategory[] = [
  {
    id: "writing_style",
    label: "Writing style",
    enabled: true,
    items: [
      "Prefer direct tone. No fluff. Avoid corporate phrasing.",
      "Use short paragraphs and concrete examples.",
    ],
  },
  {
    id: "current_projects",
    label: "Current projects",
    enabled: true,
    items: [
      "Building Napoleon: time-tracking app that charges per minute of social media use.",
      "Testing viral content loops on TikTok and Twitter.",
    ],
  },
  {
    id: "past_conversations",
    label: "Past conversations",
    enabled: false,
    items: [
      "Struggling with user activation drop-off after onboarding.",
      "Refining investor narrative around behavior change.",
    ],
  },
  {
    id: "personal_background",
    label: "Personal background",
    enabled: false,
    items: [
      "Founder with product background in web3.",
      "Built crypto exchange and tokenization protocol.",
    ],
  },
  {
    id: "private_notes",
    label: "Private notes",
    enabled: false,
    items: [
      "The product is not about time. It's about self-respect.",
      "People don't want to track time. They want control.",
    ],
  },
];

const MEM_CAT_TO_KEY: Record<string, MemoryKey> = {
  writing_style: "writingStyle",
  current_projects: "currentProjects",
  past_conversations: "pastConversations",
  personal_background: "personalBackground",
  private_notes: "privateNotes",
};

function VerifyMethodOption({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
        selected
          ? "border-violet-200 bg-violet-50 ring-1 ring-violet-200"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-violet-600" : "border-gray-300"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-violet-600" />}
      </span>
      <span>
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        <span className="mt-0.5 block text-xs text-gray-500">{sub}</span>
      </span>
    </button>
  );
}

function PermCategoryCard({
  category,
  enabled,
  onToggle,
}: {
  category: MemoryCategory;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer select-none rounded-xl border p-3.5 transition-all ${
        enabled
          ? "border-violet-200 bg-violet-50/70"
          : "border-gray-200 bg-gray-50/60 hover:border-gray-300"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gray-900">{category.label}</span>
        <div
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
            enabled ? "bg-violet-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-[18px]" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
      <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
        {category.items[0]}
      </p>
    </div>
  );
}

export default function SignInWithMemoryPage() {
  const [flowStep, setFlowStep] = useState<FlowStep>("signin");
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>("passkey");
  const [isVerifying, setIsVerifying] = useState(false);
  const [permEnabled, setPermEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(MEMORY_CATEGORIES.map((c) => [c.id, c.enabled]))
  );
  const [access, setAccess] = useState<Record<MemoryKey, AccessScope>>({
    writingStyle: "off",
    currentProjects: "off",
    pastConversations: "off",
    personalBackground: "off",
    privateNotes: "off",
    pastInvestorUpdates: "off",
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showInlineRequest, setShowInlineRequest] = useState(false);
  const [showMemoryPanel, setShowMemoryPanel] = useState(false);

  const isActive = flowStep === "active";

  const enabledPermCount = useMemo(
    () => Object.values(permEnabled).filter(Boolean).length,
    [permEnabled]
  );

  const activeCount = useMemo(
    () => Object.values(access).filter((v) => v !== "off").length,
    [access]
  );

  const appendMessage = (msg: ChatMessage) =>
    setMessages((prev) => [...prev, msg]);

  const handleVerify = () => {
    setIsVerifying(true);
    window.setTimeout(() => {
      setIsVerifying(false);
      setFlowStep("permissions");
    }, 1400);
  };

  const handleApprovePermissions = () => {
    const newAccess = { ...access };
    for (const [catId, enabled] of Object.entries(permEnabled)) {
      const key = MEM_CAT_TO_KEY[catId];
      if (key) newAccess[key] = enabled ? "active" : "off";
    }
    setAccess(newAccess);
    setFlowStep("active");
    const count = Object.values(permEnabled).filter(Boolean).length;
    appendMessage({
      id: "connected",
      role: "system",
      text: `Memory connected. ${count} context ${count === 1 ? "section" : "sections"} enabled.`,
    });
  };

  const handleDenyPermissions = () => {
    setFlowStep("signin");
    setPermEnabled(
      Object.fromEntries(MEMORY_CATEGORIES.map((c) => [c.id, c.enabled]))
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    appendMessage({ id: `u-${Date.now()}`, role: "user", text: userText });
    setInput("");

    if (!isActive || access.writingStyle === "off") {
      appendMessage({
        id: `a-generic-${Date.now()}`,
        role: "assistant",
        text: "Here is a general founder update draft: We made steady progress this week on product reliability, customer discovery, and go-to-market execution.",
      });
      return;
    }

    if (access.pastInvestorUpdates === "off") {
      appendMessage({
        id: `a-request-${Date.now()}`,
        role: "assistant",
        text: "I can draft this using your writing style and current project context.\n\nTo make this more relevant, I need access to: Past investor updates",
      });
      setShowInlineRequest(true);
      return;
    }

    appendMessage({
      id: `a-final-${Date.now()}`,
      role: "assistant",
      text: "Founder update draft: This week we closed two customer discovery loops, shipped the first memory-permission prototype, and reduced onboarding friction by clarifying value in the first 30 seconds.",
    });
  };

  const grantPastInvestorUpdates = (scope: "session" | "app") => {
    setAccess((prev) => ({ ...prev, pastInvestorUpdates: scope }));
    setShowInlineRequest(false);
    appendMessage({
      id: `sys-updated-${Date.now()}`,
      role: "system",
      text: `Memory access updated: Past investor updates enabled for this ${scope === "session" ? "session" : "app"}.`,
    });
    appendMessage({
      id: `a-specific-${Date.now()}`,
      role: "assistant",
      text: "Updated draft: We progressed from prototype validation to repeatable usage patterns, with stronger signal quality from founder updates and investor-facing narratives.",
    });
  };

  const verifyLabel = {
    passkey: "passkey",
    hardware: "security key",
    wallet: "wallet",
  }[verifyMethod];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="inline-flex rounded-full border border-yellow-400/45 bg-yellow-500/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-200">
          AI Playground
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Sign In with MyMemory
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Portable identity for LLMs: bring your personal context to any AI app
          without giving it permanent access to your data.
        </p>
      </div>

      {/* Demo */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Chat shell */}
        <div
          className={`grid h-[660px] grid-cols-[220px_1fr] ${
            !isActive ? "pointer-events-none select-none" : ""
          }`}
        >
          {/* Sidebar */}
          <aside className="flex flex-col bg-[#111111]">
            <div className="flex items-center justify-between px-3 py-3">
              <span className="text-sm font-semibold text-white">AnyLLM</span>
              <button
                aria-label="New chat"
                className="rounded-md p-1 text-gray-500 hover:bg-white/10 hover:text-gray-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            <div className="mx-3 mb-3 rounded-lg bg-white/[0.06] px-3 py-2 text-sm text-gray-600">
              Search
            </div>

            <nav className="flex-1 overflow-y-auto px-2">
              <p className="px-2 pb-1 pt-1 text-[11px] font-medium uppercase tracking-wider text-gray-600">
                Recent
              </p>
              {[
                "Founder update draft",
                "Napoleon app strategy",
                "Daily planning",
              ].map((item, i) => (
                <button
                  key={item}
                  className={`w-full truncate rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                    i === 0
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:bg-white/[0.05] hover:text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="space-y-1 border-t border-white/[0.06] p-3">
              {isActive && (
                <div className="relative">
                  <button
                    onClick={() => setShowMemoryPanel((p) => !p)}
                    className="flex w-full items-center gap-2 rounded-lg bg-white/[0.05] px-3 py-2 transition hover:bg-white/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-gray-400">MyMemory</span>
                    <span className="ml-auto text-[11px] text-gray-500">
                      {activeCount} active
                    </span>
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={showMemoryPanel ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                    </svg>
                  </button>

                  {showMemoryPanel && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-white/[0.08] bg-[#1a1a1a] shadow-2xl">
                      <div className="border-b border-white/[0.06] px-3 py-2.5">
                        <p className="text-xs font-semibold text-gray-300">Memory permissions</p>
                        <p className="mt-0.5 text-[11px] text-gray-600">Toggle what AnyLLM can read</p>
                      </div>
                      <div className="divide-y divide-white/[0.04]">
                        {MEMORY_CATEGORIES.map((cat) => {
                          const key = MEM_CAT_TO_KEY[cat.id];
                          const on = key ? access[key] !== "off" : false;
                          return (
                            <div key={cat.id} className="flex items-center justify-between px-3 py-2.5">
                              <span className="text-xs text-gray-400">{cat.label}</span>
                              <button
                                onClick={() => {
                                  if (!key) return;
                                  setAccess((prev) => ({
                                    ...prev,
                                    [key]: prev[key] === "off" ? "active" : "off",
                                  }));
                                }}
                                className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${on ? "bg-violet-600" : "bg-gray-700"}`}
                              >
                                <span className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[14px]" : "translate-x-0.5"}`} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  N
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Nathan Hirsch</p>
                  <p className="text-[11px] text-gray-500">nathan@anyllm.ai</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main chat area */}
          <main className="flex flex-col bg-white">
            <header className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              <span className="text-sm font-medium text-gray-700">
                New conversation
              </span>
              <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-400">
                Claude 3.5 Sonnet
              </span>
            </header>

            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10">
                <p className="mb-5 text-xl font-semibold text-gray-900">
                  What can I help with?
                </p>
                <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    />
                    <button
                      onClick={handleSend}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
                    <span>Attach</span>
                    <span>Search</span>
                    <span>Tools</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-8 py-5">
                  {messages.map((msg) =>
                    msg.role === "user" ? (
                      <div key={msg.id} className="flex justify-end">
                        <div className="max-w-[75%] rounded-2xl bg-gray-900 px-4 py-2.5 text-sm text-white">
                          {msg.text}
                        </div>
                      </div>
                    ) : msg.role === "assistant" ? (
                      <div
                        key={msg.id}
                        className="max-w-[85%] whitespace-pre-line text-sm leading-relaxed text-gray-800"
                      >
                        {msg.text}
                      </div>
                    ) : (
                      <div key={msg.id} className="flex justify-center">
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                          {msg.text}
                        </span>
                      </div>
                    )
                  )}

                  {showInlineRequest && (
                    <div className="max-w-[85%] rounded-xl border border-violet-100 bg-violet-50/50 p-3">
                      <p className="mb-2 text-xs font-medium text-violet-700">
                        Memory permission request
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => grantPastInvestorUpdates("session")}
                          className="rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-medium text-violet-700 transition hover:bg-violet-50"
                        >
                          Allow once
                        </button>
                        <button
                          onClick={() => grantPastInvestorUpdates("app")}
                          className="rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-medium text-violet-700 transition hover:bg-violet-50"
                        >
                          Allow for this app
                        </button>
                        <button
                          onClick={() => setShowInlineRequest(false)}
                          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-50"
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 px-5 py-3">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-2.5">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    />
                    <button
                      onClick={handleSend}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>

        {/* Overlay + modals */}
        {!isActive && (
          <>
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]" />
            <div className="absolute inset-0 z-20 flex items-center justify-center p-4">

              {/* Sign-in card */}
              {flowStep === "signin" && (
                <div className="w-full max-w-[340px] rounded-2xl bg-white p-6 shadow-2xl">
                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black">
                      <span className="text-sm font-bold text-white">A</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Sign in to AnyLLM
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Continue with your preferred method
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Continue with Google", letter: "G", color: "text-[#4285F4]" },
                      { label: "Continue with Apple", letter: "", color: "text-gray-900" },
                      { label: "Continue with GitHub", letter: "GH", color: "text-gray-700 text-[10px]" },
                    ].map(({ label, letter, color }) => (
                      <button
                        key={label}
                        className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <span
                          className={`w-5 shrink-0 text-center text-sm font-bold ${color}`}
                        >
                          {letter}
                        </span>
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  <button
                    onClick={() => setFlowStep("verify")}
                    className="w-full rounded-xl bg-violet-600 px-4 py-3 text-left transition hover:bg-violet-700 active:bg-violet-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                        <span className="text-sm font-bold text-white">M</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Sign in with MyMemory
                        </p>
                        <p className="text-xs text-violet-200">
                          Bring your context, privately
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Verify card */}
              {flowStep === "verify" && (
                <div className="w-full max-w-[340px] rounded-2xl bg-white p-6 shadow-2xl">
                  <button
                    onClick={() => {
                      if (!isVerifying) setFlowStep("signin");
                    }}
                    className="mb-4 flex items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-gray-600"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                  </button>

                  <div className="mb-5 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-xl">
                      🔐
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Verify it&apos;s you
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Prove your identity to connect your memory
                    </p>
                  </div>

                  <div className="space-y-2">
                    <VerifyMethodOption
                      label="Device passkey"
                      sub="Touch ID or Face ID via secure enclave"
                      selected={verifyMethod === "passkey"}
                      onClick={() => setVerifyMethod("passkey")}
                    />
                    <VerifyMethodOption
                      label="Hardware security key"
                      sub="FIDO2 compatible key"
                      selected={verifyMethod === "hardware"}
                      onClick={() => setVerifyMethod("hardware")}
                    />
                    <VerifyMethodOption
                      label="Memory wallet"
                      sub="Session-scoped cryptographic keypair"
                      selected={verifyMethod === "wallet"}
                      onClick={() => setVerifyMethod("wallet")}
                    />
                  </div>

                  <button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-70"
                  >
                    {isVerifying ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      `Verify with ${verifyLabel}`
                    )}
                  </button>
                </div>
              )}

              {/* Permissions card */}
              {flowStep === "permissions" && (
                <div className="w-full max-w-[480px] rounded-2xl bg-white shadow-2xl">
                  <div className="p-6 pb-4">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600">
                        <span className="text-sm font-bold text-white">M</span>
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">
                          Memory access request
                        </h2>
                        <p className="mt-0.5 text-sm text-gray-500">
                          AnyLLM is requesting access to your memory
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {MEMORY_CATEGORIES.map((cat) => (
                        <PermCategoryCard
                          key={cat.id}
                          category={cat}
                          enabled={permEnabled[cat.id] ?? false}
                          onToggle={() =>
                            setPermEnabled((prev) => ({
                              ...prev,
                              [cat.id]: !prev[cat.id],
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                    <p className="text-xs text-gray-400">
                      Apps only read what you allow.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDenyPermissions}
                        className="text-sm font-medium text-gray-500 transition hover:text-gray-700"
                      >
                        Not now
                      </button>
                      <button
                        onClick={handleApprovePermissions}
                        className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                      >
                        Allow {enabledPermCount} selected
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
