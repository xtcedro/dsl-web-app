export const CSRF_COOKIE_NAME = "csrf_token";
export const CSRF_FIELD_NAME = "csrf_token";

export function generateCsrfToken(): string {
  return crypto.randomUUID();
}

/** Constant-time comparison so token checks don't leak timing information. */
export function csrfTokensMatch(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b || a.length !== b.length) return false;
  const bytesA = new TextEncoder().encode(a);
  const bytesB = new TextEncoder().encode(b);
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) {
    diff |= bytesA[i] ^ bytesB[i];
  }
  return diff === 0;
}
