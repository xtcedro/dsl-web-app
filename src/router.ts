import type { Handler, Route, RouteMatch } from "./types.ts";

/** Builds a Route from a method, a URLPattern pathname, and its handler. */
export function route(method: string, pathname: string, handler: Handler): Route {
  return { method, pattern: new URLPattern({ pathname }), handler };
}

/** Finds the first route whose method and pattern match the request. */
export function matchRoute(routes: Route[], req: Request): RouteMatch | undefined {
  for (const candidate of routes) {
    if (candidate.method !== req.method) continue;
    const match = candidate.pattern.exec(req.url);
    if (!match) continue;
    const params: Record<string, string> = {};
    for (const [key, value] of Object.entries(match.pathname.groups)) {
      if (value !== undefined) params[key] = value;
    }
    return { handler: candidate.handler, params };
  }
  return undefined;
}
