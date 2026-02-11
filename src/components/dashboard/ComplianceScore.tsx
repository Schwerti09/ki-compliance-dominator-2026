import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getDemoKpis } from "@/lib/demo";

export default function ComplianceScore() {
  const k = getDemoKpis();
  return (
    <Card>
      <div className="text-sm text-white/60">Compliance Score</div>
      <div className="mt-2 text-4xl font-bold">{k.complianceScore}</div>
      <div className="mt-4">
        <Progress value={k.complianceScore} />
        <div className="mt-2 text-xs text-white/60">
          Ziel: 90+ (Audit-ready). Aktuell: {k.openFindings} offene Findings.
        </div>
      </div>
    </Card>
  );
}
