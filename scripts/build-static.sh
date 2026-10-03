#!/usr/bin/env bash
# Builds a fully static copy of the site into out/ for static hosts such as
# Cloudflare Pages. The Connect RPC route needs a server, so it is set aside
# for the build and the contact form hands inquiries to the visitor's email app.
set -euo pipefail
cd "$(dirname "$0")/.."

parked="$(mktemp -d)"
mv src/app/api "$parked/api"
restore() { mv "$parked/api" src/app/api; rmdir "$parked"; }
trap restore EXIT

rm -rf out .next
STATIC_EXPORT=1 NEXT_PUBLIC_STATIC_SITE=1 \
  NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://deltaengineering.ai}" \
  npx next build

# Security headers for Cloudflare Pages (the host ignores next.config headers).
node --input-type=module -e '
import { securityHeaders } from "./security-headers.mjs";
import { writeFileSync } from "node:fs";
const lines = ["/*", ...securityHeaders.map((h) => `  ${h.key}: ${h.value}`),
  "", "/_next/static/*", "  Cache-Control: public, max-age=31536000, immutable", ""];
writeFileSync("out/_headers", lines.join("\n"));
'
echo "Static site ready in out/"
