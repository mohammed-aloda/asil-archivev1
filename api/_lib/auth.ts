import { createHmac, timingSafeEqual } from 'crypto';
import type { VercelRequest } from '@vercel/node';

// The admin password lives ONLY on the server (Vercel env var ADMIN_PASSWORD).
// Do not prefix it with VITE_: Vite copies VITE_* variables into the public
// browser bundle, which is how the old password became visible in DevTools.
function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    timingSafeEqual(bb, bb);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function isValidAdminPassword(candidate: unknown): boolean {
  const expected = getAdminPassword();
  if (!expected || typeof candidate !== 'string') return false;
  return safeEqual(candidate, expected);
}

// ---- Admin session cookie -------------------------------------------------
// After a correct login the server sets an HttpOnly cookie holding a signed,
// expiring token. JavaScript on the page can't read it, and the password is
// not kept in the browser. Changing ADMIN_PASSWORD logs every session out.

export const SESSION_COOKIE = 'asil_admin';
export const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours

function sign(payload: string): string {
  const key = getAdminPassword();
  if (!key) return '';
  return createHmac('sha256', `asil-admin-session:${key}`).update(payload).digest('base64url');
}

export function createSessionToken(): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `v1.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function sessionCookieHeader(token: string, maxAge = SESSION_TTL_SECONDS): string {
  return `${SESSION_COOKIE}=${token}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

function readCookie(req: VercelRequest, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

export function isAdminRequest(req: VercelRequest): boolean {
  if (!getAdminPassword()) return false;
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expires = Number(parts[1]);
  if (!Number.isFinite(expires) || expires < Date.now() / 1000) return false;
  return safeEqual(parts[2], sign(payload));
}
