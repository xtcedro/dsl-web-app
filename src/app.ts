import { matchRoute } from "./router.ts";
import { routes } from "./routes.ts";
import { withSecurityHeaders } from "./middleware/security_headers.ts";
import { logRequest } from "./middleware/logger.ts";
import { handleNotFound } from "./handlers/not_found.ts";

function extractIp(info: Deno.ServeHandlerInfo): string {
  const addr = info.remoteAddr;
  return addr.transport === "tcp" || addr.transport === "udp" ? addr.hostname : "unknown";
}

function handleError(error: unknown): Response {
  console.error("Unhandled error:", error);
  return new Response("Internal Server Error", { status: 500 });
}

/** Builds the request handler Deno.serve expects: routes, applies security headers, logs. */
export function createApp(): Deno.ServeHandler {
  return async function handleRequest(
    req: Request,
    info: Deno.ServeHandlerInfo,
  ): Promise<Response> {
    const start = performance.now();
    const ip = extractIp(info);

    let response: Response;
    try {
      const match = matchRoute(routes, req);
      response = match
        ? await match.handler(req, { params: match.params, ip })
        : await handleNotFound(req, { params: {}, ip });
    } catch (error) {
      response = handleError(error);
    }

    response = withSecurityHeaders(response);
    logRequest(req, response, performance.now() - start, ip);
    return response;
  };
}
