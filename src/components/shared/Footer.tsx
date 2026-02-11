import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">KI Compliance Dominator</div>
            <p className="mt-2 text-sm text-white/60">
              Demo-SaaS für automatisierte Governance. Für Produktion: Texte, Legal und Policies finalisieren.
            </p>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Links</div>
            <div className="mt-2 space-y-2 text-white/70">
              <Link className="block hover:text-white" href="/pricing">
                Pricing
              </Link>
              <Link className="block hover:text-white" href="/blog">
                Blog
              </Link>
              <Link className="block hover:text-white" href="/tools/ai-act-checker">
                EU AI Act Checker
              </Link>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Recht</div>
            <div className="mt-2 space-y-2 text-white/70">
              <Link className="block hover:text-white" href="/legal/impressum">
                Impressum
              </Link>
              <Link className="block hover:text-white" href="/legal/datenschutz">
                Datenschutz
              </Link>
              <Link className="block hover:text-white" href="/legal/agb">
                AGB
              </Link>
              <Link className="block hover:text-white" href="/legal/cookie-richtlinie">
                Cookie-Richtlinie
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <span>© {new Date().getFullYear()} KI Compliance Dominator</span>
          <span>Build: Next.js 15 · React 19</span>
        </div>
      </div>
    </footer>
  );
}
