export function getDemoKpis() {
  return { complianceScore: 78, openFindings: 7, highRiskSystems: 2 };
}

export function getDemoTimeline() {
  return [
    { id: "t1", title: "EU AI Act Einstufung aktualisiert", time: "vor 2h", detail: "Bewerber-Vorselektion → High-Risk bestätigt." },
    { id: "t2", title: "Evidence Slot erstellt", time: "vor 5h", detail: "Technische Dokumentation (Art. 10) verlinkt." },
    { id: "t3", title: "ISO 42001 Gap erkannt", time: "gestern", detail: "AIMS Rollen & Verantwortlichkeiten unklar." }
  ];
}

export function getDemoComplianceItems() {
  return [
    {
      id: "c1",
      framework: "EU AI Act",
      code: "ART_10",
      title: "Technische Dokumentation",
      summary: "Dokumentation ist versioniert; Evidenzen sind verlinkt.",
      status: "partial" as const,
      updatedAt: "2026-02-11"
    },
    {
      id: "c2",
      framework: "EU AI Act",
      code: "ART_14",
      title: "Human Oversight",
      summary: "Oversight-Prozess definiert, aber Monitoring fehlt noch.",
      status: "non_compliant" as const,
      updatedAt: "2026-02-10"
    },
    {
      id: "c3",
      framework: "ISO 42001",
      code: "4.1",
      title: "Context of the Organization",
      summary: "Stakeholder & Scope dokumentiert; Review-Zyklus etabliert.",
      status: "compliant" as const,
      updatedAt: "2026-02-09"
    }
  ];
}
