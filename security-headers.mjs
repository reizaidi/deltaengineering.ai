/**
 * Security headers shared by next.config.ts (Node hosting) and
 * scripts/build-static.sh (writes out/_headers for static hosts).
 *
 * Static CSP (no nonces) so every page stays statically rendered and cacheable
 * at the edge. 'unsafe-inline' for scripts is required by Next's inline
 * bootstrap scripts without nonces; see docs/REPORT.md for the trade-off and
 * the nonce/SRI upgrade path.
 */
export function buildSecurityHeaders({ dev = false } = {}) {
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  return [
    { key: "Content-Security-Policy", value: csp },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-Frame-Options", value: "DENY" },
  ];
}

export const securityHeaders = buildSecurityHeaders();
