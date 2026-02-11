import Link from "next/link";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/tools/ai-act-checker", label: "Tools" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 shadow-glow">
            <span className="text-sm font-bold">KD</span>
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">KI Compliance Dominator</div>
            <div className="text-[11px] text-white/60">EU AI Act · ISO 42001</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-white/70 hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" className="hidden md:inline-flex">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/pricing">Starten</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
