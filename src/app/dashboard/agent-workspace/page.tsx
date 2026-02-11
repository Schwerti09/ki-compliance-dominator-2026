import AgentStream from "@/components/dashboard/AgentStream";
import { Card } from "@/components/ui/card";

export default function AgentWorkspacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agent Workspace</h1>
        <p className="mt-2 text-white/70">
          Agentische Workflows laufen hier als nachvollziehbare Events (Mock-Agents ohne externe Keys).
        </p>
      </div>

      <Card>
        <AgentStream />
      </Card>
    </div>
  );
}
