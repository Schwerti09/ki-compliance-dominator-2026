import { Card } from "@/components/ui/card";
import { Shield, FileText, Radar, Bot, Layers, Activity } from "lucide-react";

const items = [
  { icon: Shield, title: "Security-First", text: "Harte Defaults: CSP, HSTS, sichere Headers, minimaler Angriffsraum." },
  { icon: FileText, title: "Evidenz & Doku", text: "Belege pro Requirement. Exportierbar. Audit-freundlich." },
  { icon: Radar, title: "Compliance Radar", text: "Status über Systeme, Requirements, Findings – mit Timeline." },
  { icon: Bot, title: "Agentische Workflows", text: "Mock-Agents (ohne externe Keys) als austauschbare Pipeline." },
  { icon: Layers, title: "ISO 42001 Gap", text: "Typische Lücken finden und als Maßnahmenkatalog speichern." },
  { icon: Activity, title: "Live Metrics", text: "Events + Logs als Grundlage für Monitoring & Reporting." }
];

export default function FeaturesGrid() {
  return (
    <section className="container py-16">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight">Was du bekommst</h2>
        <p className="mt-3 text-white/70">
          Eine Plattform, die Compliance als Engineering behandelt: definieren → prüfen → belegen → nachweisen.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title}>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/10 p-3 shadow-glow">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold">{it.title}</div>
                <div className="mt-1 text-sm text-white/70">{it.text}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
