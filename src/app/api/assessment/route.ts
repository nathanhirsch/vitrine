import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export type AssessmentPayload = {
  gate: {
    name: string;
    email: string;
    company: string;
    role: string;
  };
  step1: {
    prep: string;
    writeup: string;
    followUp: string;
    leads: string;
    proposal: string;
    manual: string;
  };
  step2: {
    crm: string;
    reports: string;
    leadRouting: string;
    fallthrough: string;
  };
  step3: {
    admin: string;
    copyPaste: string;
    bottlenecks: string;
    searching: string;
    scheduledUpdates: string;
  };
  step4: {
    problems: Array<{
      what: string;
      who: string;
      ideal: string;
    }>;
  };
};

function buildPrompt(data: AssessmentPayload): string {
  const { gate, step1, step2, step3, step4 } = data;

  const lines: string[] = [
    `Respondent: ${gate.name}, ${gate.role} at ${gate.company}`,
    "",
    "## Sales Workflow",
    `Pre-call prep: ${step1.prep || "(not answered)"}`,
    `Post-call write-up: ${step1.writeup || "(not answered)"}`,
    `Follow-up sequence: ${step1.followUp || "(not answered)"}`,
    `Lead source to booked call: ${step1.leads || "(not answered)"}`,
    `Proposal / quote process: ${step1.proposal || "(not answered)"}`,
    `Should-be-automated: ${step1.manual || "(not answered)"}`,
    "",
    "## Team & Pipeline",
    `CRM / deal tracking: ${step2.crm || "(not answered)"}`,
    `Manual reports: ${step2.reports || "(not answered)"}`,
    `Lead routing: ${step2.leadRouting || "(not answered)"}`,
    `Falls through the cracks: ${step2.fallthrough || "(not answered)"}`,
    "",
    "## Operations & Communication",
    `Recurring admin: ${step3.admin || "(not answered)"}`,
    `Copy-paste between systems: ${step3.copyPaste || "(not answered)"}`,
    `Bottlenecks: ${step3.bottlenecks || "(not answered)"}`,
    `Searching / asking: ${step3.searching || "(not answered)"}`,
    `Manual scheduled updates: ${step3.scheduledUpdates || "(not answered)"}`,
    "",
    "## Top 3 Problems",
  ];

  step4.problems.forEach((p, i) => {
    lines.push(`Problem ${i + 1}:`);
    lines.push(`  What it is: ${p.what || "(not answered)"}`);
    lines.push(`  Who it affects: ${p.who || "(not answered)"}`);
    lines.push(`  What good looks like: ${p.ideal || "(not answered)"}`);
  });

  return lines.join("\n");
}

function buildEmailHtml(data: AssessmentPayload, quickTake: string): string {
  const { gate } = data;
  const ts = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:sans-serif;max-width:680px;margin:0 auto;color:#1e293b;padding:24px">
  <h1 style="font-size:20px;margin-bottom:4px">New Automation Assessment</h1>
  <p style="color:#64748b;font-size:13px;margin-top:0">${ts}</p>

  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <tr><td style="padding:6px 0;font-weight:600;width:120px">Name</td><td>${gate.name}</td></tr>
    <tr><td style="padding:6px 0;font-weight:600">Email</td><td><a href="mailto:${gate.email}">${gate.email}</a></td></tr>
    <tr><td style="padding:6px 0;font-weight:600">Company</td><td>${gate.company}</td></tr>
    <tr><td style="padding:6px 0;font-weight:600">Role</td><td>${gate.role}</td></tr>
  </table>

  <div style="background:#f0f9ff;border-left:4px solid #3b82f6;padding:16px 20px;margin:20px 0;border-radius:4px">
    <h2 style="font-size:15px;margin:0 0 12px">AI Quick Take</h2>
    ${quickTake.split("\n\n").map(p => `<p style="margin:0 0 10px;line-height:1.6">${p}</p>`).join("")}
  </div>

  <h2 style="font-size:15px;margin-top:28px">Sales Workflow</h2>
  ${emailSection("Pre-call prep", data.step1.prep)}
  ${emailSection("Post-call write-up", data.step1.writeup)}
  ${emailSection("Follow-up sequence", data.step1.followUp)}
  ${emailSection("Lead to booked call", data.step1.leads)}
  ${emailSection("Proposal process", data.step1.proposal)}
  ${emailSection("Should be automated", data.step1.manual)}

  <h2 style="font-size:15px;margin-top:28px">Team & Pipeline</h2>
  ${emailSection("CRM / deal tracking", data.step2.crm)}
  ${emailSection("Manual reports", data.step2.reports)}
  ${emailSection("Lead routing", data.step2.leadRouting)}
  ${emailSection("Falls through the cracks", data.step2.fallthrough)}

  <h2 style="font-size:15px;margin-top:28px">Operations & Communication</h2>
  ${emailSection("Recurring admin", data.step3.admin)}
  ${emailSection("Copy-paste between systems", data.step3.copyPaste)}
  ${emailSection("Bottlenecks", data.step3.bottlenecks)}
  ${emailSection("Searching / asking", data.step3.searching)}
  ${emailSection("Manual scheduled updates", data.step3.scheduledUpdates)}

  <h2 style="font-size:15px;margin-top:28px">Top 3 Problems</h2>
  ${data.step4.problems.map((p, i) => `
    <div style="margin-bottom:16px;padding:12px 16px;border:1px solid #e2e8f0;border-radius:6px">
      <strong>Problem ${i + 1}</strong>
      ${emailSection("What it is", p.what)}
      ${emailSection("Who it affects", p.who)}
      ${emailSection("What good looks like", p.ideal)}
    </div>
  `).join("")}
</body>
</html>`;
}

function emailSection(label: string, value: string): string {
  if (!value) return "";
  return `<p style="margin:8px 0"><strong>${label}:</strong> ${value}</p>`;
}

export async function POST(req: NextRequest) {
  let body: AssessmentPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const prompt = buildPrompt(body);

  const systemPrompt = `You are an AI automation consultant reviewing a prospect's workflow assessment. Based on their answers below, write a sharp 3-paragraph "quick take":
- Paragraph 1: The single most impactful automation opportunity you see, and why
- Paragraph 2: What a light first build could look like (concrete, specific)
- Paragraph 3: What this could unlock if it works well

Keep it direct, specific to their answers, and energizing — this should make them feel like they've already taken the first step.`;

  const claudeRes = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `${systemPrompt}\n\n${prompt}`,
      },
    ],
  }).catch(() => null);

  const quickTake =
    claudeRes?.content[0]?.type === "text"
      ? claudeRes.content[0].text
      : "Unable to generate analysis — please contact us directly.";

  await resend.emails.send({
    from: "Automation Assessment <onboarding@resend.dev>",
    to: [process.env.RECIPIENT_EMAIL ?? ""],
    subject: `New automation assessment: ${body.gate.name} at ${body.gate.company}`,
    html: buildEmailHtml(body, quickTake),
  });

  return Response.json({ quickTake });
}
