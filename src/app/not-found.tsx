import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-white/70">Diese Seite existiert nicht.</p>
      <Link className="mt-6 inline-block underline underline-offset-4" href="/">
        Zur Startseite →
      </Link>
    </div>
  );
}
