import type { NextConfig } from "next";
import { buildSecurityHeaders } from "./security-headers.mjs";

const isDev = process.env.NODE_ENV === "development";
// STATIC_EXPORT=1 is set by scripts/build-static.sh for static hosting.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(isStaticExport
    ? { output: "export", images: { unoptimized: true } }
    : {
        async headers() {
          return [{ source: "/:path*", headers: buildSecurityHeaders({ dev: isDev }) }];
        },
      }),
};

export default nextConfig;
