import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="container py-16">
      <article className="prose prose-invert max-w-3xl">
        <h1>{post.frontmatter.title}</h1>
        <p className="text-sm text-white/60">{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </div>
  );
}
