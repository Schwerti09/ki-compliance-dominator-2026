export type AgentEvent = { id: string; ts: string; level: "info" | "warn" | "error"; msg: string };

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export async function runComplianceAgentWorkflow(): Promise<AgentEvent[]> {
  const now = () => new Date().toISOString();

  const events: AgentEvent[] = [
    { id: id("e"), ts: now(), level: "info", msg: "Workflow gestartet: Sammle System-Inventar (Mock)." }
  ];

  await new Promise((r) => setTimeout(r, 150));

  events.push({ id: id("e"), ts: now(), level: "info", msg: "Erzeuge Requirement-Mapping (EU AI Act / ISO 42001)." });

  await new Promise((r) => setTimeout(r, 150));

  events.push({ id: id("e"), ts: now(), level: "warn", msg: "Finding: Human Oversight unvollständig (ART_14)." });

  await new Promise((r) => setTimeout(r, 150));

  events.push({ id: id("e"), ts: now(), level: "info", msg: "Evidence Slots verknüpft (Mock URLs)." });

  await new Promise((r) => setTimeout(r, 150));

  events.push({ id: id("e"), ts: now(), level: "info", msg: "Abschluss: Report-Entwurf generiert (Mock)." });

  return events;
}
