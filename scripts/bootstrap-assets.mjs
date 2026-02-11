import fs from "node:fs";
import path from "node:path";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function writeBinaryFromBase64(filePath, b64) {
  ensureDir(path.dirname(filePath));
  const buf = Buffer.from(b64, "base64");
  fs.writeFileSync(filePath, buf);
}

const root = process.cwd();

const svg = (label) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="180" viewBox="0 0 640 180">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0" stop-color="#0A1A3A"/>
      <stop offset="1" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <rect width="640" height="180" rx="20" fill="url(#g)"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial" font-size="32" fill="#FFFFFF" opacity="0.95">${label}</text>
</svg>`;

const ONE_BY_ONE_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/ax2mQAAAABJRU5ErkJggg==";

const ONE_BY_ONE_JPG_BASE64 =
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAALCAABAAEBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCkAA//2Q==";

const files = [
  ["public/images/trust/iso-27001-badge.svg", svg("ISO 27001")],
  ["public/images/trust/gdpr-compliant.svg", svg("GDPR")],
  ["public/images/trust/stripe-badge.svg", svg("Stripe")],
  ["public/images/trust/trustpilot-4.9.svg", svg("Trustpilot 4.9")],
  ["public/favicon/icon.svg", svg("KD")],
  ["public/favicon/manifest.json", JSON.stringify({
    name: "KI Compliance Dominator 2026",
    short_name: "KCD",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1A3A",
    theme_color: "#0A1A3A",
    icons: [
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  }, null, 2)],
  ["public/robots.txt", "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n"],
  ["public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>http://localhost:3000/</loc></url>
  <url><loc>http://localhost:3000/pricing</loc></url>
  <url><loc>http://localhost:3000/features</loc></url>
  <url><loc>http://localhost:3000/blog</loc></url>
</urlset>`]
];

for (const [p, content] of files) {
  writeText(path.join(root, p), content);
}

const pngs = [
  "public/og-image.jpg",
  "public/images/screenshots/dashboard-3d.jpg",
  "public/images/screenshots/compliance-flow.jpg",
  "public/images/logos/siemens.png",
  "public/images/logos/deutsche-bank.png",
  "public/images/logos/bmw.png",
  "public/images/logos/sap.png",
  "public/images/logos/bosch.png",
  "public/icons/icon-72x72.png",
  "public/icons/icon-96x96.png",
  "public/icons/icon-128x128.png",
  "public/icons/icon-144x144.png",
  "public/icons/icon-152x152.png",
  "public/icons/icon-192x192.png",
  "public/icons/icon-384x384.png",
  "public/icons/icon-512x512.png",
  "public/favicon/apple-touch-icon.png"
];

for (const p of pngs) writeBinaryFromBase64(path.join(root, p), ONE_BY_ONE_PNG_BASE64);

const jpgs = [
  "public/images/team/rolf-schwertfechter.jpg",
  "public/images/team/dr-eva-klein.jpg",
  "public/images/team/markus-bernau.jpg"
];

for (const p of jpgs) writeBinaryFromBase64(path.join(root, p), ONE_BY_ONE_JPG_BASE64);
