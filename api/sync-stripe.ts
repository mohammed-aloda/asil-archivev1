import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { isAdminRequest } from './_lib/auth.js';
import { rejectBadPost } from './_lib/security.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (rejectBadPost(req, res, { name: 'sync-stripe', limit: 30, windowMs: 60 * 1000 })) return;

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payments are not configured.' });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const product = req.body || {};
  const name = typeof product.name === 'string' ? product.name.trim().slice(0, 250) : '';
  const description = typeof product.description === 'string' ? product.description.slice(0, 1000) : undefined;
  const price = Number(product.price);

  if (!name || !Number.isFinite(price) || price <= 0 || price > 100000) {
    return res.status(400).json({ error: 'A valid name and price are required.' });
  }

  try {
    // 1. Create Product in Stripe
    const stripeProduct = await stripe.products.create({
      name,
      description: description || undefined,
      images: [], // Stripe requires public URLs; images disabled to avoid "Invalid URL" errors
    });

    // 2. Create Price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: 'cad',
    });

    res.json({
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id
    });
  } catch (error: any) {
    console.error("Stripe Sync Error:", error);
    res.status(500).json({ error: 'Could not sync product to Stripe.' });
  }
}
