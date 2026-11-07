import { timingSafeEqual } from 'crypto';

// The admin password lives ONLY on the server (Vercel env var ADMIN_PASSWORD).
// Do not prefix it with VITE_: Vite copies VITE_* variables into the public
// browser bundle, which is how the old password became visible in DevTools.
function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

export function isValidAdminPassword(candidate: unknown): boolean {
  const expected = getAdminPassword();
  if (!expected || typeof candidate !== 'string') return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Compare against itself so timing doesn't reveal the length mismatch early
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function isAuthorizedRequest(authHeader: string | undefined): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  return isValidAdminPassword(authHeader.slice('Bearer '.length));
}
