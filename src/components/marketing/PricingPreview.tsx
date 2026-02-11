import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/pricing";

export default function PricingPreview() {
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Preise</h2>
          <p className="mt-3 text-white/70">Drei klare Tiers. Stripe-Abos integriert. Fallback: Mock-Checkout ohne Keys.</p>
        </div>
        <Button asChild variant="secondary" className="hidden md:inline-flex">
          <Link href="/pricing">Alle Preise</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((p) => (
          <Card key={p.id} className={p.popular ? "border-white/30 shadow-glow" : ""}>
            <div className="text-sm text-white/60">{p.kicker}</div>
            <div className="mt-2 text-xl font-semibold">{p.name}</div>
            <div className="mt-4 text-3xl font-bold">
              {p.priceMonthly}
              <span className="text-base font-medium text-white/60">/Monat</span>
            </div>
            <div className="mt-5">
              <Button asChild className="w-full">
                <Link href="/pricing">Details</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
