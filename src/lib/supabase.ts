import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const hdrs = headers();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: { [key: string]: unknown }) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: { [key: string]: unknown }) {
        cookieStore.set({ name, value: "", ...options });
      }
    },
    headers: {
      "X-Forwarded-Host": hdrs.get("x-forwarded-host") ?? "",
      "X-Forwarded-Proto": hdrs.get("x-forwarded-proto") ?? "https"
    }
  });
}

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) return null;

  return createClient(url, service, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
