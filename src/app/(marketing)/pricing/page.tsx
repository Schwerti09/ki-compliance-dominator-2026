import { pricingPlans } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
        <p className="mt-3 text-white/70">
          Klarer Deal: Du bekommst Governance, Evidenzen und Audit-Trails als Maschine. Du sparst Zeit, Nerven, Risiko.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((p) => (
          <Card key={p.id} className={p.popular ? "border-white/30 shadow-glow" : ""}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">{p.kicker}</div>
                <div className="text-2xl font-semibold">{p.name}</div>
              </div>
              {p.popular ? (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Beliebt</span>
              ) : null}
            </div>

            <div className="mt-5 text-4xl font-bold">
              {p.priceMonthly}
              <span className="text-base font-medium text-white/60">/Monat</span>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href={`/api/checkout?tier=${encodeURIComponent(p.id)}`}>Jetzt starten</Link>
              </Button>
              <p className="mt-2 text-xs text-white/50">
                Demo-Checkout: Redirect zu Stripe (oder Mock, falls Keys fehlen).
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
