import OpenAI from "openai";
import { type AnalyzeMiniResult } from "@/lib/analyze-mini";

const MAX_EMAILS = 5;
const MAX_EMAIL_CHARS = 1000;

type AnalyzeRequestBody = {
  emails?: unknown;
};

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function validateEmails(rawEmails: unknown): string[] | null {
  if (!Array.isArray(rawEmails)) {
    return null;
  }

  const emails = rawEmails
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  if (emails.length === 0 || emails.length > MAX_EMAILS) {
    return null;
  }

  const tooLong = emails.some((email) => email.length > MAX_EMAIL_CHARS);
  if (tooLong) {
    return null;
  }

  return emails;
}

function isAnalyzeMiniResult(value: unknown): value is AnalyzeMiniResult {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  if (!Array.isArray(data.signals) || !Array.isArray(data.clusters)) return false;

  const validSignals = data.signals.every((signal) => {
    if (!signal || typeof signal !== "object") return false;
    const s = signal as Record<string, unknown>;
    return (
      typeof s.email_id === "number" &&
      typeof s.email === "string" &&
      typeof s.theme === "string" &&
      typeof s.emotion === "string" &&
      typeof s.intent === "string"
    );
  });

  const validClusters = data.clusters.every((cluster) => {
    if (!cluster || typeof cluster !== "object") return false;
    const c = cluster as Record<string, unknown>;
    return (
      typeof c.cluster_id === "number" &&
      typeof c.label === "string" &&
      typeof c.summary === "string" &&
      Array.isArray(c.email_ids) &&
      c.email_ids.every((id) => typeof id === "number") &&
      typeof c.product_recommendation === "string"
    );
  });

  return validSignals && validClusters;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing OPENAI_API_KEY." },
      { status: 500 }
    );
  }

  let body: AnalyzeRequestBody;
  try {
    body = (await request.json()) as AnalyzeRequestBody;
  } catch {
    return badRequest("Invalid JSON payload.");
  }

  const emails = validateEmails(body.emails);
  if (!emails) {
    return badRequest(
      "Provide 1 to 5 non-empty emails. Each email must be 1000 characters or fewer."
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = new OpenAI({ apiKey });

  const formattedEmails = emails
    .map((email, idx) => `${idx + 1}. ${email}`)
    .join("\n");

  const prompt = `
You are a product insights analyst.

Given these customer emails, return STRICT JSON only (no markdown, no explanation) in this exact schema:
{
  "signals": [
    {
      "email_id": 1,
      "email": "...",
      "theme": "...",
      "emotion": "...",
      "intent": "..."
    }
  ],
  "clusters": [
    {
      "cluster_id": 1,
      "label": "...",
      "summary": "...",
      "email_ids": [1, 3],
      "product_recommendation": "..."
    }
  ]
}

Rules:
- Keep output compact and product-oriented.
- Include all input emails in signals.
- email_id values must match input order (starting at 1).
- Clusters should group behavior patterns, not just topics.
- Return valid JSON only.

Customer emails:
${formattedEmails}
  `.trim();

  try {
    const response = await openai.responses.create({
      model,
      input: prompt,
      max_output_tokens: 900,
    });

    const rawOutput = response.output_text?.trim();
    if (!rawOutput) {
      return Response.json(
        { error: "Model returned an empty response." },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(rawOutput) as unknown;
    if (!isAnalyzeMiniResult(parsed)) {
      return Response.json(
        { error: "Model output did not match expected JSON schema." },
        { status: 502 }
      );
    }

    return Response.json(parsed);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? `Analysis failed: ${error.message}`
            : "Analysis failed.",
      },
      { status: 500 }
    );
  }
}
