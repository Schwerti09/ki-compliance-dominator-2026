import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const urls = ["/", "/pricing", "/features", "/blog", "/dashboard", "/tools/ai-act-checker", "/tools/iso-gap-analyzer"];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${new URL(u, base).toString()}</loc></url>`)
  .join("\n")}
</urlset>
`;

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml, "utf8");
