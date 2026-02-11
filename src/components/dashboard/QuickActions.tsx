"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function QuickActions() {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-white/60">Quick Actions</div>
          <div className="mt-1 text-lg font-semibold">Sofortmaßnahmen</div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button
          variant="secondary"
          onClick={() => toast.success("Demo: Requirement-Scan gestartet (Mock).")}
        >
          Requirement Scan
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.success("Demo: Evidence Slots erzeugt (Mock).")}
        >
          Evidence Slots
        </Button>
        <Button
          onClick={() => toast.success("Demo: Agent Run gestartet (Mock).")}
        >
          Run Agents
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.success("Demo: Report erstellt (Mock).")}
        >
          Export Report
        </Button>
      </div>
    </Card>
  );
}
