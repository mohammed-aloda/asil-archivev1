import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { cart, currency = 'CAD' } = req.body; // Default to CAD

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const exchangeRate = currency === 'CAD' ? 1.40 : 1;

    // Map cart items to Stripe line items
    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.name,
          description: `${item.size} - ${item.category}`,
        },
        // Convert price to currency, then to cents
        unit_amount: Math.round(item.price * exchangeRate * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'https://asilarchive.com'}/#/shop?success=true`, // Redirect to Shop with success flag
      cancel_url: `${process.env.CLIENT_URL || 'https://asilarchive.com'}/#/checkout?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['CA', 'US', 'GB', 'FR', 'AE', 'SA', 'QA'], // Added common regions, customize as needed
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
}
