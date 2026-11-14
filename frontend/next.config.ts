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
};

export default nextConfig;
