import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { pricingById } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tier = url.searchParams.get("tier") ?? "starter";
  const plan = pricingById(tier);

  const stripe = getStripe();
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!publishable || !secret || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.redirect(absoluteUrl(`/pricing?mockCheckout=1&tier=${encodeURIComponent(tier)}`), 302);
  }

  const successUrl = absoluteUrl(`/dashboard?checkout=success&tier=${encodeURIComponent(tier)}`);
  const cancelUrl = absoluteUrl(`/pricing?checkout=cancel&tier=${encodeURIComponent(tier)}`);

  const priceId = plan.priceIdEnv ? process.env[plan.priceIdEnv] : undefined;
  if (!priceId) {
    return NextResponse.json({ ok: false, error: "Missing Stripe price id env for tier." }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true
  });

  return NextResponse.redirect(session.url ?? cancelUrl, 303);
}
