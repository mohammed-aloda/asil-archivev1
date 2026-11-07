import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isValidAdminPassword } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  res.setHeader('Cache-Control', 'no-store');

  const password = req.body?.password;
  if (!isValidAdminPassword(password)) {
    // Small delay to slow down password guessing
    await new Promise((r) => setTimeout(r, 1000));
    return res.status(401).json({ error: 'Incorrect password' });
  }
  return res.status(200).json({ ok: true });
}
