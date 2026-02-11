import ComplianceScore from "@/components/dashboard/ComplianceScore";
import QuickActions from "@/components/dashboard/QuickActions";
import AuditTimeline from "@/components/dashboard/AuditTimeline";
import RiskGraph3DClient from "@/components/dashboard/RiskGraph3DClient";
import { Card } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-white/70">Demo-Daten sind aktiv, damit alles sauber rendert – auch ohne echte Supabase Seeds.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ComplianceScore />
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60">Risk Graph (3D)</div>
              <div className="text-xl font-semibold">Systemlandschaft</div>
            </div>
            <div className="text-xs text-white/50">Three.js + R3F</div>
          </div>
          <div className="mt-4 h-[320px] overflow-hidden rounded-xl border border-white/10">
            <RiskGraph3DClient />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <AuditTimeline />
      </div>
    </div>
  );
}
