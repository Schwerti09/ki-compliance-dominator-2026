import Link from "next/link";
import { getAllPostsSync } from "@/lib/blog";
import { Card } from "@/components/ui/card";

export default function BlogPreview() {
  const posts = getAllPostsSync().slice(0, 3);
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Wissens-Feed</h2>
          <p className="mt-3 text-white/70">3 volle Artikel sind enthalten, damit Blog-Seiten niemals leer sind.</p>
        </div>
        <Link className="hidden text-sm font-semibold underline underline-offset-4 md:inline" href="/blog">
          Alle Posts →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.slug}>
            <div className="text-xs text-white/60">{p.frontmatter.date}</div>
            <div className="mt-2 text-lg font-semibold">{p.frontmatter.title}</div>
            <div className="mt-2 text-sm text-white/70 line-clamp-3">{p.frontmatter.excerpt}</div>
            <div className="mt-4">
              <Link className="text-sm font-semibold underline underline-offset-4" href={`/blog/${p.slug}`}>
                Lesen →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
