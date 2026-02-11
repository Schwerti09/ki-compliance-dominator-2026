"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

type Result = { riskCategory: "minimal" | "limited" | "high" | "unacceptable"; notes: string[]; score: number };

export default function AiActCheckerPage() {
  const [text, setText] = useState<string>("Wir nutzen ein ML-Modell zur Bewerber-Vorselektion und zur Risikobewertung.");
  const [result, setResult] = useState<Result | null>(null);

  const hint = useMemo(() => {
    const t = text.toLowerCase();
    if (t.includes("bewerber") || t.includes("kredit") || t.includes("biometr")) return "Wirkt wie High-Risk Domäne.";
    if (t.includes("marketing") || t.includes("empfehlung")) return "Vermutlich Limited-Risk.";
    return "Gib mehr Kontext: Zweck, Domain, Nutzer, Daten.";
  }, [text]);

  async function run() {
    const r = await fetch("/api/tools/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "eu_ai_act", input: text })
    });
    const json = (await r.json()) as { ok: boolean; result: Result };
    setResult(json.result);
    toast.success("Analyse abgeschlossen");
  }

  return (
    <div className="container py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">EU AI Act Checker</h1>
        <p className="mt-3 text-white/70">Schnelle Vor-Einstufung (Demo). Für echte Bewertungen: Evidenzen + Prozess.</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="text-sm text-white/60">Beschreibung</div>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} className="mt-3" />
          <div className="mt-3 text-xs text-white/60">{hint}</div>
          <div className="mt-5">
            <Button onClick={run}>Analysieren</Button>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-white/60">Ergebnis</div>
          {result ? (
            <div className="mt-4 space-y-3">
              <div className="text-2xl font-semibold">Kategorie: {result.riskCategory}</div>
              <div className="text-sm text-white/70">Score: {result.score}/100</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/75">
                {result.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4 text-sm text-white/70">Noch keine Analyse – klicke „Analysieren“.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
