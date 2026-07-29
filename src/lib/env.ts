export function readPort(): number {
  const raw = Deno.env.get("PORT");
  const port = raw ? Number(raw) : 8000;
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid PORT value: "${raw}"`);
  }
  return port;
}

export function isProduction(): boolean {
  return Deno.env.get("DENO_ENV") === "production";
}
