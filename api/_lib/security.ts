import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Visitor IP as seen by Vercel's edge. */
export function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const first = Array.isArray(fwd) ? fwd[0] : fwd;
  return (first?.split(',')[0] || req.socket?.remoteAddress || 'unknown').trim();
}

/**
 * Block requests sent from other websites (CSRF). Browsers always send an Origin
 * header on cross-site POSTs, so if one is present it must match this site.
 */
export function isSameOrigin(req: VercelRequest): boolean {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin navigations / server-to-server calls
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Simple per-IP rate limiter. Serverless instances don't share memory, so this is
 * best-effort (it stops bursts hitting the same instance), not a hard global limit.
 */
export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  b.count += 1;
  return { ok: b.count <= limit, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
}

/**
 * Common checks for POST endpoints: method, same-origin and rate limit.
 * Returns true if the request was rejected (a response has already been sent).
 */
export function rejectBadPost(
  req: VercelRequest,
  res: VercelResponse,
  opts: { name: string; limit: number; windowMs: number }
): boolean {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
    return true;
  }
  if (!isSameOrigin(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return true;
  }
  const rl = rateLimit(`${opts.name}:${clientIp(req)}`, opts.limit, opts.windowMs);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
    return true;
  }
  return false;
}
