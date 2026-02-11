"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { runComplianceAgentWorkflow } from "@/lib/agents/compliance-agent";

type EventItem = { id: string; ts: string; level: "info" | "warn" | "error"; msg: string };

export default function AgentStream() {
  const [events, setEvents] = useState<EventItem[]>(() => []);
  const [running, setRunning] = useState<boolean>(false);

  const stats = useMemo(() => {
    const warn = events.filter((e) => e.level === "warn").length;
    const err = events.filter((e) => e.level === "error").length;
    return { warn, err, total: events.length };
  }, [events]);

  useEffect(() => {
    setEvents([
      { id: "boot", ts: new Date().toISOString(), level: "info", msg: "Agent Workspace initialisiert." }
    ]);
  }, []);

  async function run() {
    setRunning(true);
    try {
      const stream = await runComplianceAgentWorkflow();
      setEvents((prev) => [...prev, ...stream]);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-white/60">Agent Stream</div>
          <div className="mt-1 text-lg font-semibold">Events</div>
          <div className="mt-1 text-xs text-white/60">
            total={stats.total} warn={stats.warn} error={stats.err}
          </div>
        </div>
        <Button onClick={run} disabled={running}>
          {running ? "Läuft…" : "Workflow starten"}
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="max-h-[420px] overflow-auto">
          <div className="divide-y divide-white/10">
            {events.map((e) => (
              <div key={e.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-white/60">{new Date(e.ts).toLocaleString()}</div>
                  <div
                    className={
                      "text-xs font-semibold " +
                      (e.level === "info"
                        ? "text-emerald-300"
                        : e.level === "warn"
                        ? "text-amber-300"
                        : "text-rose-300")
                    }
                  >
                    {e.level.toUpperCase()}
                  </div>
                </div>
                <div className="mt-1 text-sm text-white/80">{e.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
