import { Card } from "@/components/ui/card";
import { getDemoTimeline } from "@/lib/demo";

export default function AuditTimeline() {
  const items = getDemoTimeline();
  return (
    <Card>
      <div className="text-sm text-white/60">Audit Timeline</div>
      <div className="mt-1 text-lg font-semibold">Letzte Aktivitäten</div>

      <div className="mt-5 space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mt-1 h-2 w-2 flex-none rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(0,240,255,.45)]" />
            <div className="min-w-0">
              <div className="text-sm font-semibold">{it.title}</div>
              <div className="mt-1 text-xs text-white/60">{it.time}</div>
              <div className="mt-2 text-sm text-white/70">{it.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
