"use client";

import { useMemo, useState } from "react";

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

const memoryCategories: MemoryCategory[] = [
  {
    id: "writing_style",
    label: "Writing style",
    enabled: true,
    items: [
      "Prefer direct tone. No fluff. Avoid corporate phrasing.",
      "Use short paragraphs and concrete examples.",
      "Avoid em dashes. They feel unnatural.",
      "Content should feel sharp and slightly provocative.",
      "Write for Twitter, LinkedIn, and product UI copy.",
    ],
  },
  {
    id: "current_projects",
    label: "Current projects",
    enabled: true,
    items: [
      "Building Napoleon: time-tracking app that charges per minute of social media use.",
      "Testing viral content loops on TikTok and Twitter.",
      "Exploring AI + privacy + decentralized storage.",
      "Automating Twitter replies using Google Sheets + GPT.",
      "Launching personal essay website.",
    ],
  },
  {
    id: "past_conversations",
    label: "Past conversations",
    enabled: false,
    items: [
      "Struggling with user activation drop-off after onboarding.",
      "Refining investor narrative around behavior change.",
      "Debating punishment-based vs reward-based monetization.",
      "Trying to systematize viral content strategy.",
      "Positioning product as identity shift, not tool.",
    ],
  },
  {
    id: "personal_background",
    label: "Personal background",
    enabled: false,
    items: [
      "Founder with product background in web3.",
      "Built crypto exchange and tokenization protocol.",
      "Worked with brands like Breitling and Lacoste.",
      "Now focused on AI products and behavior change.",
      "Strong product sense, weaker in visual branding.",
    ],
  },
  {
    id: "private_notes",
    label: "Private notes",
    enabled: false,
    items: [
      "The product is not about time. It’s about self-respect.",
      "People don’t want to track time. They want control.",
      "Make the pain of scrolling visible.",
      "Identity > features.",
      "This only works if it feels slightly uncomfortable.",
    ],
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [];

const memoryCategoryToKey: Record<string, MemoryKey> = {
  writing_style: "writingStyle",
  current_projects: "currentProjects",
  past_conversations: "pastConversations",
  personal_background: "personalBackground",
  private_notes: "privateNotes",
};

function MemoryCard({
  title,
  enabled,
  items,
  onToggle,
}: {
  title: string;
  enabled: boolean;
  items: string[];
  onToggle: () => void;
}) {
  const primary = items[0] ?? "";
  const secondary = items[1] ?? "";
  const remainingCount = Math.max(0, items.length - 2);

  return (
    <article className="rounded-2xl border border-[#e5e5e5] bg-[#efefef] p-4 transition hover:bg-[#eaeaea]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={onToggle}
          className={
            enabled
              ? "relative inline-flex h-6 w-11 items-center rounded-full bg-slate-900 transition"
              : "relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition"
          }
        >
          <span
            className={
              enabled
                ? "inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition"
                : "inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition"
            }
          />
        </button>
      </div>
      <p className="text-sm leading-snug text-slate-800">"{primary}"</p>
      <p className="mt-1 text-sm leading-snug text-slate-800/60">"{secondary}"</p>
      <p className="mt-2 text-xs text-slate-500">+{remainingCount} more</p>
    </article>
  );
}

function MemoryModal({
  categories,
  isEnabled,
  onToggleCategory,
  onDeny,
  onApprove,
}: {
  categories: MemoryCategory[];
  isEnabled: (categoryId: string) => boolean;
  onToggleCategory: (categoryId: string) => void;
  onDeny: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/12 p-6">
      <div className="w-full max-w-[760px] overflow-hidden rounded-2xl border border-[#ddd8cd] bg-[#f7f7f7] shadow-[0_35px_90px_-40px_rgba(15,23,42,0.55)]">
        <div className="max-h-[74vh] overflow-y-auto p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Initial memory permissions
        </h2>
        <p className="mt-1 text-sm text-slate-600">Allow access to:</p>
        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <MemoryCard
              key={category.id}
              title={category.label}
              enabled={isEnabled(category.id)}
              items={category.items}
              onToggle={() => onToggleCategory(category.id)}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-600">Apps only access what you allow.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onDeny}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
          >
            Deny
          </button>
          <button
            onClick={onApprove}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
          >
            Approve
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInWithMemoryPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("Help me write a founder update.");
  const [memoryConnected, setMemoryConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureMethod, setSignatureMethod] = useState<
    "hardware" | "passkey" | "wallet"
  >("hardware");
  const [showPermissionPanel, setShowPermissionPanel] = useState(false);
  const [showInlineRequest, setShowInlineRequest] = useState(false);
  const [showMemoryMenu, setShowMemoryMenu] = useState(false);
  const [mode, setMode] = useState<"without" | "with">("with");

  const [access, setAccess] = useState<Record<MemoryKey, AccessScope>>({
    writingStyle: "active",
    currentProjects: "active",
    pastConversations: "off",
    personalBackground: "off",
    privateNotes: "off",
    pastInvestorUpdates: "off",
  });

  const connectedActiveCount = useMemo(
    () => Object.values(access).filter((value) => value !== "off").length,
    [access]
  );

  const appendMessage = (message: ChatMessage) =>
    setMessages((prev) => [...prev, message]);

  const handleApproveInitialPermissions = () => {
    setMemoryConnected(true);
    setShowPermissionPanel(false);
    appendMessage({
      id: "connected",
      role: "system",
      text: "Memory connected. Writing style and current projects are enabled.",
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    appendMessage({ id: `u-${Date.now()}`, role: "user", text: userText });
    setInput("");

    if (mode === "without" || !memoryConnected) {
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
        text: "I can draft this using your writing style and current project context.\n\nTo make this more relevant, I need access to:\n→ Past investor updates",
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
      text: "Updated draft with memory context: We progressed from prototype validation to repeatable usage patterns, with stronger signal quality from founder updates and investor-facing narratives.",
    });
  };

  const togglePermission = (key: MemoryKey) => {
    setAccess((prev) => ({
      ...prev,
      [key]: prev[key] === "off" ? "active" : "off",
    }));
  };

  const badge = (scope: AccessScope) =>
    scope === "off" ? "off" : scope === "active" ? "active" : scope;

  const handleStartSignature = () => {
    setIsSigning(true);
    window.setTimeout(() => {
      setIsSigning(false);
      setShowSignatureModal(false);
      setShowPermissionPanel(true);
      appendMessage({
        id: `sig-ok-${Date.now()}`,
        role: "system",
        text: "Device signature verified. Memory connection authorized.",
      });
    }, 1200);
  };

  const activeMemorySections = useMemo(
    () =>
      (Object.entries(access) as Array<[MemoryKey, AccessScope]>).filter(
        ([, scope]) => scope !== "off"
      ),
    [access]
  );

  const toLabel = (key: MemoryKey) =>
    ({
      writingStyle: "Writing style",
      currentProjects: "Current projects",
      pastConversations: "Past conversations",
      personalBackground: "Personal background",
      privateNotes: "Private notes",
      pastInvestorUpdates: "Past investor updates",
    })[key];

  const isEmptyState = messages.length === 0;

  return (
    <section className="bg-[#f3f1eb] p-3 text-slate-900 md:p-5">
      <div className="mx-auto grid h-[760px] max-w-[1320px] grid-cols-[260px_1fr] overflow-hidden rounded-2xl border border-[#ddd8cd] bg-[#f7f5ef] shadow-[0_20px_50px_-25px_rgba(15,23,42,0.25)]">
        <aside className="flex flex-col border-r border-[#e2ddd2] bg-[#efede6] p-3">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-slate-800">AnyLLM</p>
            <button
              aria-label="Create new chat"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ddd8cd] bg-[#f4f2ec] text-slate-600 hover:bg-[#ece9e0]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                <path d="M8 16l2.8-.6L17 9.2a1.4 1.4 0 0 0 0-2l-.2-.2a1.4 1.4 0 0 0-2 0l-6.2 6.2L8 16z"></path>
                <path d="M13.5 7.5l3 3"></path>
              </svg>
            </button>
          </div>

          <div className="mb-3 rounded-lg border border-[#e6e1d5] bg-[#f4f2ec] px-2.5 py-2 text-sm text-slate-400">
            Search
          </div>

          <div className="mt-4 space-y-1">
            <p className="px-2 text-xs font-medium text-slate-500">Recents</p>
            {[
              "Founder update draft",
              "Napoleon app strategy",
              "Daily planning",
            ].map((item, index) => (
              <button
                key={item}
                className={
                  index === 0
                    ? "w-full truncate rounded-md bg-[#ddd8cd]/70 px-2 py-2 text-left text-sm font-medium text-slate-800"
                    : "w-full truncate rounded-md px-2 py-2 text-left text-sm text-slate-700 hover:bg-[#dfd9cc]/55"
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-2 border-t border-slate-200 pt-3">
            <button className="w-full rounded-md px-2 py-2 text-left text-sm text-slate-700 hover:bg-[#dfd9cc]/55">
              Settings
            </button>
            <div className="rounded-lg bg-[#f8f6f1] px-3 py-2 ring-1 ring-[#dfdacc]">
              <p className="text-xs text-slate-500">Nathan Hirsch</p>
              <p className="text-sm font-medium text-slate-800">nathan@anyllm.ai</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMemoryMenu((prev) => !prev)}
                disabled={!memoryConnected || mode === "without"}
                className="inline-flex w-full items-center justify-between rounded-lg bg-[#f8f6f1] px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-[#dfdacc] hover:bg-[#f0ede4] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>MyMemory</span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-slate-500">On</span>
                </span>
              </button>
              {showMemoryMenu ? (
                <div className="absolute bottom-12 left-0 z-20 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800">
                      MyMemory Wallet
                    </h2>
                    <button
                      onClick={() => setShowMemoryMenu(false)}
                      className="text-xs font-medium text-slate-600 underline"
                    >
                      Close
                    </button>
                  </div>
                  <p className="mb-3 text-xs text-slate-600">
                    {connectedActiveCount} memory scopes currently enabled.
                  </p>
                  <div className="space-y-2 text-sm">
                    {activeMemorySections.map(([key, scope]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                      >
                        <span className="text-slate-700">{toLabel(key)}</span>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                            {badge(scope)}
                          </span>
                          <button
                            onClick={() => togglePermission(key)}
                            className="text-xs font-medium text-slate-700 underline"
                          >
                            Revoke
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      appendMessage({
                        id: `sys-import-${Date.now()}`,
                        role: "system",
                        text: "Import started: memory content is being added to this workspace.",
                      });
                      setShowMemoryMenu(false);
                    }}
                    className="mt-4 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Import content
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        <article className="flex min-w-0 flex-col bg-[#f9f7f2]">
          <header className="flex items-center border-b border-[#e2ddd2] px-4 py-3">
            <p className="text-sm font-medium text-slate-700">AnyLLM</p>
          </header>

          {isEmptyState ? (
            <div className="flex h-[620px] items-center justify-center px-10">
              <div className="w-full max-w-[560px]">
                <p className="mb-3 text-xs text-slate-500">Home</p>
                <div className="rounded-2xl border border-[#ddd8cd] bg-[#f8f6f1] p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Plan, Build, / for commands, @ for context"
                      className="flex-1 bg-transparent px-1 text-sm outline-none"
                    />
                    <button
                      onClick={handleSend}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-medium text-white"
                    >
                      ^
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#d8d2c6]">
                      +
                    </span>
                    <span>Auto</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="mt-3 rounded-full border border-[#d9d3c7] bg-[#f8f6f1] px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-[#efebe2]"
                >
                  Sign In with MyMemory
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="h-[560px] space-y-3 overflow-y-auto bg-[#f9f7f2] px-11 py-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "user"
                        ? "ml-auto max-w-[78%] rounded-2xl bg-slate-900 p-3 text-sm text-white"
                        : message.role === "assistant"
                          ? "max-w-[86%] rounded-2xl border border-[#e3ded2] bg-[#fdfcf9] p-3 text-sm text-slate-800"
                          : "max-w-[95%] rounded-xl border border-[#e7dfcc] bg-[#f7f1df] p-3 text-xs text-slate-700"
                    }
                  >
                    {message.text}
                  </div>
                ))}

                {showInlineRequest ? (
                  <div className="max-w-[95%] space-y-2 rounded-xl border border-[#ddd8cd] bg-[#fcfaf5] p-3 shadow-sm">
                    <p className="text-xs font-medium text-slate-700">
                      Memory permission request
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => grantPastInvestorUpdates("session")}
                        className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100"
                      >
                        Allow once
                      </button>
                      <button
                        onClick={() => grantPastInvestorUpdates("app")}
                        className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100"
                      >
                        Allow for this app
                      </button>
                      <button
                        onClick={() => setShowInlineRequest(false)}
                        className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-auto border-t border-[#e2ddd2] px-6 py-4">
                <div className="rounded-2xl border border-[#ddd8cd] bg-[#f1eee6] p-3 shadow-sm">
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask anything"
                      className="flex-1 bg-transparent px-1 text-sm outline-none"
                    />
                    <button
                      onClick={handleSend}
                      className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      Send
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span>+</span>
                    <span>Attach</span>
                    <span>Auto</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </article>
      </div>

      {showConnectModal ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              Connect MyMemory
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This app is requesting access to your personal context through
              MyMemory.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowConnectModal(false)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConnectModal(false);
                  setShowSignatureModal(true);
                }}
                className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
              >
                Connect Memory
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSignatureModal ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              Authorize memory connection
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Confirm with your device passkey to sign this memory access
              request.
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">Signing request</p>
              <p className="mt-1">
                Device: Nathan&apos;s MacBook • Scope: Memory connect • App:
                AnyLLM
              </p>
              <p className="mt-1">
                Signature: {isSigning ? "Signing..." : "Pending approval"}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Choose signature method
              </p>
              <button
                onClick={() => setSignatureMethod("hardware")}
                className={
                  signatureMethod === "hardware"
                    ? "w-full rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-left text-sm text-white"
                    : "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                }
              >
                Security key signature (FIDO2 hardware key)
              </button>
              <button
                onClick={() => setSignatureMethod("passkey")}
                className={
                  signatureMethod === "passkey"
                    ? "w-full rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-left text-sm text-white"
                    : "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                }
              >
                Device passkey (biometric + secure enclave)
              </button>
              <button
                onClick={() => setSignatureMethod("wallet")}
                className={
                  signatureMethod === "wallet"
                    ? "w-full rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-left text-sm text-white"
                    : "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                }
              >
                Memory wallet signature (session-scoped keypair)
              </button>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowSignatureModal(false)}
                disabled={isSigning}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStartSignature}
                disabled={isSigning}
                className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {isSigning
                  ? "Signing..."
                  : signatureMethod === "hardware"
                    ? "Sign with security key"
                    : signatureMethod === "passkey"
                      ? "Sign with passkey"
                      : "Sign with wallet key"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPermissionPanel ? (
        <MemoryModal
          categories={memoryCategories}
          isEnabled={(categoryId) => {
            const key = memoryCategoryToKey[categoryId];
            return key ? access[key] !== "off" : false;
          }}
          onToggleCategory={(categoryId) => {
            const key = memoryCategoryToKey[categoryId];
            if (key) togglePermission(key);
          }}
          onDeny={() => {
            setShowPermissionPanel(false);
            setMemoryConnected(false);
          }}
          onApprove={handleApproveInitialPermissions}
        />
      ) : null}

    </section>
  );
}
