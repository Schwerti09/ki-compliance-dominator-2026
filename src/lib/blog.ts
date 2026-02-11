import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostFrontmatter = { title: string; date: string; excerpt: string; tags?: string[] };
export type Post = { slug: string; frontmatter: PostFrontmatter; content: string; html: string };

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readAllFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPostsSync(): Array<{ slug: string; frontmatter: PostFrontmatter }> {
  return readAllFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const full = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(full, "utf8");
      const fm = matter(raw).data as PostFrontmatter;
      return { slug, frontmatter: fm };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getAllPosts() {
  return getAllPostsSync();
}

export async function getAllPostSlugs() {
  return readAllFiles().map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const full = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const parsed = matter(raw);
  const frontmatter = parsed.data as PostFrontmatter;
  const content = parsed.content;
  const html = marked.parse(content) as string;
  return { slug, frontmatter, content, html };
}
