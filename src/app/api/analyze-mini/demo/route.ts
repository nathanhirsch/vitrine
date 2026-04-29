import { DEMO_ANALYZE_RESULT } from "@/lib/analyze-mini";

export async function GET() {
  return Response.json(DEMO_ANALYZE_RESULT);
}
