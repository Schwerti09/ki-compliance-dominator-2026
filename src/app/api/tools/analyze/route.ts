import { NextResponse } from "next/server";
import { analyzeEuAiAct, analyzeIso42001 } from "@/lib/agents/risk-analyzer";

type Body = { type: "eu_ai_act" | "iso_42001"; input: string };

export async function POST(req: Request) {
  const body = (await req.json()) as Body;

  if (body.type === "eu_ai_act") {
    const result = await analyzeEuAiAct(body.input);
    return NextResponse.json({ ok: true, result });
  }

  const gaps = await analyzeIso42001(body.input);
  return NextResponse.json({ ok: true, gaps });
}
