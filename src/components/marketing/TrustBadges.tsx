import Image from "next/image";

const badges = [
  { src: "/images/trust/iso-27001-badge.svg", alt: "ISO 27001" },
  { src: "/images/trust/gdpr-compliant.svg", alt: "GDPR" },
  { src: "/images/trust/stripe-badge.svg", alt: "Stripe" },
  { src: "/images/trust/trustpilot-4.9.svg", alt: "Trustpilot" }
];

export default function TrustBadges() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {badges.map((b) => (
        <div key={b.src} className="glass-card flex items-center justify-center p-4">
          <Image src={b.src} alt={b.alt} width={220} height={64} priority />
        </div>
      ))}
    </div>
  );
}
