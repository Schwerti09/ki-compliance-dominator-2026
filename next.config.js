/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ["lucide-react"]
  },
  async headers() {
    const prod = process.env.NODE_ENV === "production";
    const cspProd =
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https: blob:; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://*.supabase.co https://vitals.vercel-insights.com https://www.google-analytics.com; " +
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com; " +
      "worker-src 'self' blob:; " +
      "manifest-src 'self';";
    const cspDev =
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https:;";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: prod ? cspProd : cspDev }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/start", destination: "/pricing", permanent: true },
      { source: "/impressum", destination: "/legal/impressum", permanent: true },
      { source: "/datenschutz", destination: "/legal/datenschutz", permanent: true },
      { source: "/agb", destination: "/legal/agb", permanent: true }
    ];
  }
};

module.exports = nextConfig;
