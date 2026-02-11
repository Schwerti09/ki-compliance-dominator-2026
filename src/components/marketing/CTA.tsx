import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CTA() {
  return (
    <section className="container py-16">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm text-white/60">Ready?</div>
            <div className="mt-2 text-2xl font-semibold">Mach aus Compliance einen reproduzierbaren Prozess.</div>
            <div className="mt-2 text-sm text-white/70">
              Deploy-fähig auf Vercel/Netlify. Supabase + Stripe sind sauber isoliert über ENV.
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/pricing">Starten</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard">Demo</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
