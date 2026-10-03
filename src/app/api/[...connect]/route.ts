import { createConnectRouter } from "@connectrpc/connect";
import { createFetchHandler } from "@connectrpc/connect/protocol";
import { routes } from "@/server/inquiry-service";

/**
 * Connect RPC endpoint for the App Router. @connectrpc/connect-next targets
 * the Pages Router, so we mount the universal handlers on a Route Handler with
 * the fetch adapter instead. Serves the Connect protocol (JSON + binary).
 * URL: /api/<package.Service>/<Method>
 */
const router = createConnectRouter({ readMaxBytes: 64 * 1024, grpc: false, grpcWeb: false });
routes(router);

const handlers = new Map(router.handlers.map((h) => [h.requestPath, createFetchHandler(h)]));

async function handle(request: Request) {
  const path = new URL(request.url).pathname.replace(/^\/api/, "");
  const handler = handlers.get(path);
  if (!handler) return new Response(null, { status: 404 });
  return handler(request);
}

export const POST = handle;
