export type Plan = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  kicker: string;
  priceMonthly: string;
  popular?: boolean;
  priceIdEnv?: "STRIPE_PRICE_STARTER" | "STRIPE_PRICE_PRO" | "STRIPE_PRICE_ENTERPRISE";
  features: string[];
};

export const pricingPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    kicker: "Für kleine Teams",
    priceMonthly: "€200",
    priceIdEnv: "STRIPE_PRICE_STARTER",
    features: ["EU AI Act Vorprüfung", "ISO 42001 Gap-Checks", "Audit Timeline", "Exports (Mock)"]
  },
  {
    id: "pro",
    name: "Pro",
    kicker: "Für Compliance Ops",
    priceMonthly: "€990",
    popular: true,
    priceIdEnv: "STRIPE_PRICE_PRO",
    features: ["Agent Workspace", "Evidenz-Slots", "Risk Graph 3D", "Policy Templates", "Alerts (Mock)"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    kicker: "Für große Organisationen",
    priceMonthly: "€4900",
    priceIdEnv: "STRIPE_PRICE_ENTERPRISE",
    features: ["Multi-Org", "RLS Hardening", "Custom Reports", "SSO-Planung", "SLA-ready Struktur"]
  }
];

export function pricingById(id: string) {
  const p = pricingPlans.find((x) => x.id === id);
  return p ?? pricingPlans[0];
}
