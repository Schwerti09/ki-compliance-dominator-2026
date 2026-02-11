"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

type Gap = { clause: string; gap: string; severity: "low" | "medium" | "high" };

export default function IsoGapAnalyzerPage() {
  const [org, setOrg] = useState<string>("Wissens-Bank GmbH (Demo)");
  const [gaps, setGaps] = useState<Gap[] | null>(null);

  async function run() {
    const r = await fetch("/api/tools/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "iso_42001", input: org })
    });
    const json = (await r.json()) as { ok: boolean; gaps: Gap[] };
    setGaps(json.gaps);
    toast.success("Gap-Analyse abgeschlossen");
  }

  return (
    <div className="container py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">ISO 42001 Gap Analyzer</h1>
        <p className="mt-3 text-white/70">Demo-Analyse basierend auf typischen Lücken in AIMS (AI Management System).</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="text-sm text-white/60">Organisation</div>
          <Input value={org} onChange={(e) => setOrg(e.target.value)} className="mt-3" />
          <div className="mt-5">
            <Button onClick={run}>Analysieren</Button>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-white/60">Lücken</div>
          {gaps ? (
            <div className="mt-4 space-y-3">
              {gaps.map((g) => (
                <div key={g.clause} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{g.clause}</div>
                    <div className="text-xs text-white/60">{g.severity.toUpperCase()}</div>
                  </div>
                  <div className="mt-2 text-sm text-white/75">{g.gap}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-white/70">Noch keine Analyse – starte rechts.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
