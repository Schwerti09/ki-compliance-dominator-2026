export async function analyzeEuAiAct(input: string): Promise<{
  riskCategory: "minimal" | "limited" | "high" | "unacceptable";
  notes: string[];
  score: number;
}> {
  const t = input.toLowerCase();
  const notes: string[] = [];

  let risk: "minimal" | "limited" | "high" | "unacceptable" = "minimal";
  let score = 30;

  if (t.includes("biometr") || t.includes("gesicht") || t.includes("emotion")) {
    risk = "high";
    score = 82;
    notes.push("Biometrie/Emotionserkennung deutet auf High-Risk Kontexte hin.");
  }

  if (t.includes("bewerber") || t.includes("kredit") || t.includes("bildung")) {
    risk = "high";
    score = Math.max(score, 78);
    notes.push("Beschäftigung/Kredit/Bildung: typischer High-Risk Bereich.");
  }

  if (t.includes("subliminal") || t.includes("manipulation")) {
    risk = "unacceptable";
    score = 95;
    notes.push("Manipulative Praktiken können unzulässig sein (Kontextabhängig).");
  }

  if (risk === "minimal" && (t.includes("marketing") || t.includes("recommend") || t.includes("empfehl"))) {
    risk = "limited";
    score = 55;
    notes.push("Transparenzpflichten wahrscheinlich (Limited-Risk).");
  }

  if (notes.length === 0) notes.push("Zu wenig Details – Zweck, Nutzergruppe und Datenkategorien präzisieren.");

  return { riskCategory: risk, notes, score };
}

export async function analyzeIso42001(orgName: string): Promise<Array<{ clause: string; gap: string; severity: "low" | "medium" | "high" }>> {
  const base = orgName.trim().length ? orgName.trim() : "Organisation";
  return [
    { clause: "4.1 Kontext", gap: `${base}: Scope/Stakeholder dokumentiert, aber Review-Zyklus fehlt als Prozessartefakt.`, severity: "medium" },
    { clause: "5 Führung", gap: "Rollen & Verantwortlichkeiten (AIMS) sind nicht als RACI sauber versioniert.", severity: "high" },
    { clause: "8 Betrieb", gap: "Change-Management für Modelle (Drift/Bias) ist nicht als kontrollierter Workflow dokumentiert.", severity: "high" },
    { clause: "9 Bewertung", gap: "Interne Audits existieren, aber KPIs/Metriken sind nicht fest definiert.", severity: "medium" }
  ];
}
