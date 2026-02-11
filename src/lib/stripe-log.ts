import { createSupabaseAdminClient } from "@/lib/supabase";

export async function upsertStripeEventLog(input: { id: string; type: string; created: number; livemode: boolean }) {
  const admin = createSupabaseAdminClient();
  if (!admin) return { ok: true };

  await admin.from("stripe_event_log").upsert(
    {
      id: input.id,
      type: input.type,
      created_at_unix: input.created,
      livemode: input.livemode
    },
    { onConflict: "id" }
  );

  return { ok: true };
}
