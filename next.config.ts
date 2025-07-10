import type { NextConfig } from "next";

// next.config.js または next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Lintエラーでもビルドを止めない
  },
};

module.exports = nextConfig;

export default nextConfig;
