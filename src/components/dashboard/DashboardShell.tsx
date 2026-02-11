import Link from "next/link";
import { Card } from "@/components/ui/card";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/compliance-center", label: "Compliance Center" },
  { href: "/dashboard/agent-workspace", label: "Agent Workspace" },
  { href: "/tools/ai-act-checker", label: "Tools" }
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <Card>
            <div className="text-sm text-white/60">Workspace</div>
            <div className="mt-1 text-lg font-semibold">Demo Org</div>
            <div className="mt-3 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-sm text-white/60">Status</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-white/70">Agents</span>
              <span className="text-xs text-emerald-300">ONLINE</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-white/70">DB</span>
              <span className="text-xs text-white/50">Supabase optional</span>
            </div>
          </Card>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
