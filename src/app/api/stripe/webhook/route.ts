import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";
import { upsertStripeEventLog } from "@/lib/stripe-log";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ ok: false, error: "Missing signature or webhook secret." }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  await upsertStripeEventLog({
    id: event.id,
    type: event.type,
    created: event.created,
    livemode: event.livemode
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
