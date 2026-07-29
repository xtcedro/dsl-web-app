interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

/**
 * Fixed-window rate limiter keyed by a caller-supplied identity (the connection's
 * remote address, never a client-controlled header). Returns true when the
 * caller has exceeded the allowance and should be rejected.
 */
export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

/** Drops expired buckets so the map doesn't grow without bound. Call periodically. */
export function sweepExpiredBuckets(now: number = Date.now()): void {
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}
