import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const dynamic = "force-static";

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <div className="container py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-white/70">Komprimierte Klarheit zu EU AI Act, ISO 42001 und agentischer Governance.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.slug}>
            <div className="text-xs text-white/60">{p.frontmatter.date}</div>
            <div className="mt-2 text-xl font-semibold">{p.frontmatter.title}</div>
            <div className="mt-2 text-sm text-white/70 line-clamp-3">{p.frontmatter.excerpt}</div>
            <div className="mt-4">
              <Link className="text-sm font-semibold underline underline-offset-4" href={`/blog/${p.slug}`}>
                Lesen →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
