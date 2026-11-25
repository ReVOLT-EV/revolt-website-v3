import path from "node:path";
import type { NextConfig } from "next";

const root = path.resolve(__dirname);

const nextConfig: NextConfig = {
  // Pin the project root so a stray lockfile higher up (e.g. ~/package-lock.json)
  // isn't mistaken for the workspace root.
  outputFileTracingRoot: root,
  turbopack: { root },

  // Lets a verification build write somewhere other than .next, so it never
  // clobbers a running `npm run dev`. Usage: NEXT_DIST_DIR=.next-verify next build
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Vercel Services (beta) doesn't serve Next's /_next/image optimizer, so
  // images are served as-is. Keep files in public/ web-sized (≤2000px).
  images: { unoptimized: true },

  // On Vercel, vercel.json sends /api/* to the Flask service before Next sees it.
  // For plain `npm run dev`, proxy /api/* to Flask running locally (backend/app.py).
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    return [{ source: "/api/:path*", destination: "http://127.0.0.1:5328/api/:path*" }];
  },
};

export default nextConfig;
