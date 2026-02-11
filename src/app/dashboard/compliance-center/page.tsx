import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDemoComplianceItems } from "@/lib/demo";

export default function ComplianceCenterPage() {
  const items = getDemoComplianceItems();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Center</h1>
        <p className="mt-2 text-white/70">EU AI Act + ISO 42001 als Checklisten mit Evidenz-Slots und Status.</p>
      </div>

      <div className="grid gap-4">
        {items.map((it) => (
          <Card key={it.id}>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-white/60">
                  {it.framework} · {it.code}
                </div>
                <div className="text-lg font-semibold">{it.title}</div>
                <div className="mt-1 text-sm text-white/70">{it.summary}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={it.status === "compliant" ? "success" : it.status === "partial" ? "warning" : "danger"}>
                  {it.status.toUpperCase()}
                </Badge>
                <span className="text-xs text-white/50">{it.updatedAt}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
