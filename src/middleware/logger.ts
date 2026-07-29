/** Logs one line per request. Never logs headers, cookies, or body content — only routing facts. */
export function logRequest(req: Request, res: Response, durationMs: number, ip: string): void {
  const { pathname } = new URL(req.url);
  const line = [
    new Date().toISOString(),
    ip,
    req.method,
    pathname,
    res.status,
    `${durationMs.toFixed(1)}ms`,
  ].join(" ");
  console.log(line);
}
