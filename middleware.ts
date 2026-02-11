import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };
const WINDOW_MS = 60_000;
const LIMIT = 120;

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "0.0.0.0";
  return req.ip ?? "0.0.0.0";
}

function rateLimit(key: string): boolean {
  const now = Date.now();
  const store = (globalThis as unknown as { __rl?: Map<string, Bucket> }).__rl ?? new Map<string, Bucket>();
  (globalThis as unknown as { __rl?: Map<string, Bucket> }).__rl = store;

  const b = store.get(key);
  if (!b || b.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  b.count += 1;
  store.set(key, b);
  return b.count <= LIMIT;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const ua = request.headers.get("user-agent") ?? "";
  const ip = getIp(request);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (pathname.startsWith("/api/")) {
    const key = `${ip}:${ua.slice(0, 64)}`;
    if (!rateLimit(key)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
