import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const product = req.body;

    // 1. Create Product in Stripe
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      // Stripe requires public URLs. If localhost or blank, send empty array to avoid error.
      // images: (product.image && !product.image.includes('localhost') && product.image.startsWith('http')) ? [product.image] : [],
      images: [], // TEMPORARY FIX: Disable images to prevent "Invalid URL" errors
    });

    // 2. Create Price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100), // Convert to cents
      currency: 'cad', // Defaulting to CAD for now as per previous context
    });

    res.json({
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id
    });
  } catch (error: any) {
    console.error("Stripe Sync Error:", error);
    res.status(500).json({ error: error.message });
  }
}
