export function cn(...v: Array<string | undefined | null | false>) {
  return v.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return new URL(path, base).toString();
}
