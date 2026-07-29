export interface RouteContext {
  params: Record<string, string>;
  ip: string;
}

export type Handler = (req: Request, ctx: RouteContext) => Response | Promise<Response>;

export interface Route {
  method: string;
  pattern: URLPattern;
  handler: Handler;
}

export interface RouteMatch {
  handler: Handler;
  params: Record<string, string>;
}
