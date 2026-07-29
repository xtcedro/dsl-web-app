import { assert, assertFalse } from "@std/assert";
import { isRateLimited } from "../src/middleware/rate_limit.ts";

Deno.test("isRateLimited allows the first few requests then blocks", () => {
  const key = `test-${crypto.randomUUID()}`;
  const now = Date.now();
  for (let i = 0; i < 5; i++) {
    assertFalse(isRateLimited(key, now), `request ${i} should be allowed`);
  }
  assert(isRateLimited(key, now), "6th request in the same window should be blocked");
});

Deno.test("isRateLimited resets once the window passes", () => {
  const key = `test-${crypto.randomUUID()}`;
  const start = Date.now();
  for (let i = 0; i < 5; i++) isRateLimited(key, start);
  assert(isRateLimited(key, start));
  assertFalse(isRateLimited(key, start + 61_000));
});

Deno.test("isRateLimited tracks separate keys independently", () => {
  const keyA = `test-${crypto.randomUUID()}`;
  const keyB = `test-${crypto.randomUUID()}`;
  const now = Date.now();
  for (let i = 0; i < 5; i++) isRateLimited(keyA, now);
  assert(isRateLimited(keyA, now));
  assertFalse(isRateLimited(keyB, now));
});
