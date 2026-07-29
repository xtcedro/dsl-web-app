import { assert, assertFalse } from "@std/assert";
import { csrfTokensMatch, generateCsrfToken } from "../src/lib/csrf.ts";

Deno.test("csrfTokensMatch accepts two equal tokens", () => {
  const token = generateCsrfToken();
  assert(csrfTokensMatch(token, token));
});

Deno.test("csrfTokensMatch rejects different tokens", () => {
  assertFalse(csrfTokensMatch(generateCsrfToken(), generateCsrfToken()));
});

Deno.test("csrfTokensMatch rejects when either side is missing", () => {
  const token = generateCsrfToken();
  assertFalse(csrfTokensMatch(undefined, token));
  assertFalse(csrfTokensMatch(token, undefined));
  assertFalse(csrfTokensMatch(undefined, undefined));
});

Deno.test("csrfTokensMatch rejects mismatched lengths without throwing", () => {
  assertFalse(csrfTokensMatch("short", "a-lot-longer-than-short"));
});

Deno.test("generateCsrfToken produces unique values", () => {
  const a = generateCsrfToken();
  const b = generateCsrfToken();
  assert(a !== b);
});
