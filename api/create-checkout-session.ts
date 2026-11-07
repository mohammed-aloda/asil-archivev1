import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { PRODUCTS } from '../constants.js';

const ALLOWED_CURRENCIES = ['CAD', 'USD'] as const;
const ALLOWED_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '2XL', '3XL'];
const MAX_QUANTITY_PER_ITEM = 20;
const MAX_LINE_ITEMS = 50;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not defined in the environment variables.');
    return res.status(500).json({ error: 'Payments are not configured.' });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { cart, currency: rawCurrency = 'CAD' } = req.body || {};
  const currency = String(rawCurrency).toUpperCase();

  if (!ALLOWED_CURRENCIES.includes(currency as any)) {
    return res.status(400).json({ error: 'Unsupported currency' });
  }
  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  if (cart.length > MAX_LINE_ITEMS) {
    return res.status(400).json({ error: 'Too many items in cart' });
  }

  const exchangeRate = currency === 'USD' ? (1 / 1.40) : 1; // Prices stored in CAD

  // Never trust prices/names sent by the browser: look every item up in the
  // server-side catalog so customers can't edit the price before paying.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of cart) {
    const product = PRODUCTS.find((p) => p.id === String(item?.id));
    const quantity = Number(item?.quantity);
    const size = String(item?.size ?? '').toUpperCase();

    if (!product) {
      return res.status(400).json({ error: 'An item in your cart is no longer available.' });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    if (!ALLOWED_SIZES.includes(size)) {
      return res.status(400).json({ error: 'Invalid size' });
    }

    lineItems.push({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: product.name.trim(),
          description: `${size} - ${product.category}`,
        },
        unit_amount: Math.round(product.price * exchangeRate * 100),
      },
      quantity,
    });
  }

  try {
    const baseUrl = process.env.CLIENT_URL || 'https://asilarchive.com';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/#/checkout?success=true`,
      cancel_url: `${baseUrl}/#/checkout?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['CA', 'US', 'GB', 'FR', 'AE', 'SA', 'QA'],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
