import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createSessionToken, isAdminRequest, isValidAdminPassword, sessionCookieHeader } from './_lib/auth.js';
import { rejectBadPost } from './_lib/security.js';

// POST { password }        -> logs in, sets HttpOnly session cookie
// POST { action: "check" } -> 200 if the session cookie is still valid
// POST { action: "logout" }-> clears the cookie
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 30 calls per 15 minutes per IP
  if (rejectBadPost(req, res, { name: 'admin-login', limit: 30, windowMs: 15 * 60 * 1000 })) return;

  const body = req.body || {};

  if (body.action === 'check') {
    return isAdminRequest(req) ? res.status(200).json({ ok: true }) : res.status(401).json({ error: 'Not logged in' });
  }

  if (body.action === 'logout') {
    res.setHeader('Set-Cookie', sessionCookieHeader('', 0));
    return res.status(200).json({ ok: true });
  }

  if (!isValidAdminPassword(body.password)) {
    // Small delay to slow down password guessing
    await new Promise((r) => setTimeout(r, 1000));
    return res.status(401).json({ error: 'Incorrect password' });
  }

  res.setHeader('Set-Cookie', sessionCookieHeader(createSessionToken()));
  return res.status(200).json({ ok: true });
}
