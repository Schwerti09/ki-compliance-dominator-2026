import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(0,204,136,.5)]" />
              EU AI Act · ISO 42001 · Audit-Trails
            </div>

            <h1 className="mt-5 text-5xl font-bold tracking-tight">
              KI-Compliance, die sich <span className="text-white/70">wie Software</span> verhält.
            </h1>

            <p className="mt-5 text-lg text-white/70">
              Agentische Checks, Evidenz-Slots, Risiko-Visualisierung – damit Governance nicht zur Excel-Hölle wird.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/pricing">Jetzt starten</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/dashboard">Demo ansehen</Link>
              </Button>
            </div>

            <div className="mt-6 text-xs text-white/50">
              Hinweis: Demo-Daten aktiv. Supabase/Stripe optional über ENV.
            </div>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative">
              <div className="text-sm text-white/60">Live Preview</div>
              <div className="mt-2 text-2xl font-semibold">Compliance Radar</div>
              <div className="mt-4 grid gap-3">
                {[
                  { k: "High-Risk Systeme", v: "2", c: "text-amber-300" },
                  { k: "Offene Findings", v: "7", c: "text-rose-300" },
                  { k: "Compliance Score", v: "78", c: "text-emerald-300" }
                ].map((x) => (
                  <div key={x.k} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-white/70">{x.k}</div>
                    <div className={`text-xl font-bold ${x.c}`}>{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                „Behandle Anforderungen wie Tests: reproduzierbar, versioniert, auditierbar.“
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
